import { modals } from "@mantine/modals";
import { OnlineGame } from "../types/game.type";
import UseConfig from "../hooks/useConfig";
import Aria2 from "aria2-wrapper";

export async function downloadGame(game: OnlineGame) {
  const gameName = game.name;
  const { get, set } = UseConfig();
  const installedGames = await get("installedGames");

  if (
    await new Promise<boolean>((resolve) => {
      modals.openConfirmModal({
        title: "Téléchargement",
        children: "Voulez-vous télécharger " + gameName + " ?",
        labels: { cancel: "Annuler", confirm: "Télécharger" },
        style: { left: 0 },
        centered: true,
        onConfirm: () => {
          resolve(true);
        },
        onCancel() {
          resolve(false);
        },
      });
    }).catch(() => false)
  ) {
    console.log("Téléchargement de " + gameName + " lancé");

    installedGames.push({
      name: game.name,
      installPath: game.installPath,
      executable: game.executable,
      id: game.id,
      version: game.version,
      installed: true,
      size: game.size,
    });

    const aria = new Aria2({});
    await aria.connect();
    const res = await aria.getVersion();
    console.log(res);

    const res2 = await aria.addUri(
      "magnet:?xt=urn:btih:D0712AD8258105BD45CBE285091067F582B9587B&dn=Asterix+%26amp%3B+Obelix+Slap+Them+All%21+2+%28MULTi9%29+%5BFitGirl+Repack%5D&tr=udp%3A%2F%2Fopentor.net%3A6969&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.gbitt.info%3A80%2Fannounce&tr=http%3A%2F%2Ftracker.ccp.ovh%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.ccp.ovh%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.theoks.net%3A6969%2Fannounce&tr=https%3A%2F%2Ftracker.tamersunion.org%3A443%2Fannounce&tr=http%3A%2F%2Fopen.acgnxtracker.com%3A80%2Fannounce&tr=http%3A%2F%2Fopen.acgtracker.com%3A1096%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce",
      { dir: "C:\\Users\\pierr\\test9" },
    );
    console.log(res2);

    setInterval(async () => {
      const res3 = await aria.tellStatus(res2);
      console.log(res3);
    }, 1000);

    await set("installedGames", installedGames);
    modals.closeAll();
  } else {
    console.log("L'utilisateur refuse de télécharger " + gameName);
    modals.closeAll();
  }

  return installedGames;
}

// @ts-ignore
window.downloadGame = downloadGame;
