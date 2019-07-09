var enabled;

function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    
  } 


  function myFunction() {
    const element = document.getElementById("myDIV"); 

    if (enabled) {
      element.classList.remove("fa-flip-vertical");
      enabled = false;
     } else {
      element.classList.add("fa-flip-vertical");
      enabled = true;
     }
 }
  
 relative