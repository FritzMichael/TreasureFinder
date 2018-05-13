import React, { Component } from "react";
import { connect } from "react-redux";
import Tile from "./Tile";
import "./Map.css";
import { changeSelection } from "../actions";
import { stepForward } from "../actions";
import findTreasure from "../logic/Algorithm";

const mapStateToProps = state => ({
  selection: state.mapActions.selection,
  map: state.mapActions.map
});

const mapDispatchToProps = dispatch => {
  return {
    onCellClick: newValue => {
      dispatch(changeSelection(newValue));
    },
    onGoClick: () => {
      dispatch(stepForward());
    }
  };
};

class Selector extends Component {
  render() {
    return (
      <div className="Selector">
        <Tile
          character="👨‍🚀"
          active={this.props.selection === "👨‍🚀"}
          onClick={() => this.props.onCellClick("👨‍🚀")}
          disabled={this.props.map.contains("👨‍🚀")}
        />
        <Tile
          character="#"
          active={this.props.selection === "#"}
          onClick={() => this.props.onCellClick("#")}
        />
        <Tile
          character="G"
          active={this.props.selection === "G"}
          onClick={() => this.props.onCellClick("G")}
        />
        <button onClick={() => findTreasure(this.props.map)}>Go!/Step</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Selector);
