import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import SpeakerCard from "../../molecules/SpeakerCard";
import { SERVER_URL } from "../../../constants";
import "./index.css";
import "tailwindcss/tailwind.css";

const socket = io(SERVER_URL);

function SpeakerWidget({ overlayId }) {
  const [overlayState, setOverlayState] = useState({
    show: false,
    tableTitle: "Speaker Widget",
    talkTitle: "Talk Title",
    speakerName: "Speaker Name",
    speakerPath: "https://placehold.co/150x150",
  });

  useEffect(() => {
    console.log(`Estado do Overlay ${overlayId} atualizado:`, overlayState);
  }, [overlayState]);

  useEffect(() => {
    const handleUpdateOverlay = (data) => {
      if (data.overlayId === overlayId) {
        setOverlayState(data.state);
      }
    };

    socket.on("updateOverlay", handleUpdateOverlay);
    return () => {
      socket.off("updateOverlay", handleUpdateOverlay);
    };
  }, [overlayId]);

  return (
    <div
      className={`transition-opacity duration-[4000ms] ${
        overlayState.show ? "opacity-100" : "opacity-0"
      }`}
    >
      <SpeakerCard
        imageSrc={overlayState.speakerPath}
        title={overlayState.talkTitle}
        speakerName={overlayState.speakerName}
      />
    </div>
  );
}

export default SpeakerWidget;
