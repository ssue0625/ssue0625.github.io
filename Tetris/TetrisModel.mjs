import TetrisPanel from './TetrisPanel.mjs';
export default class TetrisModel {
    constructor(rows, columns) {
        this.tetrisPanel = new TetrisPanel(rows, columns);
        //this.tetrisPanel.makeDefaultTetrisPanel();
    }
    getData(func) {
        this.tetrisPanel.getData(func);
    }
}