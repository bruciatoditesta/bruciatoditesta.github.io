let image = document.getElementById('immagine');
function ZoomIn() {
   let width = image.clientWidth;
   let height = image.clientHeight;
   image.style.width = (width + 50) + "px";
   image.style.height = (height + 50) + "px";
}
function ZoomOut() {
   let width = image.clientWidth;
   let height = image.clientHeight;
   image.style.width = (width - 50) + "px";
   image.style.height = (height - 50) + "px";
}