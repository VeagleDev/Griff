import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "./pages/layout";
import Home from "./pages/Home";
import Game from "./pages/Game";
import LoadingWheel from "./components/Misc/LoadingWheel";
import useConfig from "./hooks/useConfig";
import axios from "axios";
import toast from "./utils/toast.util";
import OfflinePage from "./components/Misc/OfflinePage";
import { Login } from "./pages/Login/Login";
import "./services/manager.service";
import { Command } from "@tauri-apps/api/shell";
import {DataConfigSchema} from "./types/config.type";

function App() {
  const [isLogged, setIsLogged] = useState(99); // 0 pour stable, 99 pour dev
  const [reload, setReload] = useState(0);
  const [forceDisplay, setForceDisplay] = useState(false);
  const forcedElementRef = useRef(<></>);
  const isLoading = useRef(false);

  const { all } = useConfig();

  useEffect(() => {
    (async () => {
      if (isLogged === 99) return;
      if (isLoading.current) return;
      isLoading.current = true;

      const parsed = DataConfigSchema.safeParse(await all());
      if (!parsed.success) {
        toast.error("Le fichier de configuration est invalide");
        console.error(parsed.error);
        setIsLogged(1);
      } else {
        const { serverUrl, token } = parsed.data;
        try {
          const res = await axios
            .post(
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

          if(res.status !== 200) {
            switch (res.status) {
              case 401:
                toast.error("Le token enregistré a été refusé");
                setIsLogged(1);
                break;
              case 403:
                toast.error("Vous n'avez pas la permission d'accéder à ce serveur");
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

        } catch(e: any) {
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

  if (forceDisplay) return forcedElementRef.current;

  return (
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
  <MantineProvider>
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
