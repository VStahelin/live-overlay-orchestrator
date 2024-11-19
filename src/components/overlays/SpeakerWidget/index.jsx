import React, { useState, useEffect, useMemo } from "react";
import io from "socket.io-client";
import SpeakerCard from "../../molecules/SpeakerCard";
import { SERVER_URL } from "../../../constants";
import "./index.css";
import "tailwindcss/tailwind.css";
import { getLastStatus } from "../../../services/api";

function SpeakerWidget({ overlayId }) {
  const socket = useMemo(() => io(SERVER_URL), []);
  const isDevelopment = import.meta.env.VITE_DEVELOPING === "true";

  const [showWiget, setShowWiget] = useState(false || isDevelopment);

  const [overlayState, setOverlayState] = useState({
    show: false,
    tableTitle: "Speaker Widget",
    talkTitle: "Talk Title",
    speakerName: "Speaker Name",
    speakerPath: "https://placehold.co/150x150",
  });

  const handleUpdateOverlay = (data) => {
    if (data.overlayId === overlayId) {
      setOverlayState(data.state);
      setShowWiget(data.state.show);
      console.log("Atualizando overlay:", data);
    }
  };

  const fetchLastStatus = async () => {
    const data = await getLastStatus(overlayId);
    if (data.state) {
      handleUpdateOverlay(data);
    }
  };

  useEffect(() => {
    fetchLastStatus();
  }, []);

  useEffect(() => {
    socket.on("updateOverlay", handleUpdateOverlay);
    return () => socket.off("updateOverlay", handleUpdateOverlay);
  }, [overlayId]);

  console.log("showWiget", showWiget);

  return (
    <div className="w-full h-full flex">
      <div>
        {isDevelopment && (
          <button
            style={{
              position: "absolute",
              zIndex: 2000,
            }}
            className="p-2 bg-black text-white rounded-md"
            onClick={() => setShowWiget(!showWiget)}
          >
            {showWiget ? "Hide" : "Show"} Debug
          </button>
        )}
      </div>
      <div>
        <div
          className={`mt-10 transition-opacity duration-[500ms] ${
            showWiget ? "opacity-100" : "opacity-0"
          }`}
        >
          <SpeakerCard
            imageSrc={overlayState.speakerPath}
            title={overlayState.talkTitle}
            speakerName={overlayState.speakerName}
            animateText={showWiget}
          />
        </div>
      </div>
    </div>
  );
}

export default SpeakerWidget;
