//#####################################_________HUMAN_ANIMATION-fonctionnel

let humanPng = document.getElementById("humanPng");
let humanBlock = document.getElementById("humanBlock");
let speed2 = 8;

let heightHuman = parseFloat(getComputedStyle(humanPng).height);
let animationIdHuman = null;
let animationIdHuman0 = null;



    function moveHuman() {
    let yBloc = parseFloat(getComputedStyle(humanPng).top);
    let yMax =1000;

    if (yBloc + heightHuman <= yMax){
    humanPng.style.top = (yBloc + speed2) + "px";
    animationIdHuman = requestAnimationFrame(moveHuman);
    } else {
    cancelAnimationFrame(animationIdHuman);
     humanPng.style.display="none"
    }
}   
animationIdHuman = requestAnimationFrame(moveHuman);

