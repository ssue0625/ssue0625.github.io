import TetrisModel from './TetrisModel.mjs';
import TetrisView from './TetrisView.mjs';
export default class TetrisViewModel {
  constructor(display) {
    this.tetrisRows = 10;
    this.tetrisColumns = 10;
    this.tetrisModel = new TetrisModel(this.tetrisRows, this.tetrisColumns);
    this.tetrisView = new TetrisView(display);
  }
  renderData(data) {
    this.tetrisView.render(data);
  }
  run() {
    this.tetrisModel.getData(this.renderData.bind(this));
  }
}