import { renderHook } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useAlert from '../../hooks/use-alert';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('../contexts/features/alert/alert-slice', () => ({
  setAlertState: vi.fn((payload) => ({
    type: 'alert/setAlertState',
    payload,
  })),
}));

describe('useAlert', () => {
  const mockDispatch = vi.fn();
  const mockUseDispatch = useDispatch as unknown as ReturnType<typeof vi.fn>;
  const mockUseSelector = useSelector as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseDispatch.mockReturnValue(mockDispatch);
  });

  describe('Hook Initialization', () => {
    it('should return alert and setAlert', () => {
      mockUseSelector.mockReturnValue({
        show: false,
        type: 'error',
        message: '',
      });

      const { result } = renderHook(() => useAlert());

      expect(result.current).toHaveProperty('alert');
      expect(result.current).toHaveProperty('setAlert');
    });

    it('should return alert state from Redux store', () => {
      const mockAlertState = {
        show: true,
        type: 'success' as const,
        message: 'Test message',
      };
      mockUseSelector.mockReturnValue(mockAlertState);

      const { result } = renderHook(() => useAlert());

      expect(result.current.alert).toEqual(mockAlertState);
    });

    it('should select alert state from correct Redux path', () => {
      mockUseSelector.mockReturnValue({
        show: false,
        type: 'error',
        message: '',
      });

      renderHook(() => useAlert());

      expect(mockUseSelector).toHaveBeenCalledWith(expect.any(Function));
    });
  });
});
