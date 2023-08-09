export interface DownloadInfo {
  gid: string;
  status: "active" | "waiting" | "paused" | "error" | "complete" | "removed";
  progress: number;
  downloadSpeed: number;
  totalLength: number;
  completedLength: number;
}

export interface ExtendedDownloadInfo extends DownloadInfo {
  id: number;
}
