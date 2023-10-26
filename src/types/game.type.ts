export interface InstalledGame {
  name: string;
  installPath: string;
  executable: string;
  id: number;
  version: string;
  installed: boolean;
  size: number;
}

export interface OnlineGame {
  id: number;
  name: string;
  installPath: string;
  executable: string;
  version: string;
  size: number;

  props: GameProps;
}

export interface GameProps {
  name: string;
  description: string;
  verticalIcon: string;
  background: string;
  altBackground: string;
}
