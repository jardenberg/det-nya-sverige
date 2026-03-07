import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module
vi.mock("./db", () => ({
  getCommentsByPoint: vi.fn().mockResolvedValue([
    {
      id: 1,
      pointId: 3,
      userId: 1,
      content: "Great point about housing!",
      authorName: "Test User",
      createdAt: new Date("2026-01-01"),
      updatedAt: new Date("2026-01-01"),
    },
  ]),
  createComment: vi.fn().mockResolvedValue([{ insertId: 2 }]),
  deleteComment: vi.fn().mockResolvedValue([{ affectedRows: 1 }]),
  getCommentCountsByPoints: vi.fn().mockResolvedValue([
    { pointId: 1, count: 5 },
    { pointId: 3, count: 12 },
  ]),
  getVoteCountsByPoints: vi.fn().mockResolvedValue([
    { pointId: 1, count: 42 },
    { pointId: 7, count: 18 },
  ]),
  getUserVotes: vi.fn().mockResolvedValue([
    { id: 1, pointId: 1, userId: 1, createdAt: new Date() },
    { id: 2, pointId: 7, userId: 1, createdAt: new Date() },
  ]),
  toggleVote: vi.fn().mockResolvedValue({ voted: true }),
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
  getDb: vi.fn(),
}));

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user-123",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("comments", () => {
  it("fetches comments for a specific point (public)", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.comments.byPoint({ pointId: 3 });
    expect(result).toHaveLength(1);
    expect(result[0].content).toBe("Great point about housing!");
    expect(result[0].pointId).toBe(3);
  });

  it("returns comment counts as a map (public)", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.comments.counts();
    expect(result).toEqual({ 1: 5, 3: 12 });
  });

  it("creates a comment (authenticated)", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.comments.create({
      pointId: 5,
      content: "I strongly support this initiative!",
    });
    expect(result).toEqual({ success: true });
  });

  it("rejects comment creation without auth", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.comments.create({ pointId: 5, content: "Test" })
    ).rejects.toThrow();
  });

  it("validates pointId range (1-15)", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.comments.create({ pointId: 0, content: "Test" })
    ).rejects.toThrow();

    await expect(
      caller.comments.create({ pointId: 16, content: "Test" })
    ).rejects.toThrow();
  });

  it("validates content is not empty", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.comments.create({ pointId: 1, content: "" })
    ).rejects.toThrow();
  });

  it("deletes own comment (authenticated)", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.comments.delete({ commentId: 1 });
    expect(result).toEqual({ success: true });
  });

  it("rejects comment deletion without auth", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.comments.delete({ commentId: 1 })
    ).rejects.toThrow();
  });
});

describe("votes", () => {
  it("returns vote counts as a map (public)", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.votes.counts();
    expect(result).toEqual({ 1: 42, 7: 18 });
  });

  it("returns empty array for myVotes when not authenticated", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.votes.myVotes();
    expect(result).toEqual([]);
  });

  it("returns user's voted point IDs when authenticated", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.votes.myVotes();
    expect(result).toEqual([1, 7]);
  });

  it("toggles vote (authenticated)", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.votes.toggle({ pointId: 3 });
    expect(result).toEqual({ voted: true });
  });

  it("rejects vote toggle without auth", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.votes.toggle({ pointId: 3 })
    ).rejects.toThrow();
  });

  it("validates pointId range for votes (1-15)", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.votes.toggle({ pointId: 0 })
    ).rejects.toThrow();

    await expect(
      caller.votes.toggle({ pointId: 16 })
    ).rejects.toThrow();
  });
});
