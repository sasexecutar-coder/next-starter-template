import Link from "next/link";
import { SITE } from "@/lib/site";

// D-04: wordmark tipográfico oficial até existir símbolo aprovado (symbol: GAP).
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`font-display text-lg font-semibold tracking-tight text-ink ${className}`}>
      {SITE.name}
    </Link>
  );
}
