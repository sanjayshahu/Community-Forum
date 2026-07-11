export interface Post {
  id: string;

  title: string;

  content: string;

  courseId: string;

  authorId: string;

  createdAt: string;

  hasSaved: boolean;

  savesCount: number;
}