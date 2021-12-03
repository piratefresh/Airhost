import React from "react";
import { useRouter } from "next/router";
import Error from "next/error";

export default function ResolveRoute() {
  const router = useRouter();

  React.useEffect(() => {
    if (router.pathname === router.pathname.toLowerCase()) {
      // Route is already lowercase but matched catch all
      // page not found, display 404
      return <Error statusCode={404} />;
    } else {
      router.push(router.pathname.toLowerCase());
    }
  });

  return <p>Redirecting...</p>;
}
