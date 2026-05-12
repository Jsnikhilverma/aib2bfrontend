import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { buildWhatsAppLink } from "@/lib/products";
import { WhatsAppButton } from "@/components/whatsapp-button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Quote — Photofinite" },
      { name: "description", content: "Request a quote from Photofinite. Tell us your requirement and we'll respond within hours via WhatsApp." },
      { property: "og:title", content: "Contact Photofinite" },
      { property: "og:description", content: "Request a quote, fast." },
    ],
  }),
  component: ContactPage,
});

const formSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  company: z.string().trim().max(100).optional(),
  product: z.string().trim().min(2).max(150),
  quantity: z.string().trim().min(1).max(20),
  message: z.string().trim().max(1000).optional(),
});

function ContactPage() {
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = formSchema.safeParse({
      name: fd.get("name"),
      company: fd.get("company") || undefined,
      product: fd.get("product"),
      quantity: fd.get("quantity"),
      message: fd.get("message") || undefined,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please fill all required fields");
      return;
    }
    setError(null);
    const d = parsed.data;
    const msg =
      `*New Quote Request — Photofinite*\n\n` +
      `*Name:* ${d.name}\n` +
      (d.company ? `*Company:* ${d.company}\n` : "") +
      `*Product:* ${d.product}\n` +
      `*Quantity:* ${d.quantity}\n` +
      (d.message ? `*Notes:* ${d.message}\n` : "");
    window.open(buildWhatsAppLink(msg), "_blank", "noopener");
  };

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-12 md:py-20">
      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Contact</div>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground text-balance leading-[1.05]">
            Tell us what you need. We'll respond within hours.
          </h1>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Fill the form or message us directly on WhatsApp — whatever's easier. You'll get
            a tailored quote with samples and timeline.
          </p>

          <div className="mt-10 space-y-5">
            {[
              { i: Phone, l: "WhatsApp", v: "+91 98765 43210" },
              { i: Mail, l: "Email", v: "hello@photofinite.in" },
              { i: MapPin, l: "Studio", v: "Mumbai · Pan-India delivery" },
            ].map((c) => (
              <div key={c.l} className="flex items-start gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                  <c.i className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.l}</div>
                  <div className="text-foreground">{c.v}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <WhatsAppButton message="Hi Photofinite, I'd like to request a quote." />
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="lg:col-span-3 rounded-2xl bg-card border border-border/60 p-6 md:p-10 shadow-soft"
        >
          <h2 className="font-serif text-2xl text-foreground">Request a quote</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Submit and we'll continue the conversation on WhatsApp.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Field label="Your name *" name="name" required maxLength={100} />
            <Field label="Company" name="company" maxLength={100} />
            <Field label="Product / category *" name="product" required maxLength={150} placeholder="e.g. Diwali hampers" />
            <Field label="Quantity *" name="quantity" required maxLength={20} placeholder="e.g. 100" />
          </div>
          <div className="mt-5">
            <label className="block text-sm font-medium text-foreground mb-2">
              Notes
            </label>
            <textarea
              name="message"
              rows={4}
              maxLength={1000}
              placeholder="Branding, deadline, delivery cities…"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {error && (
            <p className="mt-4 text-sm text-destructive">{error}</p>
          )}

          <button
            type="submit"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground hover:opacity-90 transition w-full md:w-auto"
          >
            Send via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">{label}</label>
      <input
        {...rest}
        className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
