document.getElementById("agregarInfluencer").addEventListener("click",agregarInfluencer)
document.getElementById("botonCancelar").addEventListener("click",cancelarInfluencer)
document.getElementById("botonCancelarArticulo").addEventListener("click",cancelarArticulo)
document.getElementById("agregarArticulo").addEventListener("click", agregarArticulo)
document.getElementById("agregarventas").addEventListener("click", agregarventa)
document.getElementById("cancelarventa").addEventListener("click", cancelarventa)
document.getElementById("botonAgregar").addEventListener("click",agregarDatosInfluencer)

function agregarInfluencer(){
    document.getElementById("dialogInfluencer").showModal()
}

function cancelarInfluencer(){
    document.getElementById("dialogInfluencer").close()
}

function cancelarArticulo(){
    document.getElementById("dialogArticulo").close()
}

function agregarArticulo(){
    document.getElementById("dialogArticulo").showModal()
    
}

function agregarventa(){
    document.getElementById("dialogventas").showModal()
}

function cancelarventa(){
    document.getElementById("dialogventas").close()
}

function agregarDatosInfluencer(){
    let nombre = document.getElementById("nombre").value
}
