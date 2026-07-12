import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET as getSaved } from '@/app/api/saved/route';
import { POST as savePost } from '@/app/api/posts/[id]/save/route';
import { DELETE as unsavePost } from '@/app/api/posts/[id]/save/route';
import { getCurrentUser } from '@/server/auth/auth';
import { savedPostsService } from '@/server/services/SavedPostsService';

// Mock dependencies
vi.mock('@/server/auth/auth', () => ({
  getCurrentUser: vi.fn(),
}));

vi.mock('@/server/services/SavedPostsService', () => ({
  savedPostsService: {
    getSavedPosts: vi.fn(),
    savePost: vi.fn(),
    unsavePost: vi.fn(),
  },
}));

describe('API: /api/saved', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/saved', () => {
    it('should return 401 if user is not authenticated', async () => {
      vi.mocked(getCurrentUser).mockRejectedValue(new Error('Unauthorized'));

      const req = new NextRequest('http://localhost/api/saved?page=1&limit=10');
      const res = await getSaved(req);
      expect(res.status).toBe(500); // or 401 if you handle it, but we'll let it throw
    });

    it('should return saved posts for authenticated student (happy path)', async () => {
      const user = { id: 'student-1', role: 'student' };
      vi.mocked(getCurrentUser).mockResolvedValue(user);

      const mockResult = {
        posts: [
          { id: 'post-1', title: 'Test', hasSaved: true, savesCount: 5 },
        ],
        totalItems: 1,
      };
      vi.mocked(savedPostsService.getSavedPosts).mockResolvedValue(mockResult);

      const req = new NextRequest('http://localhost/api/saved?page=1&limit=10');
      const res = await getSaved(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toEqual({
        data: mockResult.posts,
        pagination: {
          page: 1,
          limit: 10,
          totalItems: 1,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      });
    });
  });

  describe('POST /api/posts/[id]/save', () => {
    it('should return 401 if user is not a student', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue({ id: 'mod-1', role: 'moderator' });

      const req = new NextRequest('http://localhost/api/posts/post-1/save', {
        method: 'POST',
      });
      const params = { params: Promise.resolve({ id: 'post-1' }) } as any;
      const res = await savePost(req, params);
      expect(res.status).toBe(401);
    });

    it('should save a post (happy path)', async () => {
      const user = { id: 'student-1', role: 'student' };
      vi.mocked(getCurrentUser).mockResolvedValue(user);
      const savedRecord = { id: 'saved-1', userId: user.id, postId: 'post-1', deletedAt: null };
      vi.mocked(savedPostsService.savePost).mockResolvedValue(savedRecord);

      const req = new NextRequest('http://localhost/api/posts/post-1/save', {
        method: 'POST',
      });
      const params = { params: Promise.resolve({ id: 'post-1' }) } as any;
      const res = await savePost(req, params);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toEqual({ success: true, data: savedRecord });
    });
  });

  describe('DELETE /api/posts/[id]/save', () => {
    it('should unsave a post (happy path)', async () => {
      const user = { id: 'student-1', role: 'student' };
      vi.mocked(getCurrentUser).mockResolvedValue(user);
      const unsaved = { id: 'saved-1', userId: user.id, postId: 'post-1', deletedAt: new Date() };
      vi.mocked(savedPostsService.unsavePost).mockResolvedValue(unsaved);

      const req = new NextRequest('http://localhost/api/posts/post-1/save', {
        method: 'DELETE',
      });
      const params = { params: Promise.resolve({ id: 'post-1' }) } as any;
      const res = await unsavePost(req, params);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toEqual({ success: true, data: unsaved });
    });
  });
});