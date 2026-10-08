import Link from "next/link";
import { SITE } from "@/lib/site";

// D-04: wordmark tipográfico oficial até existir símbolo aprovado (symbol: GAP).
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex min-h-[44px] shrink-0 items-center whitespace-nowrap font-display text-lg font-semibold tracking-tight text-ink ${className}`}>
      {SITE.name}
    </Link>
  );
}
