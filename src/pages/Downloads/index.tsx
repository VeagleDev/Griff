import {Grid, Modal, Flex, Progress, Text} from "@mantine/core";
import {ExtendedDownloadInfo} from "../../types/downloads.type";
import {OnlineGame} from "../../types/game.type";
import "./index.scss";

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

          return (
            <Grid.Col className="col">
              <Grid.Col>
                <h2>{name}</h2>
                <Flex justify={"space-between"} w={"100%"}>
                  <Text c="dimmed">En cours</Text>
                  <Text c="dimmed">temps restant</Text>
                </Flex>
              </Grid.Col>
              
              <Grid.Col className="bottom">
                <Flex justify={"space-between"} w={"100%"}>
                  <Text c="dimmed">vitesse {props.downloadSpeed}Mo/s</Text>
                  <Text c="dimmed">{props.progress}%</Text>
                </Flex>
                <div className="progress-bar">
                  <div className="progress"></div>
                </div>
              </Grid.Col>
            </Grid.Col>
          );
        })}
      </Grid>
    </Modal>
  );
}
