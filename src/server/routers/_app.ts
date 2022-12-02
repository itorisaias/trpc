import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

import { userRouter } from './user';
import { postRouter } from './post';

export const appRouter = router({
  user: userRouter, // put procedures under "user" namespace
  post: postRouter, // put procedures under "post" namespace
  hello: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(({ input }) => {
      return {
        msg: `hello ${input.name}`,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;