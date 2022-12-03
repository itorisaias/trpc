import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import FabIcon from "../components/fab-icon";
import { PostCardProps } from "../components/post-card";
import PostList from "../components/post-list";
import { trpc } from "../utils/trpc";

export default function HomePage() {
  const router = useRouter();
  const session = useSession();
  const listPostQuery = trpc.post.list.useQuery();

  if (listPostQuery.isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <div className="container mx-auto">
        <PostList
          posts={
            listPostQuery.data?.map((item) => ({ ...item } as PostCardProps)) ||
            []
          }
        />
      </div>

      {session.status === "authenticated" && (
        <FabIcon onClick={() => router.push("/post/new")} />
      )}
    </div>
  );
}
