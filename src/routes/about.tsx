import { createFileRoute } from "@tanstack/react-router";
import { Award, Heart, Sparkles, Truck } from "lucide-react";
import { WhatsAppButton } from "@/components/whatsapp-button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Photofinite" },
      { name: "description", content: "Photofinite curates premium corporate gifts and personalized photo products for brands across India." },
      { property: "og:title", content: "About Photofinite" },
      { property: "og:description", content: "Premium corporate gifts & personalized photo products." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-12 md:py-20">
      <div className="max-w-3xl">
        <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3">About</div>
        <h1 className="font-serif text-5xl md:text-6xl text-foreground text-balance leading-[1.05]">
          A small studio with a big obsession — gifting done right.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Photofinite started with one belief: a great gift should feel personal, never generic.
          We curate, customize and deliver corporate gifts and photo products for brands that want
          to be remembered — not forgotten in a drawer.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-4">
        {[
          { i: Sparkles, t: "Curated Selection", d: "Hand-picked products from trusted artisans and manufacturers." },
          { i: Heart, t: "Personal Touch", d: "Engraving, foil-stamping, custom packaging — your brand, every detail." },
          { i: Truck, t: "Pan-India Delivery", d: "Bulk shipping to multiple addresses with tracking." },
          { i: Award, t: "Quality Promise", d: "Every order quality-checked before it leaves our studio." },
        ].map((b) => (
          <div key={b.t} className="rounded-xl bg-card border border-border/60 p-6">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
              <b.i className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-serif text-xl text-foreground">{b.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 rounded-3xl bg-primary text-primary-foreground p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="font-serif text-3xl md:text-4xl">Have a gifting requirement?</h2>
          <p className="mt-2 text-primary-foreground/80">
            Tell us about your event, audience, and budget — we'll send a curated proposal within hours.
          </p>
        </div>
        <WhatsAppButton message="Hi Photofinite, I'd like to discuss a gifting requirement." />
      </div>
    </div>
  );
}
