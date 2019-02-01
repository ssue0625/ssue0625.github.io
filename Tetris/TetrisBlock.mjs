import PanelBlock from './PanelBlock.mjs';
export default class TetrisBlock {
    constructor(tetrisPanel, makePanelData) {
        this.tetrisPanel = tetrisPanel;
        this.color = this._makeColor();
        this.shape = [[{ row: -2, column: 0 }, { row: -2, column: 1 }],
        [{ row: -1, column: 0 }, { row: -1, column: 1 }]];
        this.shapeTest = [[1, 1],
                         [1, 1]];
        // 배열의 사이즈
        // 배열행 : 기준점에서의 위치
        // this.shapeTest = [[1, 1, 0],    // 0 => -2 : 0 - 3 = -3 + 1  // rowSize = 3
        //                  [0, 1, 0],    // 1 => -1 : 1 - 3 = -2 + 1
        //                  [0, 1, 0]];   // 2 =>  0 : 2 - 3 = -1 + 1
        //this.blocks = new PanelBlock(this.shape);
        this.deltaRow = 0;
        this.deltaColumn = 4;
        this.newDeltaRow = this.deltaRow;
        this.newDeltaColumn = this.deltaColumn;
        this.makePanelDataWhenMoved = makePanelData;
        //this.blocks;
        this.handle = setInterval(() => {
            this.moveDown();
        }, 1000);
    }
    makeBlocks() {
        const rowSize = this.shapeTest.length;
        const columnSize = this.shapeTest[0].length;
        let shapeElement;
        this.blocks = [];
        for (let rowIndex = 0; rowIndex < rowSize; rowIndex++) {
            for (let columnIndex = 0; columnIndex < columnSize; columnIndex++) {
                shapeElement = this.shapeTest[rowIndex][columnIndex];
                if (shapeElement == 1) {
                    this.blocks.push(new PanelBlock(rowIndex - rowSize + 1, columnIndex));
                } else {
                    continue;
                }
            }
        }
    }
    canDown() {
        let blockRowIndex;
        let blockColumnIndex;
        const isMovable = this.tetrisPanel.canMove.bind(this.tetrisPanel);
        $.c('시작');
        for (let block of this.blocks) {
            blockRowIndex = block.rowIndex + this.newDeltaRow;
            blockColumnIndex = block.columnIndex + this.newDeltaColumn;
            $.c(blockRowIndex,blockColumnIndex);
        }
        $.c('끛');
    }
    moveDown() {
        if (!this.blocks) {
            this.makeBlocks();
            $.d(this.blocks);
        }
        this.newDeltaRow++;
        if (!this.canDown()) {
            // 죽인다.
        }
        const isMovable = this.tetrisPanel.canMove.bind(this.tetrisPanel);
        //$.c(isMovable(this.deltaRow, this.deltaColumn));
        // $.c('tetrisPanel Rows' + this.tetrisPanel.tetrisRows);
        //$.c('newDeltaRow' + this.newDeltaRow);
        if (this.newDeltaRow > this.tetrisPanel.tetrisRows
            || !isMovable(this.deltaRow, this.newDeltaColumn)) {
            clearInterval(this.handle);
            $.c('인터벌 죽음');
            //this.tetrisPanel.informIAmDead();
            return;
        }
        this.makePanelDataWhenMoved();
        // this.deltaRow = this.newDeltaRow;
        // this.deltaColumn = this.newDeltaColumn;
    }
    // getPosition() {
    //     return this.shape + deltaRow;
    // }
    _makeColor() {
        const colors = '0123456789abcdef';
        let ret = '#';
        for (let i = 0; i < 6; i++) {
            ret += colors.charAt(Math.floor(Math.random() * 16));
        }
        return ret;
    }
    getMovedBlocks() {
        // $.c('getMovedBlocks 들어옴');

        const result = [];
        //$.c(result.length);
        // 지워야할 위치
        let line = [];
        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[0].length; j++) {
                if (this.shape[i][j].row + this.deltaRow < 0 ||
                    this.shape[i][j].column + this.deltaColumn < 0) continue;
                line.push({
                    row: this.shape[i][j].row + this.deltaRow,
                    column: this.shape[i][j].column + this.deltaColumn
                });
            }
        }

        result.push(line);
        // 변경된 위치
        //$.c(result.length);
        line = [];
        // $.c('getMovedBlocks 변경됨');
        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[0].length; j++) {
                if (this.shape[i][j].row + this.newDeltaRow < 0 ||
                    this.shape[i][j].column + this.newDeltaColumn < 0) continue;
                line.push({
                    row: this.shape[i][j].row + this.newDeltaRow,
                    column: this.shape[i][j].column + this.newDeltaColumn
                });
            }
        }
        result.push(line);
        //$.c(result.length);
        //$.c('getMovedBlocks 나감');
        this.deltaRow = this.newDeltaRow;
        this.deltaColumn = this.newDeltaColumn;
        ///$.c(this.deltaRow, this.deltaColumn);
        return result;
    }

}