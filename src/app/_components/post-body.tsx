import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div
      className={`mx-auto ${markdownStyles["markdown"]}`}
      style={{ marginTop: "var(--space-12)" }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
