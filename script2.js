$(document).ready(function () {
    $(".boton").click(function () { 
       let audio= new Audio('Himno de la Liga de Campeones I Champions League anthem.mp3')
       audio.play().then(() => {
        setTimeout(() => {
            window.location.href = "index.html"
        }, 4000); 
    })
    });
});