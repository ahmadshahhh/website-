/** Joins class names, dropping falsy values. Avoids a clsx dependency. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
