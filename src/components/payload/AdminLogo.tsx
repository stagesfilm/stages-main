/**
 * Full logo for the Payload admin login screen (replaces default Payload branding).
 * Uses the site wordmark from public/actor-stages.svg.
 */
export default function AdminLogo() {
  return (
    <div className="flex justify-center w-full mb-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/actor-stages.svg"
        alt="STAGES"
        className="h-auto w-full max-w-[min(100%,420px)] object-contain"
      />
    </div>
  );
}
