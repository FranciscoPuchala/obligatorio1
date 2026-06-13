let sistema = new Sistema()
document.getElementById("agregarInfluencer").addEventListener("click",agregarInfluencer)
document.getElementById("botonCancelar").addEventListener("click",cancelarInfluencer)
document.getElementById("botonCancelarArticulo").addEventListener("click",cancelarArticulo)
document.getElementById("agregarArticulo").addEventListener("click", agregarArticulo)
document.getElementById("agregarventas").addEventListener("click", agregarventa)
document.getElementById("cancelarventa").addEventListener("click", cancelarventa)
document.getElementById("botonAgregar").addEventListener("click",agregarDatosInfluencer)
document.getElementById("botonAgregarArticulo").addEventListener("click",agregarDatosArticulo)
document.getElementById("botonAgregarVenta").addEventListener("click",agregarDatosVenta)

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
                         "<td></td>" +
                         "<td></td>" +
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

function renderizarTablaArticulo(){
    let tbody = document.getElementById("tbodyArticulos")
    tbody.innerHTML = "" //borra la info que hay
    for(let inf of sistema.articulos){
        let fila = document.createElement("tr")
        fila.innerHTML = "<td>" + inf.codigo + "</td>" +
                         "<td>" + inf.descripcion + "</td>" +
                         "<td>" + inf.precio + "</td>" 
        tbody.appendChild(fila)
    }

}

function agregarDatosArticulo(){
    let codigo = document.getElementById("codigo").value
    let descripcion = document.getElementById("descripción").value
    let precio = document.getElementById("precio").value

    let nuevoArticulo = new Articulo(codigo,descripcion,precio)
    sistema.articulos.push(nuevoArticulo)
    renderizarTablaArticulo()
}

function renderizarTablaVenta(){
    let tbody = document.getElementById("tbodyVentas")
    tbody.innerHTML = ""
    for(let ven of sistema.ventas){
        let fila = document.createElement("tr")
        fila.innerHTML = "<td>" + ven.numero + "</td>" +
                         "<td>" + ven.articulo + "</td>" +
                         "<td>" + ven.influencer + "</td>" +
                         "<td>" + ven.cantidad + "</td>" +
                         "<td>" + ven.medio + "</td>" +
                         "<td><button class='boton1'>❌</button></td>"
        tbody.appendChild(fila)
    }
}

function agregarDatosVenta(){
    let articulo = document.getElementById("menu").value
    let influencer = document.getElementById("menu2").value
    let cantidad = document.getElementById("cantidad").value
    let medio = document.getElementById("menu3").value

    let nuevaVenta = new Venta(sistema.contadorVentas, articulo, influencer, cantidad, medio)
    sistema.ventas.push(nuevaVenta)
    sistema.contadorVentas++
    renderizarTablaVenta()
    document.getElementById("dialogventas").close()
}


