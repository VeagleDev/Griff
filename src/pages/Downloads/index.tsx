import {Grid, Modal} from "@mantine/core";
import {ExtendedDownloadInfo} from "../../types/downloads.type";
import {OnlineGame} from "../../types/game.type";

export function DownloadsModal({
  opened,
  close,
  downloadingGames,
  games,
}: {
  opened: boolean;
  close: () => void;
  downloadingGames: ExtendedDownloadInfo[];
  games: OnlineGame[];
}) {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Centre de téléchargement"
      centered
      size={"70%"}
      overlayProps={{
        blur: 3,
      }}
    >
      <Grid>
        {downloadingGames.map((props: ExtendedDownloadInfo) => {
          const game = games.find((gameElement) => gameElement.id === props.id);
          const name = game?.name;
          const verticalIcon = game?.props.verticalIcon;
          return (
            <Grid.Col>
              <h2>{name}</h2>
            </Grid.Col>
          );
        })}
      </Grid>
    </Modal>
  );
}
