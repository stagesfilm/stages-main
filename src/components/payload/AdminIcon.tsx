/**
 * Compact logo for the admin nav / collapsed contexts (replaces default Payload icon).
 */
export default function AdminIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/actor-stages.svg"
      alt=""
      aria-hidden
      className="h-7 w-auto max-w-[140px] object-contain object-left"
    />
  );
}
