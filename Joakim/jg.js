// @ts-check

var imageOffset = 0

function movecar() {
  imageOffset += 50
  document.getElementById("tesla").style.left = imageOffset + "px";
}