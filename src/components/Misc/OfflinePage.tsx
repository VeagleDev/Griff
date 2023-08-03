import React, { useState, useEffect, useRef } from "react";
import { Loader, Text } from "@mantine/core";

const OfflinePage = () => {
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

    const timeout = setTimeout(() => {
      attempts.current++;
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
      <Text size="xl" style={{ marginBottom: 20 }}>
        Actuellement hors connexion...
      </Text>

      <Loader size="xl" sx={{ margin: "20px 0" }} />

      <Text size="xl" style={{ marginTop: 5 }}>
        {isProcessing
          ? "Tentative de reconnexion..."
          : 'Prochaine tentative dans {timeRemaining} seconde{timeRemaining !== 1 && "s"}'}
      </Text>
    </div>
  );
};

export default OfflinePage;
