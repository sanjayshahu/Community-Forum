"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { savePost } from "../api/postsApi";
import { queryKeys } from "@/lib/queryKeys";

export function useSavePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: savePost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.savedPosts,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.posts,
      });
    },
  });
}