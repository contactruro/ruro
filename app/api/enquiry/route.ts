import { NextResponse } from "next/server";
import { validateEnquiry, type Enquiry } from "@/lib/enquiry";

export async function POST(req: Request) {
  let body: Partial<Enquiry>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "We could not read that submission. Please try again." }, { status: 400 });
  }

  // Bots fill every field. Pretend success so they learn nothing.
  if (body.website_confirm) return NextResponse.json({ ok: true });

  const errors = validateEnquiry(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors, message: "Some details need attention." }, { status: 422 });
  }

  const enquiry = {
    name: body.name!.trim(),
    email: body.email!.trim(),
    phone: `${(body.dialCode || "").trim()} ${body.phone!.replace(/[^\d]/g, "")}`.trim(),
    role: body.role!.trim(),
    company: body.company?.trim() || "",
    link: body.link?.trim() || "",
    business: body.business!.trim(),
    service: body.service!.trim(),
    receivedAt: new Date().toISOString(),
  };

  // Google Form: GOOGLE_FORM_URL is the form's ".../formResponse" address and GOOGLE_FORM_FIELDS maps each enquiry
  // field to its entry id, e.g. {"name":"entry.123","email":"entry.456"}. Google answers with a redirect, so any
  // response under 400 counts as received.
  const formUrl = process.env.GOOGLE_FORM_URL;
  let formFields: Record<string, string> = {};
  try {
    formFields = JSON.parse(process.env.GOOGLE_FORM_FIELDS || "{}");
  } catch {
    console.error("[enquiry] GOOGLE_FORM_FIELDS is not valid JSON");
  }
  let delivered = false;
  if (formUrl && Object.keys(formFields).length) {
    const params = new URLSearchParams();
    for (const [key, entry] of Object.entries(formFields)) {
      const value = (enquiry as Record<string, unknown>)[key];
      if (value !== undefined && value !== "") params.set(entry, String(value));
    }
    try {
      const res = await fetch(formUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
        redirect: "manual",
      });
      if (res.status >= 400) throw new Error(`Google Form responded ${res.status}`);
      delivered = true;
    } catch (err) {
      console.error("[enquiry] Google Form delivery failed", err);
      return NextResponse.json(
        { ok: false, message: "Your enquiry could not be delivered just now. Please try again, or email us directly." },
        { status: 502 },
      );
    }
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiry),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("[enquiry] delivery failed", err);
      return NextResponse.json(
        { ok: false, message: "Your enquiry could not be delivered just now. Please try again, or email us directly." },
        { status: 502 },
      );
    }
  } else if (!delivered) {
    console.info("[enquiry] received (no ENQUIRY_WEBHOOK_URL configured)", { ...enquiry, email: "[redacted]" });
  }

  return NextResponse.json({ ok: true });
}
