import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  ShoppingCart,
  CreditCard,
  Heart,
  Minus,
  Plus,
} from "lucide-react";
import { useState } from "react";
import {
  getProduct,
  getCategory,
  products,
  type Product,
  type Category,
} from "@/lib/products";
import { WhatsAppButton } from "@/components/whatsapp-button";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }): { product: Product; category: Category | undefined } => {
    const product = getProduct(params.slug);

    if (!product) throw notFound();

    const category = getCategory(product.category);

    return { product, category };
  },

  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.product.name} — Photofinite` },
            {
              name: "description",
              content: loaderData.product.shortDescription,
            },
            { property: "og:title", content: loaderData.product.name },
            {
              property: "og:description",
              content: loaderData.product.shortDescription,
            },
            { property: "og:image", content: loaderData.product.image },
          ],
        }
      : {},

  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <h1 className="font-serif text-4xl text-foreground">
        Product not found
      </h1>

      <Link
        to="/products"
        className="mt-6 inline-flex items-center gap-2 text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to catalog
      </Link>
    </div>
  ),

  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="text-muted-foreground">{error.message}</p>
    </div>
  ),

  component: ProductPage,
});

function ProductPage() {
  const { product, category } = Route.useLoaderData() as {
    product: Product;
    category: Category | undefined;
  };

  const [quantity, setQuantity] = useState(product.moq || 1);

  const relatedProducts = products
    .filter(
      (p) => p.category === product.category && p.slug !== product.slug
    )
    .slice(0, 4);

  const enquiryMessage =
    `Hi Photofinite, I'm interested in *${product.name}* (${product.price}, MOQ ${product.moq}+).\n\n` +
    `Quantity: ${quantity}\n\n` +
    `Could you share more details and a quote?`;

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingProduct = existingCart.find(
      (item: any) => item.slug === product.slug
    );

    let updatedCart = [];

    if (existingProduct) {
      updatedCart = existingCart.map((item: any) =>
        item.slug === product.slug
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity,
        },
      ];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = "/cart";
  };

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-10 md:py-14">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/products" className="hover:text-primary">
          Catalog
        </Link>

        <span>/</span>

        {category && (
          <>
            <Link
              to="/products/$slug"
              params={{ slug: category.slug }}
              className="hover:text-primary"
            >
              {category.name}
            </Link>

            <span>/</span>
          </>
        )}

        <span className="text-foreground">{product.name}</span>
      </nav>

      {/* Main Product Section */}
      <div className="grid gap-10 md:grid-cols-2">
        {/* Left Side */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl bg-card border border-border/60 shadow-soft">
            <img
              src={product.image}
              alt={product.name}
              width={1024}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <Truck className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-2 text-xs text-muted-foreground">
                Fast Delivery
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <ShieldCheck className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-2 text-xs text-muted-foreground">
                Quality Checked
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <RotateCcw className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-2 text-xs text-muted-foreground">
                Bulk Support
              </p>
            </div>
          </div>
           {/* Delivery Info */}
          <div className="mt-8 rounded-xl border border-border/60 bg-card p-5">
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Availability</span>
                <span className="font-medium text-green-500">
                  In Stock
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Dispatch Time</span>
                <span className="text-foreground">
                  2 - 5 Business Days
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="text-foreground">
                  Pan India Available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div>
          {category && (
            <Link
              to="/products/$slug"
              params={{ slug: category.slug }}
              className="text-xs uppercase tracking-[0.2em] text-primary"
            >
              {category.name}
            </Link>
          )}

          <h1 className="mt-3 font-serif text-4xl md:text-5xl text-foreground text-balance">
            {product.name}
          </h1>

          {/* Ratings */}
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center gap-1 text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-current"
                />
              ))}
            </div>

            <span className="text-sm text-muted-foreground">
              4.9 Rating • 120+ Orders
            </span>
          </div>

          <p className="mt-4 text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-8 flex items-baseline gap-4">
            <div className="font-serif text-3xl text-primary">
              {product.price}
            </div>

            <div className="text-sm text-muted-foreground">
              / unit · MOQ {product.moq}+
            </div>
          </div>

          {/* Features */}
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-full bg-primary/10 px-4 py-2 text-xs font-medium text-primary">
              Premium Quality
            </div>

            <div className="rounded-full bg-primary/10 px-4 py-2 text-xs font-medium text-primary">
              Export Ready
            </div>

            <div className="rounded-full bg-primary/10 px-4 py-2 text-xs font-medium text-primary">
              Custom Branding
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mt-8">
            <p className="mb-3 text-sm font-medium text-foreground">
              Quantity
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setQuantity((prev) =>
                    prev > 1 ? prev - 1 : 1
                  )
                }
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card hover:border-primary/40 transition"
              >
                <Minus className="h-4 w-4" />
              </button>

              <div className="flex h-11 min-w-[80px] items-center justify-center rounded-xl border border-border bg-card px-5 text-sm font-medium">
                {quantity}
              </div>

              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card hover:border-primary/40 transition"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Ecommerce Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAddToCart}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-primary bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-medium text-foreground transition hover:border-primary/40"
            >
              <CreditCard className="h-4 w-4" />
              Buy Now
            </button>

            <button
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-primary/40"
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>

          {/* WhatsApp + Quote */}
          <div className="mt-4 flex flex-wrap gap-3">
            <WhatsAppButton message={enquiryMessage} />

            <Link
              to="/contact"
              className="inline-flex h-11 items-center rounded-full border border-border bg-card px-5 text-sm font-medium text-foreground hover:border-primary/40 transition"
            >
              Request a Quote
            </Link>
          </div>

         

          {/* Specifications */}
          <div className="mt-10 rounded-xl border border-border/60 bg-card p-6">
            <h3 className="font-serif text-xl text-foreground mb-4">
              Specifications
            </h3>

            <dl className="grid gap-3 sm:grid-cols-2">
              {product.specs.map((s) => (
                <div key={s.label} className="flex gap-3">
                  <Check className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />

                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </dt>

                    <dd className="text-sm text-foreground">
                      {s.value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="mt-20">
        <div className="rounded-3xl border border-border/60 bg-card p-8 md:p-10">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.2em] text-primary">
              Why Choose Photofinite
            </p>

            <h2 className="mt-3 font-serif text-3xl text-foreground">
              Trusted by Businesses Across India
            </h2>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              We provide premium-quality products with reliable support,
              competitive pricing, and smooth bulk ordering experience for
              retailers, wholesalers, and businesses.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-background p-6">
              <h3 className="font-medium text-foreground">
                Premium Materials
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Carefully manufactured products with strict quality standards.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6">
              <h3 className="font-medium text-foreground">
                Bulk Order Support
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Special pricing and dedicated support for wholesale buyers.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6">
              <h3 className="font-medium text-foreground">
                Fast Response
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Quick quotation and customer support through WhatsApp & email.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-primary">
                More Products
              </p>

              <h2 className="mt-2 font-serif text-3xl text-foreground">
                Related Products
              </h2>
            </div>

            <Link
              to="/products"
              className="text-sm text-primary hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <Link
                key={item.slug}
                to="/product/$slug"
                params={{ slug: item.slug }}
                className="group overflow-hidden rounded-2xl border border-border/60 bg-card transition hover:-translate-y-1 hover:border-primary/40"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-medium text-foreground line-clamp-1">
                    {item.name}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {item.shortDescription}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-serif text-lg text-primary">
                      {item.price}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      MOQ {item.moq}+
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}