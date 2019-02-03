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
      //const data = this.tetrisModel.getData();
      //this.tetrisView.render(data);
//      console.log('시작');
//      let sum = 0;
//      this.tetrisModel.getData(this.showView.bind(this));
//      for (let i = 0; i < 990000000; i++) {
//          sum += i;
//      }
//      console.log('끝');
      this.tetrisModel.getData(this.renderData.bind(this));
      
  } 
}
  