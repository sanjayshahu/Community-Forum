import { savedRepository } from "@/server/repositories";

export class SavedPostsService {
  async getSavedPosts(userId: string) {
    return savedRepository.listSavedPosts(userId);
  }
}

export const savedPostsService = new SavedPostsService();