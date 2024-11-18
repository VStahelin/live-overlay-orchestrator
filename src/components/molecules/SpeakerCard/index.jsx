import React from "react";
import "./index.css";

const SpeakerCard = ({ imageSrc, title, speakerName }) => {
  return (
    <div
      style={{
        width: "900px",
        height: "190px",
        backgroundColor: "#0086ff",
        display: "flex",
        alignItems: "center",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        color: "#fff",
      }}
    >
      <img src={imageSrc} alt={speakerName} className="imageStyle" />
      <div className="textStyle">
        <div className="titleStyle">{title}</div>
        <div className="nameStyle">{speakerName}</div>
      </div>
    </div>
  );
};

export default SpeakerCard;
