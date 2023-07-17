import InstalledGame from "./game.type";

interface DataConfig {
  serverUrl: string;
  serverName: string;

  username: string;
  token: string;
  firstName: string;

  email: string;
  installedGames: InstalledGame[];
}

export default DataConfig;
