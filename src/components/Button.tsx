import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "text";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  external?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-[#0a0a0a] hover:bg-accent-hover transition-colors",
  secondary:
    "border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors",
  text:
    "text-foreground hover:text-accent transition-colors px-0 h-auto",
};

const BASE =
  "font-meta inline-flex items-center justify-center h-[52px] px-8 font-bold text-sm tracking-[0.35px] whitespace-nowrap";

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  external = false,
}: ButtonProps) {
  const cls = `${BASE} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={cls}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
