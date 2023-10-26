import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { createContext, useEffect, useState } from "react";
import { OnlineGame } from "../types/game.type";
import api from "../services/api.service";
import toast from "../utils/toast.util";
export const GameContext = createContext([] as OnlineGame[]);

export function Layout() {
  const [games, setGames] = useState([
    {
      id: 0,
      name: "Minecraft",
      installPath: "/games/minecraft",
      executable: "Minecraft.exe",
      version: "v1.17",
      size: 512, // in megabytes

      props: {
        name: "Minecraft",
        description:
          "Minecraft is a sandbox game that allows players to build and explore virtual worlds made up of blocks. Use your creativity to survive and thrive.",
        verticalIcon:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/co49x5.png",
        background:
          "https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_Minecraft.jpg",
        altBackground:
          "https://cdn-s-www.leprogres.fr/images/982953C8-5BFF-432B-813A-3EB902286E2A/NW_raw/capture-d-ecran-1446570191.jpg",
      },
    },
    {
      id: 1,
      name: "Fortnite",
      installPath: "/games/fortnite",
      executable: "Fortnite.exe",
      version: "v15.0",
      size: 2048, // in megabytes

      props: {
        name: "Fortnite",
        description:
          "Fortnite is a popular battle royale game developed by Epic Games. Jump into a vibrant world and compete to be the last one standing.",
        verticalIcon:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ekt.png",
        background:
          "https://cdn1.epicgames.com/offer/fn/26BR_C4S4_EGS_Launcher_Blade_2560x1440_2560x1440-2f0e6725b93cd1b8450d82cf04f722c8",
        altBackground:
          "https://cdn.sortiraparis.com/images/80/66131/908390-fortnite-enfer-vert-map-skins-passe-de-combat-le-point-sur-les-nouveautes-de-la-saison-3.jpg",
      },
    },
    {
      id: 2,
      name: "League of Legends",
      installPath: "/games/league-of-legends",
      executable: "LeagueOfLegends.exe",
      version: "v12.3",
      size: 3072, // in megabytes

      props: {
        name: "League of Legends",
        description:
          "League of Legends is a popular multiplayer online battle arena (MOBA) game. Join teams of champions and battle in fast-paced strategic matches.",
        verticalIcon:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/co49wj.png",
        background:
          "https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-2935d0a3e332decb8e727fe56789b6ab",
        altBackground:
          "https://www.leagueoflegends.com/static/open-graph-b580f0266cc3f0589d0dc10765bc1631.jpg",
      },
    },
    {
      id: 3,
      name: "Among Us",
      installPath: "/games/among-us",
      executable: "AmongUs.exe",
      version: "v2.0",
      size: 256, // in megabytes

      props: {
        name: "Among Us",
        description:
          "Among Us is a multiplayer party game where players work together on a spaceship, but some are impostors trying to sabotage the mission. Can you find the impostors?",
        verticalIcon:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/co6kqt.png",
        background:
          "https://cdn1.epicgames.com/salesEvent/salesEvent/amoguslandscape_2560x1440-3fac17e8bb45d81ec9b2c24655758075",
        altBackground:
          "https://img.redbull.com/images/c_crop,w_1920,h_960,x_0,y_96,f_auto,q_auto/c_scale,w_1200/redbullcom/2020/10/1/j21j7ninonenpkunv8at/among-us-imposteur-conseils",
      },
    },
    {
      id: 4,
      name: "Valorant",
      installPath: "/games/valorant",
      executable: "Valorant.exe",
      version: "v3.5",
      size: 3584, // in megabytes

      props: {
        name: "Valorant",
        description:
          "Valorant is a tactical first-person shooter game developed by Riot Games. Join a team of agents, each with unique abilities, and engage in intense, strategic gunfights.",
        verticalIcon:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/co2mvt.png",
        background:
          "https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S1_2560x1440-b88adde6a57e40aa85818820aa87a6cd",
        altBackground:
          "https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2020/6/5/ctsejxmdtw9inp8zqqqd/valorant-ameliorer-aim-visee-astuces",
      },
    },
  ] as OnlineGame[]);

  useEffect(() => {
    api
      .get("/games")
      .then((res) => {
        setGames(res.data.games);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Impossible de récupérer les jeux");
      });
  }, []);

  return (
    <GameContext.Provider value={games}>
      <div className="auto-app-layout">
        <Navbar />
        <Outlet />
      </div>
    </GameContext.Provider>
  );
}
