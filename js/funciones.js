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

function elminarVenta(indice){
    sistema.ventas.splice(indice, 1)
    renderizarTablaVenta()
    renderizarTabla()
}

function calcularTotalInfluencer(influencer){
    let total = 0
    for(let i = 0; i < sistema.ventas.length; i++){
        if(sistema.ventas[i].influencer === influencer.nombre){
            let precio = 0
            for(let j = 0; j < sistema.articulos.length; j++){
                if(sistema.articulos[j].codigo === sistema.ventas[i].articulo){
                    precio = Number(sistema.articulos[j].precio)
                }
            }
            let monto = precio * Number(sistema.ventas[i].cantidad)
            total += monto * (Number(influencer.comision) / 100)
        }
    }
    return total
}

function obtenerEtiquetas(influencer){
    // contar ventas del influencer
    let cantVentas = 0
    for(let i = 0; i < sistema.ventas.length; i++){
        if(sistema.ventas[i].influencer === influencer.nombre){
            cantVentas++
        }
    }
    if(cantVentas === 0){
        return "🧊"
    }

    let etiquetas = ""

    // 🔥 el que mas cobra en comisiones
    let miTotal = calcularTotalInfluencer(influencer)
    let maxTotal = 0
    for(let i = 0; i < sistema.influencers.length; i++){
        let t = calcularTotalInfluencer(sistema.influencers[i])
        if(t > maxTotal){
            maxTotal = t
        }
    }
    if(miTotal === maxTotal && maxTotal > 0){
        etiquetas += "🔥"
    }

    // 🟢 el que tuvo la venta mas cara (precio * cantidad en una sola venta)
    let maxMontoGlobal = 0
    for(let i = 0; i < sistema.ventas.length; i++){
        let precio = 0
        for(let j = 0; j < sistema.articulos.length; j++){
            if(sistema.articulos[j].codigo === sistema.ventas[i].articulo){
                precio = Number(sistema.articulos[j].precio)
            }
        }
        let monto = precio * Number(sistema.ventas[i].cantidad)
        if(monto > maxMontoGlobal){
            maxMontoGlobal = monto
        }
    }

    let yaAgrego = false
    for(let i = 0; i < sistema.ventas.length; i++){
        if(sistema.ventas[i].influencer === influencer.nombre && !yaAgrego){
            let precio = 0
            for(let j = 0; j < sistema.articulos.length; j++){
                if(sistema.articulos[j].codigo === sistema.ventas[i].articulo){
                    precio = Number(sistema.articulos[j].precio)
                }
            }
            let monto = precio * Number(sistema.ventas[i].cantidad)
            if(monto === maxMontoGlobal){
                etiquetas += "🟢"
                yaAgrego = true
            }
        }
    }

    return etiquetas
}

function mostrarDetalleInfluencer(indice){
    let influencer = sistema.influencers[indice]
    let mensaje = "Ventas:\n"
    for(let i = 0; i < sistema.ventas.length; i++){
        if(sistema.ventas[i].influencer === influencer.nombre){
            let precio = 0
            for(let j = 0; j < sistema.articulos.length; j++){
                if(sistema.articulos[j].codigo === sistema.ventas[i].articulo){
                    precio = Number(sistema.articulos[j].precio)
                }
            }
            let total = precio * Number(sistema.ventas[i].cantidad)
            let comision = total * (Number(influencer.comision) / 100)
            mensaje += "Nro " + sistema.ventas[i].numero + " → " + sistema.ventas[i].cantidad + "→" + sistema.ventas[i].articulo + "→$" + precio + "c/u Total $" + total + "→ Comisión: $" + comision + "\n"
        }
    }
    alert(mensaje)
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
    tbody.innerHTML = ""
    for(let i = 0; i < sistema.influencers.length; i++){
        let inf = sistema.influencers[i]
        let total = calcularTotalInfluencer(inf)
        let etiquetas = obtenerEtiquetas(inf)
        let fila = document.createElement("tr")
        fila.innerHTML = "<td>" + inf.nombre + "</td>" +
                         "<td>" + inf.email + "</td>" +
                         "<td>" + inf.comision + "%</td>" +
                         "<td>$" + total + "</td>" +
                         "<td>" + etiquetas + "</td>" +
                         "<td><button class='boton1' onclick='mostrarDetalleInfluencer(" + i + ")'>Ventas</button></td>"
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

    for( inf of sistema.influencers){    // para unico mail
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
    renderizarTabla()
    document.getElementById("dialogventas").close()
}


