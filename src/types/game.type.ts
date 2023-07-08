interface InstalledGame {
  name: string;
  installPath: string;
  executable: string;
  id: string;
  version: string;
  installed: boolean;
  size: number;
}

export default InstalledGame;
