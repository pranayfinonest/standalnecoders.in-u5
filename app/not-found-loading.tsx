export default function NotFoundLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">Loading page details...</p>
        <div className="animate-pulse h-10 bg-muted rounded mb-8"></div>
      </div>
    </div>
  )
}
