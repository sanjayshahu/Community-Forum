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
    // 1. Find courses the user is enrolled in
    const enrollments =
      await enrollmentRepository.findCoursesForUser(userId);

    const courseIds = enrollments.map(
      (enrollment) => enrollment.courseId
    );

    // 2. User isn't enrolled in any course
    if (courseIds.length === 0) {
      return {
        data: [],
        pagination: {
          page,
          limit,
          totalItems: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };
    }

    // 3. Fetch posts + total count
    const result = await postRepository.findFeed(
      courseIds,
      userId,
      page,
      limit
    );

    // 4. Calculate pagination
    const totalPages = Math.ceil(
      result.totalItems / limit
    );

    // 5. Return API response
    return {
      data: result.posts,
      pagination: {
        page,
        limit,
        totalItems: result.totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  async getAllPosts() {
    return postRepository.findAll();
  }
}

export const feedService = new FeedService();