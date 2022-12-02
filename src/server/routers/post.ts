import { router, protectedProcedure, publicProcedure } from '../trpc';
import { z } from 'zod';

export const postRouter = router({
    create: publicProcedure
        .input(
            z.object({
                title: z.string(),
            }),
        )
        .mutation(({ input }) => {
            // [...]
        }),
    list: protectedProcedure.query(({ ctx }) => {
        // ...
        return ctx.prisma.post.findMany();
    }),
});
