import Link from "next/link";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
};

export function PostPreview({ title, coverImage, date, excerpt, slug }: Props) {
  return (
    <article>
      <CoverImage slug={slug} title={title} src={coverImage} />
      <p className="mt-4 font-mono text-xs text-muted">
        <DateFormatter dateString={date} />
      </p>
      <h3 className="mt-2 text-xl font-semibold leading-snug">
        <Link href={`/posts/${slug}`} className="hover:text-action">
          {title}
        </Link>
      </h3>
      <p className="mt-2 text-muted">{excerpt}</p>
    </article>
  );
}
