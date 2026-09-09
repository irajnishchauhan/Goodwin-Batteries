"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/products/ProductCard";
import { Filter, Search } from "lucide-react";
import { Product, Category } from "@/types";

export default function ProductsClient({
  initialProducts,
  categories,
}: {
  initialProducts: Product[];
  categories: Category[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Search matching
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        (product.series && product.series.toLowerCase().includes(query)) ||
        (product.category && product.category.toLowerCase().includes(query));

      // Category matching
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [initialProducts, searchQuery, selectedCategory]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar / Filters */}
      <aside className="w-full lg:w-64 shrink-0">
        <div className="sticky top-28 bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
            <Filter size={20} className="text-brand" />
            <h3 className="font-bold text-lg text-foreground">Filters</h3>
          </div>

          <div className="mb-6">
            <div className="relative mb-4">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-brand"
              />
            </div>

            <h4 className="font-bold text-sm text-foreground mb-3 uppercase tracking-wider">
              Categories
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`text-sm transition-colors text-left w-full font-semibold ${
                    selectedCategory === "All"
                      ? "text-brand hover:underline"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All Products
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-sm transition-colors text-left w-full font-semibold ${
                      selectedCategory === cat.id
                        ? "text-brand hover:underline"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground font-semibold">
            Showing {filteredProducts.length} products
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-surface border border-border rounded-xl p-12 text-center flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold text-foreground mb-2">
              No products found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search query or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 text-brand font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
