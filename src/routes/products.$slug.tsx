import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getCategory, getProductsByCategory, type Category, type Product } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }): { category: Category; products: Product[] } => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category, products: getProductsByCategory(params.slug) };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.category.name} — Photofinite` },
            { name: "description", content: loaderData.category.description },
            { property: "og:title", content: `${loaderData.category.name} — Photofinite` },
            { property: "og:description", content: loaderData.category.description },
            { property: "og:image", content: loaderData.category.image },
          ],
        }
      : {},
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <h1 className="font-serif text-4xl text-foreground">Category not found</h1>
      <Link to="/products" className="mt-6 inline-flex items-center gap-2 text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to catalog
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category, products } = Route.useLoaderData() as { category: Category; products: Product[] };
  return (
    <div>
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/85 to-primary/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-5 md:px-8 pb-8 text-primary-foreground">
            <Link to="/products" className="inline-flex items-center gap-1 text-sm text-primary-foreground/80 hover:text-gold mb-3">
              <ArrowLeft className="h-4 w-4" /> All categories
            </Link>
            <h1 className="font-serif text-4xl md:text-5xl">{category.name}</h1>
            <p className="mt-2 text-primary-foreground/85 max-w-2xl">{category.description}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8 py-12">
        {products.length === 0 ? (
          <p className="text-muted-foreground">More products coming soon in this category.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
