// @ts-check

var imageOffset = -20

const BtnStart = document.getElementById("start");

function setup() {



  BtnStart.addEventListener("click", function start() {
    
  })


addEventListener("keypress", function movecar(e) {

  if(e.key === "d") {
    imageOffset += 110
    document.getElementById("tesla").style.left = imageOffset + "px";
    return;
  }
  else if (e.key === "a") {
    imageOffset -= 110
    document.getElementById("tesla").style.left = imageOffset + "px";
    return;
  }
}) 
}
