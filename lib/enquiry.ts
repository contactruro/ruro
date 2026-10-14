/* Shared enquiry schema: validated on the client for instant feedback and again on the server. */

export const services = [
  "A personal website from scratch",
  "Rebuilding my current site",
  "An online presence review",
  "Ongoing care for my site",
  "Not sure yet",
] as const;

/* Dial codes offered beside the phone number. India first, the rest by region. */
export const dialCodes = [
  { code: "+91", label: "India (+91)" },
  { code: "+1", label: "United States / Canada (+1)" },
  { code: "+44", label: "United Kingdom (+44)" },
  { code: "+971", label: "UAE (+971)" },
  { code: "+65", label: "Singapore (+65)" },
  { code: "+61", label: "Australia (+61)" },
  { code: "+49", label: "Germany (+49)" },
  { code: "+33", label: "France (+33)" },
  { code: "+966", label: "Saudi Arabia (+966)" },
  { code: "+974", label: "Qatar (+974)" },
  { code: "+60", label: "Malaysia (+60)" },
  { code: "+94", label: "Sri Lanka (+94)" },
  { code: "+977", label: "Nepal (+977)" },
  { code: "+880", label: "Bangladesh (+880)" },
  { code: "+81", label: "Japan (+81)" },
  { code: "+27", label: "South Africa (+27)" },
] as const;

export type Enquiry = {
  name: string;
  email: string;
  /* Dial code, e.g. "+91", and the number without it. The server joins them into one `phone`. */
  dialCode: string;
  phone: string;
  role: string;
  company: string;
  link: string;
  /* What does your company do? */
  business: string;
  /* Which service do they need? One of `services`. */
  service: string;
  /* Honeypot: real people never fill this in. */
  website_confirm?: string;
};

export type Errors = Partial<Record<keyof Enquiry, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEnquiry(e: Partial<Enquiry>): Errors {
  const errors: Errors = {};
  const s = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  if (s(e.name).length < 2) errors.name = "Please enter your name.";
  if (!EMAIL.test(s(e.email))) errors.email = "Please enter a valid email address.";
  const digits = s(e.phone).replace(/[\s\-().]/g, "");
  if (!/^\d{6,14}$/.test(digits)) errors.phone = "Please enter your number without the country code, digits only.";
  if (s(e.role).length < 2) errors.role = "Please tell us your role.";
  if (s(e.link) && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?$/i.test(s(e.link)))
    errors.link = "Please enter a valid web address, or leave this blank.";
  if (s(e.business).length < 2) errors.business = "Please tell us what your company does.";
  if (!services.includes(s(e.service) as (typeof services)[number])) errors.service = "Please choose the service you need.";

  for (const k of ["name", "email", "role", "company", "link"] as const) {
    if (s(e[k]).length > 200) errors[k] = "This is a little long. Please shorten it.";
  }
  if (s(e.business).length > 3000) errors.business = "Please keep this under 3,000 characters.";
  return errors;
}
