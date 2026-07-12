"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  savePost,
  unsavePost,
} from "../../api/postApi";

export function useSavePost() {
  const queryClient = useQueryClient();

  const invalidateQueries = () => {
    // Refresh Feed
    queryClient.invalidateQueries({
      queryKey: ["posts"],
    });

    // Refresh Saved Posts
    queryClient.invalidateQueries({
      queryKey: ["saved-posts"],
    });
  };

  const saveMutation = useMutation({
    mutationFn: savePost,

    onSuccess: invalidateQueries,
  });

  const unsaveMutation = useMutation({
    mutationFn: unsavePost,

    onSuccess: invalidateQueries,
  });

  return {
    savePost: saveMutation.mutate,
    unsavePost: unsaveMutation.mutate,

    isSaving: saveMutation.isPending,
    isUnsaving: unsaveMutation.isPending,
  };
}