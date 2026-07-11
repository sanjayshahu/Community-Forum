import { headers } from "next/headers";

export interface CurrentUser {
  id: string;
  role: "student" | "moderator";
}

export async function getCurrentUser(): Promise<CurrentUser> {
  // Future:
  // const session = await auth();

  await headers(); // keeps the function request-scoped

  return {
    id: "819e6ae1-ae14-4afe-a53c-d40540f812e3",
    role: "student",
  };
}