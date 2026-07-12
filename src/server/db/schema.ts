import { relations, sql } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", [
  "student",
  "moderator",
]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 100 }).notNull(),

  role: userRoleEnum("role").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const courses = pgTable("courses", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: varchar("title", { length: 150 }).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const courseEnrollments = pgTable(
  "course_enrollments",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),

    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    uniqueEnrollment: unique().on(table.userId, table.courseId),
  })
);

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),

  courseId: uuid("course_id")
    .notNull()
    .references(() => courses.id),

  authorId: uuid("author_id")
    .notNull()
    .references(() => users.id),

  title: varchar("title", { length: 255 }).notNull(),

  content: text("content").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const savedPosts = pgTable(
  "saved_posts",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),

    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id),

    savedAt: timestamp("saved_at").defaultNow().notNull(),

    deletedAt: timestamp("deleted_at"),
  },
  (table) => ({
    uniqueActiveSave: uniqueIndex(
      "saved_posts_user_post_active_idx"
    )
      .on(table.userId, table.postId)
      .where(sql`${table.deletedAt} IS NULL`),
  })
);

// ==============================
// Relations
// ==============================

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  enrollments: many(courseEnrollments),
  savedPosts: many(savedPosts),
}));

export const coursesRelations = relations(courses, ({ many }) => ({
  posts: many(posts),
  enrollments: many(courseEnrollments),
}));

export const courseEnrollmentsRelations = relations(
  courseEnrollments,
  ({ one }) => ({
    user: one(users, {
      fields: [courseEnrollments.userId],
      references: [users.id],
    }),
    course: one(courses, {
      fields: [courseEnrollments.courseId],
      references: [courses.id],
    }),
  })
);

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [posts.courseId],
    references: [courses.id],
  }),
  savedPosts: many(savedPosts),
}));

export const savedPostsRelations = relations(savedPosts, ({ one }) => ({
  user: one(users, {
    fields: [savedPosts.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [savedPosts.postId],
    references: [posts.id],
  }),
}));