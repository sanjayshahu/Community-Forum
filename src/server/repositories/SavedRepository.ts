import { and, desc, eq, isNull, sql } from "drizzle-orm";
import { db } from "../db/client";
import { posts, savedPosts } from "../db/schema";
import { NewSavedPost } from "@/types/database";

export class SavedRepository {
  async findByUserAndPost(userId: string, postId: string) {
    return db.query.savedPosts.findFirst({
      where: and(
        eq(savedPosts.userId, userId),
        eq(savedPosts.postId, postId)
      ),
    });
  }

  async create(data: NewSavedPost) {
    const [saved] = await db
      .insert(savedPosts)
      .values(data)
      .returning();
    return saved;
  }

  async restore(id: string) {
    const [saved] = await db
      .update(savedPosts)
      .set({ deletedAt: null })
      .where(eq(savedPosts.id, id))
      .returning();
    return saved;
  }

  async softDelete(id: string) {
    const [saved] = await db
      .update(savedPosts)
      .set({ deletedAt: new Date() })
      .where(eq(savedPosts.id, id))
      .returning();
    return saved;
  }

  /**
   * List saved posts for a user with pagination.
   * Returns most-recently-saved first.
   */
  async listSavedPosts(
    userId: string,
    page: number,
    limit: number
  ): Promise<{ posts: any[]; totalItems: number }> {
    const offset = (page - 1) * limit;

    // Get total count
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(savedPosts)
      .where(
        and(
          eq(savedPosts.userId, userId),
          isNull(savedPosts.deletedAt)
        )
      );

    // Get paginated posts with savesCount
    const savedPostsList = await db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        courseId: posts.courseId,
        authorId: posts.authorId,
        createdAt: posts.createdAt,
        savedAt: savedPosts.savedAt,
        hasSaved: sql<boolean>`true`.mapWith(Boolean),
        savesCount: sql<number>`
          (SELECT COUNT(*) FROM saved_posts sp
           WHERE sp.post_id = ${posts.id} AND sp.deleted_at IS NULL)
        `.mapWith(Number),
      })
      .from(savedPosts)
      .innerJoin(posts, eq(savedPosts.postId, posts.id))
      .where(
        and(
          eq(savedPosts.userId, userId),
          isNull(savedPosts.deletedAt)
        )
      )
      .orderBy(desc(savedPosts.savedAt))
      .limit(limit)
      .offset(offset);

    return {
      posts: savedPostsList,
      totalItems: Number(count),
    };
  }
}

export const savedRepository = new SavedRepository();