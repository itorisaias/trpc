import { useRouter } from "next/router";
import FormPost, { ACTIONS, FormPayload } from "../../components/form-post";
import { trpc } from "../../utils/trpc";

export default function PostNewPage() {
  const router = useRouter();
  const createPostMutation = trpc.post.create.useMutation();
  const createPublishMutation = trpc.post.publish.useMutation();

  const onSubmitNewPost = async ({ action, payload }: FormPayload) => {
    const newPost = await createPostMutation.mutateAsync(payload, {
      onSuccess: (post) => router.push(`/post/${post.id}`),
    });

    if (action === ACTIONS.SAVE_PUBLISH) {
      await createPublishMutation.mutateAsync({
        post_id: newPost.id
      })
    }
  };

  return (
    <div className="container mx-auto">
      <FormPost onSubmit={onSubmitNewPost} />
    </div>
  );
}
