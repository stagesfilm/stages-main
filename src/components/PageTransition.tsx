"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      setPhase("exit");

      const timeout = setTimeout(() => {
        prevPathname.current = pathname;
        setDisplayChildren(children);
        setPhase("enter");
        window.scrollTo(0, 0);
      }, 250);

      return () => clearTimeout(timeout);
    } else {
      setDisplayChildren(children);
    }
  }, [pathname, children]);

  return (
    <div className={phase === "enter" ? "page-enter" : "page-exit"}>
      {displayChildren}
    </div>
  );
}
