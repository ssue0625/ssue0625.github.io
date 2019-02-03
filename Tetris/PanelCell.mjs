export default class PanelCell {
    constructor(row, column) {
        // const shape = [ // shape.length
        //     [1, 2, 3],  // shape[0] == [1, 2, 3], const arr = shape[0]
        //     [0, 0, 1],  // shape[0].legth
        //     [1, 2, 34]   // shape[0][1] == 2, arr[1]
        // ];
        // const arr = [1, 2, 3, 4];   // arr.length, arr[0]
        this.rowIndex = row;
        this.columnIndex = column;
        this.rowIndexDrawn = -1;
        this.columnIndexDrawn = -1;
        //this.rowIndexToDraw
        //this.columnIndexToDraw
    }
}