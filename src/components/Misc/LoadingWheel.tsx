import React, {useEffect} from "react";
import {Loader, Text} from "@mantine/core";

const LoadingWheel = () => {
  const [dotsNumber, setDotsNumber] = React.useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setDotsNumber((dotsNumber) => (dotsNumber === 3 ? 0 : dotsNumber + 1));
    }, 500);

    return () => clearInterval(interval);
  }, []);

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
      <Loader size="xl" />
      <Text size="xl" style={{ marginTop: 10, transition: "all .5s" }}>
        Connexion{".".repeat(dotsNumber)}
      </Text>
    </div>
  );
};

export default LoadingWheel;
