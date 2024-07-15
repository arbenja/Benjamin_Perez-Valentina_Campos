//Modal
var modal = document.getElementById("myModal");

// Abrir al entrar a index 
window.onload = function() {
  modal.style.display = "block";
}

// Cerrar al hacer click fuera del modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}