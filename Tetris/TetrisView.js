class TetrisView {
  show(data) {
    const display = document.getElementById('tetris');
    const h1 = document.createElement('h1');
    const t1 = document.createTextNode('tetrisView');
    h1.appendChild(t1);
    display.appendChild(h1);
  }
} 