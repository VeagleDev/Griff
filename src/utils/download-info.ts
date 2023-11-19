import {ExtendedDownloadInfo} from "../types/downloads.type";
import {OnlineGame} from "../types/game.type";
import {formatDistance} from 'date-fns';
import fr from 'date-fns/locale/fr';

type DownloadDisplayInfo = {
  name: string;
  progress: number;
  blinkProgress: boolean;
  progressColor: string;
  downloadSpeed: string;
  estimatedTime: string;
  statusText: string;
}

type completedLengthObject = {
  gid: string;
  sizes: [
    {
    completedLength: number;
    time: number;
    }
  ]
}



const completedLengthList: completedLengthObject[] = [];

function convertBytesToHumanReadable(bytes: number) {
  const sizes = ["B", "Ko", "Mo", "Go", "To"];
  if (bytes == 0) return "0 Byte";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1000)).toString());
  return (bytes / Math.pow(1000, i)).toFixed(1).toString() + " " + sizes[i];
}

function getDownloadDisplayInfo(games: OnlineGame[], downloadInfo: ExtendedDownloadInfo) {
  const props: DownloadDisplayInfo = {
    name: "Inconnu",
    progress: 0,
    blinkProgress: false,
    progressColor: "blue",
    downloadSpeed: "N/A",
    estimatedTime: "N/A",
    statusText: "N/A"
  } as DownloadDisplayInfo;


  if(downloadInfo.status !== "active")
  {
    completedLengthList.forEach((completedLengthObject, index) => {
      if(completedLengthObject.gid === downloadInfo.gid)
      {
        completedLengthList.splice(index, 1);
      }
    });
  } else {
    completedLengthList.forEach((completedLengthObject, index) => {
      if(Date.now() - completedLengthObject.sizes[0].time > 10000)
      {
        completedLengthList.splice(index, 1);
      }
    });

    let object = completedLengthList.find((completedLengthObject) => completedLengthObject.gid === downloadInfo.gid);

    if(!object)
    {
      object = {
        gid: downloadInfo.gid,
        sizes: [
          {
          completedLength: downloadInfo.completedLength,
          time: Date.now()
          }
        ]
      }

      completedLengthList.push(object);
    }

    const totalCompletedLength = object.sizes.reduce((accumulator, currentValue) => accumulator + currentValue.completedLength, 0);
    const totalSeconds = (Date.now() - object.sizes[0].time) / 1000;
    const averageSpeed = totalCompletedLength / totalSeconds;
    const remainingLength = downloadInfo.totalLength - downloadInfo.completedLength;
    const remainingSeconds = remainingLength / averageSpeed;


    props.downloadSpeed = `${convertBytesToHumanReadable(averageSpeed)}/s`;
    props.estimatedTime = formatDistance(0, remainingSeconds * 1000, {includeSeconds: true, locale: fr});
  }


  const game = games.find((game) => game.id === downloadInfo.id);
  props.name = game?.name ?? "Inconnu";
  props.progress = downloadInfo.progress;
  switch (downloadInfo.status) {
    case "active":
      props.progressColor = "blue";
      props.blinkProgress = false;
      props.statusText = "Téléchargement en cours";
      break;
    case "waiting":
      props.progressColor = "blue";
      props.blinkProgress = true;
      props.statusText = "En attente";
      break;
    case "paused":
      props.progressColor = "blue";
      props.blinkProgress = false;
      props.statusText = "En pause";
      break;
    case "error":
      props.progressColor = "red";
      props.blinkProgress = false;
      props.statusText = "Erreur";
      break;
    case "complete":
      props.progressColor = "green";
      props.blinkProgress = false;
      props.statusText = "Téléchargement terminé";
      break;
    case "removed":
      props.progressColor = "red";
      props.blinkProgress = false;
      props.statusText = "Annulé";
      break;
  }
  const speed = `${convertBytesToHumanReadable(downloadInfo.downloadSpeed)}/s`;
  props.downloadSpeed = speed;

  return props;
}

export {getDownloadDisplayInfo}