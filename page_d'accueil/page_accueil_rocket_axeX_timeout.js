let rocket = document.getElementById("rocket");
let cadre = document.getElementById("cadre");
let speed = 10; // Valeur du déplacement en pixels

// Conversion en nombre du diamètre du bloc (valeur de la forme "XXpx")

let widthRocket = parseFloat(getComputedStyle(rocket).width);
let animationId = null; // Identifiant de l'animation


// Déplace le bloc sur sa gauche

function moveObject(){
    
    // Conversion en nombre de la position gauche du bloc (valeur de la forme "XXpx")
        let xBloc = parseFloat(getComputedStyle(rocket).left);
		
    // Conversion en nombre de la largeur du cadre (valeur de la forme "XXpx")
        let xMax = 1600;
    
        if (xBloc + widthRocket <= xMax) { // Si le bloc n'est pas encore au bout du cadre
        // Déplacement du bloc
        rocket.style.left = (xBloc + speed) + "px";
        // Demande au navigateur d'appeler deplacerBloc dès que possible
        animationId = requestAnimationFrame(moveObject);
        } else {
        // Annulation de l'animation
        cancelAnimationFrame(animationId);}
        rocket.style.transform="30s linear 0s infinite;   "
}
setTimeout(moveObject,2000)


