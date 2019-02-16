import TetrisData from './TetrisData.mjs';
export default class TetrisView {
    constructor(tetrisArea) {
        this.tetrisArea = tetrisArea;
    }
    render(panelData) {
        if (!(panelData instanceof TetrisData)) return;
        let rows = panelData.rowsNumber;
        let columns = panelData.columnsNumber;
        if (!this.hasPanel) {
            this.makePanel(rows, columns);
        }
        //$.c(data);
        let td;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                // 행과 열을 가지고 td를 찾는다.
                td = document.querySelector('#' + this.tetrisArea + ' .tetrisCell' + i + '_' + j);
                td.style.backgroundColor = panelData.getCellColor(i, j);
            }
        }
    }
    makePanel(rowsLength, columnsLength) {
        const tetrisPanelHeight = Math.floor(document.getElementById(this.tetrisArea)
            .getBoundingClientRect().height); // height 이외에 참조할 값이 없다. <= flex-direction
        const area = document.getElementById(this.tetrisArea);
        const table = document.createElement('table');
        area.appendChild(table);
        table.style.height = tetrisPanelHeight + 'px';
        table.style.width = Math.floor(tetrisPanelHeight / rowsLength * columnsLength) + 'px';
        table.style.borderSpacing = '0px';
        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
        let tr;
        let td;
        for (let i = 0; i < rowsLength; i++) {
            tr = document.createElement('tr');
            for (let j = 0; j < columnsLength; j++) {
                td = document.createElement('td');
                td.className = 'tetrisCell' + i + '_' + j;
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        this.hasPanel = true;
    }
}