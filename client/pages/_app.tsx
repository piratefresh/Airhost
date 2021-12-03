import React from "react";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { ModalProvider } from "react-modal-hook";
import { ReceiverProvider } from "../context/messageContext";
import { AnimateSharedLayout } from "framer-motion";

function MyApp({ Component, pageProps }: any) {
  return (
    <ThemeProvider attribute="class">
      <ModalProvider>
        <ReceiverProvider>
          <AnimateSharedLayout type="crossfade">
            <Component {...pageProps} />
          </AnimateSharedLayout>
        </ReceiverProvider>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(MyApp);
