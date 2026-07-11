"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  savePost,
  unsavePost,
} from "../api/postApi";

import { queryKeys } from "@/lib/queryKeys";

export function useSavePost() {
  const queryClient = useQueryClient();

  const invalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.posts,
    });

    queryClient.invalidateQueries({
      queryKey: queryKeys.savedPosts,
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