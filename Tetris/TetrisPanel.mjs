import TetrisData from "./TetrisData.mjs";
import TetrisBlock from "./TetrisBlock.mjs";

export default class TetrisPanel {
    constructor(tetrisRows, tetrisColumns) {
        this.tetrisRows = tetrisRows;
        this.tetrisColumns = tetrisColumns;
        this.backGroundColor = '#c8c8c8';
        this.tetrisBlock = new TetrisBlock(this, this.changePanelBackground.bind(this));
        this.panel = [];
        for (let row = 0; row < tetrisRows; row++) {
            let rows = [];
            for (let column = 0; column < tetrisColumns; column++) {
                rows.push(this.backGroundColor);
            }
            this.panel.push(rows);
        }
    }
    clearCell(row, column) {
        this.panel[row][column] = this.backGroundColor;
    }
    isEmpty(row, column) {
        if (this.panel[row][column] !== this.backGroundColor) {
            return false;
        } else {
            return true;
        }
    }
    informIAmDead(row) {
        if (row != 1) { 
            //$.c(row);
            this.tetrisBlock = new TetrisBlock(this, this.changePanelBackground.bind(this));
        }
    }
    canMove(row, column) {
        if (row > this.tetrisRows) return false;
        //$.c(this.panel[row][column]);

        if (this.panel[row][column] !== this.backGroundColor) {
            //$.c(row, column, this.panel[row][column]);
            return false;
        } else {
            //$.c(row, column, this.panel[row][column]);
            return true;
        }
    } 
    changePanelBackground() {   // 테트리스 블럭의 움직임을 반영.
        // tetrisBlock의 변화된 값 반영
        //const movedBlocks = this.tetrisBlock.getMovedBlocks();
        let row;
        let column;
        // 지워야할 넘
        // for (let i = 0; i < movedBlocks[0].length; i++) {
        //     row = movedBlocks[0][i].row;
        //     column = movedBlocks[0][i].column;
        //     this.panel[row][column] = this.backGroundColor;
        // }
        // for (let cell of this.tetrisBlock.blocks) {
        //     if (cell.isDrew) { 
        //         row = cell.rowIndexDrew;
        //         column = cell.columnIndexDrew;
        //         $.c(row, column, this.panel[row][column]);
        //         this.panel[row][column] = this.backGroundColor;
        //     }
        // }
        // new
        // for (let i = 0; i < movedBlocks[1].length; i++) {
        //     row = movedBlocks[1][i].row;
        //     column = movedBlocks[1][i].column;
        //     this.panel[row][column] = this.tetrisBlock.color;
        // }
        // this.tetrisBlock.blocks 에 있는 셀 중에서
        // cell.canDraw가 True인 놈들을 Panel에 this.tetrisBlock.color을 넣는다.
        for (let cell of this.tetrisBlock.blocks) {
            if (cell.canDraw) {
                row = cell.rowIndexToDraw;
                column = cell.columnIndexToDraw;
                this.panel[row][column] = this.tetrisBlock.color;
                cell.isDrawn = true;
                cell.rowIndexDrawn = cell.rowIndexToDraw;
                cell.columnIndexDrawn = cell.columnIndexToDraw;
            }
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