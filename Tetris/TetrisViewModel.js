class TetrisViewModel {
  constructor(display) {
    this.tetrisModel = new TetrisModel();
    this.tetrisView = new TetrisView(display);
  }
  showView(data) {
    this.tetrisVeiw.show(data);
  }
  run() {
      this.tetrisModel.getData(this.showView.bind(this));
      //this.tetrisModel.showView(data);
  } 
}
 