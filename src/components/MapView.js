import React, { Component } from "react";
import TableRow from "./TableRow";
import { connect } from "react-redux";
import "./Map.css";

const mapStateToProps = state => ({
  map: state.mapActions.map
});

class MapView extends Component {
  render() {
    return (
      <div className="MapView">
        <table className="Table">
          <tbody>
            {this.props.map.grid.map((x, index) => (
              <TableRow
                key={index}
                row={x}
                index={index}
                map={this.props.map}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStateToProps)(MapView);
