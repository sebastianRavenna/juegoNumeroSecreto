let numeroSecreto = 0;
let numeroIntento = 0;
let intentosPermitidos = 3;
let numeroDeUsuario = 0;
let listaNumerosSecretos=[];
let numeroMinimo = 1;
let numeroMaximo = 10;


//funcion para cambiar los textos de los elementos HTML
function asignarElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return
}

//funcion para generar un numero aleatorio
function generarNumeroAleatorio(numeroMinimo, numeroMaximo){
    //while (listaNumerosSecretos.length < numeroMaximo){
        let numeroGenerado = Math.floor(Math.random() * numeroMaximo + 1);
        console.log(numeroGenerado);
        console.log(listaNumerosSecretos);
        if (listaNumerosSecretos.length == numeroMaximo){
            asignarElemento("p", "Ya se sortearon todos los numeros disponibles");
        }   else if (listaNumerosSecretos.includes(numeroGenerado)){
            return generarNumeroAleatorio(numeroMinimo, numeroMaximo);
        }   else {
            listaNumerosSecretos.push(numeroGenerado);
            return numeroGenerado;
        }
    //}
}    

//funcion para verificar el intento del usuario
function verificarIntento() {
    while (numeroDeUsuario !== numeroSecreto){
        //toma el valor del input y lo convierte en un numero entero
        numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);
        if (numeroDeUsuario === numeroSecreto){
            //en caso de acertar el numero secreto
            asignarElemento("p", `Acertaste el número secreto en ${numeroIntento} ${numeroIntento === 1 ? "intento" : "intentos"}`);
            document.getElementById("reiniciar").removeAttribute("disabled");
            break
        } else if(numeroDeUsuario > numeroSecreto && numeroIntento < intentosPermitidos){ 
            //en caso de que el numero ingresado sea mayor al numero secreto
            asignarElemento ("p", "El número secreto es menor")
        } else if (numeroDeUsuario < numeroSecreto && numeroIntento < intentosPermitidos){
            //en caso de que el numero ingresado sea menor al numero secreto
            asignarElemento ("p", "El número secreto es mayor")
        }
        limpiarCaja();
        numeroIntento++;
        //console.log(numeroIntento);
        if (numeroIntento > intentosPermitidos && numeroDeUsuario != numeroSecreto){
            //en caso de que el usuario haya superado los intentos permitidos
            perdiste();
            break
        } 
        return
    }
        
}
//funcion de tareas a realizar en caso de perder
function perdiste(){ 
    asignarElemento("p", `Perdiste, el número secreto era ${numeroSecreto}`);
    document.querySelector("p").style.color = "red";
    document.getElementById("reiniciar").removeAttribute("disabled");
}

//funcion para vaciar la caja de texto luego de cada intento
function limpiarCaja(){
    document.querySelector("#valorUsuario").value = "";
    return
}

//funcion para reiniciar el juego
function reiniciarJuego(){
    limpiarCaja()
    condicionesIniciales();
}

//funcion para asignar las condiciones iniciales del juego
function condicionesIniciales(){
    asignarElemento("h1", "Jugamos al número secreto");
    //let titulo = document.querySelector("h1");
    //titulo.innerHTML = "Jugamos al número secreto";
    
    asignarElemento("p", `Adivina el número entre ${numeroMinimo} y ${numeroMaximo}`);
    //let parrafo = document.querySelector("p");
    //parrafo.innerHTML = "Adivina el número entre 1 y 10";

    numeroSecreto = generarNumeroAleatorio(numeroMinimo, numeroMaximo);
    //console.log(numeroSecreto);
    numeroIntento = 1;
    document.querySelector("#reiniciar").setAttribute("disabled", true);
    document.querySelector("p").style.color = "white";
    numeroDeUsuario = 0;
    //console.log(numeroDeUsuario);
}

condicionesIniciales();