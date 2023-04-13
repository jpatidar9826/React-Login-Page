import React from "react";
import ReactDOM from "react-dom";

import "./SideDrawer.css";

const SideDrawer = (props) => {
  const content = (
    <div
      className={`navigation-drawer ${props.show ? "open" : ""}`}
      onClick={props.onClick}
    >
      <div className="navigation-drawer-content">{props.children}</div>
      <div className="navigation-drawer-handle" onClick={props.onClick}></div>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
