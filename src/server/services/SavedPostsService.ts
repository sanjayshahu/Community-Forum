import { savedRepository } from "@/server/repositories";

export class SavedPostsService {
  /**
   * Save a post for a user.
   *
   * - If already saved and active → no-op
   * - If soft-deleted → restore it
   * - Otherwise → create a new saved record
   */
  async savePost(userId: string, postId: string) {
    // Check for an existing record
    const existing = await savedRepository.findByUserAndPost(
      userId,
      postId
    );

    if (existing) {
      // Already saved
      if (existing.deletedAt === null) {
        return existing;
      }

      // Restore soft-deleted save
      return savedRepository.restore(existing.id);
    }

    // Create a new save
    return savedRepository.create({
      userId,
      postId,
    });
  }

  /**
   * Remove a saved post.
   *
   * - If active → soft delete
   * - If already deleted or doesn't exist → no-op
   */
  async unsavePost(userId: string, postId: string) {
    const existing = await savedRepository.findByUserAndPost(
      userId,
      postId
    );

    if (existing && existing.deletedAt === null) {
      return savedRepository.softDelete(existing.id);
    }

    // Already deleted or doesn't exist
    return existing;
  }

  /**
   * Get the authenticated user's saved posts.
   */
  async getSavedPosts(
    userId: string,
    page: number,
    limit: number
  ) {
    return savedRepository.listSavedPosts(
      userId,
      page,
      limit
    );
  }
}

export const savedPostsService = new SavedPostsService();