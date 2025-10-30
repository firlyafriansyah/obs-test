import { describe, it, expect } from 'vitest';
import loadingReducer, { setLoadingState } from '../../contexts/features/loading/loading-slice';

describe('loadingSlice', () => {
  const initialState = {
    loadingState: false,
  };

  describe('setLoadingState', () => {
    it('should set loading state to true', () => {
      const state = loadingReducer(initialState, setLoadingState(true));
      expect(state.loadingState).toBe(true);
    });

    it('should set loading state to false', () => {
      const state = loadingReducer(initialState, setLoadingState(false));
      expect(state.loadingState).toBe(false);
    });

    it('should update loading state from false to true', () => {
      const existingState = {
        loadingState: false,
      };
      const state = loadingReducer(existingState, setLoadingState(true));
      expect(state.loadingState).toBe(true);
    });

    it('should update loading state from true to false', () => {
      const existingState = {
        loadingState: true,
      };
      const state = loadingReducer(existingState, setLoadingState(false));
      expect(state.loadingState).toBe(false);
    });

    it('should keep loading state as true when already true', () => {
      const existingState = {
        loadingState: true,
      };
      const state = loadingReducer(existingState, setLoadingState(true));
      expect(state.loadingState).toBe(true);
    });

    it('should keep loading state as false when already false', () => {
      const existingState = {
        loadingState: false,
      };
      const state = loadingReducer(existingState, setLoadingState(false));
      expect(state.loadingState).toBe(false);
    });
  });
});
