import { requestCategories, type RequestCategory } from "@/config/services";

/** Shared (client + server) shape and validation for service requests. */
export type ServiceRequestInput = {
  name: string;
  phone: string;
  service: RequestCategory | "";
  location: string;
  description: string;
  preferredTime: string;
};

export type FieldErrors = Partial<Record<keyof ServiceRequestInput, string>>;

export type ServiceRequestState =
  | { status: "idle" }
  | { status: "success"; name: string }
  | { status: "invalid"; fieldErrors: FieldErrors; values: ServiceRequestInput }
  | { status: "not_configured"; values: ServiceRequestInput }
  | { status: "error"; message: string; values: ServiceRequestInput };

export const FIELD_LIMITS = { name: 80, location: 80, description: 1000, preferredTime: 120 } as const;

export function readServiceRequest(form: FormData): ServiceRequestInput {
  const s = (k: string) => String(form.get(k) ?? "").trim();
  return {
    name: s("name"),
    phone: s("phone"),
    service: s("service") as ServiceRequestInput["service"],
    location: s("location"),
    description: s("description"),
    preferredTime: s("preferredTime"),
  };
}

export const phoneDigits = (phone: string) => {
  const d = phone.replace(/\D/g, "");
  return d.length === 11 && d.startsWith("1") ? d.slice(1) : d;
};

export const isEmergencyCategory = (value: string) =>
  requestCategories.some((c) => c.value === value && c.emergency);

export function validateServiceRequest(v: ServiceRequestInput): FieldErrors {
  const e: FieldErrors = {};
  if (v.name.length < 2) e.name = "Please enter your name.";
  else if (v.name.length > FIELD_LIMITS.name) e.name = "Please shorten your name.";

  if (!v.phone) e.phone = "Please enter a phone number so we can call you back.";
  else if (phoneDigits(v.phone).length !== 10) e.phone = "Enter a 10-digit phone number, e.g. 555-123-4567.";

  if (!requestCategories.some((c) => c.value === v.service)) e.service = "Please choose the service you need.";

  if (v.location.length < 3) e.location = "Enter your ZIP code or the address/area where you need help.";
  else if (v.location.length > FIELD_LIMITS.location) e.location = "Please shorten the location.";

  if (v.description.length < 5) e.description = "Briefly describe the problem (a few words is fine).";
  else if (v.description.length > FIELD_LIMITS.description)
    e.description = `Please keep it under ${FIELD_LIMITS.description} characters.`;

  if (v.preferredTime.length > FIELD_LIMITS.preferredTime) e.preferredTime = "Please shorten this.";
  return e;
}
