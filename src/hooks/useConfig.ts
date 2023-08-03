import { appDataDir } from "@tauri-apps/api/path";
import {
  readTextFile,
  writeTextFile,
  exists,
  createDir,
} from "@tauri-apps/api/fs";
import toast from "../utils/toast.util";
import ConfigType from "../types/config.type";

const getConfigPath = async () => {
  return await appDataDir();
};
const useConfig = () => {
  const configPathPromise = getConfigPath();

  return {
    get: async (key: string, ignoreEmpty?: boolean) => {
      const configPath = (await configPathPromise) + "config.json";
      const config = await readTextFile(configPath)
        .then((data) => JSON.parse(data))
        .catch(() => {
          if (!ignoreEmpty)
            toast.error("Fichier de configuration introuvable.");

          return {};
        });

      if (!config) {
        if (!ignoreEmpty) toast.error("Fichier de configuration introuvable.");

        return undefined;
      }

      if (key in config) return config[key];
      else {
        if (!ignoreEmpty)
          toast.error(`Clé de configuration "${key}" introuvable.`);
        return undefined;
      }
    },
    set: async (key: string, value: string, fullConfig?: ConfigType) => {
      const configDir = await configPathPromise;
      const configPath = (await configPathPromise) + "config.json";
      await createDir(configDir, { recursive: true }).catch(() => {
        toast.error("L'écriture du dossier de configuration est impossible.");
      });
      if (!fullConfig) {
        if (await exists(configPath)) {
          return await readTextFile(configPath)
            .then((data) => JSON.parse(data))
            .then(async (config) => {
              config[key] = value;
              return await writeTextFile(configPath, JSON.stringify(config))
                .then(() => true)
                .catch(() => {
                  toast.error(
                    "Impossible d'écrire dans le fichier de configuration."
                  );
                  return false;
                });
            })
            .catch(() => {
              toast.error("Fichier de configuration illisible.");
              return false;
            });
        } else {
          const config = {} as any;
          config[key] = value;
          return await writeTextFile(configPath, JSON.stringify(config))
            .then(() => true)
            .catch(() => {
              toast.error(
                "Impossible d'écrire dans le fichier de configuration."
              );
              return false;
            });
        }
      } else {
        return await writeTextFile(configPath, JSON.stringify(fullConfig))
          .then(async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            return true;
          })
          .catch((err) => {
            toast.error(
              "Impossible d'écrire dans le fichier de configuration."
            );
            console.error(err);
            return false;
          });
      }
    },
  };
};

export default useConfig;
