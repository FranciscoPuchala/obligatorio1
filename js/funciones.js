// Autores: Juan Andrez Lagorio y Francisco Puchala

// Se crea el objeto principal que guarda todos los datos del sistema
let sistema = new Sistema()

// Se conecta cada boton del HTML con su funcion correspondiente
// Cuando el usuario hace click en un boton, se ejecuta la funcion indicada
document.getElementById("agregarInfluencer").addEventListener("click",agregarInfluencer)
document.getElementById("botonCancelar").addEventListener("click",cancelarInfluencer)
document.getElementById("botonAgregar").addEventListener("click",agregarDatosInfluencer)
document.getElementById("ordenarNombre").addEventListener("click",ordenarInfluencers)
document.getElementById("agregarArticulo").addEventListener("click", agregarArticulo)
document.getElementById("botonCancelarArticulo").addEventListener("click",cancelarArticulo)
document.getElementById("botonAgregarArticulo").addEventListener("click",agregarDatosArticulo)
document.getElementById("ordenarCodigo").addEventListener("click",ordenarArticulos)
document.getElementById("agregarventas").addEventListener("click", agregarventa)
document.getElementById("cancelarventa").addEventListener("click", cancelarventa)
document.getElementById("botonAgregarVenta").addEventListener("click",agregarDatosVenta)

// Variables globales que recuerdan el orden actual de cada tabla
// true = ascendente (A→Z), false = descendente (Z→A)
let ordenAscendente = true
let ordenAscendenteArticulo = true


// ===================== INFLUENCERS =====================

// Abre el formulario modal para agregar un influencer
function agregarInfluencer(){
    document.getElementById("dialogInfluencer").showModal()
}

// Cierra el formulario modal de influencer sin guardar nada
function cancelarInfluencer(){
    document.getElementById("dialogInfluencer").close()
}

// Lee los datos del formulario, valida y agrega el influencer al sistema
function agregarDatosInfluencer(){
    let nombre = document.getElementById("nombre").value
    let email = document.getElementById("email").value
    let comision = document.getElementById("comision").value

    // Validacion: todos los campos deben estar completos
    if(nombre == "" || email == "" || comision == ""){
        alert("Debe completar todos los datos")
        return
    }

    // Validacion: el mail debe ser unico en el sistema
    for(inf of sistema.influencers){
        if(inf.email == email){
            alert("Este mail ya esta ingresado")
            return
        }
    }

    // Se crea el objeto y se agrega al array del sistema
    let nuevoInfluencer = new Influencer(nombre,email,comision)
    sistema.influencers.push(nuevoInfluencer)
    renderizarTabla()
    document.getElementById("dialogInfluencer").close()
}

// Dibuja la tabla de influencers con todos sus datos, total a cobrar y etiquetas
function renderizarTabla(){
    let tbody = document.getElementById("tbodyInfluencers")
    tbody.innerHTML = "" // se borra lo que habia antes
    for(let i = 0; i < sistema.influencers.length; i++){
        let inf = sistema.influencers[i]
        // Se calculan el total y las etiquetas para este influencer
        let total = calcularTotalInfluencer(inf)
        let etiquetas = obtenerEtiquetas(inf)
        let fila = document.createElement("tr")
        // El boton Ventas pasa el indice i para saber de cual influencer mostrar el detalle
        fila.innerHTML = "<td>" + inf.nombre + "</td>" +
                         "<td>" + inf.email + "</td>" +
                         "<td>" + inf.comision + "%</td>" +
                         "<td>$" + total + "</td>" +
                         "<td>" + etiquetas + "</td>" +
                         "<td><button class='boton1' onclick='mostrarDetalleInfluencer(" + i + ")'>Ventas</button></td>"
        tbody.appendChild(fila)
    }
}

// Ordena los influencers por nombre alfabeticamente, alternando entre A→Z y Z→A
function ordenarInfluencers(){
    if(ordenAscendente){
        // Orden A→Z: si a es mayor que b, b va primero (devuelve 1)
        sistema.influencers.sort(function(a, b){
            if(a.nombre > b.nombre) return 1
            if(a.nombre < b.nombre) return -1
            return 0
        })
    } else {
        // Orden Z→A: si a es menor que b, b va primero (devuelve 1)
        sistema.influencers.sort(function(a, b){
            if(a.nombre < b.nombre) return 1
            if(a.nombre > b.nombre) return -1
            return 0
        })
    }
    // Se invierte el orden para la proxima vez que se presione el boton
    ordenAscendente = !ordenAscendente
    renderizarTabla()
}

// Calcula el total en pesos que cobra un influencer sumando las comisiones de todas sus ventas
function calcularTotalInfluencer(influencer){
    let total = 0
    for(let i = 0; i < sistema.ventas.length; i++){
        // Solo se procesan las ventas de este influencer
        if(sistema.ventas[i].influencer === influencer.nombre){
            let precio = 0
            // Se busca el precio del articulo en el array de articulos
            for(let j = 0; j < sistema.articulos.length; j++){
                if(sistema.articulos[j].codigo === sistema.ventas[i].articulo){
                    precio = Number(sistema.articulos[j].precio)
                }
            }
            let monto = precio * Number(sistema.ventas[i].cantidad)
            // La comision es el porcentaje del monto total de la venta
            total += monto * (Number(influencer.comision) / 100)
        }
    }
    return total
}

// Devuelve los emojis que le corresponden al influencer segun sus ventas
function obtenerEtiquetas(influencer){
    // Se cuenta cuantas ventas tiene este influencer
    let cantVentas = 0
    for(let i = 0; i < sistema.ventas.length; i++){
        if(sistema.ventas[i].influencer === influencer.nombre){
            cantVentas++
        }
    }
    // Si no tiene ninguna venta, recibe el cubito de hielo y se termina la funcion
    if(cantVentas === 0){
        return "🧊"
    }

    let etiquetas = ""

    // Se verifica si este influencer es el que mas cobra en comisiones
    let miTotal = calcularTotalInfluencer(influencer)
    let maxTotal = 0
    for(let i = 0; i < sistema.influencers.length; i++){
        let t = calcularTotalInfluencer(sistema.influencers[i])
        if(t > maxTotal){
            maxTotal = t
        }
    }
    // Si su total es igual al maximo, recibe el fuego
    if(miTotal === maxTotal && maxTotal > 0){
        etiquetas += "🔥"
    }

    // Se busca el monto mas alto de una sola venta en todo el sistema
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

    // Se verifica si alguna venta de este influencer tiene ese monto maximo
    // yaAgrego evita poner el emoji dos veces si tiene dos ventas con el mismo monto
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

// Muestra en un alert el detalle de comisiones de un influencer
function mostrarDetalleInfluencer(i){
    let influencer = sistema.influencers[i]
    let mensaje = "Ventas:\n"
    // Se recorren todas las ventas buscando las de este influencer
    for(let i = 0; i < sistema.ventas.length; i++){
        if(sistema.ventas[i].influencer === influencer.nombre){
            let precio = 0
            // Se busca el precio del articulo
            for(let j = 0; j < sistema.articulos.length; j++){
                if(sistema.articulos[j].codigo === sistema.ventas[i].articulo){
                    precio = Number(sistema.articulos[j].precio)
                }
            }
            let total = precio * Number(sistema.ventas[i].cantidad)
            let comision = total * (Number(influencer.comision) / 100)
            // Se arma una linea por cada venta y se agrega al mensaje
            mensaje += "Nro " + sistema.ventas[i].numero + " → " + sistema.ventas[i].cantidad + "→" + sistema.ventas[i].articulo + "→$" + precio + "c/u Total $" + total + "→ Comisión: $" + comision + "\n"
        }
    }
    alert(mensaje)
}


// ===================== ARTICULOS =====================

// Abre el formulario modal para agregar un articulo
function agregarArticulo(){
    document.getElementById("dialogArticulo").showModal()
}

// Cierra el formulario modal de articulo sin guardar nada
function cancelarArticulo(){
    document.getElementById("dialogArticulo").close()
}

// Lee los datos del formulario, valida y agrega el articulo al sistema
function agregarDatosArticulo(){
    let codigo = document.getElementById("codigo").value
    let descripcion = document.getElementById("descripción").value
    let precio = document.getElementById("precio").value

    // Validacion: todos los campos deben estar completos
    if(codigo == "" || descripcion == "" || precio == ""){
        alert("Debe completar todos los datos")
        return
    }

    // Validacion: el codigo debe ser unico en el sistema
    for(inf of sistema.articulos){
        if(inf.codigo == codigo){
            alert("Este codigo ya esta ingresado")
            return
        }
    }

    // Se crea el objeto y se agrega al array del sistema
    let nuevoArticulo = new Articulo(codigo,descripcion,precio)
    sistema.articulos.push(nuevoArticulo)
    renderizarTablaArticulo()
    document.getElementById("dialogArticulo").close()
}

// Dibuja la tabla de articulos con la estrella para el mas vendido
function renderizarTablaArticulo(){
    let tbody = document.getElementById("tbodyArticulos")
    tbody.innerHTML = ""

    // Primer recorrido: se calcula cuantas unidades vendio cada articulo y se guarda el maximo
    let maxUnidades = 0
    for(let i = 0; i < sistema.articulos.length; i++){
        let totalUnidades = 0
        for(let j = 0; j < sistema.ventas.length; j++){
            if(sistema.ventas[j].articulo === sistema.articulos[i].codigo){
                totalUnidades += Number(sistema.ventas[j].cantidad)
            }
        }
        if(totalUnidades > maxUnidades){
            maxUnidades = totalUnidades
        }
    }

    // Segundo recorrido: se dibuja cada fila y se agrega estrella si es el mas vendido
    for(let i = 0; i < sistema.articulos.length; i++){
        let totalUnidades = 0
        for(let j = 0; j < sistema.ventas.length; j++){
            if(sistema.ventas[j].articulo === sistema.articulos[i].codigo){
                totalUnidades += Number(sistema.ventas[j].cantidad)
            }
        }

        // Solo recibe estrella si sus unidades son iguales al maximo y hay al menos una venta
        let estrella = ""
        if(totalUnidades === maxUnidades && maxUnidades > 0){
            estrella = "⭐"
        }

        let fila = document.createElement("tr")
        fila.innerHTML = "<td>" + sistema.articulos[i].codigo + " " + estrella + "</td>" +
                         "<td>" + sistema.articulos[i].descripcion + "</td>" +
                         "<td>" + sistema.articulos[i].precio + "</td>"
        tbody.appendChild(fila)
    }
}

// Ordena los articulos por codigo alfabeticamente, alternando entre A→Z y Z→A
function ordenarArticulos(){
    if(ordenAscendenteArticulo){
        // Orden A→Z: si a es mayor que b, b va primero (devuelve 1)
        sistema.articulos.sort(function(a, b){
            if(a.codigo > b.codigo) return 1
            if(a.codigo < b.codigo) return -1
            return 0
        })
    } else {
        // Orden Z→A: si a es menor que b, b va primero (devuelve 1)
        sistema.articulos.sort(function(a, b){
            if(a.codigo < b.codigo) return 1
            if(a.codigo > b.codigo) return -1
            return 0
        })
    }
    // Se invierte el orden para la proxima vez que se presione el boton
    ordenAscendenteArticulo = !ordenAscendenteArticulo
    renderizarTablaArticulo()
}


// ===================== VENTAS =====================

// Abre el formulario de ventas y llena los selects con los datos actuales del sistema
function agregarventa(){
    document.getElementById("dialogventas").showModal()
    let menuArticulo = document.getElementById("menu")
    let menuInfluencer = document.getElementById("menu2")

    // Se limpia el contenido anterior de los selects
    menuInfluencer.innerHTML = ""
    menuArticulo.innerHTML = ""

    // Se agregan los influencers al select
    for(inf of sistema.influencers){
        let opcion = document.createElement("option")
        opcion.value = inf.nombre
        opcion.text = inf.nombre
        menuInfluencer.appendChild(opcion)
    }

    // Se agregan los articulos al select
    for(inf of sistema.articulos){
        let opcion = document.createElement("option")
        opcion.value = inf.codigo
        opcion.text = inf.codigo
        menuArticulo.appendChild(opcion)
    }
}

// Cierra el formulario de ventas sin guardar nada
function cancelarventa(){
    document.getElementById("dialogventas").close()
}

// Lee los datos del formulario, valida y agrega la venta al sistema
function agregarDatosVenta(){
    let articulo = document.getElementById("menu").value
    let influencer = document.getElementById("menu2").value
    let cantidad = document.getElementById("cantidad").value
    let medio = document.getElementById("menu3").value

    // Validacion: debe haber al menos un articulo y un influencer cargados
    if(sistema.articulos.length == 0 || sistema.influencers.length == 0){
        alert("Debe haber al menos un artículo y un influencer registrado")
        return
    }

    // Validacion: la cantidad no puede estar vacia
    if(cantidad == ""){
        alert("Debe completar todos los datos")
        return
    }

    // Se crea la venta con el numero autogenerado por contadorVentas
    let nuevaVenta = new Venta(sistema.contadorVentas, articulo, influencer, cantidad, medio)
    sistema.ventas.push(nuevaVenta)
    sistema.contadorVentas++
    // Se actualizan todas las tablas porque una nueva venta afecta etiquetas, estrella y grafico
    renderizarTablaVenta()
    renderizarTabla()
    renderizarTablaArticulo()
    renderizarGraficoBurbujas()
    document.getElementById("dialogventas").close()
}

// Dibuja la tabla de ventas con el boton de eliminar en cada fila
function renderizarTablaVenta(){
    let tbody = document.getElementById("tbodyVentas")
    tbody.innerHTML = ""
    for(let i = 0; i < sistema.ventas.length; i++){
        let ven = sistema.ventas[i]
        let fila = document.createElement("tr")
        // El boton eliminar pasa el indice i para saber que venta borrar
        fila.innerHTML = "<td>" + ven.numero + "</td>" +
                         "<td>" + ven.articulo + "</td>" +
                         "<td>" + ven.influencer + "</td>" +
                         "<td>" + ven.cantidad + "</td>" +
                         "<td>" + ven.medio + "</td>" +
                         "<td><button class='boton1' onclick='eliminarVenta(" + i + ")'>❌</button></td>"
        tbody.appendChild(fila)
    }
}

// Elimina la venta en la posicion indicada del array y actualiza todas las tablas
function eliminarVenta(i){
    sistema.ventas.splice(i, 1)
    renderizarTablaVenta()
    renderizarTabla()
    renderizarTablaArticulo()
    renderizarGraficoBurbujas()
}

// Dibuja el grafico de burbujas con el total vendido por cada red social
function renderizarGraficoBurbujas(){
    let contenedor = document.getElementById("graficoBurbujas")
    contenedor.innerHTML = ""

    // Arrays paralelos: cada indice representa un medio (0=Instagram, 1=YouTube, etc.)
    let nombres  = ["Instagram", "YouTube", "X", "Tiktok", "Facebook", "Otras"]
    let etiquetas = ["1-Instagram", "2-YouTube", "3-X", "4-TikTok", "5-Facebook", "6-Otras"]
    let colores  = ["#e74c3c", "#3498db", "#27ae60", "#9b59b6", "#f39c12", "#1abc9c"]
    let totales  = [0, 0, 0, 0, 0, 0]

    // Se recorren todas las ventas para sumar el monto por cada medio
    for(let i = 0; i < sistema.ventas.length; i++){
        let precio = 0
        // Se busca el precio del articulo de esa venta
        for(let j = 0; j < sistema.articulos.length; j++){
            if(sistema.articulos[j].codigo === sistema.ventas[i].articulo){
                precio = Number(sistema.articulos[j].precio)
            }
        }
        let monto = precio * Number(sistema.ventas[i].cantidad)

        // Se suma el monto al medio correspondiente
        if(sistema.ventas[i].medio === "Instagram") totales[0] += monto
        if(sistema.ventas[i].medio === "YouTube")   totales[1] += monto
        if(sistema.ventas[i].medio === "X")         totales[2] += monto
        if(sistema.ventas[i].medio === "Tiktok")    totales[3] += monto
        if(sistema.ventas[i].medio === "Facebook")  totales[4] += monto
        if(sistema.ventas[i].medio === "Otras")     totales[5] += monto
    }

    // Se busca el maximo y minimo entre los 6 totales para calcular el tamaño de las burbujas
    let maxTotal = 0
    let minTotal = totales[0]
    for(let i = 0; i < 6; i++){
        if(totales[i] > maxTotal) maxTotal = totales[i]
        if(totales[i] < minTotal) minTotal = totales[i]
    }

    // El radio maximo es 70px, el minimo es el 10% de eso (7px)
    let maxRadio = 70
    let minRadio = maxRadio * 0.1

    // Se crea una burbuja por cada medio
    for(let i = 0; i < 6; i++){
        // Se calcula el radio proporcional segun el monto
        let radio = minRadio
        if(maxTotal > 0 && maxTotal !== minTotal){
            radio = minRadio + ((totales[i] - minTotal) / (maxTotal - minTotal)) * (maxRadio - minRadio)
        } else if(maxTotal > 0){
            radio = maxRadio
        }

        let diametro = radio * 2

        // Div contenedor de la burbuja y su etiqueta
        let celda = document.createElement("div")
        celda.style.display = "inline-block"
        celda.style.textAlign = "center"
        celda.style.verticalAlign = "middle"
        celda.style.width = "160px"

        // Circulo de la burbuja: se hace redondo con borderRadius 50%
        let burbuja = document.createElement("div")
        burbuja.style.width = diametro + "px"
        burbuja.style.height = diametro + "px"
        burbuja.style.borderRadius = "50%"
        burbuja.style.backgroundColor = colores[i]
        burbuja.style.margin = "0 auto"
        burbuja.style.color = "white"
        burbuja.style.fontSize = "11px"
        burbuja.style.lineHeight = diametro + "px" // centra el texto verticalmente
        burbuja.style.textAlign = "center"
        burbuja.innerHTML = "$" + totales[i]

        // Etiqueta con el nombre del medio debajo de la burbuja
        let label = document.createElement("p")
        label.style.fontSize = "12px"
        label.style.margin = "5px 0 0 0"
        label.innerHTML = etiquetas[i]

        celda.appendChild(burbuja)
        celda.appendChild(label)
        contenedor.appendChild(celda)
    }
}
