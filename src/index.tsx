import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ActiveAssetProvider } from "./contexts/ActiveAssetContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ActiveAssetProvider>
        <App />
      </ActiveAssetProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
