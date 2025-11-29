export type SerializationMode = "basic" | "detailed" | "iso" | "short";

export interface SerializeDateOptions {
  serialization?: SerializationMode;
  dateString?: string | Date | null;
  now?: boolean;
  locale?: string;
}

export function serializeDate(
  options: Omit<SerializeDateOptions, "serialization"> & {
    serialization: "iso" | "detailed" | "short";
  }
): string;

export function serializeDate(
  options?: Omit<SerializeDateOptions, "serialization"> & { serialization?: "basic" }
): Date;

export function serializeDate(options: SerializeDateOptions = {}): string | Date {
  const { serialization = "basic", now = false, dateString, locale = "es-ES" } = options;

  // 1. Resolver fecha
  let date = now || !dateString ? new Date() : new Date(dateString);

  // 2. Validación
  if (isNaN(date.getTime())) {
    date = new Date();
  }

  // 3. Formateo
  switch (serialization) {
    case "iso":
      return date.toISOString(); // Retorna string (OK)

    case "detailed":
      return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      }).format(date); // Retorna string (OK)

    case "short":
      return new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date); // Retorna string (OK)

    case "basic":
    default:
      return date; // Retorna Date (OK)
  }
}
