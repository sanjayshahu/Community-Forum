import { savedRepository } from "@/server/repositories";

export class SavedPostsService {
  async getSavedPosts(userId: string, page: number, limit: number) {
    // Returns { posts, totalItems } directly from repository
    return savedRepository.listSavedPosts(userId, page, limit);
  }
}

export const savedPostsService = new SavedPostsService();