import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ControlPanel from "./components/pages/ControlPanel";
import Overlay from "./components/overlays/Overlay";
import { OVERLAY_TYPES } from "./constants";
import SpeakerWidget from "./components/overlays/SpeakerWidget";
import SponsorCarouselWidget from "./components/overlays/SponsorCarouselWidget";

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
            <SponsorCarouselWidget
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
