import {
  desc,
  eq,
  inArray,
  sql,
} from "drizzle-orm";

import { db } from "../db/client";
import {
  posts,
  savedPosts,
} from "../db/schema";

export class PostRepository {
  async findById(id: string) {
    return db.query.posts.findFirst({
      where: eq(posts.id, id),
    });
  }

  async findFeed(
    courseIds: string[],
    userId: string,
    page: number,
    limit: number
  ) {
    if (courseIds.length === 0) {
      return {
        posts: [],
        totalItems: 0,
      };
    }

    const offset = (page - 1) * limit;

    // Total matching posts
    const [{ count }] = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(posts)
      .where(inArray(posts.courseId, courseIds));

    // Current page posts
    const feedPosts = await db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        courseId: posts.courseId,
        authorId: posts.authorId,
        createdAt: posts.createdAt,

        hasSaved: sql<boolean>`
          EXISTS (
            SELECT 1
            FROM ${savedPosts} sp
            WHERE
              sp.post_id = ${posts.id}
              AND sp.user_id = ${userId}
              AND sp.deleted_at IS NULL
          )
        `,

        savesCount: sql<number>`
          (
            SELECT COUNT(*)
            FROM ${savedPosts} sp
            WHERE
              sp.post_id = ${posts.id}
              AND sp.deleted_at IS NULL
          )
        `,
      })
      .from(posts)
      .where(inArray(posts.courseId, courseIds))
      .orderBy(desc(posts.createdAt))
      .limit(limit)
      .offset(offset);

    return {
      posts: feedPosts,
      totalItems: Number(count),
    };
  }

  async findAll() {
    return db.query.posts.findMany({
      orderBy: desc(posts.createdAt),
    });
  }
}