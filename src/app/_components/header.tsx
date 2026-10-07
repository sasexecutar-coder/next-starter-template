import Link from "next/link";
import Container from "./container";
import { Wordmark } from "./wordmark";
import { NAV } from "@/lib/site";

const Header = () => {
  return (
    <header className="border-b border-line">
      <Container className="flex min-h-[64px] flex-wrap items-center justify-between gap-x-8 gap-y-2 py-3">
        <Wordmark />
        <nav aria-label="Principal" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <ul className="flex flex-wrap gap-x-6 gap-y-1 text-[15px]">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/mapas" className="btn bg-ink text-white hover:bg-black">
            Começar agora
          </Link>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
