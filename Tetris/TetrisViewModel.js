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
        this.tetrisModel.getData(this.showView.bind(this));
    }
}
