"use client";

import { useQuery } from "@tanstack/react-query";

import { getSavedPosts } from "../api/savedApi";
import { queryKeys } from "@/lib/queryKeys";

export function useSavedPosts() {
  return useQuery({
    queryKey: queryKeys.savedPosts,
    queryFn: getSavedPosts,
  });
}