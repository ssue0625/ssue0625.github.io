class TetrisView {
  constructor(tetrisArea) {
    return tetrisArea;
    
  }
  show(data) {
    const display = document.getElementById(this.tetrisArea);
    const h1 = document.createElement('h1');
    const t1 = document.createTextNode(data);
    h1.appendChild(t1);
    display.appendChild(h1);
      
  }
}  