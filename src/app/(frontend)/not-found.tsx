import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-bold tracking-tight text-foreground mb-4">404</h1>
      <p className="text-foreground/80 mb-8 text-center max-w-md">
        This page doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center px-6 py-3 bg-accent text-white font-medium tracking-wider hover:bg-accent-hover transition-colors"
      >
        RETURN HOME
      </Link>
    </div>
  );
}
