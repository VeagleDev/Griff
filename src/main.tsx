import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./services/manager.service";
import { Command } from "@tauri-apps/api/shell";
import ConfigType from "./types/config.type";
import { InstalledGame } from "./types/game.type";
import { ExtendedDownloadInfo } from "./types/downloads.type";
import { App } from "./app";

export const ConfigContext = createContext({} as ConfigType);
export const InstalledGameContext = createContext([] as InstalledGame[]);
export const DownloadInfosContext = createContext([] as ExtendedDownloadInfo[]);

const command = Command.sidecar("ressources/aria2c.exe", [
  "--enable-rpc=true",
  "--check-integrity=true",
  "--continue=true",
  "--seed-time=0",
  "--save-session=session.aria2",
  "--always-resume=true",
  "--console-log-level=error",
]);

command
  .execute()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MantineProvider theme={{ colorScheme: "dark" }}>
    <Notifications />
    <ModalsProvider
      modalProps={{
        style: { left: 0 },
        centered: true,
      }}
    >
      <App />
    </ModalsProvider>
  </MantineProvider>,
);
