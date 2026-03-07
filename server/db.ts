import { eq, and, desc, sql, count } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, comments, votes } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ── Comments ──

export async function getCommentsByPoint(pointId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(comments)
    .where(eq(comments.pointId, pointId))
    .orderBy(desc(comments.createdAt));
}

export async function createComment(pointId: number, userId: number, content: string, authorName: string | null) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(comments).values({
    pointId,
    userId,
    content,
    authorName,
  });
  return result;
}

export async function deleteComment(commentId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(comments).where(and(eq(comments.id, commentId), eq(comments.userId, userId)));
}

export async function getCommentCountsByPoints() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({ pointId: comments.pointId, count: count() })
    .from(comments)
    .groupBy(comments.pointId);
}

// ── Votes ──

export async function getVoteCountsByPoints() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({ pointId: votes.pointId, count: count() })
    .from(votes)
    .groupBy(votes.pointId);
}

export async function getUserVotes(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(votes).where(eq(votes.userId, userId));
}

export async function toggleVote(pointId: number, userId: number): Promise<{ voted: boolean }> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Check if vote exists
  const existing = await db
    .select()
    .from(votes)
    .where(and(eq(votes.pointId, pointId), eq(votes.userId, userId)))
    .limit(1);
  
  if (existing.length > 0) {
    // Remove vote
    await db.delete(votes).where(and(eq(votes.pointId, pointId), eq(votes.userId, userId)));
    return { voted: false };
  } else {
    // Add vote
    await db.insert(votes).values({ pointId, userId });
    return { voted: true };
  }
}
