const SHAPE_TYPES = 7;

let shapeRowLen;
let shapeColLen;

let colors = ["#ECE6CC", "indianred", "#FF9026", "#FDF377", "#D0FC5C", "aquamarine", "#5F85BB", "#A374DB"];

function makeShape() {
    let shapeMatrix = [];
    let colorID = selectShapes(getRandom(SHAPE_TYPES), shapeMatrix);
    // let colorID= selectShapes(6, shapeMatrix);
    let maxRow = 0;
    let maxCol = 0;
    let mappedShape = [];
    let isGameOver = false;

    // 랜덤으로 생성된 도형 정보를 컬러매트릭스에 출력
    // for(let i =0;i<shapeMatrix.length;i++){
    //     for(let j = 0;j<shapeMatrix[i].length;j++){
    //         colorMatrix[i][j+shapeMatrix.length] = shapeMatrix[i][j]
    //     }
    // }

    // console.log(shapeMatrix);

    function getShapeLength() {
        for (let i = 0; i < shapeMatrix.length; i++) {
            for (let j = 0; j < shapeMatrix[i].length; j++) {
                if (shapeMatrix[i][j] != 0) {
                    if (i > maxRow) maxRow = i;
                    if (j > maxCol) maxCol = j;
                }
            }
        }
        maxRow++;
        maxCol++;
    }
    getShapeLength(); //도형의 가로세로 크기 구하기

    function mappingShape() {
        for (let i = 0; i < maxRow; i++) {
            for (let j = 0; j < maxCol; j++) {
                if (shapeMatrix[i][j] == colorID) {
                    // shapeMatrix의 해당 셀에 실제 블럭이 포함된다면
                    mappedShape.push({ row: i, col: j });
                }
            }
        }
    }
    mappingShape();

    // if (!isGameOver) {
    //     console.log("겜오버 켜짐");

    //     for (let i = 0; i < mappedShape.length; i++) {
    //         colorMatrix[mappedShape[i].row + 0][mappedShape[i].col + shapeMatrix.length] = colorID;
    //     }
    // }

    return {
        shapeMatrix,
        currentPositionX: 0,
        currentPositionY: shapeMatrix.length,
        id: colorID,
        maxRow,
        maxCol,
        mappedShape,
        isGameOver,
        gameOverCheck: function () {
            for (let i = 0; i < this.mappedShape.length; i++) {
                if (colorMatrix[this.mappedShape[i].row + 0][this.mappedShape[i].col + this.shapeMatrix.length] != 0){
                    console.log(this.mappedShape[i].row, this.mappedShape[i].col, "가 충돌");
                    this.isGameOver = true;
                }
            }
        },
        mappingShape: function () {
            this.mappedShape.length = 0;
            for (let i = 0; i < this.maxRow; i++) {
                for (let j = 0; j < this.maxCol; j++) {
                    if (this.shapeMatrix[i][j] == this.id) {
                        // shapeMatrix의 해당 셀에 실제 블럭이 포함된다면
                        this.mappedShape.push({ row: i, col: j });
                    }
                }
            }
        },
        getShapeLength: function () {
            this.maxRow = 0;
            this.maxCol = 0;
            for (let i = 0; i < this.shapeMatrix.length; i++) {
                for (let j = 0; j < this.shapeMatrix[i].length; j++) {
                    if (this.shapeMatrix[i][j] != 0) {
                        if (i > this.maxRow) this.maxRow = i;
                        if (j > this.maxCol) this.maxCol = j;
                    }
                }
            }
            this.maxRow++;
            this.maxCol++;
        },
    };
}
/* 
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0] */
function selectShapes(n, mat) {
    switch (n) {
        /*
        J:1
        L:2
        O:3
        S:4
        T:5
        Z:6
        I:7
         */
        case 0:
            {
                //J
                mat.push([1, 0, 0]);
                mat.push([1, 1, 1]);
                mat.push([0, 0, 0]);
                return n + 1;
            }
            break;
        case 1:
            {
                //L
                mat.push([0, 0, 2]);
                mat.push([2, 2, 2]);
                mat.push([0, 0, 0]);
                return n + 1;
            }
            break;
        case 2:
            {
                //O
                mat.push([3, 3, 0]);
                mat.push([3, 3, 0]);
                mat.push([0, 0, 0]);
                return n + 1;
            }
            break;
        case 3:
            {
                //S
                mat.push([0, 4, 4]);
                mat.push([4, 4, 0]);
                mat.push([0, 0, 0]);
                return n + 1;
            }
            break;
        case 4:
            {
                //T
                mat.push([0, 5, 0]);
                mat.push([5, 5, 5]);
                mat.push([0, 0, 0]);
                return n + 1;
            }
            break;
        case 5:
            {
                //Z
                mat.push([6, 6, 0]);
                mat.push([0, 6, 6]);
                mat.push([0, 0, 0]);
                return n + 1;
            }
            break;
        case 6:
            {
                //Z
                mat.push([7, 0, 0, 0]);
                mat.push([7, 0, 0, 0]);
                mat.push([7, 0, 0, 0]);
                mat.push([7, 0, 0, 0]);
                return n + 1;
            }
            break;
    }
}
