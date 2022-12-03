import Head from "next/head";
import Image from "next/image";
import FormPost, { FormFieldValues } from "../components/form-post";
import LoginButton from "../components/login-btn";
import styles from "../styles/Home.module.css";
import { trpc } from "../utils/trpc";

export default function Home() {
  const createPostMutation = trpc.post.create.useMutation();

  const onSubmit = async (data: FormFieldValues) => {
    const result = await createPostMutation.mutateAsync({
      title: data.title,
      content: data.content,
    });

    console.log({ result });
  };

  if (createPostMutation.isLoading) {
    return <div>criando post</div>;
  }

  return (
    <div className={styles.container}>
      <LoginButton />

      <FormPost onSubmit={onSubmit} />
    </div>
  );
}
