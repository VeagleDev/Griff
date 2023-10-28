import {MantineProvider} from "@mantine/core";
import {ModalsProvider} from "@mantine/modals";
import {Notifications} from "@mantine/notifications";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React, {createContext, useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom/client";
import {Layout} from "./pages/layout";
import Home from "./pages/Home";
import Game from "./pages/Game";
import LoadingWheel from "./components/Misc/LoadingWheel";
import useConfig from "./hooks/useConfig";
import axios from "axios";
import toast from "./utils/toast.util";
import OfflinePage from "./components/Misc/OfflinePage";
import {Login} from "./pages/Login/Login";
import "./services/manager.service";
import {Command} from "@tauri-apps/api/shell";
import ConfigType, {DataConfigSchema} from "./types/config.type";
import {InstalledGame} from "./types/game.type";
import {ExtendedDownloadInfo} from "./types/downloads.type";

export const ConfigContext = createContext({} as ConfigType);
export const InstalledGameContext = createContext([] as InstalledGame[]);
export const DownloadInfosContext = createContext([] as ExtendedDownloadInfo[]);

function App() {
  const [isLogged, setIsLogged] = useState(99); // 0 pour stable, 99 pour dev
  const [reload, setReload] = useState(0);
  const [forceDisplay, setForceDisplay] = useState(false);
  const forcedElementRef = useRef(<></>);
  const isLoading = useRef(false);
  const [config, setConfig] = useState({} as ConfigType);
  const [installedGames, setInstalledGames] = useState([
    {
      id: 0,
      name: "Minecraft",
      installPath: "/games/minecraft",
      executable: "Minecraft.exe",
      version: "v1.17",
      installed: true,
      size: 512, // in megabytes
    },
    {
      id: 1,
      name: "Fortnite",
      installPath: "/games/fortnite",
      executable: "Fortnite.exe",
      version: "v15.0",
      installed: true,
      size: 2048, // in megabytes
    },
  ] as InstalledGame[]);

  const [downloadInfos, setDownloadInfos] = useState([
    {
      id: 1,
      gid: "1",
      status: "active",
      progress: 53,
      downloadSpeed: 1024,
      totalLength: 1024 * 1024 * 1024,
      completedLength: 1024 * 1024 * 1024 * 0.53,
    },
    {
      id: 2,
      gid: "2",
      status: "complete",
      progress: 100,
      downloadSpeed: 0,
      totalLength: 1024 * 1024 * 1024,
      completedLength: 1024 * 1024 * 1024,
    },
  ] as ExtendedDownloadInfo[]);

  const { all } = useConfig();

  useEffect(() => {
    (async () => {
      const parsed = DataConfigSchema.safeParse(await all());
      if (parsed.success) setConfig(parsed.data as ConfigType);

      if (isLogged === 99) return;
      if (isLoading.current) return;
      isLoading.current = true;

      if (!parsed.success) {
        toast.error("Le fichier de configuration est invalide");
        console.error(parsed.error);
        setIsLogged(1);
      } else {
        const { serverUrl, token } = parsed.data;
        try {
          const res = await axios.post(
            "/token",
            {},
            {
              baseURL: serverUrl,
              timeout: 3000,
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            },
          );

          if (res.status !== 200) {
            switch (res.status) {
              case 401:
                toast.error("Le token enregistré a été refusé");
                setIsLogged(1);
                break;
              case 403:
                toast.error(
                  "Vous n'avez pas la permission d'accéder à ce serveur",
                );
                setIsLogged(1);
                break;
              default:
                toast.error("La communication avec le serveur a échoué");
                setIsLogged(1);
                break;
            }
          } else {
            setIsLogged(2);
          }
          if (forceDisplay) setForceDisplay(false);
        } catch (e: any) {
          if (e.code === "ERR_NETWORK" || e.code === "ECONNABORTED") {
            console.warn("Pas de connexion aux internets");
            toast.error("La connexion avec le serveur a échoué");
            setForceDisplay(true);
            forcedElementRef.current = (
              <OfflinePage
                server={serverUrl}
                reloadApp={setReload}
                userToken={token}
              />
            );
          } else {
            toast.error("La connexion au serveur a échoué");
            console.error(e);
            setIsLogged(1);
            if (forceDisplay) setForceDisplay(false);
          }
        }
      }

      isLoading.current = false;
    })();
  }, [reload]);

  useEffect(() => {
    if (!config.installedGames) return;
    for (const game of config.installedGames) {
      if (installedGames.find((g) => g.id === game.id)) continue;
      setInstalledGames((prev) => [...prev, game]);
    }
  }, [config]);

  if (forceDisplay) return forcedElementRef.current;

  return (
    <ConfigContext.Provider value={config}>
      <InstalledGameContext.Provider value={installedGames}>
        <DownloadInfosContext.Provider value={downloadInfos}>
          <Router>
            <Routes>
              {isLogged === 0 ? ( // Utilisé pour le backend ----------------------
                <Route index element={<LoadingWheel />} />
              ) : isLogged === 1 ? (
                <Route index element={<Login reloadApp={setReload} />} />
              ) : isLogged === 2 ? (
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="/game" element={<Game />} />
                </Route> // --------------------------------------------------
              ) : (
                // Pour le frontend
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="/game" element={<Game />} />
                </Route>
              )}
            </Routes>
          </Router>
        </DownloadInfosContext.Provider>
      </InstalledGameContext.Provider>
    </ConfigContext.Provider>
  );
}

const command = Command.sidecar("ressources/aria2c.exe", ["--enable-rpc=true"]);
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
