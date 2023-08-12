import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name"),
});

export const post = pgTable("post", {
  id: serial("id").primaryKey(),
  title: varchar("title"),
  categoryId: integer("category_id"),
  body: varchar("body"),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const postRelations = relations(post, ({ many, one }) => ({
  comments: many(comment),
  category: one(category, {
    fields: [post.categoryId],
    references: [category.id],
  }),
}));

export const comment = pgTable("comment", {
  id: serial("id").primaryKey(),
  body: varchar("body"),
  postId: integer("post_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const commentRelations = relations(comment, ({ one }) => ({
  post: one(post, {
    fields: [comment.postId],
    references: [post.id],
  }),
}));
