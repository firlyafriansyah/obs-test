import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../contexts/app/store";
import { setAlertState } from "../contexts/features/alert/alert-slice";

export default function useAlert() {
  const dispatch = useDispatch<AppDispatch>();
  const alert = useSelector((state: RootState) => state.alert.alertState);

  const setAlert = React.useCallback(
    (alert: { show: boolean; type: "success" | "error" }) => {
      dispatch(setAlertState(alert));
    },
    [dispatch]
  );

  return { alert, setAlert };
}
