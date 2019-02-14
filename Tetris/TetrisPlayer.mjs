export default class TetrisPlayer {
    constructor (panel) {
        this.tetrisPanel = panel;  
        //this.blocks
        this.makePanelDataWhenMoved = this.tetrisPanel.changePanelBackground.bind(this.tetrisPanel);
        setTimeout(() => {
            this.doAfterInstanciated();
        }, 0);
    }
    doAfterInstanciated() {
        
        window.onkeyup = this.inputKey.bind(this);
        // window.onkeyup = (e) => {
            //     this.inputKey(e);
            //     //$.c('들어옴; this');
            // }
        }
        doWhenNewBlockCreated() {
            this.tetrisBlock = this.tetrisPanel.tetrisBlock;
            this.blocks = this.tetrisBlock.blocks;
            //$.c(this.tetrisBlock,this.blocks);
        }
        inputKey(key) {
            //console.log(this.tetrisPanel);
        //key가 뭐지? 상, 하, 좌, 우 화살표만 반응..
        if (!this.blocks) {
            return;
        }
        //this.blocks = this.tetrisPanel.tetrisBlock.blocks;
        
        //.makeTetrisCells(this.tetrisBlock.shapeIndex, this.tetrisBlock.rotateIndex);
        //$.c(this.blocks);

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
                this.moveDown();
                break;
            case "ArrowUp":
                this.rotate(this.getRotateBlocks());
                break;
        }
    }

    moveDown() {
        // Down 키가 눌렸으므로, 행을 하나 내린다.
        this.tetrisBlock.newDeltaRow++;
        // 테트리스 블럭의 각각의 셀들의 새로운 위치를 정해준 후, 움직일 수 있는지 체크
        for (let cell of this.blocks) {
            cell.rowIndexToDraw = cell.rowIndex + this.tetrisBlock.newDeltaRow;
            cell.columnIndexToDraw = cell.columnIndex + this.tetrisBlock.newDeltaColumn;
        }
        this.tetrisPanel.checkMovable(this.blocks); // needToDie, canMovable
        if (this.tetrisBlock.needToDie || (!this.tetrisBlock.canMovable && this.tetrisBlock.newDeltaRow == 1)) {
            clearInterval(this.tetrisBlock.handle);
            //$.c('새로운 블럭 생성');
            //window.onkeyup = null;
            this.tetrisPanel.informIAmDead(this.tetrisBlock.newDeltaRow);
            return;
        }
        if (this.tetrisBlock.canMovable) {
            this.makePanelDataWhenMoved();
        }
    }
    canMoveLeft() {
        //$.c('left');
        const newColumn = this.tetrisBlock.newDeltaColumn - 1;
        // 테트리스 블럭의 각각의 셀들의 새로운 위치를 정해준 후, 움직일 수 있는지 체크
        for (let cell of this.blocks) {
            cell.rowIndexToDraw = cell.rowIndex + this.tetrisBlock.newDeltaRow;
            cell.columnIndexToDraw = cell.columnIndex + newColumn;
            //$.c('toderaw', cell.columnIndexToDraw,cell.columnIndexDrawn);
        }
        return this.tetrisPanel.checkMovable(this.blocks); // needToDie, canMovable
    }    
    moveLeft() {
        // Left 키가 눌렸으므로, 칼럼을 좌측으로.
        //$.c('moveLeft');
        this.tetrisBlock.newDeltaColumn--;
        this.makePanelDataWhenMoved();
    }
    canMoveRight() {
        //$.c('canMoveRight');
        const newColumn = this.tetrisBlock.newDeltaColumn + 1;
        // 테트리스 블럭의 각각의 셀들의 새로운 위치를 정해준 후, 움직일 수 있는지 체크
        for (let cell of this.blocks) {
            cell.rowIndexToDraw = cell.rowIndex + this.tetrisBlock.newDeltaRow;
            cell.columnIndexToDraw = cell.columnIndex + newColumn;
        }
        return this.tetrisPanel.checkMovable(this.blocks); // needToDie, canMovable
    }
    moveRight() {
        //$.c('moveRight');
        // Right 키가 눌렸으므로, 칼럼을 우측으로.
        this.tetrisBlock.newDeltaColumn++;
        this.makePanelDataWhenMoved();
    }
    getRotateBlocks() {
        const getRotateIndex = this.tetrisBlock._getNextRotateIndex.bind(this.tetrisBlock);
        const newRotateIndex = getRotateIndex();
        const makeTetrisCells = this.tetrisBlock.makeTetrisCells.bind(this.tetrisBlock);
        const newBlocks = makeTetrisCells(this.tetrisBlock.shapeIndex, newRotateIndex);
        if (!newBlocks) { 
            return false;
        }
        for (let cell of newBlocks) {
            cell.rowIndexToDraw = cell.rowIndex + this.tetrisBlock.newDeltaRow;
            cell.columnIndexToDraw = cell.columnIndex + this.tetrisBlock.newDeltaColumn;
        }
        if (this.tetrisPanel.checkMovable(newBlocks)) {
            return {newBlocks: newBlocks, newRotateIndex: newRotateIndex};
        } else {
            return false;
        }
    }
    rotate(obj) {
        if (!obj) return;
        this.tetrisPanel.clearBlocks(this.tetrisBlock.blocks);
        this.blocks = obj.newBlocks; //player
        this.tetrisBlock.blocks = obj.newBlocks; //tetrisPanel
        this.makePanelDataWhenMoved();
        this.tetrisBlock.rotateIndex = obj.newRotateIndex;
    }
}