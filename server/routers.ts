import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getCommentsByPoint,
  createComment,
  deleteComment,
  getCommentCountsByPoints,
  getVoteCountsByPoints,
  getUserVotes,
  toggleVote,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  comments: router({
    /** Get all comments for a specific point */
    byPoint: publicProcedure
      .input(z.object({ pointId: z.number().min(1).max(15) }))
      .query(async ({ input }) => {
        return getCommentsByPoint(input.pointId);
      }),

    /** Get comment counts for all points (for badges) */
    counts: publicProcedure.query(async () => {
      const rows = await getCommentCountsByPoints();
      const map: Record<number, number> = {};
      for (const row of rows) {
        map[row.pointId] = row.count;
      }
      return map;
    }),

    /** Create a new comment (requires login) */
    create: protectedProcedure
      .input(
        z.object({
          pointId: z.number().min(1).max(15),
          content: z.string().min(1).max(2000).trim(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await createComment(
          input.pointId,
          ctx.user.id,
          input.content,
          ctx.user.name ?? null
        );
        return { success: true };
      }),

    /** Delete own comment (requires login) */
    delete: protectedProcedure
      .input(z.object({ commentId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await deleteComment(input.commentId, ctx.user.id);
        return { success: true };
      }),
  }),

  votes: router({
    /** Get vote counts for all points */
    counts: publicProcedure.query(async () => {
      const rows = await getVoteCountsByPoints();
      const map: Record<number, number> = {};
      for (const row of rows) {
        map[row.pointId] = row.count;
      }
      return map;
    }),

    /** Get which points the current user has voted for */
    myVotes: publicProcedure.query(async ({ ctx }) => {
      if (!ctx.user) return [];
      const rows = await getUserVotes(ctx.user.id);
      return rows.map((r) => r.pointId);
    }),

    /** Toggle vote on a point (requires login) */
    toggle: protectedProcedure
      .input(z.object({ pointId: z.number().min(1).max(15) }))
      .mutation(async ({ ctx, input }) => {
        return toggleVote(input.pointId, ctx.user.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;
