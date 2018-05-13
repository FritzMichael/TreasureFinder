"use strict";

class Map {
  constructor(height, width) {
    this.grid = [];
    this.height = height;
    this.width = width;
    for (let i = 0; i < this.height; i++) {
      this.grid[i] = [];
    }

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (
          i === 0 ||
          j === 0 ||
          i === this.height - 1 ||
          i == this.width - 1 ||
          j === this.height - 1 ||
          j == this.width - 1
        ) {
          this.grid[i][j] = "#";
        } else {
          this.grid[i][j] = " ";
        }
      }
    }
  }

  setValue(x, y, newValue) {
    this.grid[y][x] = newValue;
  }

  getValue(x, y) {
    return this.grid[y][x];
  }

  toggle(x, y) {
    this.grid[y][x] = this.grid[y][x] === "#" ? " " : "#";
    return this;
  }

  contains(value) {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        if (this.grid[i][j] === value) {
          return true;
        }
      }
    }
    return false;
  }
}

export default Map;
