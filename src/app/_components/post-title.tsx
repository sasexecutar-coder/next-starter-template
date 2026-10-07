import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export function PostTitle({ children }: Props) {
  return (
    <h1
      className="mx-auto max-w-[20ch] font-display font-medium leading-[1.05] tracking-tight"
      style={{ fontSize: "var(--ed-fs-title)", textWrap: "balance" }}
    >
      {children}
    </h1>
  );
}
