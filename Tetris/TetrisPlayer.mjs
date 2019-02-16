export default class TetrisPlayer {
    constructor(panel) {
        this.tetrisPanel = panel;
        //this.tetrisBlock
        //this.blocks
        this.makePanelDataWhenMoved = this.tetrisPanel.changePanelBackground.bind(this.tetrisPanel);
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
        //$.c(this.tetrisBlock,this.blocks);
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
            //throw '키 입력시, 블럭이 존재하지 않는다.';
        }
        // 키가 눌렸는데, isDowning 이고 키가 아래 화살표가 아니면, 실행 안한다.
        if (this.tetrisBlock.isDowning && key.code !== "ArrowDown" ) {
            return;
        }
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
                const inputKeyFunc = this.inputKey.bind(this);
                setTimeout(() => {
                        inputKeyFunc(key);
                    }, 111);
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