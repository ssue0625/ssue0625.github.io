import TetrisData from './TetrisData.mjs';
export default class TetrisView {
  constructor(tetrisArea) {
    this.tetrisArea = tetrisArea;
  }
 
  show(data) {
      if (!data) return;
      if (!this.rows) {
        this.rows = data.length;
        this.columns = data[0].length;    
        this.makePanel();
      }
      
      let rows = data.length;
      let columns = data[0].length;
      let td;
      for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns; j++) {
                //console.log(data[i][j]);
                // 행과 열을 가지고 td를 찾는다.
                //td = document.getElementsByClassName('tetrisCell' + i + j);
                td = document.querySelector('.tetrisCell' + i + j);
                td.style.backgroundColor = data[i][j];
          }
      }
  }
  makePanel() {
      const tetrisPanelHeight = Math.floor(document.getElementById(this.tetrisArea)
      .getBoundingClientRect().height);
      const area = document.getElementById(this.tetrisArea);
      const table = document.createElement('table');
      area.appendChild(table);
      table.style.height = tetrisPanelHeight + 'px';
      table.style.width = tetrisPanelHeight + 'px';
      table.style.borderSpacing  = '0px';
      const tbody = document.createElement('tbody');
      table.appendChild(tbody);
      let tr;
      let td;
      for (let i = 0; i < this.rows; i++) {
          tr = document.createElement('tr');
          for (let j = 0; j < this.columns; j++) 
          {
              td = document.createElement('td');       //td.style.backgroundColor = 'yellow';
              td.className = 'tetrisCell' + i + j;
              tr.appendChild(td);
          }
              tbody.appendChild(tr); 
      }
  }
}   