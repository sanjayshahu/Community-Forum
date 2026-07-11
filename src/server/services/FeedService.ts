import {
  enrollmentRepository,
  postRepository,
} from "@/server/repositories";

export class FeedService {
async getFeed(
    userId: string,
    page: number,
    limit: number
  ) {
    const enrollments =
      await enrollmentRepository.findCoursesForUser(userId);

    const courseIds = enrollments.map(
      (enrollment) => enrollment.courseId
    );

    if (courseIds.length === 0) {
      return [];
    }

  return postRepository.findFeed(
  courseIds,
  userId,
  page,
  limit
);
  }




  async getAllPosts() {
    return postRepository.findAll();
  }
}



export const feedService = new FeedService();