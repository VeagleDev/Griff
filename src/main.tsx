import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import React from "react";
import ReactDOM from "react-dom/client";

import globalStyle from "./styles/mantine.style";

import Index from "./pages/index";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark", ...globalStyle }}
    >
      <Notifications />
      <ModalsProvider>
        <Index />
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>
);
