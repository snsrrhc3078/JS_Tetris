
const CONTENT_LENX= 20;
const CONTENT_LENY= 10;
const CELL_WIDTH_HEIGHT = 30;


let content = document.querySelector("#content");
let cellMatrix = [];
let colorMatrix = [];
function makeBoard(){
    makeCells()
    makePreview();
}
function makeCells(){
    for(let i =0;i<CONTENT_LENX;i++){
        let arrayTemp = [];
        let  colorTemp = [];
        for(let j = 0;j<CONTENT_LENY;j++){
            
            let cell = document.createElement("div");
            cell.style.width = CELL_WIDTH_HEIGHT+ "px";
            cell.style.height = CELL_WIDTH_HEIGHT+ "px";
            cell.style.backgroundColor = "darkseagreen";
            cell.style.position = "absolute";
            cell.style.left = j * CELL_WIDTH_HEIGHT + "px";
            cell.style.top = i * CELL_WIDTH_HEIGHT + "px";
            cell.style.border = "1px solid grey";
            cell.style.boxSizing = "border-box";
            content.appendChild(cell);
            arrayTemp.push(cell);
            colorTemp .push(0);
        }
        cellMatrix.push(arrayTemp);
        colorMatrix.push(colorTemp);
    }
}

function makePreview(){
    previewArea.style.width = CELL_WIDTH_HEIGHT * 4 + "px";
    previewArea.style.height = CELL_WIDTH_HEIGHT * 4 + "px";
    previewArea.style.position = "relative";
    previewArea.style.margin = "20px 0px 0px 0px";

}
