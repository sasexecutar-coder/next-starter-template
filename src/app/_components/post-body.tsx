import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div
      className={`mx-auto ${markdownStyles["markdown"]}`}
      style={{ marginTop: "var(--ed-sp-title-to-body)" }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
