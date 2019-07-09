// "$("ici")" est un sélecteur CSS.

var Modal_State = false;
var Notification_State = false;

function Show_Modal() {
    if(Modal_State){
        $("#Modal, #Modal_Shadow").animate({ // Exécute l'animation de la cible avec comme un/des paramètre css avec un timeout de 500ms 
            opacity: '0.0'
        }, 500);
        setTimeout(function(){ 
            $("#Modal, #Modal_Shadow").css("display", "none"); // Modifie le css de la cible 1er paramètre la catégorie "display" et en second la valeur.
        }, 500);
        Modal_State = false;
    } 
    else {
        $("#Modal, #Modal_Shadow").css("display", "block");
        $("#Modal, #Modal_Shadow").animate({
            opacity: '1.0'
        }, 500);
        Modal_State = true;
    }
}

function Show_Notification(Message) {
    if(!Notification_State) {
        Notification_State = true;
        $("#Notification_Container").append("<p>" + Message + "</p>"); // Injecte du code HTML dynamiquement dans la cible
        $("#Notification_Container").animate({
            left: '0%'
        }, 1500);
        setTimeout(function(){ // Ajoute un timer qui exécute le code JS ci-dessous avec en paramètre 5000ms
            $("#Notification_Container").animate({
                left: '-25%'
            }, 500);
            $("#Notification_Container >").remove("*"); // Supprime le code HTML présent dans le DOM dynamiquement
            Notification_State = false;
        }, 5000);
    } 
}

$(document).ready(function() { // Attend que la page soit chargée pour exécuter le code ci-dessous
    $(document).on("click", ".Fake_Send", function() { // Exécute le code ci-dessous quand on clique sur un objet de classe .Fake_Send
        $(".Input_Delete").val("");// Change la valeur des inputs à null
        Show_Modal(); // Exécute la fonction Show_Modal
    });

    $(document).on("click", ".Real_Send", function() {
        Show_Notification("Félicitation votre réservation à été prise en compte !") // Exécute la fonction Show_Notification avec le texte en paramètre
    });

    $(document).on("click", ".Real_Close", function() {
        Show_Modal();
    });
});