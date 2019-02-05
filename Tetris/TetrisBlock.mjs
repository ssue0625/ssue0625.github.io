import PanelCell from './PanelCell.mjs';
export default class TetrisBlock {
    constructor(tetrisPanel, makePanelData) {
        this.tetrisPanel = tetrisPanel;
        this.speed = 300;
        this.color = this._makeColor();
        // this.shape = [[{ row: -2, column: 0 }, { row: -2, column: 1 }],
        //              [{ row: -1, column: 0 }, { row: -1, column: 1 }]];
        this.shapes = [
            [   // 정사각형
                [   // 기본형, 1번째 모양
                    [1, 1],
                    [1, 1]
                ]
            ],
            [   // ㄱ 자 모양
                [   // 기본형, 1번째 모양
                    [1, 1, 0],
                    [0, 1, 0],
                    [0, 1, 0]
                ],
                [   // 첫번째 회전 모양
                    [0, 0, 1],
                    [1, 1, 1],
                    [0, 0, 0]
                ],
                [
                    [0, 1, 0],
                    [0, 1, 0],
                    [0, 1, 1]
                ],
                [
                    [0, 0, 0],
                    [1, 1, 1],
                    [1, 0, 0]
                ]
            ],
            [   // 무슨 모양 
                [   // 기본형, 1번째 모양
                    [0, 1, 1],
                    [0, 1, 0],
                    [0, 1, 0]
                ],
                [   // 첫번째 회전 모양
                    [0, 0, 0],
                    [1, 1, 1],
                    [0, 0, 1]
                ],
                [
                    [0, 1, 0],
                    [0, 1, 0],
                    [1, 1, 0]
                ],
                [
                    [1, 0, 0],
                    [1, 1, 1],
                    [0, 0, 0]
                ]
            ],
            [
                [   // 기본형, 1번째 모양
                    [1, 1, 0],
                    [0, 1, 1],
                    [0, 0, 0]
                ],
                [   // 첫번째 회전 모양
                    [0, 0, 1],
                    [0, 1, 1],
                    [0, 1, 0]
                ],
                [
                    [0, 0, 0],
                    [1, 1, 0],
                    [0, 1, 1]
                ],
                [
                    [0, 1, 0],
                    [1, 1, 0],
                    [1, 0, 0]
                ]
            ],
            [
                [   // 기본형, 1번째 모양
                    [0, 1, 1],
                    [1, 1, 0],
                    [0, 0, 0]
                ],
                [   // 첫번째 회전 모양
                    [0, 1, 0],
                    [0, 1, 1],
                    [0, 0, 1]
                ],
                [
                    [0, 0, 0],
                    [0, 1, 1],
                    [1, 1, 0]
                ],
                [
                    [1, 0, 0],
                    [1, 1, 0],
                    [0, 1, 0]
                ]
            ],
            [
                [   // 기본형, 1번째 모양
                    [0, 1, 0],
                    [1, 1, 1],
                    [0, 0, 0]
                ],
                [   // 첫번째 회전 모양
                    [0, 1, 0],
                    [0, 1, 1],
                    [0, 1, 0]
                ],
                [
                    [0, 0, 0],
                    [1, 1, 1],
                    [0, 1, 0]
                ],
                [
                    [0, 1, 0],
                    [1, 1, 0],
                    [0, 1, 0]
                ]
            ],
            [
                [   // 기본형, 1번째 모양
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0]
                ],
                [   // 첫번째 회전 모양
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 1, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0]
                ]
            ]
        ];
        this.rotateIndex = 0;
        //this.shape = this.shapes[3];
        this.shapeIndex = Math.floor(Math.random() * this.shapes.length);
        this.shape = this.shapes[this.shapeIndex][this.rotateIndex];
        // 배열의 사이즈
        // 배열행 : 기준점에서의 위치
        this.deltaRow = 0;
        this.deltaColumn = 4;
        this.newDeltaRow = this.deltaRow;
        this.newDeltaColumn = this.deltaColumn;
        this.makePanelDataWhenMoved = makePanelData;
        //this.blocks = new TetrisCells(this.shapeIndex, this.rotateIndex);
        //this.handle;
        setTimeout(() => {
            this.moveDownFirst();
        }, 0);
    }
    _getNextRotateIndex() { // 새로운 Rotate Index를 만드는 방법!
        let shapeSize = this.shapes[this.shapeIndex].length;
        let newRotateIndex = this.rotateIndex + 1;
        if (newRotateIndex == shapeSize) { 
            newRotateIndex = 0;
        }
        return newRotateIndex;
    }
    makeTetrisCells(shapeIndex, rotateIndex) {
        const cells = [];
        const rowSize = this.shapes[shapeIndex][rotateIndex].length;
        const columnSize = this.shapes[shapeIndex][rotateIndex][0].length;
        let shapeElement;
        for (let rowIndex = 0; rowIndex < rowSize; rowIndex++) {
            for (let columnIndex = 0; columnIndex < columnSize; columnIndex++) {
                shapeElement = this.shapes[shapeIndex][rotateIndex][rowIndex][columnIndex];
                if (shapeElement == 1) {
                    cells.push(new PanelCell(rowIndex - rowSize, columnIndex));
                }
            }
        }
        return cells;
    }
    canBlockDown() {
        for (let cell of this.blocks) {
            if (cell.isDrawn) {
                this.tetrisPanel.clearCell(cell.rowIndexDrawn, cell.columnIndexDrawn);
            }
        }
        let result = true;
        let blockRowIndex;
        let blockColumnIndex;
        const isMovable = this.tetrisPanel.isEmpty.bind(this.tetrisPanel);
        //$.c('시작');
        for (let cell of this.blocks) {
            blockRowIndex = cell.rowIndex + this.newDeltaRow;
            blockColumnIndex = cell.columnIndex + this.newDeltaColumn;
            //$.c('newDelta ' + this.newDeltaRow);
            //$.c('canDown: ', blockRowIndex, blockColumnIndex, this.tetrisPanel.tetrisRows);
            // 이동 가능한가? 죽어야 하는가?
            if (blockRowIndex >= 0 &&
                blockRowIndex < this.tetrisPanel.tetrisRows) {
                //$.c('if');
                const downable = isMovable(blockRowIndex, blockColumnIndex);
                if (downable) {
                    //$.d(cell);
                    // 그릴 수 있다고 표시한다.
                    cell.canDraw = true;
                    cell.rowIndexToDraw = blockRowIndex;
                    cell.columnIndexToDraw = blockColumnIndex;
                } else {
                    //$.c('죽는 곳');
                    //$.c('canDown: ', blockRowIndex, blockColumnIndex, this.tetrisPanel.tetrisRows);
                    cell.canDraw = false;
                    result = false;
                    break;
                    // 죽인다.
                }
                //$.c(blockRowIndex,blockColumnIndex, downable);
            }
        }
        //$.c('끛');
        return result;
    }
    inputKey(key) {
        //key가 뭐지? 상, 하, 좌, 우 화살표만 반응..
        //$.c('키', key);
        switch (key.code) {
            case "ArrowLeft": this.moveLeft(); break;
            case "ArrowRight": this.moveRight(); break;
            case "ArrowDown": this.moveDown(); break;
            case "ArrowUp": this.rotate(); break;
        }
    }
    moveDownFirst() {
        if (!this.blocks) {
            this.blocks = this.makeTetrisCells(this.shapeIndex, this.rotateIndex);
        }
        this.handle = setInterval(() => {
            this.moveDown();
        }, this.speed);
        window.onkeyup = (e) => {
            this.inputKey(e);
        }
    }
    moveDown() {
        // Down 키가 눌렸으므로, 행을 하나 내린다.
        this.newDeltaRow++;
        // 테트리스 블럭의 각각의 셀들의 새로운 위치를 정해준 후, 움직일 수 있는지 체크
        for (let cell of this.blocks) {
            cell.rowIndexToDraw = cell.rowIndex + this.newDeltaRow;
            cell.columnIndexToDraw = cell.columnIndex + this.newDeltaColumn;
        }
        this.tetrisPanel.checkMovable(this.blocks);    // needToDie, canMovable
        if (this.needToDie || (!this.canMovable && this.newDeltaRow == 1)) {
            clearInterval(this.handle);
            //$.c('새로운 블럭 생성');
            window.onkeyup = null;
            this.tetrisPanel.informIAmDead(this.newDeltaRow);
            return;
        }
        if (this.canMovable) {
            this.makePanelDataWhenMoved();
        }
    }
    moveLeft() {
        // Left 키가 눌렸으므로, 칼럼을 좌측으로.
        this.newDeltaColumn--;
        // 테트리스 블럭의 각각의 셀들의 새로운 위치를 정해준 후, 움직일 수 있는지 체크
        for (let cell of this.blocks) {
            cell.rowIndexToDraw = cell.rowIndex + this.newDeltaRow;
            cell.columnIndexToDraw = cell.columnIndex + this.newDeltaColumn;
        }
        this.tetrisPanel.checkMovable(this.blocks);    // needToDie, canMovable
        if (this.canMovable) {
            this.makePanelDataWhenMoved();
        } else {
            this.newDeltaColumn++;
        }
    }
    moveRight() {
        // Right 키가 눌렸으므로, 칼럼을 우측으로.
        this.newDeltaColumn++;
        // 테트리스 블럭의 각각의 셀들의 새로운 위치를 정해준 후, 움직일 수 있는지 체크
        for (let cell of this.blocks) {
            cell.rowIndexToDraw = cell.rowIndex + this.newDeltaRow;
            cell.columnIndexToDraw = cell.columnIndex + this.newDeltaColumn;
        }
        this.tetrisPanel.checkMovable(this.blocks);    // needToDie, canMovable
        if (this.canMovable) {
            this.makePanelDataWhenMoved();
        } else {
            this.newDeltaColumn--;
        }
    }
    rotate() {
        const newRotateIndex = this._getNextRotateIndex();
        const newBlocks = this.makeTetrisCells(this.shapeIndex, newRotateIndex);
        if (!newBlocks){ 
            return;
        }
        for (let cell of newBlocks) {
            cell.rowIndexToDraw = cell.rowIndex + this.newDeltaRow;
            cell.columnIndexToDraw = cell.columnIndex + this.newDeltaColumn;
        }
        this.tetrisPanel.checkMovable(newBlocks);    // needToDie, canMovable
        if (this.canMovable) {
            this.tetrisPanel.clearBlocks(this.blocks);
            this.blocks = newBlocks;
            this.makePanelDataWhenMoved();
            this.rotateIndex = newRotateIndex;
        } 
    }
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