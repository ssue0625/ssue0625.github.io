export default class TetrisBlock {
    constructor(makePanelData) {
        this.color = this._makeColor();
        this.shape =   [[{row: -2, column: 5}, {row: -2, column: 6}],
                        [{row: -1, column: 5}, {row: -1, column: 6}]];
        this.deltaRow = 0;
        this.deltaColumn = 0;
        this.makePanelDataWhenMoved = makePanelData;
        setInterval(()=>{
            this.moveDown();
        }, 1000);
    }
    moveDown() {
        this.deltaRow++;
        this.makePanelDataWhenMoved();
    }
    getPosition() {
        //shape object each{} + deltaRow
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
    
}