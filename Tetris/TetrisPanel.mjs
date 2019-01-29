import TetrisData from "./TetrisData.mjs";

export default class TetrisPanel {
    constructor(tetrisRows,tetrisColumns) { 
    this.tetrisRows = tetrisRows;
    this.tetrisColumns = tetrisColumns;
    setInterval(()=>{
        this.makeData();
    }, 2000);
    } 
    makeData() {
        this.panel = [];
        let rows;
        let columns;
        for (let row = 0; row < this.tetrisRows; row++) {
            rows = [];
            for (let column = 0; column < this.tetrisColumns; column++) {
                rows.push(makeColor(row, column));
            }
            this.panel.push(rows);
        }
        if(this.sendDataWhenReady) {
            const data = new TetrisData(this.panel);
            this.sendDataWhenReady(data);
        }
        function makeColor(row, column) {
            const colors = '0123456789abcdef';
            let ret = '#';
            for (let i = 0; i < 6; i++) {
                ret += colors.charAt(Math.floor(Math.random() * 16));
            }
            return ret;
        }
    }
    getData(func) {
        this.sendDataWhenReady = func;
    }
}