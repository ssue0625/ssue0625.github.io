class TetrisView {
  constructor(tetrisArea) {
    this.tetrisArea = tetrisArea;
  }

  show(data) {
      let rows = data.length;
      let columns = data[0].length;
      for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns; j++) {
                console.log(data[i][j]);
          }
      }
//    const display = document.getElementById(this.tetrisArea);
//    const h1 = document.createElement('h1');
//    const t1 = document.createTextNode(data);
//    h1.appendChild(t1);
//    display.innerHTML = '';      
//    display.appendChild(h1);
      
  }
}  