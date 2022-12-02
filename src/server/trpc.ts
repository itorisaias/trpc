import { TRPCError, initTRPC } from '@trpc/server';
import { Context } from './context';

const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(({ next, ctx }) => {
    if (!ctx.session?.user?.email) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
        });
    }
    return next({
        ctx: {
            // Infers the `session` as non-nullable
            session: ctx.session,
        },
    });
});
const logger = t.middleware(async ({ path, type, next }) => {
    const start = Date.now();
    const result = await next();
    const durationMs = Date.now() - start;
    result.ok
        ? console.debug('OK request timing:', { path, type, durationMs })
        : console.debug('Non-OK request timing', { path, type, durationMs });
    return result;
});

export const middleware = t.middleware;
export const router = t.router;

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
export const loggedProcedure = t.procedure.use(logger);

