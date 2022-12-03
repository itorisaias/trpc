import PostCard, { PostCardProps } from "./post-card";

export type PostListProps = {
  posts: PostCardProps[];

};

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
      {posts.map((post, index) => (
        <PostCard key={`post_card_${index}`} {...post} />
      ))}
    </div>
  );
}
