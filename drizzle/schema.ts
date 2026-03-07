import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Comments on policy points.
 * Each comment belongs to a user and a specific point (1-15).
 */
export const comments = mysqlTable("comments", {
  id: int("id").autoincrement().primaryKey(),
  /** Policy point number (1-15) */
  pointId: int("pointId").notNull(),
  /** User who wrote the comment */
  userId: int("userId").notNull(),
  /** Comment text content */
  content: text("content").notNull(),
  /** Display name at time of posting (denormalized for performance) */
  authorName: varchar("authorName", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Comment = typeof comments.$inferSelect;
export type InsertComment = typeof comments.$inferInsert;

/**
 * Votes (upvotes) on policy points.
 * Each user can vote once per point (enforced by unique constraint on pointId + userId).
 */
export const votes = mysqlTable("votes", {
  id: int("id").autoincrement().primaryKey(),
  /** Policy point number (1-15) */
  pointId: int("pointId").notNull(),
  /** User who voted */
  userId: int("userId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Vote = typeof votes.$inferSelect;
export type InsertVote = typeof votes.$inferInsert;
