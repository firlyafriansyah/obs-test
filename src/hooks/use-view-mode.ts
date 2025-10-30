import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../contexts/app/store';
import { setViewModeState } from '../contexts/features/view-mode/view-mode-slice';

export default function useViewMode() {
  const dispatch = useDispatch<AppDispatch>();
  const viewMode = useSelector((state: RootState) => state.viewMode.viewModeState);

  const setViewMode = React.useCallback(
    (view: 'grid' | 'list') => {
      dispatch(setViewModeState(view));
    },
    [dispatch],
  );

  return { viewMode, setViewMode };
}
