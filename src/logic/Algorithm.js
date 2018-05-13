import store from "../index.js";
import { updateCell } from "../actions";

class Result {
  constructor(stuck, findable, found, treasurePosition) {
    this.stuck = stuck;
    this.findable = findable;
    this.found = found;
    this.treasurePosition = treasurePosition;
  }
}

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const findTreasure = async function(Map) {
  let startingPos = findStartingPos(store.getState().mapActions.map);

  let x = startingPos[0];
  let y = startingPos[1];

  let up = store.getState().mapActions.map.getValue(x, y - 1);
  let right = store.getState().mapActions.map.getValue(x + 1, y);
  let down = store.getState().mapActions.map.getValue(x, y + 1);
  let left = store.getState().mapActions.map.getValue(x - 1, y);

  if (up === "G") {
    console.log("Gold found");
    return new Result(false, true, true, [x, y - 1]);
  } else if (right === "G") {
    console.log("Gold found");
    return new Result(false, true, true, [x + 1, y]);
  } else if (down === "G") {
    console.log("Gold found");
    return new Result(false, true, true, [x, y + 1]);
  } else if (left === "G") {
    console.log("Gold found");
    return new Result(false, true, true, [x - 1, y]);
  }

  let blocked = adjacent => {
    return (
      adjacent === "#" ||
      adjacent === "↑" ||
      adjacent === "→" ||
      adjacent === "↓" ||
      adjacent === "←"
    );
  };

  if (blocked(up) && blocked(right) && blocked(down) && blocked(left)) {
    //stuck
    console.log("stuck");
    if (store.getState().mapActions.map.contains("?")) {
      store.dispatch(updateCell(x, y, "X"));
      //still not hopeless
      return new Result(true, true, false, [-1, -1]);
    } else {
      //hopeless
      return new Result(true, false, false, [-1, -1]);
    }
  }

  store.dispatch(updateCell(x, y - 1, !blocked(up) ? "?" : up));
  store.dispatch(updateCell(x + 1, y, !blocked(right) ? "?" : right));
  store.dispatch(updateCell(x, y + 1, !blocked(down) ? "?" : down));
  store.dispatch(updateCell(x - 1, y, !blocked(left) ? "?" : left));

  let a;
  if (store.getState().mapActions.map.getValue(x, y - 1) === "?") {
    store.dispatch(updateCell(x, y, "↑"));
    store.dispatch(updateCell(x, y - 1, "👨‍🚀"));
    await wait(200);
    a = await findTreasure(store.getState().mapActions.map);
    if (!a.findable || a.found) {
      return a;
    }
  }

  if (store.getState().mapActions.map.getValue(x + 1, y) === "?") {
    store.dispatch(updateCell(x, y, "→"));
    store.dispatch(updateCell(x + 1, y, "👨‍🚀"));
    await wait(200);
    a = await findTreasure(store.getState().mapActions.map);
    if (!a.findable || a.found) {
      return a;
    }
  }

  if (store.getState().mapActions.map.getValue(x, y + 1) === "?") {
    store.dispatch(updateCell(x, y, "↓"));
    store.dispatch(updateCell(x, y + 1, "👨‍🚀"));
    await wait(200);
    a = await findTreasure(store.getState().mapActions.map);
    if (!a.findable || a.found) {
      return a;
    }
  }

  if (store.getState().mapActions.map.getValue(x - 1, y) === "?") {
    store.dispatch(updateCell(x, y, "←"));
    store.dispatch(updateCell(x - 1, y, "👨‍🚀"));
    await wait(200);
    a = await findTreasure(store.getState().mapActions.map);
    if (!a.findable || a.found) {
      return a;
    }
  }

  await wait(200);
  return a;
};

const findStartingPos = Map => {
  for (let i = 0; i < Map.grid.length; i++) {
    for (let j = 0; j < Map.grid[0].length; j++) {
      if (Map.getValue(i, j) === "👨‍🚀") {
        return [i, j];
      }
    }
  }
};

export default findTreasure;
