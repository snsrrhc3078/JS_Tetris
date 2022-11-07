
let score = 0;
let line = 0;
let before = []
function addScore(s){
    score += s * level;
    console.log(score); 
    drawScoreArea();
}

function drawScoreArea(){
    scoreArea.innerText = "Score: " + score;

    if(score >= highestScore){
        highestScore = score;
        localStorage.setItem(SCORE_KEY, highestScore);
        highestScoreArea.innerText = "Highest Score: " + highestScore;
    }
}

function addLine(n){
    for(let i = 0;i<n;i++){
        line++;
        addScore(level * 100);
    }
    drawLinesArea();
}

function drawLinesArea(){
    lineArea.innerText = "Lines:" + line;
}

function drawPreview(){
    // console.log(before.length);
    if(before.length != 0){
        for(let i = 0;i<before.length;i++){
            previewArea.removeChild(before[i]);
        }
        before.length =0;
    }

    for(let i = 0;i<preShape.mappedShape.length;i++){
        let div = document.createElement("div");
        div.style.position = "absolute";
        div.style.background = colors[preShape.id];
        div.style.border = "1px solid black";
        div.style.boxSizing = "border-box";
        div.style.width = CELL_WIDTH_HEIGHT + "px";
        div.style.height = CELL_WIDTH_HEIGHT + "px";
        div.style.left = preShape.mappedShape[i].col * CELL_WIDTH_HEIGHT + "px";
        div.style.top = preShape.mappedShape[i].row * CELL_WIDTH_HEIGHT + "px";
        previewArea.appendChild(div);
        before.push(div)
    }
}

function drawLevelArea(){
    levelArea.innerText = "Level: " + level;
}