import React, { Component } from "react";
import "./Map.css";

function Tile(props) {
  let disabledStyle = props.disabled ? { opacity: 0.5 } : {};
  let activeStyle = props.active
    ? { borderStyle: "solid", borderWidth: "2px", borderColor: "white" }
    : {};
  return (
    <div
      className="Tile"
      style={{ ...disabledStyle, ...activeStyle }}
      onClick={!props.disabled ? props.onClick : null}
      onContextMenu={props.onMouseOver}
    >
      <p>{props.character}</p>
    </div>
  );
}

export default Tile;
