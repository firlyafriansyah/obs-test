import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../contexts/app/store';
import { setLoadingState } from '../contexts/features/loading/loading-slice';

export default function useLoading() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.loading.loadingState);

  const setLoading = React.useCallback(
    (loading: boolean) => {
      dispatch(setLoadingState(loading));
    },
    [dispatch],
  );

  return { loading, setLoading };
}
