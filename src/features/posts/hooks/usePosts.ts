"use client";

import { useQuery } from "@tanstack/react-query";

import { getPosts } from "../api/postApi";
import { queryKeys } from "@/lib/queryKeys";

export function usePosts() {
  return useQuery({
    queryKey: queryKeys.posts,
    queryFn: getPosts,
  });
}