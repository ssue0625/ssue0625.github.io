import TetrisData from "./TetrisData.mjs";
import TetrisBlock from "./TetrisBlock.mjs";

export default class TetrisPanel {
    constructor(tetrisRows, tetrisColumns) {
        this.tetrisRows = tetrisRows;
        this.tetrisColumns = tetrisColumns;
        this.backgroundColor = 'black'; //'#c8c8c8';
        this.tetrisBlock = new TetrisBlock(this);
        this.panel = [];
        for (let row = 0; row < tetrisRows; row++) {
            let rows = [];
            for (let column = 0; column < tetrisColumns; column++) {
                rows.push(this.backgroundColor);
            }
            this.panel.push(rows);
        }
    }
    clearCell(row, column) {
        this.panel[row][column] = this.backgroundColor;
    }
    informIAmDead(row) {
        if (this.checkLineDeletable()) {
            const data = new TetrisData(this.panel);
            this.sendDataToViewWhenReady(data);
        }
        if (row != 1) {
            //$.c(row);
            this.tetrisBlock = new TetrisBlock(this, this.changePanelBackground.bind(this));
        }
    }
    checkLineDeletable() {
        let result = false;
        for (let rowIndexToCheck = this.tetrisRows - 1; rowIndexToCheck >= 0; rowIndexToCheck--) {
            const rowToCheck = this.panel[rowIndexToCheck]; // 체크할 패널 행
            let needlineToDelete = true;
            //$.c(rowIndexToCheck, rowToCheck);
            for (let cellToCheck = 0; cellToCheck < rowToCheck.length; cellToCheck++) {
                const cell = rowToCheck[cellToCheck];
                //$.c(cell);
                if (cell == this.backgroundColor) {
                    //$.c('안죽는다', cell);
                    needlineToDelete = false;
                    break;
                }
            }
            if (needlineToDelete) {
                this.deleteLine(rowIndexToCheck);
                rowIndexToCheck++; // 현재 라인을 다시 체크 <- 바로 위라인이었다.
                result = true;
            }
        }
        return result;
    }
    deleteLine(lineToDeleteIndex) {
        //$.c(lineToDeleteIndex);
        let row = this.panel[lineToDeleteIndex];
        for (let cellToCheck = 0; cellToCheck < row.length; cellToCheck++) {
            row[cellToCheck] = this.backgroundColor;
        }
        // 위의 라인 한 칸씩 내리기.
        let rowToMove;
        for (let lineToMove = lineToDeleteIndex - 1; lineToMove >= 0; lineToMove--) {
            rowToMove = this.panel[lineToMove];
            for (let cellToCheck = 0; cellToCheck < rowToMove.length; cellToCheck++) {
                this.panel[lineToMove + 1][cellToCheck] = rowToMove[cellToCheck];
            }
        }
    }
    _isEmpty(row, column) {
        //$.c('empty',row,column, this.panel[row][column]);
        if (row < 0 || row >= this.panel.tetrisRows || column < 0 || column >= this.panel.tetrisColumns) {
            return false;
        }
        if (this.panel[row][column] != this.backgroundColor) {
            //$.c(false, row, column);
            return false;
        } else {
            //$.c(true, row, column);
            return true;
        }
    }
    checkMovable(blocks) { // needToDie, canMovable
        this.tetrisBlock.needToDie = false;
        this.tetrisBlock.canMovable = true;
        // TetrisBlock의 Blocks가 움직일 수 있는지를 조사
        // Blocks는 Cell의 집합 : 기존 위치 && 새로운 위치
        // 새로 그릴 위치 확인을 위해 패널에서 기존에 그려진 블럭을 지운다 
        for (let cell of this.tetrisBlock.blocks) {
            if (cell.rowIndexDrawn != -1 && cell.columnIndexDrawn != -1) {
                this.panel[cell.rowIndexDrawn][cell.columnIndexDrawn] = this.backgroundColor;
            }
        }
        // 이동 가능성을 체크한 후, 가능 여부 저장
        for (let cell of blocks) {
            if (cell.rowIndexToDraw >= this.tetrisRows) {
                this.tetrisBlock.canMovable = false;
                this.tetrisBlock.needToDie = true;
                break;
            }
            if (cell.rowIndexToDraw >= 0) {
                if (!this._isEmpty(cell.rowIndexToDraw, cell.columnIndexToDraw)) {
                    this.tetrisBlock.canMovable = false;
                    break;
                }
            }
        }
        //$.c('기존 그림 그리기 직전');
        // 기존의 그림을 그려 놓는다.
        for (let cell of this.tetrisBlock.blocks) {
            if (cell.rowIndexDrawn != -1 && cell.columnIndexDrawn != -1) {
                this.panel[cell.rowIndexDrawn][cell.columnIndexDrawn] = this.tetrisBlock.color;
            }
        }
        //$.c(this.tetrisBlock.canMovable,this.tetrisBlock.needToDie);
    }
    clearBlocks(abc) {
        // 기존꺼 지우기    
        for (let cell of abc) {
            if (cell.rowIndexDrawn != -1 && cell.columnIndexDrawn != -1) {
                const row = cell.rowIndexDrawn;
                const column = cell.columnIndexDrawn;
                this.panel[row][column] = this.backgroundColor;
                cell.rowIndexDrawn = -1;
                cell.columnIndexDrawn = -1;
            }
        }
    }
    changePanelBackground() { // 테트리스 블럭의 움직임을 반영.
        let row;
        let column;
        // 기존꺼 지우기    
        for (let cell of this.tetrisBlock.blocks) {
            if (cell.rowIndexDrawn != -1 && cell.columnIndexDrawn != -1) {
                row = cell.rowIndexDrawn;
                column = cell.columnIndexDrawn;
                this.panel[row][column] = this.backgroundColor;
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
    }
    getData(func) {
        this.sendDataToViewWhenReady = func;
    }
}