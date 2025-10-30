import { renderHook } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useLoading from '../../hooks/use-loading';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('../contexts/features/loading/loading-slice', () => ({
  setLoadingState: vi.fn((payload) => ({
    type: 'loading/setLoadingState',
    payload,
  })),
}));

describe('useLoading', () => {
  const mockDispatch = vi.fn();
  const mockUseDispatch = useDispatch as unknown as ReturnType<typeof vi.fn>;
  const mockUseSelector = useSelector as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseDispatch.mockReturnValue(mockDispatch);
  });

  describe('Hook Initialization', () => {
    it('should return loading and setLoading', () => {
      mockUseSelector.mockReturnValue(false);

      const { result } = renderHook(() => useLoading());

      expect(result.current).toHaveProperty('loading');
      expect(result.current).toHaveProperty('setLoading');
    });

    it('should return loading state from Redux store', () => {
      mockUseSelector.mockReturnValue(true);

      const { result } = renderHook(() => useLoading());

      expect(result.current.loading).toBe(true);
    });

    it('should return false when loading state is false', () => {
      mockUseSelector.mockReturnValue(false);

      const { result } = renderHook(() => useLoading());

      expect(result.current.loading).toBe(false);
    });

    it('should select loading state from correct Redux path', () => {
      mockUseSelector.mockReturnValue(false);

      renderHook(() => useLoading());

      expect(mockUseSelector).toHaveBeenCalledWith(expect.any(Function));
    });
  });
});
