function zoomin() {
    let GFG = document.getElementsByClassName('responsive')
    let currWidth = GFG.clientWidth;
    GFG.style.width = (currWidth + 100) + "px";
}

function zoomout() {
    let GFG = document.getElementsByClassName('responsive')
    let currWidth = GFG.clientWidth;
    GFG.style.width = (currWidth - 100) + "px";
} 