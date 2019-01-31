import TetrisData from "./TetrisData.mjs";
import TetrisBlock from "./TetrisBlock.mjs";

export default class TetrisPanel {
    constructor(tetrisRows, tetrisColumns) {
        this.informIAmDead = () => {
            this.tetrisBlock = new TetrisBlock(this, this.makePanelData.bind(this));
        }
        this.tetrisRows = tetrisRows;
        this.tetrisColumns = tetrisColumns;
        this.tetrisBlock = new TetrisBlock(this, this.makePanelData.bind(this));
        // setInterval(()=>{
        //     this.makePanelData();
        // }, 2000);
    }
    makePanelData() {
        //console.log(this.tetrisColumns);
        if (!this.panelExist) {
            let rows;
            let columns;
            this.panel = [];
            for (let row = 0; row < this.tetrisRows; row++) {
                rows = [];
                for (let column = 0; column < this.tetrisColumns; column++) {
                    //console.log('' + row + "," + column);
                    //rows.push(makeColor(row, column));
                    rows.push('#c8c8c8');
                }
                this.panel.push(rows);
            }
            this.panelExist = true;
            //console.log('한번 들어왔다. 이후 안들어옴');
        }
        //console.log('매번 들어옴');

        // tetrisBlock의 변화된 값 반영
        const movedBlocks = this.tetrisBlock.getMovedBlocks();
        let row;
        let column;
        for (let i = 0; i < movedBlocks.length; i++) {
            row = movedBlocks[i].row;
            column = movedBlocks[i].column;
            this.panel[row][column] = this.tetrisBlock.color;
        }
        if (this.sendDataToViewWhenReady) {

            //console.log(this.panel);
            const data = new TetrisData(this.panel);
            this.sendDataToViewWhenReady(data);

        }
        function makeColor(row, column) {
            const colors = '0123456789abcdef';
            let ret = '#';
            for (let i = 0; i < 6; i++) {
                ret += colors.charAt(Math.floor(Math.random() * 16));
            }
            return ret;
        }
    }
    getData(func) {
        this.sendDataToViewWhenReady = func;
    }
}