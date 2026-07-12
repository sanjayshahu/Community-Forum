import { useInfiniteQuery } from "@tanstack/react-query";
import { getSavedPosts } from "../../api/postApi";

export function useSavedPosts(limit = 10) {
  return useInfiniteQuery({
    queryKey: ["saved-posts"],
    queryFn: ({ pageParam = 1 }) => getSavedPosts(pageParam, limit),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60, // 1 minute
  });
}