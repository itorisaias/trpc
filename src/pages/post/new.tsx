import FormPost, { FormFieldValues } from "../../components/form-post";
import { trpc } from "../../utils/trpc";

export default function PostDetailPage() {
  const createPostMutation = trpc.post.create.useMutation()

  const onSubmitNewPost = async (data: FormFieldValues) => {
    await createPostMutation.mutateAsync(data)

    alert('Post criado com sucesso :D')
  }

  return (
    <div className="container mx-auto">
      <FormPost onSubmit={onSubmitNewPost} />
    </div>
  )
}