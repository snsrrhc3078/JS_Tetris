addEventListener("load", function () {
    init();
});
const LINE_PER_LEVEL = 10;
const SCORE_KEY = "highestScore";

let id;
let scoreArea;
let lineArea;
let previewArea;
let preShape;
let level = 1;
let levelArea;
let highestScore;
let highestScoreArea;
function init() {
    let start = document.querySelector("#start-btn");
    scoreArea = document.querySelector("#score");
    lineArea = document.querySelector("#lines");
    previewArea = document.querySelector("#preview");
    levelArea = document.querySelector("#level");
    highestScoreArea = document.querySelector("#highest-score");

    // 최고점수 불러와서 그리기
    getHightestScore();


    // 도형 미리보기 
    preShape = makeShape();
    drawPreview();

    // 레벨 시작
    start.addEventListener("click", gameStart);
    // 보드 그리기
    makeBoard();
    // processing();
    // colorMatrix[16][1] = 4;
    // colorMatrix[17][1] = 4;
    // for(let i = 1;i< colorMatrix[0].length-1;i++){
    //     colorMatrix[19][i] = 1;
    //     colorMatrix[18][i] = 1;
    // }
    // for(let i = 0;i< colorMatrix[0].length;i++){
    //     colorMatrix[17][i] = 1;
    //     colorMatrix[16][i] = 1;
    // }

    //키보드 조작
    document.body.addEventListener("keydown", function (event) {
        // console.log(event.keyCode); 
        if(isShapeOut == true){ //도형이 바닥에 완전히 내려않았는데 좌우로 움직이는것을 방지함
            switch (event.keyCode) {
                case 40:
                    detectingBottom();
                    addScore(1);
                    break;
                case 37:
                    detectingLeft();
                    break;
                case 38:
                    rotateShape();
                    break;
                case 39:
                    detectingRight();
                    break;
                case 32:
                    spaceBarAction();
                    break;
            }
        }
        // if(event.keyCode == 32)
        //     spaceBarAction();
    });



    // 모달로 만든 설명서
    let modal = document.querySelector("#my-modal");
    let btn = document.querySelector("#modal-btn");
    // console.log(btn);
    let close = document.querySelector(".close");
    btn.addEventListener("click", function(){
        modal.style.display = "block";
    })
    close.addEventListener("click", function(){
        modal.style.display = "none";
    })
    window.addEventListener("click", function(){
        if(this.event.target == modal){
            modal.style.display = "none";
        }
    })
}

function getHightestScore(){
    highestScore = localStorage.getItem(SCORE_KEY);
    if(highestScore == null){
        highestScore = 0;
    }else{
        highestScore = parseInt(highestScore);
    }

    highestScoreArea.innerText = "Highest Score: " + highestScore;
}

function gameStart(){
    // detectingBottom()
    // downShape()
    if(id != undefined){
        clearTimeout(id)
    }

    processing();
    id = setInterval(
        processing
    , 1000 / level);

    this.blur();
}

function resetForStageClear(){
    alert(level + "레벨 클리어!");

    
    console.log("stop timeout");
    clearInterval(id);
    console.log(123);
    for(let i =0;i<colorMatrix.length;i++){
        for(let j = 0;j<colorMatrix[i].length;j++){
            colorMatrix[i][j] = 0;
        }
    }

    for(let i =0;i<cellMatrix.length;i++){
        for(let j = 0;j<cellMatrix[i].length;j++){
            cellMatrix[i][j].style.backgroundColor = "darkseagreen";
        }
    }

    // draw();
    isShapeOut = false;
    shapeData = null;
    line = 0;
    drawLinesArea();

    if(level==5){
        setTimeout(function(){alert("게임 클리어!")}, 1);
        document.location.reload();
    }

    level++;
    drawLevelArea();
}