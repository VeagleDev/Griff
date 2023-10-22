import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "./styles/style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import globalStyle from "./styles/mantine.style";
import { Layout } from "./pages/layout";
import Home from "./pages/Home";
import LoadingWheel from "./components/Misc/LoadingWheel";
import "./styles/app.scss";
import useConfig from "./hooks/useConfig";
import axios from "axios";
import toast from "./utils/toast.util";
import OfflinePage from "./components/Misc/OfflinePage";
import { Login } from "./pages/Login/Login";
import "./services/manager.service";
import { Command } from "@tauri-apps/api/shell";

function App() {
  const [isLogged, setIsLogged] = useState(99); // 0 pour stable, 99 pour dev
  const [reload, setReload] = useState(0);
  const [forceDisplay, setForceDisplay] = useState(false);
  const forcedElementRef = useRef(<></>);
  const isLoading = useRef(false);

  const { get } = useConfig();
  useEffect(() => {
    (async () => {
      if (isLogged === 99) return;
      if (isLoading.current) return;
      isLoading.current = true;

      const serverUrl = await get("serverUrl");
      const token = await get("token");

      if (!serverUrl) {
        setIsLogged(1);
        return;
      }

      if (!token) {
        toast.error("Le token enregistré est invalide");
        setIsLogged(1);
        return;
      }

      await axios
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
        )
        .then((res) => {
          if (res.status === 200 && res.data.ok) {
            setIsLogged(2);
          } else {
            toast.error("Le token enregistré a été refusé");
            setIsLogged(1);
          }
          if (forceDisplay) setForceDisplay(false);
        })
        .catch((err) => {
          if (err.code === "ERR_NETWORK" || err.code === "ECONNABORTED") {
            console.warn("Pas de connexion aux internets");
            toast.error("Vous n'êtes pas connecté à internet");
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
            console.error(err);
            setIsLogged(1);
            if (forceDisplay) setForceDisplay(false);
          }
        });
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
          </Route> // --------------------------------------------------
        ) : (
          // Pour le frontend

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
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
  <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{ colorScheme: "dark", ...globalStyle }}
  >
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
