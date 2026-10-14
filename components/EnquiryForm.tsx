"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { contexts, validateEnquiry, type Enquiry, type Errors } from "@/lib/enquiry";
import { EASE } from "./ui/Reveal";
import { site, studio } from "@/lib/site";
import { track } from "@/lib/analytics";

const empty: Enquiry = { name: "", email: "", role: "", company: "", link: "", represent: "", context: "", audit: false, website_confirm: "" };

const fieldBase =
  "w-full rounded-xl border bg-paper px-4 py-3 text-base text-ink placeholder:text-ink/55 transition-[border-color,box-shadow] duration-300 focus:outline-none focus:ring-2 focus:ring-accent/40";

export function EnquiryForm({ audit = false }: { audit?: boolean }) {
  const [data, setData] = useState<Enquiry>({ ...empty, audit, context: audit ? contexts[2] : "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const started = useRef(false);
  const onStart = () => {
    if (started.current) return;
    started.current = true;
    track("form_start", { audit: data.audit });
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
      track("form_submit_success", { audit: data.audit, context: data.context || "none" });
      setStatus("sent");
    } catch {
      setMessage("Connection failed. Please check your connection and try again.");
      setStatus("error");
    }
  };

  const field = (k: keyof Enquiry, label: string, opts: { type?: string; placeholder?: string; optional?: boolean; autoComplete?: string } = {}) => (
    <div>
      <label htmlFor={`f-${k}`} className="flex items-baseline justify-between text-sm font-medium text-ink">
        {label}
        {opts.optional && <span className="text-xs font-normal text-ink/65">Optional</span>}
      </label>
      <input
        id={`f-${k}`}
        name={k}
        type={opts.type || "text"}
        autoComplete={opts.autoComplete}
        placeholder={opts.placeholder}
        value={data[k] as string}
        onChange={(e) => set(k, e.target.value as never)}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `e-${k}` : undefined}
        className={`${fieldBase} mt-2 ${errors[k] ? "border-danger" : "border-ink/15 hover:border-ink/30"}`}
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
            {field("name", "Name", { autoComplete: "name" })}
            {field("email", "Email", { type: "email", autoComplete: "email" })}
            {field("role", "Role", { placeholder: "Founder, partner, CEO…", autoComplete: "organization-title" })}
            {field("company", "Company", { optional: true, autoComplete: "organization" })}
          </div>
          {field("link", "Website or LinkedIn", { optional: true, placeholder: "linkedin.com/in/…", type: "url" })}

          <fieldset aria-describedby={errors.context ? "e-context" : undefined}>
            <legend className="flex w-full items-baseline justify-between text-sm font-medium text-ink">
              Where are you starting?
              <span className="text-xs font-normal text-ink/65">Optional</span>
            </legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {contexts.map((c) => (
                <label
                  key={c}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-base transition-colors duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent/50 ${
                    data.context === c ? "border-oxblood bg-oxblood text-paper" : "border-ink/15 bg-paper hover:border-ink/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="context"
                    value={c}
                    checked={data.context === c}
                    onChange={() => {
                      set("context", c);
                      if (c === contexts[2]) set("audit", true);
                    }}
                    className="sr-only"
                    id={c === contexts[0] ? "f-context" : undefined}
                  />
                  <span aria-hidden className={`size-3 shrink-0 rounded-full border ${data.context === c ? "border-saffron-soft bg-saffron-soft" : "border-ink/40"}`} />
                  {c}
                </label>
              ))}
            </div>
            {errors.context && (
              <p id="e-context" className="mt-2 flex items-center gap-1.5 text-sm text-danger">
                <WarningCircle aria-hidden weight="bold" className="size-4 shrink-0" />
                {errors.context}
              </p>
            )}
          </fieldset>

          <div>
            <label htmlFor="f-represent" className="text-sm font-medium text-ink">
              What should your site say about you?
            </label>
            <textarea
              id="f-represent"
              name="represent"
              rows={5}
              value={data.represent}
              onChange={(e) => set("represent", e.target.value)}
              placeholder="Your work, your companies, and who looks you up…"
              aria-invalid={!!errors.represent}
              aria-describedby={errors.represent ? "e-represent" : undefined}
              className={`${fieldBase} mt-2 resize-y ${errors.represent ? "border-danger" : "border-ink/15 hover:border-ink/30"}`}
            />
            {errors.represent && (
              <p id="e-represent" className="mt-2 flex items-center gap-1.5 text-sm text-danger">
                <WarningCircle aria-hidden weight="bold" className="size-4 shrink-0" />
                {errors.represent}
              </p>
            )}
          </div>

          <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-accent/30 bg-accent-tint p-5">
            <input
              type="checkbox"
              checked={data.audit}
              onChange={(e) => set("audit", e.target.checked)}
              className="mt-1 size-5 shrink-0 accent-accent"
            />
            <span>
              <span className="block font-semibold text-ink">Include an online presence review</span>
              <span className="mt-1 block text-sm text-ink/70">
                A short report on what people find when they search your name, and the three things to fix first.
              </span>
            </span>
          </label>

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
