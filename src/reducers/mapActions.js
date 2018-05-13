import update from "immutability-helper";
import Map from "../logic/Map";
import findTreasure from "../logic/Algorithm";

const initialState = {
  map: new Map(12, 12),
  selection: "#"
};

const mapActions = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_CELL":
      let newState = update(state, {
        map: {
          grid: {
            [action.y]: {
              [action.x]: { $set: action.newValue }
            }
          }
        }
      });
      if (newState.map.contains("👨‍🚀") && newState.selection === "👨‍🚀") {
        newState = update(newState, {
          selection: { $set: "#" }
        });
      }
      return newState;

    case "CHANGE_SELECTION":
      newState = update(state, {
        selection: { $set: action.newValue }
      });
      return newState;

    case "STEP_FWD":
      findTreasure(state.map);

    default:
      return state;
  }
};

export default mapActions;
