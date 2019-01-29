import TetrisPanel from './TetrisPanel.mjs';
export default class TetrisModel {
    constructor(rows, columns) {
        this.tetrisPanel = new TetrisPanel(rows, columns);
    }
    getData(func) {
//        let data = this.tetrisPanel.getData();
//        func(data);
       //func(this.tetrisPanel.getData());
       setInterval(() => {
           func(this.tetrisPanel.getData());
       }, 2000);
    }
    
} 
