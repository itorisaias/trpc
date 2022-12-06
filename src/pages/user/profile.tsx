/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";

export default function UserProfilePage() {
  const session = useSession();
  const meQuery = trpc.user.me.useQuery();
  const postPublishMutation = trpc.post.publish.useMutation();
  const postDeleteMutation = trpc.post.delete.useMutation();

  const handlePublish = (postId: number) => {
    postPublishMutation.mutate(
      { post_id: postId },
      { onSuccess: () => window.location.reload() }
    );
  };

  const handleDelete = (postId: number) => {
    postDeleteMutation.mutate(
      { post_id: postId },
      { onSuccess: () => window.location.reload() }
    );
  };

  return (
    <div>
      <h1>{session.data?.user?.name}</h1>
      {session.data?.user?.image && session.data?.user?.name && (
        <img src={session.data?.user?.image} alt={session.data?.user?.name} />
      )}

      {meQuery.data?.posts.map((post) => {
        return (
          <div key={post.id} className="border">
            <h6>Title: {post.title}</h6>
            <p>Content: {post.content}</p>
            {post.published_at ? (
              <button onClick={() => handleDelete(post.id)}>Remover</button>
            ) : (
              <button onClick={() => handlePublish(post.id)}>Publicar</button>
            )}
          </div>
        );
      })}

      {meQuery.data?.id && (
        <pre>{JSON.stringify(meQuery.data, undefined, 2)}</pre>
      )}
    </div>
  );
}
