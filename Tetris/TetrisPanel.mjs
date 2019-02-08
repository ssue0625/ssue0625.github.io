import TetrisData from "./TetrisData.mjs";
import TetrisBlock from "./TetrisBlock.mjs";

export default class TetrisPanel {
    constructor(tetrisRows, tetrisColumns) {
        this.tetrisRows = tetrisRows;
        this.tetrisColumns = tetrisColumns;
        this.backgroundColor = '#c8c8c8';
        this.tetrisBlock = new TetrisBlock(this, this.changePanelBackground.bind(this));
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
        this.checkLineDeletable();
        // 원래 : row 가 1이 아니면 새 블럭을 만든다.
        // 나의 생각 : 블럭을 만들 때 배경색과 같은 블럭을 만들면 안되기 때문에
        // 조건에 배경색과 다르다라는 것을 추가한다.
        // 아빠의 생각 : 
        // 1. this.blocks 는 어디에 있는가? 있다면, 데이터 형이 무엇이기에 this.backgroundColor와 비교하는가? 
        //    이 넘들은 서로 데이터 형조차 다른 넘들 아닌가?
        // 2. this.blocks != this.backgroundColor 의 값은 무엇인가? 항상 True다. 그 이유는?
        $.c('informIAmDead 비교', this.blocks != this.backgroundColor);
        if (row != 1 && this.blocks != this.backgroundColor) {
            //$.c(row);
            this.tetrisBlock = new TetrisBlock(this, this.changePanelBackground.bind(this));
            // 3. 새로 만든 tetrisBlock의 색깔을 패널의 배경색과 비교해 보고,,
            // 두 넘의 값이 같으면,, TetrisBlock의 색을 바꾸던지, 새로 만들어야 하는데,,
            // 어떤 조치를 취했나??
        }
        $.c('TetrisPanel.inforIAmDead', this.tetrisBlock.color);
    }
    checkLineDeletable() {
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
            }
        }
    }
    deleteLine(lineToDeleteIndex) {
        $.c(lineToDeleteIndex);
        let row = this.panel[lineToDeleteIndex];
        for (let cellToCheck = 0; cellToCheck < row.length; cellToCheck++) {
            row[cellToCheck] = this.backgroundColor;
        }
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