import { Link } from "@tanstack/react-router";
import { BRAND, categories } from "@/lib/products";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-gold text-gold-foreground font-serif text-lg">
              P
            </span>
            <div className="font-serif text-2xl">{BRAND}</div>
          </div>
          <p className="mt-4 max-w-md text-sm text-primary-foreground/75 leading-relaxed">
            Premium corporate gifts and personalized photo products, curated and crafted
            for brands that care about every detail.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-4">Categories</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/75">
            {categories.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link
                  to="/products/$slug"
                  params={{ slug: c.slug }}
                  className="hover:text-gold transition-colors"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/75">
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link to="/products" className="hover:text-gold">Catalog</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} {BRAND}. All rights reserved.</p>
          <p>Crafted with care · Made in India</p>
        </div>
      </div>
    </footer>
  );
}
