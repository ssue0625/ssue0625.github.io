import PanelCell from './PanelCell.mjs';
export default class TetrisBlock {
    constructor(tetrisPanel) {
        this.tetrisPanel = tetrisPanel;
        this.speed = 300;
        this.color = this._makeColor();
        // this.shape = [[{ row: -2, column: 0 }, { row: -2, column: 1 }],
        //              [{ row: -1, column: 0 }, { row: -1, column: 1 }]];
        this.shapes = [
            [ // 정사각형
                [ // 기본형, 1번째 모양
                    [1, 1],
                    [1, 1]
                ]
            ],
            [ // ㄱ 자 모양
                [ // 기본형, 1번째 모양
                    [1, 1, 0],
                    [0, 1, 0],
                    [0, 1, 0]
                ],
                [ // 첫번째 회전 모양
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
            [ // ㄱ 자 반대 모양
                [ // 기본형, 1번째 모양
                    [0, 1, 1],
                    [0, 1, 0],
                    [0, 1, 0]
                ],
                [ // 첫번째 회전 모양
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
            [ // ㄹ 같은 모양
                [ // 기본형, 1번째 모양
                    [1, 1, 0],
                    [0, 1, 1],
                    [0, 0, 0]
                ],
                [ // 첫번째 회전 모양
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
            [ // ㄹ 같은 반대 모양
                [ // 기본형, 1번째 모양
                    [0, 1, 1],
                    [1, 1, 0],
                    [0, 0, 0]
                ],
                [ // 첫번째 회전 모양
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
            [ // ㅗ 모양
                [ // 기본형, 1번째 모양
                    [0, 1, 0],
                    [1, 1, 1],
                    [0, 0, 0]
                ],
                [ // 첫번째 회전 모양
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
            [ // ㅣ 모양
                [ // 기본형, 1번째 모양
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0]
                ],
                [ // 첫번째 회전 모양
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
        this.makePanelDataWhenMoved = this.tetrisPanel.changePanelBackground.bind(this.tetrisPanel);
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
    inputKey(key) {
        //key가 뭐지? 상, 하, 좌, 우 화살표만 반응..
        //$.c('키', key);
        switch (key.code) {
            case "ArrowLeft":
                this.moveLeft();
                break;
            case "ArrowRight":
                this.moveRight();
                break;
            case "ArrowDown":
                this.moveDown();
                break;
            case "ArrowUp":
                this.rotate();
                break;
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
        this.tetrisPanel.checkMovable(this.blocks); // needToDie, canMovable
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
        this.tetrisPanel.checkMovable(this.blocks); // needToDie, canMovable
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
        this.tetrisPanel.checkMovable(this.blocks); // needToDie, canMovable
        if (this.canMovable) {
            this.makePanelDataWhenMoved();
        } else {
            this.newDeltaColumn--;
        }
    }
    rotate() {
        const newRotateIndex = this._getNextRotateIndex();
        const newBlocks = this.makeTetrisCells(this.shapeIndex, newRotateIndex);
        if (!newBlocks) {
            return;
        }
        for (let cell of newBlocks) {
            cell.rowIndexToDraw = cell.rowIndex + this.newDeltaRow;
            cell.columnIndexToDraw = cell.columnIndex + this.newDeltaColumn;
        }
        this.tetrisPanel.checkMovable(newBlocks); // needToDie, canMovable
        if (this.canMovable) {
            this.tetrisPanel.clearBlocks(this.blocks);
            this.blocks = newBlocks;
            this.makePanelDataWhenMoved();
            this.rotateIndex = newRotateIndex;
        }
    }
    _makeColor() {
        const colors = '0123456789abcdef';
        let ret;
        do {
            // 먼저, 무조건 블럭의 색을 만들자.
            // ret 에 반환할 새로운 색을 만들어 넣는다.
            ret = '#';
            for (let i = 0; i < 6; i++) {
                ret += colors.charAt(Math.floor(Math.random() * 16));
            }
            if (ret == this.tetrisPanel.backgroundColor) {
                alert('패널 배경색과 같은 색깔을 만들었네');
            }
        } while (ret == this.tetrisPanel.backgroundColor) // 반환색을 패널의 배경색과 비교한다. 같으면 달라질 때까지 무한 반복 한다.
        // 두 값이 다르면 비로소 ret를 반환한다.
        return ret;
    }
}