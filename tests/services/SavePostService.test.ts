import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SavedPostsService } from '../../src/server/services/SavedPostsService';
import { savedRepository } from '../../src/server/repositories/SavedRepository';

// Mock the repository
vi.mock('@/server/repositories', () => ({
  savedRepository: {
    findByUserAndPost: vi.fn(),
    create: vi.fn(),
    restore: vi.fn(),
    softDelete: vi.fn(),
  },
}));

describe('SavedPostsService', () => {
  let service: SavedPostsService;

  beforeEach(() => {
    service = new SavedPostsService();
    vi.clearAllMocks();
  });

  describe('savePost', () => {
    it('should create a new saved record if none exists', async () => {
      const userId = 'user-1';
      const postId = 'post-1';
      const newRecord = { id: 'saved-1', userId, postId, deletedAt: null };

      vi.mocked(savedRepository.findByUserAndPost).mockResolvedValue(undefined);
      vi.mocked(savedRepository.create).mockResolvedValue(newRecord);

      const result = await service.savePost(userId, postId);

      expect(savedRepository.findByUserAndPost).toHaveBeenCalledWith(userId, postId);
      expect(savedRepository.create).toHaveBeenCalledWith({ userId, postId });
      expect(result).toEqual(newRecord);
    });

    it('should return existing active record (no-op) if already saved', async () => {
      const userId = 'user-1';
      const postId = 'post-1';
      const existing = { id: 'saved-1', userId, postId, deletedAt: null };

      vi.mocked(savedRepository.findByUserAndPost).mockResolvedValue(existing);

      const result = await service.savePost(userId, postId);

      expect(savedRepository.findByUserAndPost).toHaveBeenCalledWith(userId, postId);
      expect(savedRepository.create).not.toHaveBeenCalled();
      expect(result).toEqual(existing);
    });

    it('should restore a soft-deleted record if it exists', async () => {
      const userId = 'user-1';
      const postId = 'post-1';
      const deleted = { id: 'saved-1', userId, postId, deletedAt: new Date() };
      const restored = { ...deleted, deletedAt: null };

      vi.mocked(savedRepository.findByUserAndPost).mockResolvedValue(deleted);
      vi.mocked(savedRepository.restore).mockResolvedValue(restored);

      const result = await service.savePost(userId, postId);

      expect(savedRepository.findByUserAndPost).toHaveBeenCalledWith(userId, postId);
      expect(savedRepository.restore).toHaveBeenCalledWith(deleted.id);
      expect(result).toEqual(restored);
    });
  });

  describe('unsavePost', () => {
    it('should soft-delete an active saved record', async () => {
      const userId = 'user-1';
      const postId = 'post-1';
      const active = { id: 'saved-1', userId, postId, deletedAt: null };
      const softDeleted = { ...active, deletedAt: new Date() };

      vi.mocked(savedRepository.findByUserAndPost).mockResolvedValue(active);
      vi.mocked(savedRepository.softDelete).mockResolvedValue(softDeleted);

      const result = await service.unsavePost(userId, postId);

      expect(savedRepository.findByUserAndPost).toHaveBeenCalledWith(userId, postId);
      expect(savedRepository.softDelete).toHaveBeenCalledWith(active.id);
      expect(result).toEqual(softDeleted);
    });

    it('should do nothing if record is already soft-deleted', async () => {
      const userId = 'user-1';
      const postId = 'post-1';
      const deleted = { id: 'saved-1', userId, postId, deletedAt: new Date() };

      vi.mocked(savedRepository.findByUserAndPost).mockResolvedValue(deleted);

      const result = await service.unsavePost(userId, postId);

      expect(savedRepository.findByUserAndPost).toHaveBeenCalledWith(userId, postId);
      expect(savedRepository.softDelete).not.toHaveBeenCalled();
      expect(result).toEqual(deleted);
    });

    it('should do nothing if no record exists', async () => {
      const userId = 'user-1';
      const postId = 'post-1';

      vi.mocked(savedRepository.findByUserAndPost).mockResolvedValue(undefined);

      const result = await service.unsavePost(userId, postId);

      expect(savedRepository.findByUserAndPost).toHaveBeenCalledWith(userId, postId);
      expect(savedRepository.softDelete).not.toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });
});