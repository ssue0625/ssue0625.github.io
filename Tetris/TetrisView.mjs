import TetrisData from './TetrisData.mjs';
export default class TetrisView {
    constructor(tetrisArea) {
        this.tetrisArea = tetrisArea;
    }

    render(data) {
        if (!(data instanceof TetrisData)) return;
        let rows = data.rowsNumber;
        let columns = data.columnsNumber;
        if (!this.hasPanel) {
            this.makePanel(rows, columns);
        }
        //$.c(data);
        let td;
        //let area = document.getElementById(this.tetrisArea);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                //console.log(data[i][j]);
                // 행과 열을 가지고 td를 찾는다.
                td = document.querySelector('#' + this.tetrisArea + ' .tetrisCell' + i + j);
                td.style.backgroundColor = data.getCellColor(i, j);
            }
        }
    }
    makePanel(rows, columns) {
        const tetrisPanelHeight = Math.floor(document.getElementById(this.tetrisArea)
            .getBoundingClientRect().height);
        const area = document.getElementById(this.tetrisArea);
        const table = document.createElement('table');
        area.appendChild(table);
        table.style.height = tetrisPanelHeight + 'px';
        table.style.width = tetrisPanelHeight + 'px';
        table.style.borderSpacing = '0px';
        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
        let tr;
        let td;
        for (let i = 0; i < rows; i++) {
            tr = document.createElement('tr');
            for (let j = 0; j < columns; j++) {
                td = document.createElement('td');
                td.className = 'tetrisCell' + i + j;
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        this.hasPanel = true;
    }
}