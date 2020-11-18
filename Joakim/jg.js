// @ts-check

var imageOffset = 0

function setup() {

addEventListener("keypress", function movecar(e) {

  if(e.key === "d") {
    imageOffset += 50
    document.getElementById("tesla").style.left = imageOffset + "px";
    return;
  }
  else if (e.key === "a") {
    imageOffset -= 50
    document.getElementById("tesla").style.left = imageOffset + "px";
    return;
  }
  else if (e.key === "w") {
    imageOffset -= 50
    document.getElementById("tesla").style.top = imageOffset + "px";
    return;
  }
  else if (e.key === "s") {
    imageOffset += 50
    document.getElementById("tesla").style.top = imageOffset + "px";
    return;
  }
}) 


}