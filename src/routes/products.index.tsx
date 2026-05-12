import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Catalog — Photofinite Corporate Gifts & Photo Products" },
      {
        name: "description",
        content:
          "Browse our full catalog of premium corporate gifts, festive hampers, drinkware, stationery, awards and personalized photo products.",
      },
      { property: "og:title", content: "Photofinite Catalog" },
      {
        property: "og:description",
        content: "Premium corporate gifts & personalized photo products.",
      },
    ],
  }),
  component: CatalogPage,
});

function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRating, setSelectedRating] = useState("any");
  const [sortBy, setSortBy] = useState("featured");

  // FILTER PRODUCTS
  const filteredProducts = useMemo(() => {
    let updatedProducts = [...products];

    // CATEGORY FILTER
    if (selectedCategory !== "all") {
      updatedProducts = updatedProducts.filter(
        (p: any) =>
          p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // RATING FILTER
    if (selectedRating === "4+") {
      updatedProducts = updatedProducts.filter(
        (p: any) => (p.rating || 0) >= 4
      );
    }

    if (selectedRating === "4.5+") {
      updatedProducts = updatedProducts.filter(
        (p: any) => (p.rating || 0) >= 4.5
      );
    }

    // SORTING
    if (sortBy === "low") {
      updatedProducts.sort(
        (a: any, b: any) => (a.price || 0) - (b.price || 0)
      );
    }

    if (sortBy === "high") {
      updatedProducts.sort(
        (a: any, b: any) => (b.price || 0) - (a.price || 0)
      );
    }

    if (sortBy === "top") {
      updatedProducts.sort(
        (a: any, b: any) => (b.rating || 0) - (a.rating || 0)
      );
    }

    return updatedProducts;
  }, [selectedCategory, selectedRating, sortBy]);

  // RESET FILTERS
  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedRating("any");
    setSortBy("featured");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-14">
      {/* Header */}
      <div className="text-[11px] uppercase tracking-[0.22em] text-primary mb-2">
        Catalog
      </div>

      {/* <h1 className="font-serif text-3xl md:text-5xl text-foreground max-w-3xl leading-tight">
        Every gift, curated. Every detail, considered.
      </h1> */}

      {/* <p className="mt-3 max-w-2xl text-sm md:text-base text-muted-foreground">
        Browse our full range. Tap any product to see details, or enquire
        directly on WhatsApp.
      </p> */}

      {/* MAIN LAYOUT */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
        
        {/* FILTER SIDEBAR */}
        <aside className="h-fit rounded-2xl border border-border bg-card p-5 sticky top-24">
          
          {/* CATEGORY */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-semibold mb-4">
              Category
            </h3>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                  selectedCategory === "all"
                    ? "bg-black text-white"
                    : "border border-border bg-background"
                }`}
              >
                ALL
              </button>

              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setSelectedCategory(c.name)}
                  className={`rounded-full px-4 py-2 text-xs transition ${
                    selectedCategory === c.name
                      ? "bg-black text-white"
                      : "border border-border bg-background text-foreground"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* SIZE */}
          <div className="mt-7 border-t border-border pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[11px] uppercase tracking-[0.22em] font-semibold">
                Size
              </h3>

              <span className="text-sm">⌃</span>
            </div>

            <div className="space-y-3">
              {["Small", "Medium", "Large", "XL"].map((size) => (
                <label
                  key={size}
                  className="flex items-center gap-2.5 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="size"
                    className="h-4 w-4 accent-black"
                  />

                  <span className="text-sm">{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* COLOR */}
          <div className="mt-7 border-t border-border pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[11px] uppercase tracking-[0.22em] font-semibold">
                Color
              </h3>

              <span className="text-sm">⌃</span>
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                "bg-black",
                "bg-red-900",
                "bg-red-500",
                "bg-pink-300",
                "bg-sky-300",
              ].map((color, i) => (
                <button
                  key={i}
                  className={`h-8 w-8 rounded-full border border-border ${color}`}
                />
              ))}
            </div>
          </div>

          {/* RATING */}
          <div className="mt-7">
            <h3 className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-semibold mb-4">
              Rating
            </h3>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedRating("any")}
                className={`rounded-full px-4 py-2 text-xs transition ${
                  selectedRating === "any"
                    ? "bg-black text-white"
                    : "border border-border"
                }`}
              >
                Any
              </button>

              <button
                onClick={() => setSelectedRating("4+")}
                className={`rounded-full px-4 py-2 text-xs transition ${
                  selectedRating === "4+"
                    ? "bg-black text-white"
                    : "border border-border"
                }`}
              >
                4+
              </button>

              <button
                onClick={() => setSelectedRating("4.5+")}
                className={`rounded-full px-4 py-2 text-xs transition ${
                  selectedRating === "4.5+"
                    ? "bg-black text-white"
                    : "border border-border"
                }`}
              >
                4.5+
              </button>
            </div>
          </div>

          {/* SORT */}
          <div className="mt-7">
            <h3 className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-semibold mb-4">
              Sort By
            </h3>

            <div className="space-y-3">
              <button
                onClick={() => setSortBy("featured")}
                className={`w-full text-left px-4 py-3 text-sm rounded-md transition ${
                  sortBy === "featured"
                    ? "bg-[#3d2922] text-white"
                    : "border border-border"
                }`}
              >
                Featured
              </button>

              <button
                onClick={() => setSortBy("low")}
                className={`w-full text-left px-4 py-3 text-sm rounded-md transition ${
                  sortBy === "low"
                    ? "bg-[#3d2922] text-white"
                    : "border border-border"
                }`}
              >
                Price: Low to High
              </button>

              <button
                onClick={() => setSortBy("high")}
                className={`w-full text-left px-4 py-3 text-sm rounded-md transition ${
                  sortBy === "high"
                    ? "bg-[#3d2922] text-white"
                    : "border border-border"
                }`}
              >
                Price: High to Low
              </button>

              <button
                onClick={() => setSortBy("top")}
                className={`w-full text-left px-4 py-3 text-sm rounded-md transition ${
                  sortBy === "top"
                    ? "bg-[#3d2922] text-white"
                    : "border border-border"
                }`}
              >
                Top Rated
              </button>
            </div>
          </div>

          {/* RESET */}
          <div className="mt-8 text-center">
            <button
              onClick={resetFilters}
              className="text-xs font-semibold underline underline-offset-4 tracking-wide"
            >
              RESET FILTERS
            </button>
          </div>
        </aside>

        {/* PRODUCTS */}
        <div>
          {/* PRODUCTS GRID */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p: any) => (
                <ProductCard key={p.slug} product={p} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-muted-foreground">
                No products found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}