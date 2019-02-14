import TetrisModel from './TetrisModel.mjs';
import TetrisView from './TetrisView.mjs';
export default class TetrisViewModel {
  constructor(tetrisScreen) {
    this.tetrisRows = 15;   // 행, 렬 변경할 것!
    this.tetrisColumns = 11;
    this.tetrisView = new TetrisView(tetrisScreen);
    this.tetrisModel = new TetrisModel(this.tetrisRows, this.tetrisColumns);
  }
  renderData(panelData) {
    this.tetrisView.render(panelData);
  }
  run() {
    this.tetrisModel.getPanelData(this.renderData.bind(this));
  }
}