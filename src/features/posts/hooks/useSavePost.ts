"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { savePost } from "../api/postApi";
import { queryKeys } from "@/lib/queryKeys";

export function useSavePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: savePost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.posts,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.savedPosts,
      });
    },
  });
}