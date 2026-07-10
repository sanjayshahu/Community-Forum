import {
  enrollmentRepository,
  postRepository,
  savedRepository,
} from "@/server/repositories";

export class SavePostService {
  /**
   * Save a post
   */
  async save(userId: string, postId: string) {
    // 1. Check if post exists
    const post = await postRepository.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    // 2. Check enrollment
    const enrollment = await enrollmentRepository.findEnrollment(
      userId,
      post.courseId
    );

    if (!enrollment) {
      throw new Error("User is not enrolled in this course");
    }

    // 3. Check existing save
    const existing = await savedRepository.findByUserAndPost(
      userId,
      postId
    );

    // Never saved before
    if (!existing) {
      return savedRepository.create({
        userId,
        postId,
      });
    }

    // Previously deleted -> restore
    if (existing.deletedAt) {
      return savedRepository.restore(existing.id);
    }

    // Already saved
    return existing;
  }

  /**
   * Remove saved post
   */
  async unsave(userId: string, postId: string) {
    const existing =
      await savedRepository.findByUserAndPost(userId, postId);

    if (!existing) {
      throw new Error("Saved post not found");
    }

    if (existing.deletedAt) {
      return existing;
    }

    return savedRepository.softDelete(existing.id);
  }
}

export const savePostService = new SavePostService();