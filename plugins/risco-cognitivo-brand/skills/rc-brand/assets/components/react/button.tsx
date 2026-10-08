import Link from "next/link";
import type { ComponentPropsWithRef, ComponentPropsWithoutRef, ReactNode } from "react";

// Botão único do site (D-25, D-31). Regras:
// - primary: todo CTA de navegação ou conversão, sempre azul de ação #2D5CE6;
// - secondary: só ações utilitárias (limpar, itens "Em breve", ação secundária ao lado de um primário);
// - icon: botões de ícone 40×40 (setas, fechar), com aria-label obrigatório.
// Com href vira <Link>; com soon vira <span aria-disabled> ("Em breve", sem destino).
type Variant = "primary" | "secondary" | "icon";
type Size = "lg" | "md";

type Base = { variant?: Variant; size?: Size; className?: string; children: ReactNode };
type AsLink = Base & { href: string; soon?: never } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">;
type AsSoon = Base & { soon: true; href?: never };
type AsButton = Base & { href?: never; soon?: never } & Omit<ComponentPropsWithRef<"button">, "className">;

// Nomes de classe literais: o Tailwind só mantém classes de @layer components que aparecem por extenso no código.
const VARIANT: Record<Variant, string> = { primary: "btn btn-primary", secondary: "btn btn-secondary", icon: "btn-icon" };
const SIZE: Record<Size, string> = { lg: "", md: "btn-md" };

export function buttonClass(variant: Variant = "primary", size: Size = "lg", extra = "") {
  return [VARIANT[variant], variant === "icon" ? "" : SIZE[size], extra].filter(Boolean).join(" ");
}

export function Button(props: AsLink | AsSoon | AsButton) {
  const { variant = "primary", size = "lg", className = "", children } = props;
  const cls = buttonClass(variant, size, className);
  if ("soon" in props && props.soon) {
    return (
      <span role="link" aria-disabled="true" title="Em breve" className={cls}>
        {children}
      </span>
    );
  }
  if ("href" in props && props.href) {
    const { variant: _v, size: _s, className: _c, children: _ch, href, ...rest } = props as AsLink;
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  const { variant: _v, size: _s, className: _c, children: _ch, type = "button", ...rest } = props as AsButton;
  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  );
}
