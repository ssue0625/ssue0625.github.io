import PanelCell from "./PanelCell.mjs";

export default class TetrisPlayer {
    constructor(panel) {
        this.tetrisPanel = panel;
        //this.tetrisBlock
        //this.blocks
        this.makePanelDataWhenMoved = this.tetrisPanel.changePanelBackground.bind(this.tetrisPanel);
        this.speedWhenDownKeyPressed = 100;
        setTimeout(() => {
            this.doAfterInstanciated();
        }, 0);
    }
    doAfterInstanciated() {
        window.onkeydown = this.inputKey.bind(this);
    }
    doWhenNewBlockCreated() {
        this.tetrisBlock = this.tetrisPanel.tetrisBlock;
        this.blocks = this.tetrisBlock.blocks;
        this.simulate();
        this.executeBestMove();
    }
    executeBestMove() {
        // 최고 점수 시, 이동 및 회전 방법을 저장.
        // 배열화 [회전, 회전, 좌측이동, 좌측이동, 좌측 이동, Down]
        setTimeout(() => {
            ;//배열의 동작을 실행;
        }, 100);
    }
    calculateScore() {
        $.c('점수 계산');
        // 점수 계산
        // 계산이 끝난 후, 현재까지 최고 점수와 비교
        // 최고 점수 시, 이동 및 회전 방법을 저장.
    }
    saveTetrisBlock() {
        this.rotateIndexSaved = this.tetrisBlock.rotateIndex;
        this.shapeIndexSaved = this.tetrisBlock.shapeIndex;
        this.deltaRowSaved = this.tetrisBlock.deltaRow;
        this.deltaColumnSaved = this.tetrisBlock.deltaColumn;
        this.newDeltaRowSaved = this.tetrisBlock.newDeltaRow;
        this.newDeltaColumnSaved = this.tetrisBlock.newDeltaColumn;
        this.blocksSaved = [];
        for (const cell of this.tetrisBlock.blocks) {
            const newCell = new PanelCell(cell.rowIndex, cell.columnIndex);
            newCell.columnIndexDrawn = cell.columnIndexDrawn;
            newCell.rowIndexDrawn = cell.rowIndexDrawn;
            this.blocksSaved.push(newCell);
        }
    }
    restoreTetrisBlock() {
        this.tetrisBlock.rotateIndex = this.rotateIndexSaved;
        this.tetrisBlock.shapeIndex = this.shapeIndexSaved;
        this.tetrisBlock.shape = this.tetrisBlock.shapes[this.shapeIndexSaved][this.rotateIndexSaved];
        this.tetrisBlock.deltaRow = this.deltaRowSaved;
        this.tetrisBlock.deltaColumn = this.deltaColumnSaved;
        this.tetrisBlock.newDeltaRow = this.newDeltaRowSaved;
        this.tetrisBlock.newDeltaColumn = this.newDeltaColumnSaved;
        this.tetrisBlock.blocks = this.blocksSaved;
        this.blocks = this.tetrisBlock.blocks;
    }
    simulate() {
        // 현재 블럭의 new row와 new column 및 아래 내용을 보관.
        //this.tetrisBlock, this.blocks 보관
        this.saveTetrisBlock();
        // 움직일 수 있는 범위를 계산해서 보관. (canMovable 이용)
        // 회전 가능한 범위 (canRotatable 이용)
        //for () {
            // left = 좌측으로 얼마나 갈 수 있나 
            // right = 우측으로 얼마나 갈 수 있나.
            // for (const position = left; position <= right; position++) { 
                // Down 가능한 한 최대한 다운.
                // 움직인 후, 다운까지 완료한 최종 상태에서 점수 계산
                this.calculateScore();
            // }
        //}
        // 보관했던 row와 column 및 아래를 복원.
        // 현재 블럭의 new row와 new column 및 아래 내용을 보관.
        //this.tetrisBlock, this.blocks 보관
        this.restoreTetrisBlock();
    }
    checkKeyUp() {
        window.onkeyup = null;
        window.onkeydown = this.inputKey.bind(this);
    }
    inputKey(key) {
        window.onkeydown = null;
        window.onkeyup = this.checkKeyUp.bind(this);
                if (!this.blocks) {
                    return;
                    throw '키 입력시, 블럭이 존재하지 않는다.';
                }
        if (this.tetrisBlock.isDowning && key.code !== 'ArrowDown') {
            return;
        }
        //if (this.inputing) return;
        //console.log(this.tetrisPanel);
        //key가 뭐지? 상, 하, 좌, 우 화살표만 반응..
        switch (key.code) {
            case "ArrowLeft":
                if (this.canMoveLeft()) {
                    this.moveLeft();
                }
                break;
            case "ArrowRight":
                if (this.canMoveRight()) {
                    this.moveRight();
                }
                break;
            case "ArrowDown":
                if (this.canMoveDown()) {
                    if (!this.tetrisBlock.isDowning) {
                    this.tetrisBlock.isDowning = true;
                    }
                    this.moveDown();
                    let myKeyFunc = this.inputKey.bind(this);
                    setTimeout(() => {
                        myKeyFunc(key);
                    }, this.speedWhenDownKeyPressed);
                } else {
                    //clearTimeout(this.inputKeyHandle);
                    const newDeltaRow = this.tetrisBlock.newDeltaRow + 1;
                    this.tetrisBlock = null;
                    this.blocks = null;
                    this.tetrisPanel.informIAmDead(newDeltaRow);
                }
                break;
            case "ArrowUp": // 회전
                if (this.canRotatable()) {
                    this.rotate(this.getRotateBlocks());
                }
                break;
        }
    }
    canMoveDown() {
        const newDeltaRow = this.tetrisBlock.newDeltaRow + 1;
        // 테트리스 블럭의 각각의 셀들의 새로운 위치를 정해준 후, 움직일 수 있는지 체크
        for (let cell of this.blocks) {
            cell.rowIndexToDraw = cell.rowIndex + newDeltaRow;
            cell.columnIndexToDraw = cell.columnIndex + this.tetrisBlock.newDeltaColumn;
        }
        return this.tetrisPanel.canMovable(this.blocks);
    }
    moveDown() {
        // Down 키가 눌렸으므로, 행을 하나 내린다.
        this.tetrisBlock.newDeltaRow++;
        this.makePanelDataWhenMoved();
    }
    canMoveLeft() {
        const newColumn = this.tetrisBlock.newDeltaColumn - 1;
        // 테트리스 블럭의 각각의 셀들의 새로운 위치를 정해준 후, 움직일 수 있는지 체크
        for (let cell of this.blocks) {
            cell.rowIndexToDraw = cell.rowIndex + this.tetrisBlock.newDeltaRow;
            cell.columnIndexToDraw = cell.columnIndex + newColumn;
        }
        return this.tetrisPanel.canMovable(this.blocks);
    }
    moveLeft() {
        this.tetrisBlock.newDeltaColumn--;
        this.makePanelDataWhenMoved();
    }
    canMoveRight() {
        const newColumn = this.tetrisBlock.newDeltaColumn + 1;
        // 테트리스 블럭의 각각의 셀들의 새로운 위치를 정해준 후, 움직일 수 있는지 체크
        for (let cell of this.blocks) {
            cell.rowIndexToDraw = cell.rowIndex + this.tetrisBlock.newDeltaRow;
            cell.columnIndexToDraw = cell.columnIndex + newColumn;
        }
        return this.tetrisPanel.canMovable(this.blocks);
    }
    moveRight() {
        this.tetrisBlock.newDeltaColumn++;
        this.makePanelDataWhenMoved();
    }
    getRotateBlocks() {
        const getRotateIndex = this.tetrisBlock._getNextRotateIndex.bind(this.tetrisBlock);
        this.newRotateIndex = getRotateIndex();
        const makeTetrisCells = this.tetrisBlock.makeTetrisCells.bind(this.tetrisBlock);
        const newBlocks = makeTetrisCells(this.tetrisBlock.shapeIndex, this.newRotateIndex);
        if (!newBlocks) {
            throw '회전시, 새로 회전할 블럭이 안 만들어짐';
        }
        return newBlocks;
    }
    canRotatable() {
        let canRotable = false;
        const newBlocks = this.getRotateBlocks();
        if (!newBlocks) {
            return canRotable;
        }
        for (let cell of newBlocks) {
            cell.rowIndexToDraw = cell.rowIndex + this.tetrisBlock.newDeltaRow;
            cell.columnIndexToDraw = cell.columnIndex + this.tetrisBlock.newDeltaColumn;
        }
        canRotable = this.tetrisPanel.canMovable(newBlocks);
        if (canRotable) {
            this.newRotateBlock = newBlocks;
        } else {
            this.newRotateBlock = null;
        }
        return canRotable;
    }
    rotate() {
        this.tetrisPanel.clearBlocks(this.tetrisBlock.blocks);
        this.blocks = this.newRotateBlock; //player
        this.tetrisBlock.blocks = this.newRotateBlock; //tetrisPanel
        this.makePanelDataWhenMoved();
        this.tetrisBlock.rotateIndex = this.newRotateIndex;
    }
}