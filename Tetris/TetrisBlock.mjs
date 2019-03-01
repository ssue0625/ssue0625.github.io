import PanelCell from './PanelCell.mjs';
export default class TetrisBlock {
    constructor(tetrisPanel) {
        this.tetrisPanel = tetrisPanel;
        this.autoDownSpeed = 500;
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
        this.informBlockCreated = this.tetrisPanel.informBlockCreated.bind(this.tetrisPanel);
        //this.blocks
        setTimeout(() => {
            this.moveDownFirst();
        }, 0);
    }
    _getNextRotateIndex() { // 새로운 Rotate Index를 만드는 방법!
        let shapeSize = this.shapes[this.shapeIndex].length; // 블록의 회전모양의 갯수.
        let newRotateIndex = this.rotateIndex + 1;
        if (newRotateIndex == shapeSize) {
            newRotateIndex = 0;
        }
        return newRotateIndex;
    }
    makeTetrisCells(shapeIndex, rotateIndex) {
        //$.c(this.shapes);
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
    moveDownFirst() {
        if (!this.blocks) {
            this.blocks = this.makeTetrisCells(this.shapeIndex, this.rotateIndex);
        }
        //this.informBlockCreated();
        setTimeout(() => {
            this.autoMoveDown();
        }, this.autoDownSpeed);
    }
    autoMoveDown() {
        const newDeltaRow = this.newDeltaRow + 1;
        // 테트리스 블럭의 각각의 셀들의 새로운 위치를 정해준 후, 움직일 수 있는지 체크
        if (!this.informed) {
            this.inform = true;
        }
        for (let cell of this.blocks) {
            cell.rowIndexToDraw = cell.rowIndex + newDeltaRow;
            cell.columnIndexToDraw = cell.columnIndex + this.newDeltaColumn;
            if (!this.informed && (cell.rowIndexToDraw < 0 || cell.columnIndexToDraw < 0)) {
                this.inform = false;
            }
        }
        if (!this.tetrisPanel.canDownable(this.blocks)) {
            this.tetrisPanel.informIAmDead(newDeltaRow);
            alert('GAME OVER');
            return;
        }
        this.newDeltaRow++;
        this.makePanelDataWhenMoved();
        setTimeout(() => {
            if (!this.isDowning) {
                this.autoMoveDown();
            }
        }, this.autoDownSpeed);
        if (!this.informed && this.inform) {
            this.informBlockCreated();
            this.informed = true;
        }
    }
    _makeColor() {
        // rgb : 0-255 -> rgb(255, 255, 255); 0x00 ~ 0xFF
        // 0 : black   ff: white
        const colors = '0123456789abcdef';
        let ret;
        do {
            // 먼저, 무조건 블럭의 색을 만들자.
            // ret 에 반환할 새로운 색을 만들어 넣는다.
            ret = '#';
            for (let i = 0; i < 6; i++) {
                // 아무 색이나 블럭 색이 되는 알고리즘.
                //ret += colors.charAt(Math.floor(Math.random() * 16));
                // 배경색과 블럭 색을 구별하기 쉽게하는 알고리즘.
                //ret += colors.charAt(Math.floor(Math.random() * 8));  // 배경색이 흰색일 때
                ret += colors.charAt(Math.floor(Math.random() * 8) + 8); // 배경색이 검은색
            }
            if (ret == this.tetrisPanel.backgroundColor) {
                alert('패널 배경색과 같은 색깔을 만들었네');
            }
        } while (ret == this.tetrisPanel.backgroundColor) // 반환색을 패널의 배경색과 비교한다. 같으면 달라질 때까지 무한 반복 한다.
        // 두 값이 다르면 비로소 ret를 반환한다.
        return ret;
    }
}