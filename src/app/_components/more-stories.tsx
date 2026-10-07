import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostPreview
          key={post.slug}
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          slug={post.slug}
          excerpt={post.excerpt}
        />
      ))}
    </div>
  );
}
