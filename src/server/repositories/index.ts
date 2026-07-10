import { UserRepository } from "./UserRepository";
import { CourseRepository } from "./CourseRepository";
import { EnrollmentRepository } from "./EnrollmentRepository";
import { PostRepository } from "./PostRepository";
import { SavedRepository } from "./SavedRepository";

export const userRepository = new UserRepository();
export const courseRepository = new CourseRepository();
export const enrollmentRepository = new EnrollmentRepository();
export const postRepository = new PostRepository();
export const savedRepository = new SavedRepository();