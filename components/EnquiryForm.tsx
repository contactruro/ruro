"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { dialCodes, services, validateEnquiry, type Enquiry, type Errors } from "@/lib/enquiry";
import { EASE } from "./ui/Reveal";
import { site, studio } from "@/lib/site";
import { track } from "@/lib/analytics";

const empty: Enquiry = { name: "", email: "", dialCode: "+91", phone: "", role: "", company: "", link: "", business: "", service: "", website_confirm: "" };

const fieldBase =
  "w-full rounded-xl border bg-paper px-4 py-3 text-base text-ink placeholder:text-ink/55 transition-[border-color,box-shadow] duration-300 focus:outline-none focus:ring-2 focus:ring-accent/40";

export function EnquiryForm({ audit = false }: { audit?: boolean }) {
  const [data, setData] = useState<Enquiry>({ ...empty, service: audit ? services[2] : "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const started = useRef(false);
  const onStart = () => {
    if (started.current) return;
    started.current = true;
    track("form_start", { audit });
  };

  const set = <K extends keyof Enquiry>(k: K, v: Enquiry[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateEnquiry(data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      // Field names only, never the values people typed.
      track("form_error", { fields: Object.keys(errs).join(",") });
      const first = Object.keys(errs)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        if (json.errors) setErrors(json.errors);
        setMessage(json.message || "Your enquiry could not be sent. Please try again.");
        setStatus("error");
        return;
      }
      track("form_submit_success", { service: data.service });
      setStatus("sent");
    } catch {
      setMessage("Connection failed. Please check your connection and try again.");
      setStatus("error");
    }
  };

  const field = (k: keyof Enquiry, label: string, opts: { type?: string; placeholder?: string; optional?: boolean; autoComplete?: string; hint?: string } = {}) => (
    <div>
      <label htmlFor={`f-${k}`} className="flex items-baseline justify-between gap-3 text-base font-semibold text-ink">
        {label}
        {opts.optional && <span className="text-xs font-normal text-ink/65">Optional</span>}
      </label>
      {opts.hint && <p id={`h-${k}`} className="mt-1 text-sm leading-snug text-ink/65">{opts.hint}</p>}
      <input
        id={`f-${k}`}
        name={k}
        type={opts.type || "text"}
        autoComplete={opts.autoComplete}
        placeholder={opts.placeholder}
        value={data[k] as string}
        onChange={(e) => set(k, e.target.value as never)}
        aria-invalid={!!errors[k]}
        aria-describedby={[opts.hint ? `h-${k}` : "", errors[k] ? `e-${k}` : ""].filter(Boolean).join(" ") || undefined}
        className={`${fieldBase} mt-3 ${errors[k] ? "border-danger" : "border-ink/15 hover:border-ink/30"}`}
      />
      {errors[k] && (
        <p id={`e-${k}`} className="mt-2 flex items-center gap-1.5 text-sm text-danger">
          <WarningCircle aria-hidden weight="bold" className="size-4 shrink-0" />
          {errors[k]}
        </p>
      )}
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="tone-mint rounded-3xl bg-tone p-8 text-ink md:p-12"
          role="status"
        >
          <CheckCircle aria-hidden className="size-10 text-accent-soft" weight="light" />
          <p className="display mt-6 text-4xl md:text-5xl">Thank you, {data.name.split(" ")[0]}.</p>
          <p className="mt-4 max-w-md text-lg text-ink/80">
            Your enquiry has reached the studio. We read every one personally and will reply
            {studio.replyWithin ? ` within ${studio.replyWithin}` : " by email"} to {data.email}.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          onFocus={onStart}
          noValidate
          data-clarity-mask="true"
          className="flex flex-col gap-6"
          exit={{ opacity: 0 }}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {field("name", "Name", { autoComplete: "name", hint: "Your full name, so we know who to write to." })}
            {field("email", "Email", { type: "email", autoComplete: "email", hint: "Where we will send our reply." })}
            {field("role", "Role", { placeholder: "Founder, CEO, MD…", autoComplete: "organization-title", hint: "What you do: founder, CEO, MD, creator, banker, or anything else." })}
            {field("company", "Company", { optional: true, autoComplete: "organization", hint: "The name of your company or brand." })}
          </div>
          {field("link", "Company website", { optional: true, placeholder: "yourcompany.com", type: "url", hint: "Paste the link to your company's website, so we can see your work." })}

          <div>
            <label htmlFor="f-phone" className="text-base font-semibold text-ink">
              Phone number with country code
            </label>
            <p id="h-phone" className="mt-1 text-sm leading-snug text-ink/65">Choose your country code first, then type your number.</p>
            <div className="mt-3 flex gap-2">
              <select
                aria-label="Country code"
                name="dialCode"
                autoComplete="tel-country-code"
                value={data.dialCode}
                onChange={(e) => set("dialCode", e.target.value)}
                className={`${fieldBase} w-32 shrink-0 border-ink/15 px-3 hover:border-ink/30 sm:w-44`}
              >
                {dialCodes.map((d) => (
                  <option key={d.code} value={d.code}>
                    {d.label}
                  </option>
                ))}
              </select>
              <input
                id="f-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="98765 43210"
                value={data.phone}
                onChange={(e) => set("phone", e.target.value)}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "h-phone e-phone" : "h-phone"}
                className={`${fieldBase} min-w-0 flex-1 ${errors.phone ? "border-danger" : "border-ink/15 hover:border-ink/30"}`}
              />
            </div>
            {errors.phone && (
              <p id="e-phone" className="mt-2 flex items-center gap-1.5 text-sm text-danger">
                <WarningCircle aria-hidden weight="bold" className="size-4 shrink-0" />
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="f-business" className="text-base font-semibold text-ink">
              What does your company do?
            </label>
            <p id="h-business" className="mt-1 text-sm leading-snug text-ink/65">A line or two: what you make or sell, and who it is for.</p>
            <textarea
              id="f-business"
              name="business"
              rows={4}
              value={data.business}
              onChange={(e) => set("business", e.target.value)}
              placeholder="In a sentence or two: what you build or sell, and for whom."
              aria-invalid={!!errors.business}
              aria-describedby={errors.business ? "h-business e-business" : "h-business"}
              className={`${fieldBase} mt-3 resize-y ${errors.business ? "border-danger" : "border-ink/15 hover:border-ink/30"}`}
            />
            {errors.business && (
              <p id="e-business" className="mt-2 flex items-center gap-1.5 text-sm text-danger">
                <WarningCircle aria-hidden weight="bold" className="size-4 shrink-0" />
                {errors.business}
              </p>
            )}
          </div>

          <fieldset aria-describedby={errors.service ? "e-service" : undefined}>
            <legend className="text-base font-semibold text-ink">What service do you expect from us?</legend>
            <p className="mt-1 text-sm leading-snug text-ink/65">Pick the one that is closest. We can change it together later.</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {services.map((c, i) => (
                <label
                  key={c}
                  className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-base transition-colors duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/50 ${
                    data.service === c ? "border-oxblood bg-oxblood text-paper" : "border-ink/15 bg-paper hover:border-ink/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="service"
                    value={c}
                    checked={data.service === c}
                    onChange={() => set("service", c)}
                    className="sr-only"
                    id={i === 0 ? "f-service" : undefined}
                  />
                  <span aria-hidden className={`size-3 shrink-0 rounded-full border ${data.service === c ? "border-saffron-soft bg-saffron-soft" : "border-ink/40"}`} />
                  {c}
                </label>
              ))}
            </div>
            {errors.service && (
              <p id="e-service" className="mt-2 flex items-center gap-1.5 text-sm text-danger">
                <WarningCircle aria-hidden weight="bold" className="size-4 shrink-0" />
                {errors.service}
              </p>
            )}
          </fieldset>

          {/* Honeypot */}
          <div aria-hidden className="absolute -left-[9999px] h-0 overflow-hidden">
            <label>
              Leave empty
              <input tabIndex={-1} autoComplete="off" value={data.website_confirm} onChange={(e) => set("website_confirm", e.target.value)} />
            </label>
          </div>

          {status === "error" && (
            <p role="alert" className="rounded-xl border border-danger/40 bg-danger/5 px-4 py-3 text-sm text-danger">
              {message} You can also write to{" "}
              <a className="underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <p className="max-w-xs text-sm text-ink/65">
              We use these details only to reply to you. Nothing is shared.
              {studio.replyWithin && <> We reply within {studio.replyWithin}.</>}
            </p>
            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex min-h-14 items-center gap-3 rounded-full bg-ink px-8 font-mono text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-paper transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-accent active:scale-[0.97] disabled:cursor-wait disabled:opacity-70"
            >
              {status === "sending" ? "Sending…" : "Send enquiry"}
              <ArrowUpRight aria-hidden weight="bold" className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
