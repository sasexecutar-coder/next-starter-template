import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
  excerpt: string;
  eyebrow?: string;
};

// EDITORIAL-LAYOUT-SYSTEM: na superfície "artigo", H1 e lead centralizados; corpo à esquerda.
export function PostHeader({ title, coverImage, date, author, excerpt, eyebrow }: Props) {
  return (
    <header className="text-center">
      {eyebrow && <p className="eyebrow eyebrow-indigo mb-6">{eyebrow}</p>}
      <PostTitle>{title}</PostTitle>
      <p className="mx-auto mt-6 max-w-[60ch] text-lg text-ink sm:text-xl" style={{ textWrap: "balance" }}>
        {excerpt}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-sm text-muted">
        <Avatar name={author.name} picture={author.picture} />
        <DateFormatter dateString={date} />
      </div>
      <hr className="mt-10 border-line" />
      <div className="mx-auto mt-10 max-w-4xl">
        <CoverImage title={title} src={coverImage} />
      </div>
    </header>
  );
}
