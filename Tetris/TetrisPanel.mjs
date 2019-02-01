import TetrisData from "./TetrisData.mjs";
import TetrisBlock from "./TetrisBlock.mjs";

export default class TetrisPanel {
    constructor(tetrisRows, tetrisColumns) {
        this.tetrisRows = tetrisRows;
        this.tetrisColumns = tetrisColumns;
        this.tetrisBlock = new TetrisBlock(this, this.makePanelData.bind(this));
        // setInterval(()=>{
        //     this.makePanelData();
        // }, 2000);
    }
    informIAmDead(row) {
        if (row != 1) {
            $.c(row);
            this.tetrisBlock = new TetrisBlock(this, this.makePanelData.bind(this));
        }
    }
    canMove(row, column) {
        if (row > this.tetrisRows) return false;
        if (!this.panel) return true;
        //$.c(this.panel[row][column]);
        if (this.panel[row][column] !== '#c8c8c8') {
            $.c(row, column, this.panel[row][column]);
            return false;
        } else {
            $.c(row, column, this.panel[row][column]);
            return true;
        }
    }
    makePanelData() {
        //console.log(this.tetrisColumns);
        if (!this.panelExist) {
            let rows;
            // let columns;
            this.panel = [];
            for (let row = 0; row < this.tetrisRows; row++) {
                rows = [];
                for (let column = 0; column < this.tetrisColumns; column++) {
                    //console.log('' + row + "," + column);
                    //rows.push(makeColor(row, column));
                    rows.push('#c8c8c8');
                }
                this.panel.push(rows);
                //console.log('make panel 한번 들어왔다. 이후 안들어옴');
            }
            this.panelExist = true;
        }
        //console.log('매번 들어옴');

        // tetrisBlock의 변화된 값 반영
        const movedBlocks = this.tetrisBlock.getMovedBlocks();
        let row;
        let column;
        // 지워야할 넘
        for (let i = 0; i < movedBlocks[0].length; i++) {
            row = movedBlocks[0][i].row;
            column = movedBlocks[0][i].column;
            this.panel[row][column] = '#c8c8c8';
        }
        // new
        for (let i = 0; i < movedBlocks[1].length; i++) {
            row = movedBlocks[1][i].row;
            column = movedBlocks[1][i].column;
            this.panel[row][column] = this.tetrisBlock.color;
        }
        //$.c(this.panel);
        if (this.sendDataToViewWhenReady) {

            //console.log(this.panel);
            const data = new TetrisData(this.panel);
            this.sendDataToViewWhenReady(data);

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
        this.sendDataToViewWhenReady = func;
    }
}