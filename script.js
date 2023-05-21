const encriptar = document.getElementById("encriptar");
const desencriptar = document.getElementById("desencriptar");
const copiar = document.getElementById("copiar");
const textoOriginal = document.getElementById("textoOriginal");
const textoResultado = document.getElementById("textoResultado");
const elementosOcultos = document.getElementsByClassName("ocultos");
let contenido = false
let textoTratado;

function ocultarElemntos(...objetos){
    for(let objeto of objetos){
        objeto.style.display="none";
    }
}

function mostrarElementos(...objetos){
    for(let objeto of objetos){
        objeto.style.display="inline-block";
    }
}

function verificarContenido(input){
    contenido = false;
    if(input.value.length == 0){
        input.focus();
    }else{
        return contenido = true
    }
}

function tratarTexto(){
    let diccionarioAcentos = {"á":"a", "é":"e", "í":"i", "ó":"o", "ú":"u"};
    textoTratado = textoOriginal.value.toLowerCase();

    for(let i=0; i < Object.keys(diccionarioAcentos).length; i++){
        const llave = Object.keys(diccionarioAcentos)[i];
        const valor = Object.values(diccionarioAcentos)[i];
        textoTratado = textoTratado.replaceAll(llave,valor);
    }
    return textoTratado;
}

function encriptarAlura(){
    tratarTexto();
    let diccionario = {"a":"ai", "e":"enter", "i":"imes", "o":"ober", "u":"ufat"};
    textoResultado.value = "";
    for(let indice = 0; indice < textoTratado.length; indice ++){
        if(diccionario.hasOwnProperty(textoTratado[indice])){
            textoResultado.value += diccionario[textoTratado[indice]];
        }else{
            textoResultado.value += textoTratado[indice];
        }
    }
    return textoResultado.value;
}

function desencriptarAlura(){
    tratarTexto();
    let diccionario = {"ai":"a", "enter":"e", "imes":"i", "ober":"o", "ufat":"u"};
    textoResultado.value = textoTratado;

    for(let i=0; i < Object.keys(diccionario).length; i++){
        const llave = Object.keys(diccionario)[i];
        const valor = Object.values(diccionario)[i];
        textoResultado.value = textoResultado.value.replaceAll(llave,valor);
    }
    return textoResultado.value;
}

function desencriptarTexto(){
    verificarContenido(textoOriginal);
    if(contenido == true){
        ocultarElemntos(...elementosOcultos);
        mostrarElementos(textoResultado, copiar);
        desencriptarAlura();
    } else {
        textoResultado.value="";
        ocultarElemntos(textoResultado,copiar);
        mostrarElementos(...elementosOcultos);
    }
}


function encriptarTexto(){
    verificarContenido(textoOriginal);
    if(contenido == true){
        ocultarElemntos(...elementosOcultos);
        //Recuerda que al llamar una matriz ya definida hacia Rest Parameters debemos colocar los 3 puntos(...)
        mostrarElementos(textoResultado, copiar);
        encriptarAlura();
    } else {
        textoResultado.value="";
        ocultarElemntos(textoResultado,copiar);
        mostrarElementos(...elementosOcultos);
    }
}

function copiarTexto(){
    textoResultado.select();
    document.execCommand("copy");
}

encriptar.onclick = encriptarTexto;
desencriptar.onclick = desencriptarTexto;
copiar.onclick = copiarTexto;
