import type { ContactValues, FieldErrors } from "@/lib/validation";

/**
 * Shape of the contact form's action state.
 *
 * This lives outside the "use server" module on purpose: a server-action file
 * may only export async functions, so the initial state constant cannot be
 * declared alongside the action itself.
 */
export type ContactStatus =
  | "idle"
  /** Validated and delivered to the inbox. */
  | "success"
  /** Validation failed - see `errors`. */
  | "invalid"
  /** Something went wrong server-side, or the rate limit was hit. */
  | "error";

export type ContactState = {
  status: ContactStatus;
  message: string;
  errors: FieldErrors;
  /** Echoed back so the form keeps what the visitor typed after an error. */
  values: ContactValues | null;
  /** Changes on every submission so the client can react to repeat results. */
  token: number;
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
  errors: {},
  values: null,
  token: 0,
};
