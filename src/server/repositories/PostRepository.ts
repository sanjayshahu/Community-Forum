import { eq, inArray } from "drizzle-orm";

import { db } from "../db/client";
import { posts } from "../db/schema";
import { desc } from "drizzle-orm";

export class PostRepository {
  async findById(id: string) {
    return db.query.posts.findFirst({
      where: eq(posts.id, id),
    });
  }

  async findFeed(courseIds: string[]) {
    return db
      .select()
      .from(posts)
      .where(inArray(posts.courseId, courseIds));
  }
  async findAll() {
    return db.query.posts.findMany({
      orderBy: desc(posts.createdAt),
    });
  }
}