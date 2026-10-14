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
    role: body.role!.trim(),
    company: body.company?.trim() || "",
    link: body.link?.trim() || "",
    represent: body.represent!.trim(),
    context: body.context?.trim() || "",
    audit: !!body.audit,
    receivedAt: new Date().toISOString(),
  };

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
  } else {
    console.info("[enquiry] received (no ENQUIRY_WEBHOOK_URL configured)", { ...enquiry, email: "[redacted]" });
  }

  return NextResponse.json({ ok: true });
}
