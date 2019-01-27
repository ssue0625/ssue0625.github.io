class TetrisView {
  constructor(tetrisArea) {
    this.tetrisArea = tetrisArea;
  }

  show(data) {
      if (!data) return;
      let rows = data.length;
      let columns = data[0].length;
      for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns; j++) {
                console.log(data[i][j]);
          }
      }
  }
}   