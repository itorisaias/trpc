import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import FabIcon from "components/fab-icon";
import { PostCardProps } from "components/post-card";
import PostList from "components/post-list";
import { trpc } from "utils/trpc";
import { useFlags } from "flags/client";

export default function HomePage() {
  const router = useRouter();
  const session = useSession();
  const { flags } = useFlags();
  const listPostQuery = trpc.post.list.useQuery({
    orderBy: [
      {
        order_by:
          router.query?.sort_by === "published_at" ? "published_at" : "views",
        sort_by: "desc",
      },
    ],
  });

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

      {session.status === "authenticated" && flags?.CREATE_POST && (
        <FabIcon onClick={() => router.push("/post/new")} />
      )}
    </div>
  );
}
