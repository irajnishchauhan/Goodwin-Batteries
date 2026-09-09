import { getProducts, getCategories } from "@/lib/data";
import ProductsClient from "@/components/products/ProductsClient";

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();
  
  // Filter out unpublished products just in case (though getProducts should handle it)
  const publishedProducts = products.filter(p => p.is_published !== false);

  return (
    <div className="flex flex-col w-full min-h-screen pt-20">
      {/* Header */}
      <section className="bg-surface py-20 border-b border-border relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-brand/10 blur-[100px] pointer-events-none" />
        <div className="container relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-6">
            <span className="text-brand text-xs font-bold tracking-widest uppercase">Catalogue</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
            GOODWIN <span className="text-brand">PRODUCTS</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Explore our complete range of premium batteries engineered for every application and environment.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background flex-1">
        <div className="container">
          <ProductsClient initialProducts={publishedProducts} categories={categories} />
        </div>
      </section>
    </div>
  );
}
