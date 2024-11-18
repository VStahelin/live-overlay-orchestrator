import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ControlPanel from "./components/overlays/ControlPanel";
import Overlay from "./components/overlays/Overlay";
import { OVERLAY_TYPES } from "./constants";
import SponsorCarouselOverlay from "./components/overlays/SponsorCarouselOverlay";
import SpeakerWidget from "./components/overlays/SpeakerWidget";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ControlPanel />} />
        <Route
          path="/overlay/speaker"
          element={<Overlay overlayId={OVERLAY_TYPES.SPEAKER_OVERLAY} />}
        />
        <Route
          path="/overlay/sponsors-carousel"
          element={
            <SponsorCarouselOverlay
              overlayId={OVERLAY_TYPES.SPONSORS_CAROUSEL_OVERLAY}
            />
          }
        />
        <Route
          path="/overlay/speaker-widget"
          element={<SpeakerWidget overlayId={OVERLAY_TYPES.SPEAKER_WIDGET} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
