import React, { useState, useEffect, useMemo } from "react";
import io from "socket.io-client";
import { getSponsorsImages, getLastStatus } from "../../../services/api";

import { SERVER_URL } from "../../../constants";
import "./index.css";

function SponsorCarouselWidget({ overlayId }) {
  const socket = useMemo(() => io(SERVER_URL), []);
  const isDevelopment = import.meta.env.VITE_DEVELOPING === "true";

  const [showWiget, setshowWiget] = useState(false || isDevelopment);
  const [overlayState, setOverlayState] = useState({
    show: false,
  });
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    const fetchedImages = await getSponsorsImages();
    setImages(fetchedImages);
  };

  const cloneImages = (imageArray, cloneCount) => {
    return Array.from({ length: cloneCount }, () => imageArray).flat();
  };

  const visibleImages = cloneImages(images, 13);

  const handleUpdateOverlay = (data) => {
    if (data.overlayId === overlayId) {
      setOverlayState(data.state);
      setshowWiget(data.state.show);
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
    fetchImages();
    fetchLastStatus();
  }, []);

  useEffect(() => {
    socket.on("updateOverlay", handleUpdateOverlay);
    return () => socket.off("updateOverlay", handleUpdateOverlay);
  }, [overlayId]);

  return (
    <>
      {isDevelopment && (
        <button
          style={{
            position: "absolute",
            zIndex: 2000,
          }}
          className="p-2 bg-black text-white rounded-md"
          onClick={() => setshowWiget(!showWiget)}
        >
          {showWiget ? "Hide" : "Show"} Debug
        </button>
      )}
      <div
        className={`overlay-container mt-10 transition-opacity duration-[1000ms] ${
          showWiget ? "opacity-100" : "opacity-0"
        }`}
        style={{
          pointerEvents: showWiget ? "auto" : "none",
        }}
      >
        <div className="overlay-center px-8">
          <div className="carosuel-card">
            <div className="carousel-wrapper mt-10">
              <div
                className="carousel-items"
                style={{
                  width: `${170 * visibleImages.length}px`,
                }}
              >
                {visibleImages.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Sponsor ${index}`}
                    className="carousel-item"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SponsorCarouselWidget;
