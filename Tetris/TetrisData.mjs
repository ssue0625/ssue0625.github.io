export default class TetrisData {
    constructor(panelData) {
        this._panel = panelData;
        this.rowsNumber = panelData.length;
        this.columnsNumber = panelData[0].length;
    }
    getCellColor(row,column) {
        return this._panel[row][column];
    }
}