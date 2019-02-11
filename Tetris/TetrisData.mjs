export default class TetrisData {
    constructor(panelData) {
        this.rowsNumber = panelData.length;
        this.columnsNumber = panelData[0].length;
        this._panel = [];
        let row;
        for (let i = 0; i < panelData.length; i++) {
            row = [];
            for (let j = 0; j < panelData[0].length; j++) {
                row.push(panelData[i][j]);
            }
            this._panel.push(row);
        }
    }
    getCellColor(row, column) {
        return this._panel[row][column];
    }
}