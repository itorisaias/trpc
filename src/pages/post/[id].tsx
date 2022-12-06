import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params?.id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      post_id: +context.params.id,
    },
  };
};

type PostDetailPage = {
  post_id: number;
};

export default function PostDetailPage({ post_id }: PostDetailPage) {
  if (!post_id) return null;

  const postQuery = trpc.post.detail.useQuery({ post_id });

  return (
    <div>
      <h1>Post: {postQuery.data?.title}</h1>
      {postQuery.data?.id && (
        <pre>{JSON.stringify(postQuery.data, undefined, 2)}</pre>
      )}
    </div>
  );
}
