export const updateCell = (x, y, newValue) => {
  return {
    type: "UPDATE_CELL",
    x: x,
    y: y,
    newValue: newValue
  };
};

export const changeSelection = newValue => {
  return {
    type: "CHANGE_SELECTION",
    newValue: newValue
  };
};

export const stepForward = () => {
  return {
    type: "STEP_FWD"
  };
};
