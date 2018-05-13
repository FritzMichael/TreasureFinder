import React, { Component } from "react";
import Tile from "./Tile.js";
import { connect } from "react-redux";
import { updateCell } from "../actions/index.js";

const mapDispatchToProps = dispatch => {
  return {
    onCellClick: (x, y, newValue) => {
      dispatch(updateCell(x, y, newValue));
    }
  };
};

const mapStateToProps = state => ({
  selection: state.mapActions.selection
});

class TableRow extends Component {
  render() {
    return (
      <tr>
        {this.props.row.map((x, index) => (
          <td key={index}>
            <Tile
              character={x}
              key={x}
              onClick={() => {
                this.props.onCellClick(
                  index,
                  this.props.index,
                  x === " " ? this.props.selection : " "
                );
              }}
              onMouseOver={() => {
                this.props.onCellClick(this.props.index, index, "G");
              }}
            />
          </td>
        ))}
      </tr>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRow);
