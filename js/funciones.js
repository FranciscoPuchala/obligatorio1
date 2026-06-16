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

function eleminarVenta(indice){
    sistema.ventas.splice(indice, 1)
    renderizarTablaVenta()
}

function agregarventa(){
    document.getElementById("dialogventas").showModal()
    let menuArticulo = document.getElementById("menu")
    let menuInfluencer = document.getElementById("menu2")
    
    menuInfluencer.innerHTML = ""
    menuArticulo.innerHTML = ""

    for(inf of sistema.influencers){
        let opcion = document.createElement("option")
        opcion.value = inf.nombre // guarda la info pero no lo muestra
        opcion.text = inf.nombre // muestra la info en texto
        menuInfluencer.appendChild(opcion)
    }

    for(inf of sistema.articulos){
        let opcion = document.createElement("option")
        opcion.value = inf.codigo // guarda la info pero no lo muestra
        opcion.text = inf.codigo // muestra la info en texto
        menuArticulo.appendChild(opcion)
    }
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

    if(nombre == "" || email == "" || comision == ""){ //para que rellene todo
        alert("Debe completar todos los datos")
        return
    }

    for(inf of sistema.influencers){    // para unico mail
        if(inf.email == email){
            alert("Este mail ya esta ingresado")
            return
        }
        
    }

    let nuevoInfluencer = new Influencer(nombre,email,comision)
    sistema.influencers.push(nuevoInfluencer)
    renderizarTabla()
    document.getElementById("dialogInfluencer").close()
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

    if(codigo == "" || descripcion == "" || precio == ""){
        alert("Debe completar todos los datos")
        return
    }

    for(inf of sistema.articulos){    // para unico codigo
        if(inf.codigo == codigo){
            alert("Este codigo ya esta ingresado")
            return
        }
        
    }

    let nuevoArticulo = new Articulo(codigo,descripcion,precio)
    sistema.articulos.push(nuevoArticulo)
    renderizarTablaArticulo()
    document.getElementById("dialogArticulo").close()
}

function renderizarTablaVenta(){
    let tbody = document.getElementById("tbodyVentas")
    tbody.innerHTML = ""
    for(let i = 0; i < sistema.ventas.length; i++){
        let ven = sistema.ventas[i]
        let fila = document.createElement("tr")
        fila.innerHTML = "<td>" + ven.numero + "</td>" +
                         "<td>" + ven.articulo + "</td>" +
                         "<td>" + ven.influencer + "</td>" +
                         "<td>" + ven.cantidad + "</td>" +
                         "<td>" + ven.medio + "</td>" +
                         "<td><button class='boton1' onclick='eleminarVenta(" + i + ")'>❌</button></td>"
        tbody.appendChild(fila)
    }
}

function agregarDatosVenta(){
    let articulo = document.getElementById("menu").value
    let influencer = document.getElementById("menu2").value
    let cantidad = document.getElementById("cantidad").value
    let medio = document.getElementById("menu3").value

    if(sistema.articulos.length == 0 || sistema.influencers.length == 0){
        alert("Debe haber al menos un artículo y un influencer registrado")
        return
    }

    if(cantidad == ""){
        alert("Debe completar todos los datos")
        return
    }

    let nuevaVenta = new Venta(sistema.contadorVentas, articulo, influencer, cantidad, medio)
    sistema.ventas.push(nuevaVenta)
    sistema.contadorVentas++
    renderizarTablaVenta()
    document.getElementById("dialogventas").close()
}


