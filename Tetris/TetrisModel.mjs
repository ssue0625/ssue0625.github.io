import TetrisPanel from './TetrisPanel.mjs';
import TetrisData from './TetrisData.mjs';
export default class TetrisModel {
    constructor(rows, columns) {
        this.tetrisPanel = new TetrisPanel(rows, columns);
        //this.tetrisPanel.makeDefaultTetrisPanel();
    }
    getData(func) {
        this.tetrisPanel.getData(func);
    }
}