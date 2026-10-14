/* Shared enquiry schema: validated on the client for instant feedback and again on the server. */

export const contexts = [
  "A new website from scratch",
  "Rebuilding my current site",
  "An online presence review first",
  "Not sure yet",
] as const;

export type Enquiry = {
  name: string;
  email: string;
  role: string;
  company: string;
  link: string;
  represent: string;
  context: string;
  audit: boolean;
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
  if (s(e.role).length < 2) errors.role = "Please tell us your role.";
  if (s(e.link) && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?$/i.test(s(e.link)))
    errors.link = "Please enter a valid web address, or leave this blank.";
  if (s(e.represent).length < 2) errors.represent = "Please tell us a little about what your estate should represent.";
  // Optional, but if given it must be one of the listed options.
  if (s(e.context) && !contexts.includes(s(e.context) as (typeof contexts)[number])) errors.context = "Please choose one of the listed options.";

  for (const k of ["name", "email", "role", "company", "link"] as const) {
    if (s(e[k]).length > 200) errors[k] = "This is a little long. Please shorten it.";
  }
  if (s(e.represent).length > 3000) errors.represent = "Please keep this under 3,000 characters.";
  return errors;
}
