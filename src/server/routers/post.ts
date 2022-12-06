import { router, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const postRouter = router({
  list: publicProcedure
    .input(
      z
        .object({
          orderBy: z.array(
            z.object({
              sort_by: z.enum(["asc", "desc"]).default('asc'),
              order_by: z.enum([
                "created_at",
                "published_at",
                "updated_at",
                "views",
              ]),
            })
          ),
        })
        .default({
          orderBy: [
            {
              sort_by: 'desc',
              order_by: 'published_at'
            }
          ],
        })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.post.findMany({
        include: {
          author: true,
        },
        orderBy: input.orderBy.map((item) => ({
          [item.order_by]: item.sort_by,
        })),
        where: {
          deleted_at: null,
          published_at: {
            not: null,
          },
        },
      });
    }),
  detail: publicProcedure
    .input(
      z.object({
        post_id: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const [postDetail] = await Promise.all([
        ctx.prisma.post.findFirst({
          where: {
            id: input.post_id,
          },
          include: {
            author: true,
            tags: true,
          },
        }),
        ctx.prisma.post.update({
          data: {
            views: {
              increment: 1,
            },
          },
          where: {
            id: input.post_id,
          },
        }),
      ]);

      return postDetail;
    }),
  create: protectedProcedure
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
  update: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        post_id: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const postUpdated = await ctx.prisma.post.update({
        data: {
          title: input.title,
          content: input.content,
        },
        where: {
          id: input.post_id,
        },
      });

      return postUpdated;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        post_id: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.post.update({
        data: {
          deleted_at: new Date(),
        },
        where: {
          id: input.post_id,
        },
      });
    }),
  publish: protectedProcedure
    .input(
      z.object({
        post_id: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const postUpdated = await ctx.prisma.post.update({
        data: {
          published_at: new Date(),
        },
        where: {
          id: input.post_id,
        },
      });

      return postUpdated;
    }),
});
