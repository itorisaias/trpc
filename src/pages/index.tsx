import { useRouter } from "next/router";
import FabIcon from "../components/fab-icon";
import { PostCardProps } from "../components/post-card";
import PostList from "../components/post-list";
import { trpc } from "../utils/trpc";

export default function HomePage() {
  const listPostQuery = trpc.post.list.useQuery();
  const router = useRouter()

  if (listPostQuery.isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <div className="container mx-auto">
        <PostList
          posts={
            listPostQuery.data?.map(
              (item) => ({ ...item } as PostCardProps)
            ) || []
          }
        />
      </div>

      <FabIcon onClick={() => router.push('/post/new')} />
    </div>
  );
}
