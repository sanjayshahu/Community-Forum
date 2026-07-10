import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import {
  users,
  courses,
  courseEnrollments,
  posts,
} from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function seed() {
  console.log("🌱 Seeding database...");

  // --------------------
  // Create Users
  // --------------------

  const [student1] = await db
    .insert(users)
    .values({
      name: "John Doe",
      role: "student",
    })
    .returning();

  const [student2] = await db
    .insert(users)
    .values({
      name: "Alice Johnson",
      role: "student",
    })
    .returning();

  const [moderator] = await db
    .insert(users)
    .values({
      name: "Jane Smith",
      role: "moderator",
    })
    .returning();


  // --------------------
  // Create Courses
  // --------------------

  const [course1] = await db
    .insert(courses)
    .values({
      title: "Next.js with Drizzle",
    })
    .returning();

  const [course2] = await db
    .insert(courses)
    .values({
      title: "React Fundamentals",
    })
    .returning();


  // --------------------
  // Enroll Students
  // --------------------

  await db.insert(courseEnrollments).values([
    {
      userId: student1.id,
      courseId: course1.id,
    },
    {
      userId: student2.id,
      courseId: course2.id,
    },
  ]);


  // --------------------
  // Create Posts
  // --------------------

  await db.insert(posts).values([
    {
      courseId: course1.id,
      authorId: moderator.id,
      title: "Welcome to Next.js",
      content: "Learn Next.js App Router and Drizzle ORM.",
    },
    {
      courseId: course1.id,
      authorId: moderator.id,
      title: "Database Migrations",
      content: "Understanding Drizzle migrations.",
    },
    {
      courseId: course2.id,
      authorId: moderator.id,
      title: "React Hooks",
      content: "Learn useState and useEffect.",
    },
    {
      courseId: course2.id,
      authorId: moderator.id,
      title: "Component Design",
      content: "Building reusable React components.",
    },
  ]);


  console.log("✅ Database seeded successfully!");

  await pool.end();
}


seed().catch(async (err) => {
  console.error(err);
  await pool.end();
  process.exit(1);
});