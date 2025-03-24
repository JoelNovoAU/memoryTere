$(document).ready(function () {
    let secuenciaJuego = []
    let secuenciaUsuario = []
    let colores = ["celda1", "celda2", "celda3", "celda4"]
    let enJuego = false
    let golesLocal = 0  
    let golesVisitante = 0  
    let tiempo = 0  
    let sonidoActivo = false  
    let cronometro  


    function parpadear(celda) {
        $(`.${celda}`).addClass("active")
        setTimeout(() => {
            $(`.${celda}`).removeClass("active")
        }, 400)
    }

    function nuevaSecuencia() {
        secuenciaUsuario = []
        let colorAleatorio = colores[Math.floor(Math.random() * colores.length)]
        secuenciaJuego.push(colorAleatorio)
        mostrarSecuencia()
    }

    function mostrarSecuencia() {
        let i = 0
        enJuego = false
        let intervalo = setInterval(function () {
            if (i >= secuenciaJuego.length) {
                clearInterval(intervalo)
                enJuego = true
                return
            }
            parpadear(secuenciaJuego[i])
            i++
        }, 600)
    }

    $(".celda").click(function () {
        if (!enJuego) return
        let celdaSeleccionada = $(this).attr("class").split(" ")[1]
        secuenciaUsuario.push(celdaSeleccionada)
        parpadear(celdaSeleccionada)
        verificarSecuencia()
    })

    function verificarSecuencia() {
        let index = secuenciaUsuario.length - 1
        if (secuenciaUsuario[index] !== secuenciaJuego[index]) {
            mostrarMensajeRoja()
            return
        }
        if (secuenciaUsuario.length === secuenciaJuego.length) {
            golesLocal++
            $("#goles-local").text(golesLocal)
            let acierto = new Audio('spectators-really-enjoy-the-goal (mp3cut.net).mp3')
            acierto.play()
            setTimeout(nuevaSecuencia, 1500)
        }
    }

    function reproducirSonido(url) {
        if (!sonidoActivo) { 
            let sonido = new Audio(url);
            sonido.play();
            sonidoActivo = true;
            sonido.onended = function() {
                sonidoActivo = false;  
            };
        }
    }

    function mostrarMensajeRoja() {
        enJuego = false;
        clearInterval(cronometro);
        reproducirSonido('metal-whistle-6121 (mp3cut.net).mp3');
        $("#modalRoja").show()
        $("#reiniciarRoja").click(function () {
            location.reload()
        });
    }

    function mostrarMensajeVictoria() {
        enJuego = false;
        clearInterval(cronometro);
        reproducirSonido('metal-whistle-6121 (mp3cut.net).mp3');
        $("#modalVictoria").show()
        $("#reiniciarVictoria").click(function () {
            location.reload()
        });
    }

    function mostrarMensajeDerrota() {
        enJuego = false
        clearInterval(cronometro)
        reproducirSonido('metal-whistle-6121 (mp3cut.net).mp3');
        $("#modalDerrota").show()
        $("#reiniciarDerrota").click(function () {
            location.reload()
        });
    }

    function mostrarMensajeEmpate() {
        enJuego = false
        clearInterval(cronometro)
        reproducirSonido('metal-whistle-6121 (mp3cut.net).mp3');
        $("#modalEmpate").show()
        $("#reiniciarEmpate").click(function () {
            location.reload()
        });
    }

    function reiniciarJuego() {
        secuenciaJuego = []
        secuenciaUsuario = []
        enJuego = false
        nivel = 0
        golesLocal = 0
        golesVisitante = 0
        tiempo = 0
        nuevaSecuencia()
    }

    function iniciarCronometro() {
      cronometro= setInterval(function () {
            if (tiempo < 20) {
                tiempo++
                if (tiempo % 8 === 0) {
                    golesVisitante++  
                    $("#goles-visitante").text("- "+golesVisitante) 
                    let audio= new Audio('the-sound-where-the-fans-get-upset-because-they-miss-the-goal (mp3cut.net).mp3')
                    audio.play() 
                }
                $("#tiempo").text("Tiempo: " + tiempo + "s")
            } else {
                determinarGanador()
            }
        }, 1000)  
    }

    function determinarGanador() {
        if (golesLocal > golesVisitante) {
            mostrarMensajeVictoria()
        } else if (golesLocal < golesVisitante) {
            mostrarMensajeDerrota()
        } else {
            mostrarMensajeEmpate()
        }
    }

    $("#empezar").click(function () {
        reiniciarJuego()
        iniciarCronometro()  
    })
   
})
