import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "./styles/style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React, { useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import globalStyle from "./styles/mantine.style";
import { Login } from "./pages/Login/login";
import { Layout } from "./pages/layout";
import Home from "./pages/Home";
import LoadingWheel from "./components/Misc/LoadingWheel";
import "./styles/app.scss";
import useConfig from "./hooks/useConfig";
import api from "./services/api.service";

function App() {
  const [isLogged, setIsLogged] = useState(99); // 0 pour stable, 99 pour dev
  const [reload, setReload] = useState(0);



  const { get } = useConfig();
  useEffect(() => {
    (async () => {
      if(isLogged === 99)
        return;

      if(!await get("serverUrl"))
      {
        setIsLogged(1);
        return;
      }

      const token = await get("token");
      if(!token)
      {
        setIsLogged(1);
        return;
      }

      await api.post("/user/verify", {token})
        .then((res) => {
          if(res.status === 200 && res.data.ok === true)
          {
            setIsLogged(2);
            console.log(res);
          }
          else
          {
            console.log(res);
            setIsLogged(1);

          }
        })
        .catch((err) => {
          console.log(err);
          setIsLogged(1);
        });
    })();

  }, [reload]);
  return(
    <Router>
      <Routes>
        { isLogged == 0 ? // Utilisé pour le backend ----------------------
          <Route index element={<LoadingWheel />} />  :
          isLogged == 1 ?
            <Route index element={<Login complete={setReload}/>} /> :
            isLogged == 2 ?
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
            </Route> : // --------------------------------------------------

              // Pour le frontend


              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
              </Route>


        }
      </Routes>
    </Router>
  );

}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark", ...globalStyle }}
    >
      <Notifications />
      <ModalsProvider>
        <App />
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>
);
