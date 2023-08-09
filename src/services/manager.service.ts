import { ExtendedDownloadInfo } from "../types/downloads.type";
import { modals } from "@mantine/modals";

const downloadsInformation: ExtendedDownloadInfo[] = [];

export async function downloadGame(id: number) {
  const gameName = "Forza Horizon 4";
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
    modals.closeAll();
  } else {
    console.log("L'utilisateur refuse de télécharger " + gameName);
    modals.closeAll();
  }
}

// @ts-ignore
window.downloadGame = downloadGame;
