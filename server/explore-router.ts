import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { assertTheme } from "./search-corpus";
import { exploreSearch } from "./explore-search";

export const exploreRouter = router({
  search: publicProcedure.input(z.object({
    query: z.string().trim().min(2).max(240),
    lang: z.enum(["sv", "en"]),
    mode: z.enum(["lexical", "semantic"]),
    kind: z.enum(["all", "manifesto", "analysis", "commentary"]),
    theme: z.string().max(30).optional().refine(assertTheme, "Unknown theme"),
  })).query(({ input, ctx }) => exploreSearch(input, ctx.req.ip ?? ctx.req.socket?.remoteAddress ?? "unknown")),
});
