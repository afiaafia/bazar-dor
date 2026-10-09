export function PageSkeleton() {
  return (
    <main className="catalog-page" aria-label="তথ্য লোড হচ্ছে" aria-busy="true">
      <div className="catalog-container">
        <div className="skeleton-block skeleton-heading" />
        <div className="skeleton-block skeleton-description" />
        <div className="skeleton-product-grid">
          {Array.from({ length: 8 }, (_, index) => (
            <div className="skeleton-product-card" key={index}>
              <div className="skeleton-block skeleton-product-image" />
              <div className="skeleton-block skeleton-product-title" />
              <div className="skeleton-block skeleton-product-line" />
              <div className="skeleton-block skeleton-product-price" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
