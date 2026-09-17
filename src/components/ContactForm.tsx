"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { Icon } from "@/components/icons";
import { Button, ButtonLink } from "@/components/ui/Button";
import { websiteTypeOptions } from "@/config/services";
import { siteConfig, whatsAppLink } from "@/config/site";
import { submitEnquiry } from "@/lib/actions/contact";
import { initialContactState, type ContactState } from "@/lib/contact-state";
import type { ContactField } from "@/lib/validation";
import { cn } from "@/lib/utils";

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

/** Result banner shown after a submission attempt. */
function ResultPanel({ state }: { state: ContactState }) {
  if (state.status === "idle" || state.status === "invalid") return null;

  if (state.status === "success") {
    return (
      <div className="rounded-card border border-line bg-white p-6 sm:p-8">
        <span className="grid size-11 place-items-center rounded-full bg-ink text-white">
          <Icon name="check" className="size-5" strokeWidth={2.5} />
        </span>
        <h3 className="mt-5 text-xl font-bold tracking-[-0.015em] text-ink">
          Request sent
        </h3>
        <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
          {state.message}
        </p>
      </div>
    );
  }

  // Not connected to an inbox yet, or delivery failed: give the visitor a
  // route that actually works rather than a dead end.
  const isUnconfigured = state.status === "unconfigured";

  return (
    <div className="rounded-card border border-accent/35 bg-accent-soft/60 p-6 sm:p-8">
      <h3 className="text-lg font-bold tracking-[-0.015em] text-ink">
        {isUnconfigured
          ? "Your message was not sent"
          : "Your message could not be sent"}
      </h3>
      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
        {state.message}{" "}
        {isUnconfigured
          ? "Please send your enquiry using one of the options below - we will get it straight away."
          : "Please try again, or use one of the options below."}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <ButtonLink href={whatsAppLink()} size="sm">
          {siteConfig.isWhatsAppConfigured ? (
            <Icon name="whatsapp" className="size-4" />
          ) : null}
          {siteConfig.isWhatsAppConfigured
            ? "Send on WhatsApp"
            : "Contact options"}
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

      {process.env.NODE_ENV === "development" && isUnconfigured ? (
        <p className="mt-5 border-t border-accent/25 pt-4 text-[13px] leading-relaxed text-muted">
          <strong className="font-semibold text-ink">Dev note:</strong> to
          receive these enquiries by email, set{" "}
          <code className="font-mono">RESEND_API_KEY</code>,{" "}
          <code className="font-mono">CONTACT_FROM_EMAIL</code> and{" "}
          <code className="font-mono">CONTACT_TO_EMAIL</code> in{" "}
          <code className="font-mono">.env.local</code>. See{" "}
          <code className="font-mono">src/lib/email.ts</code>.
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitEnquiry,
    initialContactState,
  );
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Lets a "Request a restaurant website" link pre-select the dropdown via
  // ?type=Restaurant.
  //
  // The select is uncontrolled, so this syncs the DOM directly instead of
  // going through state: it keeps the form fully server-rendered (no Suspense
  // boundary, no empty HTML for crawlers or no-JS visitors) and avoids an
  // extra render pass.
  const websiteTypeRef = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    const select = websiteTypeRef.current;
    if (!select || select.value) return;

    const requested = new URLSearchParams(window.location.search).get("type");
    if (requested && (websiteTypeOptions as readonly string[]).includes(requested)) {
      select.value = requested;
    }
  }, []);

  // After a submission, move attention to the outcome: the first invalid field
  // on failure, or the result panel on success.
  useEffect(() => {
    if (state.status === "idle" || state.token === 0) return;

    if (state.status === "invalid") {
      const firstInvalid = Object.keys(state.errors)[0] as
        | ContactField
        | undefined;
      if (firstInvalid) {
        formRef.current
          ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
          ?.focus();
      }
      return;
    }

    resultRef.current?.focus();
  }, [state.status, state.errors, state.token]);

  const errorId = (field: ContactField) => `${formId}-${field}-error`;
  const fieldId = (field: ContactField) => `${formId}-${field}`;
  const describedBy = (field: ContactField) =>
    state.errors[field] ? errorId(field) : undefined;

  if (state.status === "success") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="outline-none"
      >
        <ResultPanel state={state} />
      </div>
    );
  }

  return (
    <div>
      {/* Announces the outcome of a submission to screen readers. */}
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="outline-none empty:hidden"
      >
        {state.status !== "idle" && state.status !== "invalid" ? (
          <div className="mb-6">
            <ResultPanel state={state} />
          </div>
        ) : null}
      </div>

      <form ref={formRef} action={formAction} noValidate className="space-y-5">
        {/* Honeypot - hidden from people, irresistible to bots. */}
        <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
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
              defaultValue={state.values?.fullName ?? ""}
              aria-invalid={Boolean(state.errors.fullName)}
              aria-describedby={describedBy("fullName")}
              placeholder="Your name"
              className={cn(
                INPUT_CLASS,
                state.errors.fullName && "border-[#b3261e]",
              )}
            />
            <FieldError
              id={errorId("fullName")}
              message={state.errors.fullName}
            />
          </div>

          <div>
            <Label htmlFor={fieldId("businessName")}>Business Name</Label>
            <input
              id={fieldId("businessName")}
              name="businessName"
              type="text"
              autoComplete="organization"
              maxLength={120}
              defaultValue={state.values?.businessName ?? ""}
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
              defaultValue={state.values?.businessType ?? ""}
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
              defaultValue={state.values?.email ?? ""}
              aria-invalid={Boolean(state.errors.email)}
              aria-describedby={describedBy("email")}
              placeholder="you@example.com"
              className={cn(
                INPUT_CLASS,
                state.errors.email && "border-[#b3261e]",
              )}
            />
            <FieldError id={errorId("email")} message={state.errors.email} />
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
              defaultValue={state.values?.phone ?? ""}
              aria-invalid={Boolean(state.errors.phone)}
              aria-describedby={describedBy("phone")}
              placeholder="+965 0000 0000"
              className={cn(
                INPUT_CLASS,
                state.errors.phone && "border-[#b3261e]",
              )}
            />
            <FieldError id={errorId("phone")} message={state.errors.phone} />
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
                defaultValue={state.values?.websiteType ?? ""}
                aria-invalid={Boolean(state.errors.websiteType)}
                aria-describedby={describedBy("websiteType")}
                className={cn(
                  INPUT_CLASS,
                  "appearance-none pr-11 text-ink",
                  // Greys the text out while the placeholder option is selected.
                  "[&:has(option[value='']:checked)]:text-muted",
                  state.errors.websiteType && "border-[#b3261e]",
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
              message={state.errors.websiteType}
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
            defaultValue={state.values?.message ?? ""}
            aria-invalid={Boolean(state.errors.message)}
            aria-describedby={describedBy("message")}
            placeholder="What does your business do, and what do you want the website to achieve?"
            className={cn(
              INPUT_CLASS,
              "resize-y",
              state.errors.message && "border-[#b3261e]",
            )}
          />
          <FieldError id={errorId("message")} message={state.errors.message} />
        </div>

        {state.status === "invalid" ? (
          <p className="text-sm font-medium text-[#b3261e]">{state.message}</p>
        ) : null}

        <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="submit"
            size="lg"
            disabled={isPending}
            withArrow={!isPending}
            className="w-full sm:w-auto"
          >
            {isPending ? (
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
            Fields marked <span className="text-accent-text">*</span> are required.
          </p>
        </div>
      </form>
    </div>
  );
}
