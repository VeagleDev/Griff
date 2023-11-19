import { z } from "zod";
import { documentDir } from "@tauri-apps/api/path";

const aria2ResponseSchema = z.object({
  id: z.string(),
  jsonrpc: z.string(),
  result: z.array(
    z.object({
      bitfield: z.string(),
      completedLength: z.coerce.number(),
      connections: z.coerce.number(),
      dir: z.string(),
      downloadSpeed: z.coerce.number(),
      files: z.array(z.any()),
      gid: z.string(),
      numPieces: z.coerce.number(),
      pieceLength: z.coerce.number(),
      status: z.enum([
        "active",
        "waiting",
        "paused",
        "error",
        "complete",
        "removed",
      ]),
      totalLength: z.coerce.number(),
      uploadLength: z.coerce.number(),
      uploadSpeed: z.coerce.number(),
    }),
  ),
});

type Result = z.infer<typeof aria2ResponseSchema>["result"][0];

class Aria2Manager {
  private websocket: WebSocket;
  private connecter: Promise<boolean>;
  constructor(url: string) {
    this.websocket = new WebSocket(url);
    this.connecter = new Promise((resolve, reject) => {
      this.websocket.onopen = (info) => {
        console.log(info);
        console.log("connected");
        resolve(true);
      };
      this.websocket.onerror = (error) => {
        console.error(error);
        reject(error);
      };
    });
  }

  connect() {
    return this.connecter;
  }

  async download(uri: string, directory: string): Promise<string | undefined> {
    try {
      const path = (await documentDir()) + `\\${directory}`;
      this.websocket.send(
        JSON.stringify({
          jsonrpc: "2.0",
          method: "aria2.addUri",
          id: "qwer",
          params: [[uri], { dir: path }],
        }),
      );

      const data = (await new Promise((resolve, reject) => {
        this.websocket.onmessage = (message) => {
          if (!message.data) return;
          resolve(message.data);
        };
        this.websocket.onerror = (error) => {
          console.error(error);
          reject(error);
        };
      })) as string;
      console.log(`GID: ${data}`);
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async getStatusAll(): Promise<Result[]> {
    try {
      this.websocket.send(
        JSON.stringify({
          jsonrpc: "2.0",
          method: "aria2.tellActive",
          id: "qwer",
          params: [],
        }),
      );
      const data = (await new Promise((resolve, reject) => {
        this.websocket.onmessage = (message) => {
          if (!message.data) return;
          resolve(message.data);
        };
        this.websocket.onerror = (error) => {
          console.error(error);
          reject(error);
        };
      })) as string;
      const result = aria2ResponseSchema.parse(JSON.parse(data));
      return result.result;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  /*private aria2Client: Aria2;
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
      gid,
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
  }*/
}

export default Aria2Manager;
