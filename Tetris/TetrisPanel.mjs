import TetrisData from "./TetrisData.mjs";
import TetrisBlock from "./TetrisBlock.mjs";

export default class TetrisPanel {
    constructor(tetrisRows,tetrisColumns) { 
    this.tetrisRows = tetrisRows;
    this.tetrisColumns = tetrisColumns;
    this.tetrisBlock = new TetrisBlock(this.makePanelData.bind(this));
    // setInterval(()=>{
    //     this.makePanelData();
    // }, 2000);
    } 
    makePanelData() {
        this.panel = [];
        let rows;
        let columns;
        //console.log(this.tetrisColumns);
        for (let row = 0; row < this.tetrisRows; row++) {
            rows = [];
            for (let column = 0; column < this.tetrisColumns; column++) {
                console.log('' + row + "," + column);
                //rows.push(makeColor(row, column));
                rows.push('#c8c8c8');
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