import React, { useEffect, useMemo } from "react";
import "./index.css";

const SpeakerCard = ({ imageSrc, title, speakerName, animateText }) => {
  const animated = useMemo(() => animateText === true, [animateText]);

  const titleClass = useMemo(() => {
    return animated ? "titleStyle text-shadow-pop-br" : "titleStyle";
  }, [animated]);

  const nameClass = useMemo(() => {
    return animated ? "nameStyle text-shadow-pop-br" : "nameStyle";
  }, [animated]);

  useEffect(() => {
    if (!animated) {
      setTimeout(() => {
        titleClass("titleStyle");
        nameClass("nameStyle");
      }, 1000);
    } else {
    }
  }, [animated]);

  return (
    <div className="cardStyle">
      <img src={imageSrc} alt={speakerName} className="imageStyle" />
      <div className="textStyle">
        <div className={`${titleClass}`}>{title}</div>
        <div className={`${nameClass}`}>{speakerName}</div>
      </div>
    </div>
  );
};

export default SpeakerCard;
