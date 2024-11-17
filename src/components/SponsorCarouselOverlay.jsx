import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { OVERLAY_TYPES } from "../constants";

const socket = io("http://localhost:3001");

function SponsorCarouselOverlay({ overlayId }) {
  const [overlayState, setOverlayState] = useState({
    show: false,
  });
  const isDeveloping = import.meta.env.VITE_DEVELOPING === "true";

  const [images, setImages] = useState([]);

  useEffect(() => {
    const path = "http://localhost:3001/sponsors/";
    fetch(`${path}`) // Busca a lista de imagens
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro HTTP! status: ${response.status}`);
        }
        return response.json(); // Assume que o servidor retorna um JSON
      })
      .then((imageNames) => {
        setImages(imageNames.map((name) => `${path}/${name}`));
      })
      .catch((error) =>
        console.error("Erro ao buscar lista de imagens:", error)
      );
  }, []);

  useEffect(() => {
    const handleUpdateOverlay = (data) => {
      if (data.overlayId === overlayId) {
        setOverlayState(data.state);
      }
    };

    socket.on("updateOverlay", handleUpdateOverlay);
    return () => socket.off("updateOverlay", handleUpdateOverlay);
  }, [overlayId]);

  const cloneImages = (imageArray, cloneCount) => {
    return Array.from({ length: cloneCount }, () => imageArray).flat();
  };

  const visibleImages = cloneImages(images, 3);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
        pointerEvents: overlayState.show || isDeveloping ? "auto" : "none",
      }}
    >
      {(overlayState.show || isDeveloping) && (
        <div
          style={{
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <div
            style={{
              position: "relative",
              height: "200px",
              overflow: "hidden",
              width: "fit-content",
              WebkitMaskImage:
                "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
              maskImage:
                "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
              maskSize: "100% 100%",
              maskRepeat: "no-repeat",
              maskPosition: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                animation: "scroll 40s linear infinite",
                transform: "translateX(50px)",
                width: `${170 * visibleImages.length}px`,
              }}
            >
              {visibleImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Sponsor ${index}`}
                  style={{
                    width: "150px",
                    height: "auto",
                    margin: "0 10px",
                  }}
                />
              ))}
            </div>
          </div>
          <style>
            {`
              @keyframes scroll {
                0% {
                  transform: translateX(50px);
                }
                100% {
                  transform: translateX(calc(-170px * 7 + 50px));
                }
              }
            `}
          </style>
        </div>
      )}
    </div>
  );
}

export default SponsorCarouselOverlay;
