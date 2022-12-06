import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

export default function PostDetailPage() {
  const userQuery = trpc.user.publicProfile.useQuery({
    user_id: 1,
  });

  return (
    <div>
      <h1>User: {userQuery.data?.name}</h1>

      {userQuery.data?.id && (
        <pre>{JSON.stringify(userQuery.data, undefined, 2)}</pre>
      )}
    </div>
  );
}
