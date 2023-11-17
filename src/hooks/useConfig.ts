import {appDataDir} from "@tauri-apps/api/path";
import {createDir, exists, readTextFile, writeTextFile,} from "@tauri-apps/api/fs";
import toast from "../utils/toast.util";
import ConfigType from "../types/config.type";

const getConfigPath = async () => {
  return await appDataDir();
};
const useConfig = () => {
  const configPathPromise = getConfigPath();


  const handleError = (message: string, ignoreEmpty?: boolean) => {
    if (!ignoreEmpty) toast.error(message);
    return undefined;
  };

  const readConfigFile = async () => {
    try {
      const configPath = (await configPathPromise) + "config.json";
      const config = await readTextFile(configPath);
      return JSON.parse(config) || {};
    } catch (e) {
      return {};
    }
  };

  return {
    all: readConfigFile,

    get: async (key: string, ignoreEmpty?: boolean) => {
      const config = await readConfigFile();

      if (!config) return handleError("Fichier de configuration introuvable.", ignoreEmpty);

      if (key in config) return config[key];
      else return handleError(`Clé de configuration "${key}" introuvable.`);
    },

    set: async (key: string, value: string, fullConfig?: ConfigType) => {
      const configDir = await configPathPromise;
      await createDir(configDir, { recursive: true }).catch(() => {
        return handleError("L'écriture du dossier de configuration est impossible.");
      });

      try {
        const configPath = (await configPathPromise) + "config.json";
        let config: any = {};
        if (await exists(configPath)) {
          const data = await readTextFile(configPath);
          config = JSON.parse(data);
        }

        config[key] = value;

        await writeTextFile(configPath, JSON.stringify(config));
        return true;
      } catch (err) {
        toast.error("Impossible d'écrire dans le fichier de configuration.");
        console.error(err);
        return false;
      }
    },
  };
};

const UseConfig = () => {
  const configPathPromise = getConfigPath();


  const handleError = (message: string, ignoreEmpty?: boolean) => {
    if (!ignoreEmpty) toast.error(message);
    return undefined;
  };

  const readConfigFile = async () => {
    try {
      const configPath = (await configPathPromise) + "config.json";
      const config = await readTextFile(configPath);
      return JSON.parse(config) || {};
    } catch (e) {
      return {};
    }
  };

  return {
    all: readConfigFile,

    get: async (key: string, ignoreEmpty?: boolean) => {
      const config = await readConfigFile();

      if (!config) return handleError("Fichier de configuration introuvable.", ignoreEmpty);

      if (key in config) return config[key];
      else return handleError(`Clé de configuration "${key}" introuvable.`);
    },

    set: async (key: string, value: string, fullConfig?: ConfigType) => {
      const configDir = await configPathPromise;
      await createDir(configDir, { recursive: true }).catch(() => {
        return handleError("L'écriture du dossier de configuration est impossible.");
      });

      try {
        const configPath = (await configPathPromise) + "config.json";
        let config: any = {};
        if (await exists(configPath)) {
          const data = await readTextFile(configPath);
          config = JSON.parse(data);
        }

        config[key] = value;

        await writeTextFile(configPath, JSON.stringify(config));
        return true;
      } catch (err) {
        toast.error("Impossible d'écrire dans le fichier de configuration.");
        console.error(err);
        return false;
      }
    },
  };
};

export default useConfig;
export {UseConfig};
