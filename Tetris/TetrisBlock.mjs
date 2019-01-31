export default class TetrisBlock {
    constructor(tetrisPanel, makePanelData) {
        this.tetrisPanel = tetrisPanel;
        this.color = this._makeColor();
        this.shape = [[{ row: -2, column: 5 }, { row: -2, column: 6 }],
        [{ row: -1, column: 5 }, { row: -1, column: 6 }]];
        this.deltaRow = 0;
        this.deltaColumn = 0;
        this.makePanelDataWhenMoved = makePanelData;
        this.handle = setInterval(() => {
            this.moveDown();
        }, 1000);


    }
    moveDown() {
        this.deltaRow++;
        if (this.deltaRow > this.tetrisPanel.tetrisRows) {
            clearInterval(this.handle);
            this.tetrisPanel.informIAmDead();
            return;
        }
        this.makePanelDataWhenMoved();
    }
    getPosition() {
        return this.shape + deltaRow;
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
        const result = [];
        //
        for (let ro = 0; ro < this.shape.length; ro++) {
            for (let col = 0; col < this.shape[0].length; col++) {
                if (this.shape[ro][col].row + this.deltaRow < 0 ||
                    this.shape[ro][col].column + this.deltaColumn < 0) continue;
                result.push({
                    row: this.shape[ro][col].row + this.deltaRow,
                    column: this.shape[ro][col].column + this.deltaColumn
                });
            }
        }
        return result;
    }

}