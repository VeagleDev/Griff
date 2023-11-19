import {modals} from "@mantine/modals";
import {OnlineGame} from "../types/game.type";
import UseConfig from "../hooks/useConfig";

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
