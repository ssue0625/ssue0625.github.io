export default class TetrisData {
    constructor(panelData) {
        this.rowsNumber = panelData.length;
        this.columnsNumber = panelData[0].length;
        this._panel = [];
        for (let i = 0; i < panelData.length; i++) {
            for (let j = 0; j <panelData[0].length; j++) {
                this._panel.push(panelData[i][j]);
            }
        }
    }
    getCellColor(row,column) {
        return this._panel[row][column];
    }
}