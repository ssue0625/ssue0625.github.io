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
      const panelHeight = Math.floor(document.getElementById(this.tetrisArea)
      .getBoundingClientRect().height);
      console.log(panelHeight);
      const area = document.getElementById(this.tetrisArea);
      const table = document.createElement('table');
      table.style.height = panelHeight;
      table.style.width = panelHeight;
      table.style.margin = '0 px';
      table.style.padding = '0 px';
      table.style.borderSpacing  = '0 px';
      area.appendChild(table);
      const tbody = document.createElement('tbody');
      table.appendChild(tbody);
      tbody.style.height = panelHeight;
      tbody.style.width = panelHeight;
      let tr;
      let td;
      for (let i = 0; i < this.rows; i++) {
          tr = document.createElement('tr');
          for (let j = 0; j < this.columns; j++) 
          {
              td = document.createElement('td');       td.style.backgroundColor = 'yellow';
              td.style.border = '1px solid black';
              td.style.height = panelHeight / 
                  this.rows;
              td.style.width = panelHeight / this.columns;
              tr.appendChild(td);
          }
              tbody.appendChild(tr); 
      }
  }
}   