import { InstalledGame } from "./game.type";
import { z } from "zod";

export const DataConfigSchema = z.object({
  serverUrl: z.string().min(1).startsWith("http"),
  serverName: z.string(),
  username: z.string().min(1),
  token: z.string().min(1),
  firstName: z.string().min(1),
  email: z.string(),
  installedGames: z.any(),
});

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
