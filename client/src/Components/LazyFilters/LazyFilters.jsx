import React from "react";

const Filters2 = React.lazy(() => import("../filters/Filters2"));

export default function LazyFilters2() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Filters2 />
    </React.Suspense>
  );
}
