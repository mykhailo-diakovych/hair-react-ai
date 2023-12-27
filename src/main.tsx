import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React, { Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import { GlobalStyles } from "@styles/global.styled";
import { queryClient } from "@config/query";

import { Theme } from "@components/Theme/Theme";
import { Loader } from "@components/Loader/Loader";

import { ErrorBoundary } from "@components/ErrorBoundary/ErrorBoundary";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Theme darkMode={false}>
      <GlobalStyles />

      <ToastContainer />

      <ErrorBoundary message={"Router error"}>
        <Suspense fallback={<Loader />}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Suspense>
      </ErrorBoundary>
    </Theme>
    {/*<ReactQueryDevtools initialIsOpen={false} />*/}
  </QueryClientProvider>
  // </React.StrictMode>
);
