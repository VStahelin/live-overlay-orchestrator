import React, { useEffect } from "react";
import "./index.css";

const SpeakerCard = ({ imageSrc, title, speakerName, runAnimation }) => {
  const [titleClass, setTitleClass] = React.useState("titleStyle");
  const [nameClass, setNameClass] = React.useState("nameStyle");

  useEffect(() => {
    if (runAnimation) {
      setTitleClass("titleStyle text-shadow-pop-br");
      setNameClass("nameStyle text-shadow-pop-br");
    } else {
      setTimeout(() => {
        setTitleClass("titleStyle");
        setNameClass("nameStyle");
      }, 1000);
    }
  }, [runAnimation]);

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
