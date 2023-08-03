import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { Loader, Text } from "@mantine/core";
import axios from "axios";
import toast from "../../utils/toast.util";

const OfflinePage = ({
  server,
  userToken,
  reloadApp,
}: {
  server: string;
  userToken: string;
  reloadApp: Dispatch<SetStateAction<number>>;
}) => {
  const attempts = useRef(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1);
  const retryDelays = [5000, 5000, 5000, 15000, 15000, 15000, 30000];

  useEffect(() => {
    const timer =
      retryDelays[
        attempts.current < retryDelays.length
          ? attempts.current
          : retryDelays.length - 1
      ];
    setTimeRemaining(Math.round(timer / 1000));

    const timeout = setTimeout(async () => {
      setIsProcessing(true);

      await axios
        .post(
          "/user/verify",
          {},
          {
            baseURL: server,
            timeout: 3000,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + userToken,
            },
          }
        )
        .then((res) => {
          if (res.status === 200 && res.data.ok) {
            reloadApp((current) => current + 1);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      attempts.current++;
      setIsProcessing(false);
    }, timer);

    const updater = setInterval(() => {
      setTimeRemaining((current) => current - 1);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(updater);
    };
  }, [attempts.current]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Text size="xl">Actuellement hors connexion...</Text>

      <Loader size="xl" sx={{ margin: "40px 0" }} />

      <Text size="xl">
        {isProcessing
          ? "Tentative de reconnexion..."
          : `Prochaine tentative dans ${timeRemaining} seconde${
              timeRemaining !== 1 ? "s" : ""
            }`}
      </Text>
    </div>
  );
};

export default OfflinePage;
