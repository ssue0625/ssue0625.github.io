import PanelCell from "./PanelCell.mjs";

export default class TetrisPlayer {
    constructor(panel) {
        this.tetrisPanel = panel;
        //this.tetrisBlock
        //this.blocks
        this.makePanelDataWhenMoved = this.tetrisPanel.changePanelBackground.bind(this.tetrisPanel);
        this.speedWhenDownKeyPressed = 100;
        this.autoPlaySpeed = 30;
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
        //$.c(this.maxScore, this.shapeIndexWhenMax, this.rotateIndexWhenMax, this.rowIndexWhenMax, this.columnIndexWhenMax);
        //$.c(`${this.rotateIndexWhenMax}회전, ${this.columnIndexWhenMax}열`);
        // 배열화 [회전, 회전, 좌측이동, 좌측이동, 좌측 이동, Down]
        const moveArray = [];
        // 현재의 rotateIndex에서 rotateIndexWhenMax까지 갈 수 있도록
        // 'ArrowUp'을 누르게끔 moveArray를 준비한다.
        for (let rotateIndex = this.tetrisBlock.rotateIndex; rotateIndex < this.rotateIndexWhenMax; rotateIndex++) {
            moveArray.push({
                'code': 'ArrowUp'
            });
        }
        const columnIndex = this.tetrisBlock.newDeltaColumn;
        //$.c('columnIndex = ', columnIndex);
        if (this.columnIndexWhenMax <= columnIndex) { // 좌측으로
            //$.c('left');
            for (let col = columnIndex; col > this.columnIndexWhenMax; col--) {
                moveArray.push({
                    'code': 'ArrowLeft'
                });
            }
        } else { // 우측으로
            //$.c('right');
            for (let col = columnIndex; col < this.columnIndexWhenMax; col++) {
                moveArray.push({
                    'code': 'ArrowRight'
                });
            }
        }
        moveArray.push({
            'code': 'ArrowDown'
        });
        const handle = setInterval(() => {
            let optionObject = moveArray.shift();
            //$.c(optionObject);
            if (optionObject) {
                let down = new KeyboardEvent('keydown', optionObject);
                window.dispatchEvent(down);
                let up = new KeyboardEvent('keyup', optionObject);
                window.dispatchEvent(up);
                if (optionObject.code == 'ArrowDown') {
                    clearInterval(handle);
                }
            }
            //  else {
            //     //$.c('clear');
            //     clearInterval(handle);
            // }
        }, this.autoPlaySpeed);
    }
    calculateScore() {
        //$.c(`${this.tetrisBlock.shapeIndex}모양, ${this.tetrisBlock.rotateIndex}회전, ${this.tetrisBlock.newDeltaRow}행, ${this.tetrisBlock.newDeltaColumn}열`);
        // 점수 계산
        const calculateScore = this.tetrisPanel.calculateScore.bind(this.tetrisPanel);
        const score = calculateScore(this.tetrisBlock.newDeltaRow, this.tetrisBlock.newDeltaColumn);
        // 계산이 끝난 후, 현재까지 최고 점수와 비교 
        // 최고 점수 시, 이동 및 회전 방법을 저장.
        let needToChange = this.maxScore < score;
        if (this.maxScore === score) { // 최고값과 같은 값일 때. 좌우 선택을 임의로 한다.
            if (Math.floor(Math.random() * 2) == 0) {
                needToChange = true;
            }
        }
        if (needToChange) {
            //$.c('Max', this.maxScore, score);
            //$.c(`${this.tetrisBlock.rotateIndex}회전, ${this.tetrisBlock.newDeltaColumn}열`);
            this.maxScore = score;
            this.shapeIndexWhenMax = this.tetrisBlock.shapeIndex;
            this.rotateIndexWhenMax = this.tetrisBlock.rotateIndex;
            this.rowIndexWhenMax = this.tetrisBlock.newDeltaRow;
            this.columnIndexWhenMax = this.tetrisBlock.newDeltaColumn;
        }
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
        const makeScoreBoard = this.tetrisPanel.makeScoreBoard.bind(this.tetrisPanel);
        this.maxScore = 0;
        makeScoreBoard();
        // 움직일 수 있는 범위를 계산해서 보관. (canMovable 이용)
        // 회전 가능한 범위 (canRotatable 이용)
        const rotateSize = this.tetrisBlock.shapes[this.tetrisBlock.shapeIndex].length; // 블록의 회전모양의 갯수.
        const originalDeltaColumn = this.tetrisBlock.newDeltaColumn;
        const originalDeltaRow = this.tetrisBlock.newDeltaRow;
        for (let rotateIndex = 0; rotateIndex < rotateSize; rotateIndex++) { // Rotatable 범위
            //this.tetrisBlock.shape = this.tetrisBlock.shapes[this.tetrisBlock.shapeIndex][this.tetrisBlock.rotateIndex];
            //let left =  //좌측으로 얼마나 갈 수 있나 
            this.tetrisBlock.newDeltaRow = originalDeltaRow;
            this.tetrisBlock.newDeltaColumn = originalDeltaColumn;
            let leftLimitPosition;
            while (true) {
                if (this.canMoveLeft()) {
                    this.tetrisBlock.newDeltaColumn--;
                } else {
                    leftLimitPosition = this.tetrisBlock.newDeltaColumn;
                    //$.c('열', leftLimitPosition);
                    break;
                }
            }
            // right = 우측으로 얼마나 갈 수 있나.
            this.tetrisBlock.newDeltaColumn = originalDeltaColumn;
            let rightLimitPosition;
            while (true) {
                if (this.canMoveRight()) {
                    this.tetrisBlock.newDeltaColumn++;
                } else {
                    rightLimitPosition = this.tetrisBlock.newDeltaColumn;
                    break;
                }
            }
            // 도달 가능한 좌측 끝열에서 우측 끝열까지 가서 해당 열에서 가장 밑으로 내려간다.
            // 현재 열은 우측 가장 끝 열에 있다.         
            for (let columnIndex = leftLimitPosition; columnIndex <= rightLimitPosition; columnIndex++) {
                this.tetrisBlock.newDeltaColumn = columnIndex;
                this.tetrisBlock.newDeltaRow = originalDeltaRow;
                // Down 가능한 한 최대한 다운.
                let downLimitPosition;
                while (true) { // 최대 다운가능한  행 구하기.
                    if (this.canMoveDown()) {
                        this.tetrisBlock.newDeltaRow++;
                    } else {
                        downLimitPosition = this.tetrisBlock.newDeltaRow;
                        break;
                    }
                }
                // 움직인 후, 다운까지 완료한 최종 상태에서 점수 계산
                //$.c(rotateIndex + '회전', columnIndex + '열', downLimitPosition + '행');
                this.calculateScore(); // rotateIndex 전달 불필요.  
            }
            this.tetrisBlock.newDeltaRow = originalDeltaRow;
            this.tetrisBlock.newDeltaColumn = originalDeltaColumn;
            if (this.canRotatable()) {
                this.rotate();
                this.tetrisBlock = this.tetrisPanel.tetrisBlock;
                this.blocks = this.tetrisBlock.blocks;
            } else {
                return;
                //throw '모두 Rotable 해야만 한다.';
            }
            // 원상태의 모양까지 만든 후 비로서 탈출
            if (rotateIndex == rotateSize - 1) {
                break;
            }
        }
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
                    //$.c(key);
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
                    //let myKeyFunc = this.inputKey.bind(this);
                    setTimeout(() => {
                        //myKeyFunc(key);
                        // ArrowDown Event를 만들고,
                        // keydown 이벤트를 발생시킨다.
                        let down = new KeyboardEvent('keydown', {
                            'code': 'ArrowDown'
                        });
                        window.dispatchEvent(down);
                        let up = new KeyboardEvent('keyup', {
                            'code': 'ArrowDown'
                        });
                        window.dispatchEvent(up);
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
                    this.rotate();
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
        const getNewRotateIndex = this.tetrisBlock._getNextRotateIndex.bind(this.tetrisBlock);
        this.newRotateIndex = getNewRotateIndex();
        const makeTetrisCells = this.tetrisBlock.makeTetrisCells.bind(this.tetrisBlock);
        const newBlocks = makeTetrisCells(this.tetrisBlock.shapeIndex, this.newRotateIndex);
        if (!newBlocks) {
            return;
            //throw '회전시, 새로 회전할 블럭이 안 만들어짐';
        }
        return newBlocks;
    }
    canRotatable() {
        let isRotatable = false;
        const newBlocks = this.getRotateBlocks();
        if (!newBlocks) {
            return isRotatable;
        }
        for (let cell of newBlocks) {
            cell.rowIndexToDraw = cell.rowIndex + this.tetrisBlock.newDeltaRow;
            cell.columnIndexToDraw = cell.columnIndex + this.tetrisBlock.newDeltaColumn;
        }
        //$.c('canRotable 체크 시작');
        isRotatable = this.tetrisPanel.canMovable(newBlocks);
        //$.c('canRotable 체크 끝');
        if (isRotatable) {
            this.newRotateBlock = newBlocks;
        } else {
            this.newRotateBlock = null;
        }
        return isRotatable;
    }
    rotate() {
        this.tetrisPanel.clearBlocks(this.tetrisBlock.blocks);
        this.blocks = this.newRotateBlock; //player
        this.tetrisBlock.blocks = this.newRotateBlock; //tetrisPanel
        this.makePanelDataWhenMoved();
        this.tetrisBlock.rotateIndex = this.newRotateIndex;
    }
}