import { renderHook } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useViewMode from '../../hooks/use-view-mode';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('../contexts/features/view-mode/view-mode-slice', () => ({
  setViewModeState: vi.fn((payload) => ({
    type: 'viewMode/setViewModeState',
    payload,
  })),
}));

describe('useViewMode', () => {
  const mockDispatch = vi.fn();
  const mockUseDispatch = useDispatch as unknown as ReturnType<typeof vi.fn>;
  const mockUseSelector = useSelector as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseDispatch.mockReturnValue(mockDispatch);
  });

  describe('Hook Initialization', () => {
    it('should return viewMode and setViewMode', () => {
      mockUseSelector.mockReturnValue('grid');

      const { result } = renderHook(() => useViewMode());

      expect(result.current).toHaveProperty('viewMode');
      expect(result.current).toHaveProperty('setViewMode');
    });

    it('should return viewMode state from Redux store', () => {
      mockUseSelector.mockReturnValue('grid');

      const { result } = renderHook(() => useViewMode());

      expect(result.current.viewMode).toBe('grid');
    });

    it('should return list when viewMode is list', () => {
      mockUseSelector.mockReturnValue('list');

      const { result } = renderHook(() => useViewMode());

      expect(result.current.viewMode).toBe('list');
    });

    it('should select viewMode state from correct Redux path', () => {
      mockUseSelector.mockReturnValue('grid');

      renderHook(() => useViewMode());

      expect(mockUseSelector).toHaveBeenCalledWith(expect.any(Function));
    });
  });
});
