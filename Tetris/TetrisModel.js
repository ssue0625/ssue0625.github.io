class TetrisPanel {
    constructor(tetrisRows,tetrisColumns) { 
    this.tetrisRows = tetrisRows;
    this.tetrisColumns = tetrisColumns;
//    this.panel = [[0,0,1,1,1,0,0,0,0],
//                  [0,0,0,0,1,0,0,0,0],
//                  [0,0,0,0,1,0,0,0,0],
//                  [0,0,0,0,0,0,0,0,0],
//                  [0,0,0,0,0,0,0,0,0],
//                  [0,0,0,0,0,0,0,0,0],
//                  [0,0,0,0,0,0,0,0,0],
//                  [0,0,0,0,0,0,0,0,0],
//                  [0,0,0,0,0,0,0,0,0]];
    }
    makeData() {
        this.panel = [];
        let rows;
        let columns;
        for (let i = 0; i < this.tetrisRows; i++) {
            rows = [];
            for (let j = 0; j < this.tetrisColumns; j++) {
                columns = '' + i + ':' + j;
                rows.push(columns);
            }
            this.panel.push(rows);
        }
    }
    getData() {
        this.makeData();
        return this.panel;
    }
}
class TetrisModel {
    constructor(rows, columns) {
        this.tetrisPanel = new TetrisPanel(rows, columns);
    }
    getData(func) {
//        setInterval(()=>{
//            const price = 200 * Math.random();
//            //func(price);
//            console.log(price);
//        }, 1000);
        let data = this.tetrisPanel.getData();
        func(data);
    }
    
}
  