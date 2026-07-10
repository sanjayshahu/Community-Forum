import { eq } from "drizzle-orm";

import { db } from "../db/client";
import { users } from "../db/schema";
import { NewUser } from "@/types/database";

export class UserRepository {
  async findById(id: string) {
    return db.query.users.findFirst({
      where: eq(users.id, id),
    });
  }

  async create(data: NewUser) {
    const [user] = await db.insert(users).values(data).returning();

    return user;
  }

  async update(id: string, data: Partial<NewUser>) {
    const [user] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();

    return user;
  }
}