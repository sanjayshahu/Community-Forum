import { and, eq } from "drizzle-orm";

import { db } from "../db/client";
import { courseEnrollments } from "../db/schema";

export class EnrollmentRepository {
  async findEnrollment(userId: string, courseId: string) {
    return db.query.courseEnrollments.findFirst({
      where: and(
        eq(courseEnrollments.userId, userId),
        eq(courseEnrollments.courseId, courseId)
      ),
    });
  }
  async findCoursesForUser(userId: string) {
  return db.query.courseEnrollments.findMany({
    where: eq(courseEnrollments.userId, userId),
  });
}
}