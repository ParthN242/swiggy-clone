import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <div className="loadingContainer">
      <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default Loading;
