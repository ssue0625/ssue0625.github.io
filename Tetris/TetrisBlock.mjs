export default class TetrisBlock {
    constructor(tetrisPanel, makePanelData) {
        this.tetrisPanel = tetrisPanel;
        this.color = this._makeColor();
        this.shape = [[{ row: -2, column: 5 }, { row: -2, column: 6 }],
        [{ row: -1, column: 5 }, { row: -1, column: 6 }]];
        this.deltaRow = 0;
        this.deltaColumn = 0;
        this.newDeltaRow = 0;
        this.newDeltaColumn = 0;
        this.makePanelDataWhenMoved = makePanelData;
        this.handle = setInterval(() => {
            this.moveDown();
        }, 1000);


    }
    moveDown() {
        this.newDeltaRow++;
        const isMovable = this.tetrisPanel.canMove.bind(this.tetrisPanel);
        //$.c(isMovable(this.deltaRow, this.deltaColumn));
        $.c('tetrisPanel Rows' + this.tetrisPanel.tetrisRows);
        //$.c('newDeltaRow' + this.newDeltaRow);
        if (this.newDeltaRow > this.tetrisPanel.tetrisRows || !isMovable(this.deltaRow, this.newDeltaColumn)) {
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