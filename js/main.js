let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
sectionSeleccionarAtaque.style.display = 'none';

let sectionReiniciar = document.getElementById('reiniciar')
sectionReiniciar.style.display = 'none';

let botonMascotaJugador = document.getElementById('boton-mascota')
botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

let botonAtaqueFuego = document.getElementById('boton-fuego')
botonAtaqueFuego.addEventListener('click', ataqueFuego)

let botonAtaqueAgua = document.getElementById('boton-agua')
botonAtaqueAgua.addEventListener('click', ataqueAgua)

let botonAtaqueTierra = document.getElementById('boton-tierra')
botonAtaqueTierra.addEventListener('click', ataqueTierra)

let ataqueJugador = document.getElementById('ataque-jugador');
let ataqueEnemigo = document.getElementById('ataque-enemigo');

let contadorVidasJugador = 3;
let contadorVidasEnemigo = 3;

let botonReiniciar = document.getElementById('boton-reiniciar')
botonReiniciar.addEventListener('click', reiniciarPartida)

function seleccionarMascotaJugador () {
    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
    sectionSeleccionarMascota.style.display = 'none';

    sectionSeleccionarAtaque.style.display = 'block';

    let inputHipodoge = document.getElementById('hipodoge');
    let inputCapipepo = document.getElementById('capipepo');
    let inputRatigueya = document.getElementById('ratigueya');
    let spanMascotaJugador = document.getElementById('mascota-jugador');
    
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = 'Hipodoge,';
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = 'Capipepo,';
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = 'Ratigueya,';
    } else {
        alert('Elige a una mascota por favor');
        reiniciarPartida()
    }

    seleccionarMascotaEnemigo()
}

function aleatorio (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function seleccionarMascotaEnemigo () {
    let seleccionAleatorio = aleatorio(1,3);
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo');
    
    if (seleccionAleatorio == 1) {
        spanMascotaEnemigo.innerHTML = 'Hipodoge';
    } else if (seleccionAleatorio == 2) {
        spanMascotaEnemigo.innerHTML = 'Capipepo';
    } else {
        spanMascotaEnemigo.innerHTML = 'Ratigueya';
    }
}

function ataqueFuego () {
    ataqueJugador = 'fuego';
    ataqueAleatorioEnemigo()
}

function ataqueAgua () {
    ataqueJugador = 'agua';
    ataqueAleatorioEnemigo()
}

function ataqueTierra () {
    ataqueJugador = 'tierra';
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo () {
    let seleccionAleatorio = aleatorio(1,3);
    
    if (seleccionAleatorio == 1) {
        ataqueEnemigo = 'fuego';
    } else if (seleccionAleatorio == 2) {
        ataqueEnemigo = 'agua';
    } else {
        ataqueEnemigo = 'tierra';
    }

    batalla()
}

function batalla () {
    let vidasJugador = document.getElementById('vidas-jugador');
    let vidasEnemigo = document.getElementById('vidas-enemigo');

    if (ataqueEnemigo == ataqueJugador) {
        textoBatalla('EMPATASTE')
    } else if (ataqueJugador == 'fuego' && ataqueEnemigo == 'tierra') {
        textoBatalla('GANASTE')
        contadorVidasEnemigo--;
    } else if (ataqueJugador == 'agua' && ataqueEnemigo == 'fuego') {
        textoBatalla('GANASTE')
        contadorVidasEnemigo--;
    } else if (ataqueJugador == 'tierra' && ataqueEnemigo == 'agua') {
        textoBatalla('GANASTE')
        contadorVidasEnemigo--;
    } else {
        textoBatalla('PERDISTE')
        contadorVidasJugador--;
    }

    console.log(contadorVidasJugador, contadorVidasEnemigo)

    vidasJugador.innerHTML = contadorVidasJugador;
    vidasEnemigo.innerHTML = contadorVidasEnemigo;
}

function textoBatalla (mensajeResultadoBatalla) {
    let mensaje = document.getElementById('mensaje');

    let crearMensaje = document.createElement('p');
    crearMensaje.innerHTML = `Tu mascota atacó con ${ataqueJugador}, la mascosta del enemigo atacó con ${ataqueEnemigo}. ${mensajeResultadoBatalla}.`;

    mensaje.appendChild(crearMensaje);

    if (contadorVidasJugador <= 0) {
        crearMensaje.innerHTML = `Lo siento... Haz perdido todas tus vidas, por favor reinicia la partida.`;
        mensaje.appendChild(crearMensaje);
        finPartida()
    } else if (contadorVidasEnemigo <= 0) {
        crearMensaje.innerHTML = `Felcitaciones... El enemigo a perdido todas sus vidas, por favor reinicia la partida.`;
        mensaje.appendChild(crearMensaje);
        finPartida()
    }
}

function finPartida () {
    sectionReiniciar.style.display = 'block';

    let botonAtaqueFuego = document.getElementById('boton-fuego')
    botonAtaqueFuego.disabled = true;

    let botonAtaqueAgua = document.getElementById('boton-agua')
    botonAtaqueAgua.disabled = true;

    let botonAtaqueTierra = document.getElementById('boton-tierra')
    botonAtaqueTierra.disabled = true;
}

function reiniciarPartida () {
    location.reload()
}