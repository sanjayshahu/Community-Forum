import { eq } from "drizzle-orm";

import { db } from "../db/client";
import { courses } from "../db/schema";

export class CourseRepository {
  async findById(id: string) {
    return db.query.courses.findFirst({
      where: eq(courses.id, id),
    });
  }

  async findMany() {
    return db.select().from(courses);
  }
}