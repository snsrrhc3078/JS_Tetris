let isShapeOut = false; // 사용자가 조작할 도형이 존재 하는지
let shapeData; //현재 사용자가 조작중인 도형
let tempShapeMatrix;
function processing() {
    if (!isShapeOut) {
        detectingLine();
        if(isClear()){
            console.log("클리어", id);
            resetForStageClear();
            return 0;
        }

        shapeData = preShape;
        shapeData.gameOverCheck();
        if (shapeData.isGameOver) { //shapeData의 isGameOver이 true인지 확인
            gameOver();
        } else {// isGameOver가 false라면 도형이 
            putShape();
            draw();
            isShapeOut = true;
        }

        preShape = makeShape(); //preShape에 도형 생성
        drawPreview();

    } else {
        detectingBottom();
        // detectingLeft()
        // detectingRight()
    }
    // console.log(shapeData);
    // console.log(colorMatrix)
    // console.log(cellMatrix)
    // console.log(tempShapeMatrix);
    // console.log(isShapeOut);
    // rotateShape();
}
// 게임오버 기능을 수행하는 함수
function gameOver(){
    alert("게임오버");
    clearTimeout(id)
    document.location.reload();

}

// 클리어 했는지 확인하는 함수
function isClear(){
    if(line >= 10){
        return true;
    }else{
        return false;
    }
}


/**
 * 한줄이 다 채워졌는지 검사하는 함수
 */
function detectingLine() {
    let linedIndex = [];
    for (let i = 0; i < colorMatrix.length; i++) {
        // console.log(i);
        let line = colorMatrix[i];
        let isLined = true;
        for (let j = 0; j < line.length; j++) {
            if (line[j] == 0) isLined = false;
        }

        if (isLined) linedIndex.push(i);
    }

    // console.log(linedIndex, "만든 라인");
    if (linedIndex.length > 0) {
        clearLine(linedIndex);
        addLine(linedIndex.length); //라인 몇개 만들었는지 display에 추가
    }
}

function clearLine(linedIndex) {
    for (let i = 0; i < linedIndex.length; i++) {
        for (let j = 0; j < colorMatrix[0].length; j++) {
            colorMatrix[linedIndex[i]][j] = 0;
        }
    }
    // draw()
    downEveryMatrix(linedIndex);
}

/**
 * shape를 제외 한 모든 colormatrix의 값을 아래쪽으로 없어진줄만큼 내린다
 */
function downEveryMatrix(linedIndex) {
    let cRow = linedIndex.at(-1);
    console.log(cRow);
    for (let i = cRow - 1; i >= 0; i--) {
        // console.log("crow", i);
        let flag = false;
        for (let j = 0; j < colorMatrix[0].length; j++) {
            if (colorMatrix[i][j] != 0) {
                flag = true;
            }
        }

        if (flag) {
            //만약 현재 i번쨰 줄이 비어있지 않는다면
            for (let j = 0; j < colorMatrix[0].length; j++) {
                colorMatrix[cRow][j] = colorMatrix[i][j];
                colorMatrix[i][j] = 0;
            }
            cRow--;
        } else {
        }
    }
}

function rotateShape() {
    tempShapeMatrix = Array.from(Array(shapeData.shapeMatrix.length), () => Array(shapeData.shapeMatrix[0].length));
    // console.log(tempShapeMatrix);

    let n = shapeData.shapeMatrix.length;
    for (let i = 0; i < n; i++) {
        //도형 90도 돌려서 암사Matrix에 넣기
        for (let j = 0; j < n; j++) {
            tempShapeMatrix[i][j] = shapeData.shapeMatrix[n - j - 1][i];
        }
    }
    console.log("90도 돌린 shapeMatrix:", tempShapeMatrix);

    // 돌린 도형을 전부 왼쪽 위에 붙임. 이렇게 하는 이유는 shapeData의 currentPosition을 변경하지 않기 위함
    let removeRow = 0; //삭제해야 할 행의 수
    let removeCol = 0; //삭제해야할 열의 수
    let lockRow = true;
    let lockCol = true;

    for (let i = 0; i < tempShapeMatrix.length; i++) {
        let flagCol = true; //해당 i행이 빈공간인지 확인
        let falgRow = true;
        for (let j = 0; j < tempShapeMatrix[i].length; j++) {
            //해당 행과 열이 빈공간인지 조사
            /* 조사 방식은
            i = 0 을돌면
                검사, 검사, 검사
                검사, 0   , 0
                검사, 0   , 0

            i = 1
                0   , 검사, 0
                검사, 검사, 검사
                0   , 검사, 0

            i = 2
                0   , 0    , 검사
                0   , 0    , 검사
                검사,, 검사, 검사
            */
            if (tempShapeMatrix[i][j] != 0 && lockCol) {
                // i행이 빈공간인지 탐색하지만 만약 한번이라도 빈값이 안들어있는 행이 이전에 존재했었다면
                // lockCol에 의해서 잠김
                flagCol = false;
            }

            if (tempShapeMatrix[j][i] != 0 && lockRow) {
                // i열이 빈공간인지 탐색하지만 만약 한번이라도 빈값이 안들어있는 행이 이전에 존재했었다면
                // lockCol에 의해서 잠김
                falgRow = false;
            }
        }
        if (flagCol && lockCol) {
            //만약 해당 i행이 빈공간이면, 그리고 잠기지 않았다면
            removeRow++; //행삭제 + 1
        } else {
            // 빈공간이 아니라면 잠김
            lockCol = false;
        }
        if (falgRow && lockRow) {
            // 만약 해당 i열이 빈공간이라면, 그리고 잠기지 않았다면
            removeCol++;
        } else {
            // 빈공간이 아니라면 잠김
            lockRow = false;
        }
    }
    console.log(removeRow, removeCol);
    for (let i = 0; i < removeRow; i++) {
        //배열을 행 기준으로 으로 -1칸 돌리기
        tempShapeMatrix.push(tempShapeMatrix.shift());
    }
    for (let i = 0; i < removeCol; i++) {
        for (let j = 0; j < tempShapeMatrix[i].length; j++) {
            // 배열을 열 기준으로 -1칸 돌리기
            tempShapeMatrix[j].push(tempShapeMatrix[j].shift());
        }
    }

    console.log(tempShapeMatrix);


    // 돌리기전에 그렸던거 지우기
    clearShape();

    //완전히 돌리기로 결정하기 전에 돌릴 공간이 비었는지 확인
    let tempMap = []
    let tempMaxRow = 0;
    let tempMaxCol = 0;

    function getTempShapeLength(){//tempMatrix의 maxrow, maxcol을 구함
        for (let i = 0; i < tempShapeMatrix.length; i++) {
            for (let j = 0; j < tempShapeMatrix[i].length; j++) {
                if (tempShapeMatrix[i][j] != 0) {
                    if (i > tempMaxRow) tempMaxRow = i;
                    if (j > tempMaxCol) tempMaxCol = j;
                }
            }
        }
        tempMaxRow++;
        tempMaxCol++;
    }
    getTempShapeLength();

    function getTempMap(){
        for (let i = 0; i < tempMaxRow; i++) {
            for (let j = 0; j < tempMaxCol; j++) {
                if (tempShapeMatrix[i][j] != 0) {
                    // tempShapeMatrix의 해당 셀에 블럭이 존재한다면
                    tempMap.push({ row: i, col: j });
                }
            }
        }
    }
    getTempMap(); //돌린 도형의 매핑을 구함
    console.log(tempMap);
    console.log(tempMaxRow);

    let isCanRotate = true;

    for(let i = 0;i<tempMap.length;i++){
        if(colorMatrix.length-shapeData.currentPositionX < tempMaxRow){
            isCanRotate = false;
            break;
        }
         if(colorMatrix[tempMap[i].row + shapeData.currentPositionX][tempMap[i].col + shapeData.currentPositionY] != 0){
            isCanRotate = false;
        }
        
    }

    if(!isCanRotate){
        console.log("못돌림");
        putShape() //지웠던거 다시 그림
        draw(); //렌더링
        return 0;
    }

    // 돌린 도형이 들어있는 임시Matrix의 값을 현재 도형을 의미하는 ShapeMatrix에 넣기
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            shapeData.shapeMatrix[i][j] = tempShapeMatrix[i][j];
        }
    }
    shapeData.getShapeLength();
    shapeData.mappingShape();
    putShape();
    draw();
    // console.log(shapeData);
}

function draw() {
    // 컬러매트릭스에 있는 값들을 실제 div에 출력
    for (let i = 0; i < cellMatrix.length; i++) {
        for (let j = 0; j < cellMatrix[i].length; j++) {
            cellMatrix[i][j].style.backgroundColor = colors[colorMatrix[i][j]];
        }
    }
}

// colorMatrix에 그려져있는 도형을 지우는 함수
function clearShape() {
    for (let i = 0; i < shapeData.mappedShape.length; i++) {
        colorMatrix[shapeData.mappedShape[i].row + shapeData.currentPositionX][
            shapeData.mappedShape[i].col + shapeData.currentPositionY
        ] = 0;
    }
}

function putShape() {
    for (let i = 0; i < shapeData.mappedShape.length; i++) {
        colorMatrix[shapeData.mappedShape[i].row + shapeData.currentPositionX][
            shapeData.mappedShape[i].col + shapeData.currentPositionY
        ] = shapeData.id;
    }
}

function moveShape(direction) {
    clearShape();

    switch (direction) {
        case "down":
            shapeData.currentPositionX++;
            putShape();
            break;
        case "left":
            shapeData.currentPositionY--;
            putShape();
            break;
        case "right":
            shapeData.currentPositionY++;
            putShape();
    }
    draw();
}

// 스페이스바 누르면 완전히 내려갈때까지 충돌감지 후, 도형을 내리는 함수를 재귀호출
function spaceBarAction(){
    if(!isShapeOut){
        isShapeOut = false;
        processing(id)
        return 0;
    }
    console.log("스페이스바 호출됨");
    detectingBottom();
    addScore(1); //한번 내려갈때마다 1점씩 추가
    spaceBarAction();
}

// 충돌탐지, 이동

function getLowestCell() {
    // 아래쪽으로 도형을 내리기 위해 먼저 충돌 감지를 해야함
    let lowestmap = [];
    for (let j = 0; j < shapeData.maxCol; j++) {
        let currentMaxRow = 0;
        let currentMaxCol = 0;
        for (let i = 0; i < shapeData.maxRow; i++) {
            // console.log(shapeData.shapeMatrix[i][tempCol])
            shapeData.mappedShape.forEach((item) => {
                // console.log(i, j, "inforEach", item);
                if (i == item.row && j == item.col) {
                    if (currentMaxRow <= i) {
                        currentMaxRow = i;
                        currentMaxCol = j;
                        // console.log("cr", i , "cc",j);
                    }
                    // console.log("currentMaxRow", currentMaxRow, "currentMaxCol", currentMaxCol)
                }
            });
        }
        // console.log(lowestmap, "push")
        lowestmap.push([currentMaxRow, currentMaxCol]);
    }
    return lowestmap;
}
function detectingBottom() {
    let lowCell = getLowestCell();
    // for(let i = 0;i<lowCell.length;i++){
    //     console.log(lowCell[i][0]+shapeData.currentPositionX, lowCell[i][1]+shapeData.currentPositionY)
    //     if(colorMatrix[lowCell[i][0]+shapeData.currentPositionX][lowCell[i][1]+shapeData.currentPositionY]!==0){
    //         console.log(shapeData)
    //     }else{
    //         downShape()
    //         return 0;
    //     }
    // }
    let leftBottomSpace = colorMatrix.length - shapeData.currentPositionX - shapeData.maxRow;
    // console.log(leftBottomSpace)
    if (leftBottomSpace >= 1) {
        for (let i = 0; i < lowCell.length; i++) {
            // console.log(lowCell[i][0] + shapeData.currentPositionX, lowCell[i][1] + shapeData.currentPositionY)
            let absoluteRow = lowCell[i][0] + 1 + shapeData.currentPositionX;
            let absoluteCol = lowCell[i][1] + shapeData.currentPositionY;
            if (colorMatrix[absoluteRow][absoluteCol]) {
                if(shapeData.currentPositionX == 0){
                    putShape();
                    draw();
                    gameOver();
                }
                console.log("충돌");
                isShapeOut = false;
                return 0;
            }
        }
    } else {
        console.log("바닥에 닿음");
        isShapeOut = false;
        return 0;
    }
    // downShape();
    moveShape("down");
}

// function downShape(){

//     clearShape()
//     shapeData.currentPositionX++;
//     for(let i = 0;i<shapeData.mappedShape.length;i++){
//         colorMatrix[shapeData.mappedShape[i].row + shapeData.currentPositionX][shapeData.mappedShape[i].col + shapeData.currentPositionY] = shapeData.id;
//     }

//     draw()
// }

function getLeftestCell() {
    //현재 도형에서 가장 왼쪽에  있는 셀들의 배열을 구하자
    let leftestMap = [];
    let cRow = 0;

    for (let i = 0; i < shapeData.maxRow; i++) {
        for (let j = 0; j < shapeData.mappedShape.length; j++) {
            if (cRow == shapeData.mappedShape[j].row) {
                leftestMap.push(shapeData.mappedShape[j]);
                cRow++;
                break;
            }
        }
    }

    // console.log(leftestMap);
    return leftestMap;
}

function detectingLeft() {
    let leftCell = getLeftestCell();
    console.log(leftCell);

    let leftLeftSpace = shapeData.currentPositionY;
    console.log(leftLeftSpace);

    if (leftLeftSpace >= 1) {
        for (let i = 0; i < leftCell.length; i++) {
            let absoluteRow = leftCell[i].row + shapeData.currentPositionX;
            let absoluteCol = leftCell[i].col + shapeData.currentPositionY - 1;
            if (colorMatrix[absoluteRow][absoluteCol] != 0) {
                console.log("왼쪽충돌");
                return 0;
            }
        }
    } else {
        console.log("왼쪽벽에 닿음");
        return 0;
    }
    // leftShape();
    moveShape("left");
}

function getRightlestCell() {
    let rightestMap = [];
    let mappedShape = shapeData.mappedShape;
    let cCol = 0;
    let cRow = 0;

    for (let i = 0; i < shapeData.maxRow; i++) {
        for (let j = 0; j < mappedShape.length; j++) {
            // console.log(`mappedShape[${j}].row: ${mappedShape[j].row}, cRow: ${cRow}`);
            // console.log(`mappedShape[${j}].col: ${mappedShape[j].col}, cCol = ${cCol}`);
            if (mappedShape[j].row == cRow && mappedShape[j].col > cCol) {
                cCol = mappedShape[j].col;
                console.log(cCol, "cCol");
            }
        }
        rightestMap.push([cRow, cCol]);
        cCol = 0;
        cRow++;
    }
    return rightestMap;
}

function detectingRight() {
    let rightCell = getRightlestCell();

    console.log(rightCell);
    let rightSpace = colorMatrix[0].length - shapeData.currentPositionY - shapeData.maxCol;
    // console.log(rightSpace);
    if (rightSpace >= 1) {
        for (let i = 0; i < rightCell.length; i++) {
            let absoluteRow = rightCell[i][0] + shapeData.currentPositionX;
            let absoluteCol = rightCell[i][1] + shapeData.currentPositionY + 1;
            if (colorMatrix[absoluteRow][absoluteCol] != 0) {
                console.log("오른쪽충돌");
                return 0;
            }
        }
    } else {
        console.log("오른쪽 벽에 닿음");
        return 0;
    }
    moveShape("right");
}
