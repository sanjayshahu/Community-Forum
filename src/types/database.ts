import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  users,
  courses,
  courseEnrollments,
  posts,
  savedPosts,
} from "@/server/db/schema";

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type Course = InferSelectModel<typeof courses>;
export type NewCourse = InferInsertModel<typeof courses>;

export type Enrollment = InferSelectModel<typeof courseEnrollments>;
export type NewEnrollment = InferInsertModel<typeof courseEnrollments>;

export type Post = InferSelectModel<typeof posts>;
export type NewPost = InferInsertModel<typeof posts>;

export type SavedPost = InferSelectModel<typeof savedPosts>;
export type NewSavedPost = InferInsertModel<typeof savedPosts>;