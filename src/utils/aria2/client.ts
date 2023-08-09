import Aria2 from "./lib/Aria2";
import { DownloadInfo } from "../../types/downloads.type";

class Aria2Manager {
  private aria2Client: Aria2;
  constructor() {
    this.aria2Client = new Aria2({ WebSocket: window.WebSocket });
  }

  async init() {
    try {
      await this.aria2Client.open();
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Aria2 client failed to connect");
    }
  }

  async addUri(uri: string, options?: unknown): Promise<string | null> {
    return this.callAria2Method<string>("addUri", [uri], options);
  }

  async remove(gid: string): Promise<string | null> {
    return this.callAria2Method<string>("remove", gid);
  }

  async pause(gid: string): Promise<string | null> {
    return this.callAria2Method<string>("pause", gid);
  }

  async forcePauseAll(): Promise<string | null> {
    return this.callAria2Method<string>("forcePauseAll");
  }

  async tellStatus(gid: string): Promise<DownloadInfo | null> {
    const res = (await this.callAria2Method<DownloadInfo>(
      "tellStatus",
      gid
    )) as DownloadInfo;
    return {
      gid: res.gid ?? "",
      status: res.status,
      progress: (res.completedLength / res.totalLength) * 100,
      downloadSpeed: res.downloadSpeed,
      completedLength: res.completedLength,
      totalLength: res.totalLength,
    } as DownloadInfo;
  }

  async tellStatusAll(): Promise<DownloadInfo[] | null> {
    const res = (await this.aria2Client.multicall([
      ["tellActive"],
      ["tellWaiting", 0, 1000],
    ])) as DownloadInfo[];

    return res.map((downloadInfo: DownloadInfo) => {
      return {
        gid: downloadInfo.gid,
        status: downloadInfo.status,
        progress:
          (downloadInfo.completedLength / downloadInfo.totalLength) * 100,
        downloadSpeed: downloadInfo.downloadSpeed,
        completedLength: downloadInfo.completedLength,
        totalLength: downloadInfo.totalLength,
      } as DownloadInfo;
    });
  }

  private async callAria2Method<T>(
    method: string,
    ...params: unknown[]
  ): Promise<T | null> {
    try {
      const response = await this.aria2Client.call(method, ...params);
      return response as T;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default Aria2Manager;
