import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { OVERLAY_TYPES } from "../../constants";

const socket = io("http://localhost:3001");

function Overlay({ overlayId }) {
  const [overlayState, setOverlayState] = useState({
    show: false,
    text: "Hello KCD",
    image: null,
  });
  const isDeveloping = import.meta.env.VITE_DEVELOPING === "true";

  console.log(`Overlay ${overlayId} está em desenvolvimento?`, isDeveloping);

  useEffect(() => {
    console.log(`Estado do Overlay ${overlayId} atualizado:`, overlayState);
  }, [overlayState, overlayId]);

  useEffect(() => {
    const handleUpdateOverlay = (data) => {
      if (data.overlayId === overlayId) {
        setOverlayState(data.state);
      }
    };

    socket.on("updateOverlay", handleUpdateOverlay);
    return () => socket.off("updateOverlay", handleUpdateOverlay);
  }, [overlayId]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
      }}
    >
      {overlayState.show && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {overlayState.text && <h1>{overlayState.text}</h1>}
          {/* Renderize outros elementos do overlay aqui, com base no overlayState */}
          {/* Exemplo: */}
          {overlayId === OVERLAY_TYPES.SPEAKER_OVERLAY &&
            overlayState.button1 && <button>Botão 1 do Overlay 1</button>}
          {/* ... outros elementos para overlay2 e overlay3 ... */}
        </div>
      )}
    </div>
  );
}

export default Overlay;
