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

    informIAmDead(row) {
        if (row != 1) {
            //$.c(row);
            this.tetrisBlock = new TetrisBlock(this, this.changePanelBackground.bind(this));
        }
    }
    _isEmpty(row, column) {
        //$.c('empty',row,column, this.panel[row][column]);
        if (this.panel[row][column] != this.backGroundColor) {
            //$.c(false, row, column);
            return false;
        } else {
            //$.c(true, row, column);
            return true;
        }
    }
    checkMovable() {// needToDie, canMovable
        this.tetrisBlock.needToDie = false;
        this.tetrisBlock.canMovable = true;
        // TetrisBlock의 Blocks가 움직일 수 있는지를 조사
        // Blocks는 Cell의 집합 : 기존 위치 && 새로운 위치
        // 새로 그릴 위치 확인을 위해 패널에서 기존에 그려진 블럭을 지운다 
        for (let cell of this.tetrisBlock.blocks) {
            if (cell.rowIndexDrawn != -1 && cell.columnIndexDrawn != -1) {
                this.panel[cell.rowIndexDrawn][cell.columnIndexDrawn] = this.backGroundColor;
            }
        }
        // 이동 가능성을 체크한 후, 가능 여부 저장
        for (let cell of this.tetrisBlock.blocks) {
            if (cell.rowIndexToDraw >= this.tetrisRows) {
                this.tetrisBlock.canMovable = false;
                this.tetrisBlock.needToDie = true;
                //$.c('죽임');
                break;
            }
            if (cell.rowIndexToDraw >= 0) {
                //$.c('이동가능성 체크 진입');
                // if (cell.columnIndexToDraw < 0) {
                //     this.tetrisBlock.canMovable = false;
                //     break;
                // }
                if (!this._isEmpty(cell.rowIndexToDraw, cell.columnIndexToDraw)) {
                //$.c('이동가능성 체크: 이동 불가');
                this.tetrisBlock.canMovable = false;
                break;
                }
            }
        }
        // 기존의 그림을 그려 놓는다.
        for (let cell of this.tetrisBlock.blocks) {
            if (cell.rowIndexDrawn != -1 && cell.columnIndexDrawn != -1) {
                this.panel[cell.rowIndexDrawn][cell.columnIndexDrawn] = this.tetrisBlock.color;
            }
        }
        //$.c(this.tetrisBlock.canMovable,this.tetrisBlock.needToDie);
    }
    changePanelBackground() { // 테트리스 블럭의 움직임을 반영.
        let row;
        let column;
        // 기존꺼 지우기    
        for (let cell of this.tetrisBlock.blocks) {
            if (cell.rowIndexDrawn != -1 && cell.columnIndexDrawn != -1) {
                row = cell.rowIndexDrawn;
                column = cell.columnIndexDrawn;
                this.panel[row][column] = this.backGroundColor;
                cell.rowIndexDrawn = -1;
                cell.columnIndexDrawn = -1;
            }
        }
        // 새로운거 그리기
        for (let cell of this.tetrisBlock.blocks) {
            // 둘 다 -1 이 아닐 때 들어옴..
            // 하지만 에러 : 하나만 음수면 들어올 수 있음..
            // 둘 다 양수이면 들어와야 함.
            if (cell.rowIndexToDraw >= 0 && cell.columnIndexToDraw >= 0) {
                //$.c(cell.rowIndexToDraw,cell.columnIndexToDraw);
                this.panel[cell.rowIndexToDraw][cell.columnIndexToDraw] = this.tetrisBlock.color;
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