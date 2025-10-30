import React from 'react';
import useAlert from '../hooks/use-alert';

export default function DialogAlert(): React.ReactElement {
  const { alert, setAlert } = useAlert();

  return (
    <div
      className={`absolute top-0 left-0 z-10 h-svh w-svw items-center justify-center bg-black/30 px-4 transition-all ${
        alert.show ? 'flex' : 'hidden'
      }`}
    >
      <div className="relative flex min-w-52 flex-col items-center rounded-2xl bg-white p-8 shadow-2xl">
        {alert.type === 'success' ? (
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
        <div className="mt-2 text-center">
          <p className="mb-4 text-xl font-semibold">
            {alert.type === 'success' ? 'Success' : 'Failed'}
          </p>
          <p>{alert.message}</p>
        </div>

        <div>
          <button
            className="mt-8 h-10 w-24 cursor-pointer rounded-lg bg-gray-500 px-3 text-white hover:bg-gray-600"
            onClick={() => setAlert({ show: false, type: 'success', message: '' })}
          >
            Close
          </button>
        </div>

        <div className="absolute top-4 right-4">
          <button
            onClick={() => setAlert({ show: false, type: 'success', message: '' })}
            className="cursor-pointer rounded-lg p-1 hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              role="button"
            >
              <title>Close</title>
              <line x1={18} y1={6} x2={6} y2={18} />
              <line x1={6} y1={6} x2={18} y2={18} />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
