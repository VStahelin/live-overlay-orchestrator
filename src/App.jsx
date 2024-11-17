import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ControlPanel from "./components/ControlPanel";
import Overlay from "./components/Overlay";
import { OVERLAY_TYPES } from "./constants";
import SponsorCarouselOverlay from "./components/SponsorCarouselOverlay";

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

        {/* <Route path="/overlay/" element={<Overlay overlayId="overlay2" />} />  */}
        {/* <Route path="/overlay/" element={<Overlay overlayId="overlay3" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
