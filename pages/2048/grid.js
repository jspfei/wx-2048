function Grid(size) {
  this.size = size;
  this.cells = this.empty();
}

Grid.prototype = {
  //构造一个空的矩阵[[null,....size.length],[]]
  empty: function () {
    var cells = [];

    for (var x = 0; x < this.size; x++) {
      var row = cells[x] = [];

      for (var y = 0; y < this.size; y++) {
        row.push(null)
      }
    }
    console.log(JSON.stringify(cells))
    return cells;
  },

  //在空格子中随机挑选出一个格子
  randomAvailableCell: function () {
    var cells = this.availableCells();

    //存在可填充的格子
    if (cells.length) {
      return cells[Math.floor(Math.random() * cells.length)]
    }
  },

  availableCells: function () {
    var cells = [];

    for (var i = 0; i < this.size; i++) {
      for (var j = 0; j < this.size; j++) {

        if (!this.cells[i][j]) {
          cells.push({
            x: i,
            y: j
          });
        }
      }
    }

    return cells;
  },

  cellsAvailable: function () {
    return !!this.availableCells().length;
  },

  cellAvailable: function (cell) {
    return !this.cellContent(cell);
  },
  insertTile: function (tile) {
    this.cells[tile.x][tile.y] = tile;
  },
  removeTile: function (tile) {
    this.cells[tile.x][tile.y] = null;
  },

  cellContent: function (cell) {
    if (this.withinBounds(cell)) {
      return this.cells[cell.x][cell.y] || null;
    } else {
      return null;
    }
  },
  emptyCell:function(cell){
    return !this.cellContent(cell);
  },

  withinBounds:function(cell){
    return cell.x >= 0 && cell.x < this.size && cell.y >= 0 && cell.y < this.size;
  },
  eachCell:function(callback){
    for(var x = 0;x < this.size; x++){
      for(var y = 0; y< this.size;y++){
         callback(x,y, this.cells[x][y]);
      }
    }
  }
}

module.exports = Grid;