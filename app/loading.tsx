/* Skeleton shaped like a page header, shown while a route streams in. */
export default function Loading() {
  return (
    <div className="container-ed pb-24 pt-36 md:pt-48" aria-busy="true" aria-label="Loading">
      <div className="h-3 w-40 animate-pulse rounded-full bg-paper-deep" />
      <div className="mt-8 h-20 w-full max-w-3xl animate-pulse rounded-2xl bg-paper-deep md:h-28" />
      <div className="mt-4 h-20 w-2/3 max-w-2xl animate-pulse rounded-2xl bg-paper-deep md:h-28" />
      <div className="mt-12 h-5 w-full max-w-xl animate-pulse rounded-full bg-paper-deep" />
      <div className="mt-3 h-5 w-4/5 max-w-lg animate-pulse rounded-full bg-paper-deep" />
    </div>
  );
}
