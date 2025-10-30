import { describe, it, expect } from 'vitest';
import alertReducer, { setAlertState } from '../../contexts/features/alert/alert-slice';

describe('alertSlice', () => {
  const initialState = {
    alertState: {
      show: false,
      type: 'error' as const,
      message: '',
    },
  };

  describe('setAlertState', () => {
    it('should set alert state with success type', () => {
      const payload = {
        show: true,
        type: 'success' as const,
        message: 'Operation successful',
      };
      const state = alertReducer(initialState, setAlertState(payload));

      expect(state.alertState).toEqual(payload);
      expect(state.alertState.show).toBe(true);
      expect(state.alertState.type).toBe('success');
      expect(state.alertState.message).toBe('Operation successful');
    });

    it('should set alert state with error type', () => {
      const payload = {
        show: true,
        type: 'error' as const,
        message: 'Operation failed',
      };
      const state = alertReducer(initialState, setAlertState(payload));

      expect(state.alertState).toEqual(payload);
      expect(state.alertState.show).toBe(true);
      expect(state.alertState.type).toBe('error');
      expect(state.alertState.message).toBe('Operation failed');
    });

    it('should hide alert when show is false', () => {
      const existingState = {
        alertState: {
          show: true,
          type: 'success' as const,
          message: 'Success message',
        },
      };
      const payload = {
        show: false,
        type: 'success' as const,
        message: '',
      };
      const state = alertReducer(existingState, setAlertState(payload));

      expect(state.alertState.show).toBe(false);
    });

    it('should update existing alert state', () => {
      const existingState = {
        alertState: {
          show: true,
          type: 'success' as const,
          message: 'Old message',
        },
      };
      const payload = {
        show: true,
        type: 'error' as const,
        message: 'New error message',
      };
      const state = alertReducer(existingState, setAlertState(payload));

      expect(state.alertState).toEqual(payload);
      expect(state.alertState.type).toBe('error');
      expect(state.alertState.message).toBe('New error message');
    });

    it('should replace entire alert state object', () => {
      const existingState = {
        alertState: {
          show: true,
          type: 'success' as const,
          message: 'Old message',
        },
      };
      const payload = {
        show: false,
        type: 'error' as const,
        message: '',
      };
      const state = alertReducer(existingState, setAlertState(payload));

      expect(state.alertState).toEqual(payload);
    });

    it('should handle empty message', () => {
      const payload = {
        show: true,
        type: 'success' as const,
        message: '',
      };
      const state = alertReducer(initialState, setAlertState(payload));

      expect(state.alertState.message).toBe('');
    });

    it('should set success alert with show true', () => {
      const payload = {
        show: true,
        type: 'success' as const,
        message: 'User created successfully',
      };
      const state = alertReducer(initialState, setAlertState(payload));

      expect(state.alertState.show).toBe(true);
      expect(state.alertState.type).toBe('success');
      expect(state.alertState.message).toBe('User created successfully');
    });

    it('should set error alert with show true', () => {
      const payload = {
        show: true,
        type: 'error' as const,
        message: 'Failed to delete user',
      };
      const state = alertReducer(initialState, setAlertState(payload));

      expect(state.alertState.show).toBe(true);
      expect(state.alertState.type).toBe('error');
      expect(state.alertState.message).toBe('Failed to delete user');
    });
  });
});
