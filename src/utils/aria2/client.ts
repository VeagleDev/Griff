import Aria2 from './lib/Aria2';
import { DownloadInfo } from "../../types/downloads.type";


class Aria2Manager {
  private aria2Client: Aria2;
  constructor() {
    this.aria2Client = new Aria2({WebSocket: window.WebSocket});
  }

  async init() {
    try {
      await this.aria2Client.open();
      return true;
    } catch (error) {
      console.error(error);
      throw new Error('Aria2 client failed to connect');
    }
  }

  async addUri(uri: string, options?: unknown): Promise<string | null> {
    return this.callAria2Method<string>('addUri', [uri], options);
  }

  async remove(gid: string): Promise<string | null> {
    return this.callAria2Method<string>('remove', gid);
  }

  async pause(gid: string): Promise<string | null> {
    return this.callAria2Method<string>('pause', gid);
  }

  async forcePauseAll(): Promise<string | null> {
    return this.callAria2Method<string>('forcePauseAll');
  }

  async tellStatus(gid: string): Promise<DownloadInfo | null> {
    const res = await this.callAria2Method<DownloadInfo>('tellStatus', gid) as DownloadInfo;
    return {
      gid: res.gid ?? "",
      status: res.status,
      progress: (res.completedLength / res.totalLength) * 100,
      downloadSpeed: res.downloadSpeed,
      completedLength: res.completedLength,
      totalLength: res.totalLength
    } as DownloadInfo;
  }

  async tellStatusAll(): Promise<DownloadInfo[] | null> {
    const res = await this.aria2Client.multicall([
      ['tellActive'],
      ['tellWaiting', 0, 1000]
    ]) as DownloadInfo[];

    return res.map((downloadInfo: DownloadInfo) => {
      return ({
        gid: downloadInfo.gid,
        status: downloadInfo.status,
        progress: ((downloadInfo.completedLength / downloadInfo.totalLength) * 100),
        downloadSpeed: downloadInfo.downloadSpeed,
        completedLength: downloadInfo.completedLength,
        totalLength: downloadInfo.totalLength
      } as DownloadInfo);
    })
  }

  private async callAria2Method<T>(method: string, ...params: unknown[]): Promise<T | null> {
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

/*const client = new Aria2Manager();

(async () => {
  if (await client.init()) {
    client.addUri(
      "magnet:?xt=urn:btih:497EE31AB2C825BF7DF89BA7767D9D4F413659E9&dn=Arcadian+Atlas+%28v1.0.1%2C+MULTi8%29+%5BFitGirl+Repack%5D&tr=udp%3A%2F%2Fopentor.net%3A6969&tr=udp%3A%2F%2Fopentor.org%3A2710&tr=udp%3A%2F%2F9.rarbg.me%3A2730%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2770%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2720%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2730%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2770%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=https%3A%2F%2Ftracker.tamersunion.org%3A443%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=http%3A%2F%2Ftracker.gbitt.info%3A80%2Fannounce&tr=http%3A%2F%2Ftracker.ccp.ovh%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce",
      {dir: "./downloads"}
    );
    await new Promise(resolve => setTimeout(resolve, 6000));
    console.log(await client.tellStatusAll());

  }
})();*/

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.client = client;

