import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "tailwindcss/tailwind.css";
import { OVERLAY_TYPES, SERVER_URL } from "../../constants";
const socket = io(SERVER_URL);
import { getSpeakersImages } from "../../services/api";

function ControlPanel() {
  const [overlayStates, setOverlayStates] = useState({
    [OVERLAY_TYPES.SPONSORS_CAROUSEL_OVERLAY]: {
      tableTitle: "Sponsors Carousel Overlay",
      path: "/overlay/sponsors-carousel",
      show: false,
      button1: false,
    },
    [OVERLAY_TYPES.SPEAKER_WIDGET]: {
      tableTitle: "Speaker Widget",
      path: "/overlay/speaker-widget",
      show: false,
      talkTitle: "Talk Title",
      speakerName: "Speaker Name",
      speakerPath: "https://placehold.co/150x150",
    },
    // [OVERLAY_TYPES.SPEAKER_OVERLAY]: {
    //   tableTitle: "Teste funcional overlay",
    //   path: "/overlay/speaker",
    //   show: false,
    //   text: "Teste funcional overlay",
    //   button1: false,
    // },
    // [OVERLAY_TYPES.OVERLAY_2]: {
    //   show: false,
    //   tableTitle: "Controle Avançado de Funções",
    //   text: "Controle Avançado de Funções",
    //   button1: false,
    //   button2: false,
    //   button3: false,
    //   button4: false,
    // },
    // [OVERLAY_TYPES.OVERLAY_3]: {
    //   show: false,
    //   tableTitle: "Configuração de Animações",
    //   text1: "Texto Inicial 1",
    //   animation1: "fade-in",
    //   text2: "Texto Inicial 2",
    //   animation2: "slide-up",
    //   text3: "Texto Inicial 3",
    //   animation3: "zoom-in",
    //   text4: "Texto Inicial 4",
    //   animation4: "rotate-in",
    // },
  });

  const [speakerImages, setSpeakersImages] = useState([]);
  const [speakerName, setSpeakerName] = useState("Speaker Name");
  const getSpeakersNames = (image) => {
    const fileName = image
      .split("/")
      .pop()
      .replace(/\.\w+$/, "");

    const name = fileName
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return name;
  };

  const fetchImages = async () => {
    const fetchedImages = await getSpeakersImages();
    setSpeakersImages(fetchedImages);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleToggle = (overlayId, key) => {
    setOverlayStates((prevState) => {
      const newState = { ...prevState };
      newState[overlayId] = {
        ...newState[overlayId],
        [key]: !newState[overlayId][key],
      };
      socket.emit("updateOverlay", { overlayId, state: newState[overlayId] });
      console.log(
        `handleToggle :: Estado do Overlay ${overlayId} atualizado:`,
        newState[overlayId]
      );
      return newState;
    });
  };

  const handleTextChange = (event, overlayId, key) => {
    if (key === "speakerName") {
      return;
    }
    setOverlayStates((prevState) => {
      const newState = { ...prevState };
      newState[overlayId][key] = event.target.value;
      if (key === "speakerPath") {
        setSpeakerName(getSpeakersNames(event.target.value));
        newState[overlayId] = {
          ...newState[overlayId],
          ["speakerName"]: getSpeakersNames(event.target.value),
        };
      }
      socket.emit("updateOverlay", { overlayId, state: newState[overlayId] });
      return newState;
    });
  };

  const renderOverlayControls = (overlayId, state) => {
    if (overlayId === OVERLAY_TYPES.SPEAKER_OVERLAY) {
      return (
        <div className="space-y-4">
          <input
            type="text"
            value={state.text}
            onChange={(e) => handleTextChange(e, overlayId, "text")}
            className="bg-gray-700 text-white rounded-md p-2 w-full focus:outline-none"
            placeholder="Enter overlay text"
          />
          <button
            onClick={() => handleToggle(overlayId, "button1")}
            className={`py-2 px-4 rounded-md ${
              state.button1 ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            {state.button1 ? "Button 1 ON" : "Button 1 OFF"}
          </button>
        </div>
      );
    } else if (overlayId === OVERLAY_TYPES.OVERLAY_2) {
      return (
        <div className="space-y-4">
          <input
            type="text"
            value={state.text}
            onChange={(e) => handleTextChange(e, overlayId, "text")}
            className="bg-gray-700 text-white rounded-md p-2 w-full focus:outline-none"
            placeholder="Enter overlay text"
          />
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <button
                key={i}
                onClick={() => handleToggle(overlayId, `button${i}`)}
                className={`py-2 px-4 rounded-md ${
                  state[`button${i}`] ? "bg-green-500" : "bg-red-500"
                } text-white`}
              >
                {`Button ${i} ${state[`button${i}`] ? "ON" : "OFF"}`}
              </button>
            ))}
          </div>
        </div>
      );
    } else if (overlayId === OVERLAY_TYPES.OVERLAY_3) {
      return (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex space-x-4 items-center">
              <input
                type="text"
                value={state[`text${i}`]}
                onChange={(e) => handleTextChange(e, overlayId, `text${i}`)}
                className="bg-gray-700 text-white rounded-md p-2 w-1/2 focus:outline-none"
                placeholder={`Text ${i}`}
              />
              <select
                value={state[`animation${i}`]}
                onChange={(e) =>
                  handleTextChange(e, overlayId, `animation${i}`)
                }
                className="bg-gray-700 text-white rounded-md p-2 focus:outline-none"
              >
                <option value="fade-in">Fade In</option>
                <option value="slide-up">Slide Up</option>
                <option value="zoom-in">Zoom In</option>
                <option value="rotate-in">Rotate In</option>
              </select>
            </div>
          ))}
        </div>
      );
    } else if (overlayId === OVERLAY_TYPES.SPONSORS_CAROUSEL_OVERLAY) {
      return (
        <div className="space-y-4">
          {/* <button
            onClick={() => handleToggle(overlayId, "button1")}
            className={`py-2 px-4 rounded-md ${
              state.button1 ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            {state.button1 ? "Button 1 ON" : "Button 1 OFF"}
          </button> */}
        </div>
      );
    } else if (overlayId === OVERLAY_TYPES.SPEAKER_WIDGET) {
      return (
        <div className="flex space-x-8">
          <div className="flex items-center justify-center">
            {state.speakerPath ? (
              <img
                src={state.speakerPath}
                alt="Speaker"
                className="w-32 h-32 object-cover rounded-full"
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center bg-gray-700 text-gray-400 rounded-full">
                No Image
              </div>
            )}
          </div>
          <div className="flex-1 space-y-4">
            <input
              type="text"
              value={state.talkTitle}
              onChange={(e) => handleTextChange(e, overlayId, "talkTitle")}
              className="bg-gray-700 text-white rounded-md p-2 w-full focus:outline-none"
              placeholder="Enter talk title"
            />
            {/* <input
              type="hidden"
              value={speakerName}
              onChange={(e) => handleTextChange(e, overlayId, "speakerName")}
              className="bg-gray-700 text-white rounded-md p-2 w-full focus:outline-none"
              placeholder="Enter speaker name"
            /> */}
            <select
              value={state.speakerPath}
              onChange={(e) => handleTextChange(e, overlayId, "speakerPath")}
              className="bg-gray-700 text-white rounded-md p-2 w-full focus:outline-none"
            >
              {speakerImages.map((image, index) => (
                <option
                  key={index}
                  value={image}
                  label={getSpeakersNames(image)}
                >
                  {image}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Control Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(overlayStates).map(([overlayId, state]) => (
          <div
            key={overlayId}
            className="bg-gray-800 rounded-lg p-6 mb-6 shadow-lg flex flex-col"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{state.tableTitle}</h2>
              {state.path && (
                <button
                  onClick={() => window.open(state.path, "_blank")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-4 rounded-md bg-blue-500 text-white"
                >
                  Open Overlay/Widget
                </button>
              )}
            </div>
            <div className="flex items-center space-x-4 mb-6">
              <label className="text-lg">Camada inteira:</label>
              <button
                className={`py-2 px-4 rounded-md ${
                  state.show ? "bg-green-500" : "bg-red-500"
                } text-white`}
                onClick={() => handleToggle(overlayId, "show")}
              >
                {state.show ? "ON" : "OFF"}
              </button>
            </div>
            {renderOverlayControls(overlayId, state)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ControlPanel;
