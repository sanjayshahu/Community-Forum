import {
  enrollmentRepository,
  postRepository,
} from "@/server/repositories";

export class FeedService {
  async getFeed(userId: string) {
    /**
     * This requires a repository method:
     *
     * enrollmentRepository.findCoursesForUser(userId)
     */

    const enrollments =
      await enrollmentRepository.findCoursesForUser(userId);

    const courseIds = enrollments.map(
      (enrollment) => enrollment.courseId
    );

    if (courseIds.length === 0) {
      return [];
    }

    return postRepository.findFeed(courseIds);
  }




  async getAllPosts() {
    return postRepository.findAll();
  }
}



export const feedService = new FeedService();