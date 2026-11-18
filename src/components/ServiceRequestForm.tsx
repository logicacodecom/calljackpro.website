"use client";

import { startTransition, useActionState, useRef, useState, type FormEvent } from "react";
import { CircleAlert, CircleCheck, LoaderCircle, Phone, Send, TriangleAlert } from "lucide-react";
import { submitServiceRequest } from "@/app/actions/service-request";
import { business } from "@/config/business";
import { requestCategories } from "@/config/services";
import {
  FIELD_LIMITS,
  isEmergencyCategory,
  validateServiceRequest,
  type FieldErrors,
  type ServiceRequestInput,
  type ServiceRequestState,
} from "@/lib/service-request";
import { Button } from "@/components/ui/button";
import { CallButton } from "@/components/PrimaryCTA";
import { cn } from "@/lib/utils";

const empty: ServiceRequestInput = {
  name: "",
  phone: "",
  service: "",
  location: "",
  description: "",
  preferredTime: "",
};

const fieldOrder: (keyof ServiceRequestInput)[] = ["name", "phone", "service", "location", "description", "preferredTime"];

const inputClass =
  "mt-1.5 block w-full min-h-12 rounded-xl border-2 border-ink/70 bg-paper px-3.5 py-2.5 text-base text-ink placeholder:text-ink/45 focus:border-ink aria-[invalid=true]:border-ink aria-[invalid=true]:bg-cream";

function Field({
  id,
  label,
  hint,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-bold">
        {label}
        {optional ? <span className="ml-1 font-normal text-muted">(optional)</span> : <span aria-hidden> *</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm font-bold text-ink">
          <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export function ServiceRequestForm({
  deliveryConfigured,
  defaultService = "",
}: {
  /** Whether a lead-delivery provider is configured on the server. */
  deliveryConfigured: boolean;
  defaultService?: ServiceRequestInput["service"];
}) {
  const [state, formAction, pending] = useActionState<ServiceRequestState, FormData>(submitServiceRequest, {
    status: "idle",
  });
  const [values, setValues] = useState<ServiceRequestInput>({ ...empty, service: defaultService });
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  /** When the visitor first interacted with the form (spam time-trap). */
  const startedAt = useRef(0);

  const serverErrors = state.status === "invalid" ? state.fieldErrors : {};
  const errors: FieldErrors = touched ? clientErrors : serverErrors;
  const emergency = isEmergencyCategory(values.service);

  const update = (key: keyof ServiceRequestInput) => (e: { target: { value: string } }) => {
    if (!startedAt.current) startedAt.current = Date.now();
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    if (touched) setClientErrors(validateServiceRequest(next));
  };

  const describedBy = (key: keyof ServiceRequestInput, hint = false) =>
    [hint && `${key}-hint`, errors[key] && `${key}-error`].filter(Boolean).join(" ") || undefined;

  // With JS we validate first and dispatch the action manually (this also
  // avoids React's automatic form reset, so values survive an error). Without
  // JS the native form action still posts to the server action.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateServiceRequest(values);
    setTouched(true);
    setClientErrors(found);
    const first = fieldOrder.find((k) => found[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const data = new FormData(e.currentTarget);
    data.set("startedAt", String(startedAt.current));
    startTransition(() => formAction(data));
  }

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-[var(--radius-card)] border-2 border-ink bg-cream p-6 sm:p-8">
        <CircleCheck aria-hidden className="size-10" />
        <h3 className="mt-2 font-heading text-2xl sm:text-3xl">Thanks, {state.name} — request received.</h3>
        <p className="mt-2 text-lg">
          Jack will call you back at the number you provided. If you&rsquo;re locked out or it&rsquo;s urgent,
          please call now instead of waiting.
        </p>
        <CallButton showNumber size="lg" className="mt-5" />
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      aria-describedby="form-required-note"
      className="space-y-5"
    >
      {!deliveryConfigured && (
        <div role="note" className="flex gap-3 rounded-xl border-2 border-dashed border-ink bg-mist p-4 text-sm">
          <TriangleAlert aria-hidden className="size-5 shrink-0" />
          <p>
            <strong>Online requests are not connected yet.</strong> This form needs a delivery integration
            (see README → &ldquo;Service request form&rdquo;) before it can accept requests. Please call{" "}
            <a href={business.phone.href} className="font-bold underline">
              {business.phone.display}
            </a>
            .
          </p>
        </div>
      )}

      <p id="form-required-note" className="text-sm text-muted">
        Fields marked * are required. We only use your details to respond to this request.
      </p>

      {/* Spam protection: honeypot (hidden from people & assistive tech) + fill-time check */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input
            id="name"
            name="name"
            className={inputClass}
            autoComplete="name"
            maxLength={FIELD_LIMITS.name}
            value={values.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            required
          />
        </Field>
        <Field id="phone" label="Phone number" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            className={inputClass}
            autoComplete="tel"
            placeholder="555-123-4567"
            value={values.phone}
            onChange={update("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone")}
            required
          />
        </Field>
      </div>

      <Field id="service" label="Service needed" error={errors.service}>
        <select
          id="service"
          name="service"
          className={cn(inputClass, "appearance-none bg-[length:1.25rem] bg-[right_0.9rem_center] bg-no-repeat pr-10")}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23111' stroke-width='3'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          }}
          value={values.service}
          onChange={update("service")}
          aria-invalid={Boolean(errors.service)}
          aria-describedby={describedBy("service")}
          required
        >
          <option value="" disabled>
            Choose a service…
          </option>
          {requestCategories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </Field>

      {emergency && (
        <div role="alert" className="rounded-xl border-2 border-ink bg-brand p-4">
          <p className="font-heading text-lg leading-tight">Locked out right now? Calling is the fastest way to get help.</p>
          <p className="mt-1 text-sm">Online requests are answered by call-back — for an active lockout, please call.</p>
          <a
            href={business.phone.href}
            className="mt-3 inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-ink bg-paper px-4 font-display font-bold italic"
          >
            <Phone aria-hidden className="size-5" fill="currentColor" strokeWidth={1.5} />
            Call {business.phone.display}
          </a>
        </div>
      )}

      <Field id="location" label="ZIP code or service location" hint="ZIP code, street, or neighborhood." error={errors.location}>
        <input
          id="location"
          name="location"
          className={inputClass}
          autoComplete="postal-code"
          maxLength={FIELD_LIMITS.location}
          value={values.location}
          onChange={update("location")}
          aria-invalid={Boolean(errors.location)}
          aria-describedby={describedBy("location", true)}
          required
        />
      </Field>

      <Field id="description" label="Brief problem description" error={errors.description}>
        <textarea
          id="description"
          name="description"
          rows={3}
          className={cn(inputClass, "min-h-24 resize-y")}
          maxLength={FIELD_LIMITS.description}
          placeholder={emergency ? "e.g. Locked out of my front door, keys inside" : "e.g. Mount a 55\" TV and assemble a bookshelf"}
          value={values.description}
          onChange={update("description")}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={describedBy("description")}
          required
        />
      </Field>

      {!emergency && (
        <Field
          id="preferredTime"
          label="Preferred time"
          optional
          hint="For non-emergency work, e.g. “weekday mornings” or “Saturday”."
          error={errors.preferredTime}
        >
          <input
            id="preferredTime"
            name="preferredTime"
            className={inputClass}
            maxLength={FIELD_LIMITS.preferredTime}
            value={values.preferredTime}
            onChange={update("preferredTime")}
            aria-invalid={Boolean(errors.preferredTime)}
            aria-describedby={describedBy("preferredTime", true)}
          />
        </Field>
      )}

      <div aria-live="polite">
        {state.status === "not_configured" && (
          <p role="alert" className="flex gap-2 rounded-xl border-2 border-ink bg-cream p-4 font-semibold">
            <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0" />
            <span>
              Your request was <strong>not sent</strong> — online requests aren&rsquo;t connected yet. Please call{" "}
              <a href={business.phone.href} className="underline">
                {business.phone.display}
              </a>{" "}
              and we&rsquo;ll help right away.
            </span>
          </p>
        )}
        {state.status === "error" && (
          <p role="alert" className="flex gap-2 rounded-xl border-2 border-ink bg-cream p-4 font-semibold">
            <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0" />
            <span>
              {state.message}{" "}
              <a href={business.phone.href} className="underline">
                {business.phone.display}
              </a>
            </span>
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" variant="dark" size="lg" disabled={pending} className="w-full sm:w-auto">
          {pending ? <LoaderCircle aria-hidden className="animate-spin" /> : <Send aria-hidden />}
          {pending ? "Sending…" : "Send Request"}
        </Button>
        <p className="text-sm text-muted">
          Emergency? <a href={business.phone.href} className="font-bold text-ink underline">Call {business.phone.display}</a>
        </p>
      </div>
    </form>
  );
}
