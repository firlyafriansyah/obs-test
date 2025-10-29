import * as React from "react";
import useAlert from "../hooks/use-alert";

export default function DialogAlert() {
  const { alert, setAlert } = useAlert();

  React.useEffect(() => {
    if (!open) return;
    setTimeout(() => {
      setAlert({ show: false, type: "success" });
    }, 2000);
  }, [setAlert]);

  return (
    <div
      className={`absolute top-0 left-0 justify-center items-center bg-black/30 h-svh w-svw z-10 transition-all px-4 ${
        alert.show ? "flex" : "hidden"
      }`}
    >
      <div className="flex flex-col items-center relative w-52 h-52 bg-white shadow-2xl rounded-2xl p-8">
        {alert.type === "success" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={128}
            height={128}
            viewBox="0 0 24 24"
            fill="none"
            role="img"
          >
            <title>Success</title>
            <circle cx="12" cy="12" r="10" className="fill-green-500" />
            <path
              d="M8 12l2.5 2.5L16 9"
              className="stroke-white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={128}
            height={128}
            viewBox="0 0 24 24"
            fill="none"
            role="img"
          >
            <title>Failed</title>
            <circle cx="12" cy="12" r="10" className="fill-red-500" />
            <path
              d="M15 9L9 15M9 9l6 6"
              className="stroke-white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        <div className="mt-4 text-center">
          <p className="font-semibold text-xl mb-2">
            {alert.type === "success" ? "Success" : "Failed"}
          </p>
          <p className="text-xs font-light">(Automatic Close)</p>
        </div>
      </div>
    </div>
  );
}
