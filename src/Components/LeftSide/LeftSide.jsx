import React, { useState } from "react";
import "./LeftSideStyle.css";

import TrendCard from "./TrendCard/TrendCard";
import ShareModal from "./ShareModel/ShareModel";
import LogoSearch from "./LogoSearch/LogoSearch";
const LeftSide = () => {
  const [modalOpened, setModalOpened] = useState(false)
  return (
    <div className="LeftSide">
      <LogoSearch />

      <TrendCard />

      <button
        className="button r-button"
         onClick={() => setModalOpened(true)}
      >
        Share
      </button>
      <ShareModal
      modalOpened={modalOpened}
      setModalOpened={setModalOpened}
      />
    </div>
  );
};

export default LeftSide;
