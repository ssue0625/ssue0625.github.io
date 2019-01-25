class TetrisViewModel {
  constructor(display) {
    this.tetrisModel = new TetrisModel();
    this.tetrisView = new TetrisView(display);
  }
  showView(data) {
    this.tetrisView.show(data);
  }
  run() {
      //const data = this.tetrisModel.getData();
      //this.tetrisView.show(data);
      console.log('시작');
      let sum = 0;
      
      this.tetrisModel.getData(this.showView.bind(this));
      for (let i = 0; i < 990000000; i++) {
          sum += i;
      }
      console.log('끝');
  } 
}
  