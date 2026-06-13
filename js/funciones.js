let sistema = new Sistema()
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

function renderizarTabla(){
    let tbody = document.getElementById("tbodyInfluencers")
    tbody.innerHTML = "" //borra la info que hay
    for(let inf of sistema.influencers){
        let fila = document.createElement("tr")
        fila.innerHTML = "<td>" + inf.nombre + "</td>" +
                         "<td>" + inf.email + "</td>" +
                         "<td>" + inf.comision + "</td>" +
                         "<td><button class='boton1'>Ventas</td>"
        tbody.appendChild(fila)
    }

}
function agregarDatosInfluencer(){
    let nombre = document.getElementById("nombre").value
    let email = document.getElementById("email").value
    let comision = document.getElementById("comision").value
    
    let nuevoInfluencer = new Influencer(nombre,email,comision)
    sistema.influencers.push(nuevoInfluencer)
    renderizarTabla()
}

