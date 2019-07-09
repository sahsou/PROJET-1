
var enabled;

function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
  }




  function myFunction() {
    const element = document.getElementById("myDIV"); 

    if (enabled) {
      element.classList.remove("fa-pulse");
      enabled = false;
     } else {
      element.classList.add("fa-pulse");
      enabled = true;
     }
 }