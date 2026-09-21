"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { Button, ButtonLink } from "@/components/ui/Button";
import { websiteTypeOptions } from "@/config/services";
import { siteConfig, whatsAppLink } from "@/config/site";
import {
  readContactForm,
  validateContact,
  type ContactField,
  type FieldErrors,
} from "@/lib/validation";
import { cn } from "@/lib/utils";

/**
 * -----------------------------------------------------------------------------
 * CONTACT FORM
 *
 * Submits straight from the browser to Web3Forms, which is the way Web3Forms
 * is designed to be used: the access key is public, and posting from the page
 * avoids relaying through our own server.
 *
 * It previously posted server-side from a Next.js server action, and that was
 * failing in production ("Your message could not be sent"). Relaying through a
 * shared datacentre IP is the likely reason — it is exactly the traffic a form
 * service filters — and it added a hop that could fail without us seeing why.
 * Going direct removes that whole failure mode.
 *
 * Validation still runs before anything is sent, using the same rules the
 * server action used (src/lib/validation.ts).
 * -----------------------------------------------------------------------------
 */

/**
 * Web3Forms endpoint and access key.
 *
 * The key is written here rather than read from the environment. Web3Forms
 * access keys are public by design - they sit in the page that submits the
 * form, and the key alone only lets someone send mail to the inbox it is
 * already registered to, so there is nothing to keep secret.
 *
 * The key also decides the destination: there is no "send to" field in the
 * API. To change where enquiries land, create a new key at
 * https://web3forms.com using that address and replace the value below.
 */
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "e6f145bb-075e-4944-83ff-e29eb218f09c";

type Status = "idle" | "sending" | "success" | "error";

const INPUT_CLASS =
  "w-full rounded-lg border border-line bg-white px-4 py-3 text-[0.9375rem] text-ink " +
  "transition-colors duration-200 placeholder:text-muted/70 hover:border-line-strong " +
  "focus:border-ink";

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-semibold text-ink"
    >
      {children}
      {required ? (
        <span className="ml-1 text-accent-text" aria-hidden="true">
          *
        </span>
      ) : (
        <span className="ml-1.5 font-normal text-muted">(optional)</span>
      )}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-[#b3261e]">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [summary, setSummary] = useState("");

  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Lets a "Request a restaurant website" link pre-select the dropdown via
  // ?type=Restaurant. The select is uncontrolled, so this syncs the DOM
  // directly rather than going through state.
  const websiteTypeRef = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    const select = websiteTypeRef.current;
    if (!select || select.value) return;

    const requested = new URLSearchParams(window.location.search).get("type");
    if (
      requested &&
      (websiteTypeOptions as readonly string[]).includes(requested)
    ) {
      select.value = requested;
    }
  }, []);

  // Move attention to the outcome once it renders.
  useEffect(() => {
    if (status === "success" || status === "error") resultRef.current?.focus();
  }, [status]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Captured now: `event.currentTarget` is null again after the first await.
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Honeypot — a hidden field people never see. Bots that fill it get a
    // normal-looking response and nothing is sent.
    if (formData.get("hp_url")) {
      form.reset();
      setErrors({});
      setSummary("");
      setStatus("success");
      return;
    }

    const values = readContactForm(formData);
    const fieldErrors = validateContact(values);

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setSummary("Please check the highlighted fields and try again.");
      setStatus("idle");

      const firstInvalid = Object.keys(fieldErrors)[0];
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setErrors({});
    setSummary("");
    setStatus("sending");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          // charset is explicit so non-Latin input (Arabic, for example) is
          // transmitted and decoded as UTF-8 rather than being mangled.
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          // Read back rather than hardcoded, so the hidden checkbox actually
          // does something. Nobody ever ticks it, so FormData omits it and
          // this sends "" - the value Web3Forms accepts. A bot that fills the
          // rendered form ticks it, sends "on", and Web3Forms drops it.
          botcheck: (formData.get("botcheck") as string) ?? "",
          subject: `New website request – ${values.fullName}`,
          from_name: "Webzivo Website",
          // Lets you hit reply in your inbox and reach the enquirer directly.
          replyto: values.email,
          // These keys become the field labels in the email, so they are
          // written the way they should read in the inbox.
          "Full Name": values.fullName,
          "Business Name": values.businessName || "—",
          "Business Type": values.businessType || "—",
          Email: values.email,
          "Phone / WhatsApp": values.phone || "—",
          "Website Type": values.websiteType,
          "Project Details": values.message,
        }),
      });

      // Web3Forms answers 200 with { success: false } for rejected
      // submissions, so the status code alone is not proof of delivery.
      const result = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;

      if (!response.ok || !result?.success) {
        throw new Error(result?.message ?? `HTTP ${response.status}`);
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      console.error("[contact] Submission failed:", error);
      setStatus("error");
    }
  }

  const errorId = (field: ContactField) => `${formId}-${field}-error`;
  const fieldId = (field: ContactField) => `${formId}-${field}`;
  const describedBy = (field: ContactField) =>
    errors[field] ? errorId(field) : undefined;

  const isSending = status === "sending";

  if (status === "success") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="outline-none"
      >
        <div className="rounded-card border border-line bg-white p-6 sm:p-8">
          <span className="grid size-11 place-items-center rounded-full bg-ink text-white">
            <Icon name="check" className="size-5" strokeWidth={2.5} />
          </span>
          <h3 className="mt-5 text-xl font-bold tracking-[-0.015em] text-ink">
            Request sent
          </h3>
          <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
            Thanks! We&apos;ve received your request and will reply soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Only shown when sending genuinely failed. */}
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="outline-none empty:hidden"
      >
        {status === "error" ? (
          <div className="mb-6 rounded-card border border-accent/35 bg-accent-soft/60 p-6 sm:p-8">
            <h3 className="text-lg font-bold tracking-[-0.015em] text-ink">
              Your message could not be sent
            </h3>
            <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
              Something went wrong on the way to our inbox. Please try again, or
              reach us directly using one of the options below.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink href={whatsAppLink()} size="sm">
                <Icon name="whatsapp" className="size-4" />
                Send on WhatsApp
              </ButtonLink>

              {siteConfig.isEmailConfigured ? (
                <ButtonLink
                  href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(
                    "Website enquiry",
                  )}`}
                  size="sm"
                  variant="outline"
                >
                  <Icon name="mail" className="size-4" />
                  Email us
                </ButtonLink>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5"
      >
        {/* Web3Forms' own honeypot. It rejects any submission that arrives
            with a non-empty botcheck, so this stays unchecked for people. */}
        <input
          type="checkbox"
          name="botcheck"
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Honeypot - hidden from people, irresistible to bots. */}
        <div
          aria-hidden="true"
          className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
        >
          <label htmlFor={`${formId}-hp`}>Do not fill this in</label>
          <input
            id={`${formId}-hp`}
            type="text"
            name="hp_url"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor={fieldId("fullName")} required>
              Full Name
            </Label>
            <input
              id={fieldId("fullName")}
              name="fullName"
              type="text"
              required
              autoComplete="name"
              maxLength={100}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={describedBy("fullName")}
              placeholder="Your name"
              className={cn(INPUT_CLASS, errors.fullName && "border-[#b3261e]")}
            />
            <FieldError id={errorId("fullName")} message={errors.fullName} />
          </div>

          <div>
            <Label htmlFor={fieldId("businessName")}>Business Name</Label>
            <input
              id={fieldId("businessName")}
              name="businessName"
              type="text"
              autoComplete="organization"
              maxLength={120}
              placeholder="e.g. Maida Restaurant"
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <Label htmlFor={fieldId("businessType")}>Business Type</Label>
            <input
              id={fieldId("businessType")}
              name="businessType"
              type="text"
              maxLength={120}
              placeholder="e.g. Italian restaurant, barber shop"
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <Label htmlFor={fieldId("email")} required>
              Email
            </Label>
            <input
              id={fieldId("email")}
              name="email"
              type="email"
              required
              autoComplete="email"
              maxLength={254}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy("email")}
              placeholder="you@example.com"
              className={cn(INPUT_CLASS, errors.email && "border-[#b3261e]")}
            />
            <FieldError id={errorId("email")} message={errors.email} />
          </div>

          <div>
            <Label htmlFor={fieldId("phone")}>Phone / WhatsApp</Label>
            <input
              id={fieldId("phone")}
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              maxLength={40}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={describedBy("phone")}
              placeholder="+965 0000 0000"
              className={cn(INPUT_CLASS, errors.phone && "border-[#b3261e]")}
            />
            <FieldError id={errorId("phone")} message={errors.phone} />
          </div>

          <div>
            <Label htmlFor={fieldId("websiteType")} required>
              What type of website do you need?
            </Label>
            <div className="relative">
              <select
                id={fieldId("websiteType")}
                name="websiteType"
                ref={websiteTypeRef}
                required
                defaultValue=""
                aria-invalid={Boolean(errors.websiteType)}
                aria-describedby={describedBy("websiteType")}
                className={cn(
                  INPUT_CLASS,
                  "appearance-none pr-11 text-ink",
                  // Greys the text out while the placeholder option is selected.
                  "[&:has(option[value='']:checked)]:text-muted",
                  errors.websiteType && "border-[#b3261e]",
                )}
              >
                <option value="" disabled>
                  Select website type
                </option>
                {websiteTypeOptions.map((option) => (
                  <option key={option} value={option} className="text-ink">
                    {option}
                  </option>
                ))}
              </select>
              <Icon
                name="chevronDown"
                className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted"
              />
            </div>
            <FieldError
              id={errorId("websiteType")}
              message={errors.websiteType}
            />
          </div>
        </div>

        <div>
          <Label htmlFor={fieldId("message")} required>
            Tell us about your project
          </Label>
          <textarea
            id={fieldId("message")}
            name="message"
            required
            rows={5}
            maxLength={4000}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message")}
            placeholder="What does your business do, and what do you want the website to achieve?"
            className={cn(
              INPUT_CLASS,
              "resize-y",
              errors.message && "border-[#b3261e]",
            )}
          />
          <FieldError id={errorId("message")} message={errors.message} />
        </div>

        {summary ? (
          <p className="text-sm font-medium text-[#b3261e]">{summary}</p>
        ) : null}

        <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="submit"
            size="lg"
            disabled={isSending}
            withArrow={!isSending}
            className="w-full sm:w-auto"
          >
            {isSending ? (
              <>
                <span
                  aria-hidden="true"
                  className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                />
                Sending…
              </>
            ) : (
              "Send Request"
            )}
          </Button>

          <p className="text-[13px] leading-relaxed text-muted">
            Fields marked <span className="text-accent-text">*</span> are
            required.
          </p>
        </div>
      </form>
    </div>
  );
}
