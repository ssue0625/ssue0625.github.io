class TetrisView {
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
      return;
      let rows = data.length;
      let columns = data[0].length;
      for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns; j++) {
                console.log(data[i][j]);
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
              td = document.createElement('td');       td.style.backgroundColor = 'yellow';
              tr.appendChild(td);
          }
              tbody.appendChild(tr); 
      }
  }
}   