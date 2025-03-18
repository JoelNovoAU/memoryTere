$(document).ready(function () {
    let secuenciaJuego = [];
    let secuenciaUsuario = [];
    let colores = ["celda1", "celda2", "celda3", "celda4"];
    let enJuego = false;

    function parpadear(celda) {
        $(`.${celda}`).addClass("active");
        setTimeout(() => {
            $(`.${celda}`).removeClass("active");
        }, 400);
    }

    function nuevaSecuencia() {
        secuenciaUsuario = [];
        let colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
        secuenciaJuego.push(colorAleatorio);
        mostrarSecuencia();
    }

    function mostrarSecuencia() {
        let i = 0;
        enJuego = false;
        let intervalo = setInterval(function () {
            if (i >= secuenciaJuego.length) {
                clearInterval(intervalo);
                enJuego = true;
                return;
            }
            parpadear(secuenciaJuego[i]);
            i++;
        }, 600);
    }

    $(".celda").click(function () {
        if (!enJuego) return;
        let celdaSeleccionada = $(this).attr("class").split(" ")[1];
        secuenciaUsuario.push(celdaSeleccionada);
        parpadear(celdaSeleccionada);
        verificarSecuencia();
    });

    function verificarSecuencia() {
        let index = secuenciaUsuario.length - 1;
        if (secuenciaUsuario[index] !== secuenciaJuego[index]) {
            alert("¡ Has Perdido !" );
            reiniciarJuego();
            return;
        }
        if (secuenciaUsuario.length === secuenciaJuego.length) {
            setTimeout(nuevaSecuencia, 1000);
        }
    }

    function reiniciarJuego() {
        secuenciaJuego = [];
        enJuego = false;
    }

    $("#empezar").click(function () {
        reiniciarJuego();
        nuevaSecuencia();
    });
});
