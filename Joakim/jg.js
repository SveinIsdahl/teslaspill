// @ts-check

var imageOffset = -20

function setup() {

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