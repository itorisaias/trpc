import { router, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const postRouter = router({
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newPost = await ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          author: {
            connect: {
              email: ctx.session?.user?.email!,
            },
          },
        },
      });

      return newPost;
    }),
  list: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      include: {
        author: true
      }
    });
  }),
});
