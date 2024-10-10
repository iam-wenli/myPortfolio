import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="p-20 grid place-content-center justify-items-center pt-20 space-y-7">
      <h1 className="font-bold text-3xl">Oops!</h1>
      <p>Sorry, an unexpected error has occurred</p>
      <p className="text-sky-800">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;
