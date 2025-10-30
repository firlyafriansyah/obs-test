import { describe, expect, it } from 'vitest';
import viewModeReducer, {
  setViewModeState,
} from '../../contexts/features/view-mode/view-mode-slice';
import type { ViewModeDataType } from '../../models/view-mode';

describe('viewModeSlice', () => {
  const initialState = {
    viewModeState: 'grid' as ViewModeDataType,
  };

  describe('setViewModeState', () => {
    it('should set view mode to grid', () => {
      const state = viewModeReducer(initialState, setViewModeState('grid'));
      expect(state.viewModeState).toBe('grid');
    });

    it('should set view mode to list', () => {
      const state = viewModeReducer(initialState, setViewModeState('list'));
      expect(state.viewModeState).toBe('list');
    });

    it('should update view mode from grid to list', () => {
      const existingState = {
        viewModeState: 'grid' as ViewModeDataType,
      };
      const state = viewModeReducer(existingState, setViewModeState('list'));
      expect(state.viewModeState).toBe('list');
    });

    it('should update view mode from list to grid', () => {
      const existingState = {
        viewModeState: 'list' as ViewModeDataType,
      };
      const state = viewModeReducer(existingState, setViewModeState('grid'));
      expect(state.viewModeState).toBe('grid');
    });

    it('should keep view mode as grid when already grid', () => {
      const existingState = {
        viewModeState: 'grid' as ViewModeDataType,
      };
      const state = viewModeReducer(existingState, setViewModeState('grid'));
      expect(state.viewModeState).toBe('grid');
    });

    it('should keep view mode as list when already list', () => {
      const existingState = {
        viewModeState: 'list' as ViewModeDataType,
      };
      const state = viewModeReducer(existingState, setViewModeState('list'));
      expect(state.viewModeState).toBe('list');
    });
  });
});
