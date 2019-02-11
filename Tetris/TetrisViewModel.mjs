import TetrisModel from './TetrisModel.mjs';
import TetrisView from './TetrisView.mjs';
export default class TetrisViewModel {
  constructor(tetrisScreen) {
    this.tetrisRows = 15;   // 행, 렬 변경할 것!
    this.tetrisColumns = 11;
    this.tetrisModel = new TetrisModel(this.tetrisRows, this.tetrisColumns);
    this.tetrisView = new TetrisView(tetrisScreen);
  }
  renderData(data) {
    this.tetrisView.render(data);
  }
  run() {
    this.tetrisModel.getData(this.renderData.bind(this));
  }
}