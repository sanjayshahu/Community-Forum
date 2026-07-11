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

export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;

  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface FeedResponse {
  data: Post[];
  pagination: Pagination;
}