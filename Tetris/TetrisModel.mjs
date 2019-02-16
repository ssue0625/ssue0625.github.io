import TetrisPanel from './TetrisPanel.mjs';
import TetrisPlayer from './TetrisPlayer.mjs';
export default class TetrisModel {
    constructor(rows, columns) {
        this.tetrisPanel = new TetrisPanel(this, rows, columns);
        this.tetrisPlayer = new TetrisPlayer(this.tetrisPanel);
    }
    informBlockCreated() {
        const func = this.tetrisPlayer.doWhenNewBlockCreated.bind(this.tetrisPlayer);
        func();
    }
    getPanelData(func) {
        this.tetrisPanel.getPanelData(func);
    }
}