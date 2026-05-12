import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group flex flex-col rounded-xl bg-card overflow-hidden border border-border/60 hover:border-primary/30 hover:shadow-soft transition-all"
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex-1 p-5 flex flex-col">
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
          MOQ {product.moq}+
        </div>
        <h3 className="font-serif text-xl text-foreground leading-snug">{product.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
          {product.shortDescription}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-foreground font-medium">
            {product.price}
            <span className="text-xs text-muted-foreground"> /unit</span>
          </div>
          <span className="inline-flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
            View
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
