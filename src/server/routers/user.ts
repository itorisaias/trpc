import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = router({
  me: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findFirst({
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
        posts: true
      },
      where: {
        email: ctx.session.user?.email!,
      },
    });
  }),
  publicProfile: publicProcedure
    .input(z.object({ user_id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findFirst({
        include: {
          posts: {
            take: 10,
            where: {
              published_at: {
                not: null,
              },
            },
            orderBy: {
              created_at: 'desc'
            }
          },
        },
        where: {
          id: input.user_id,
        },
      });
    }),
});
