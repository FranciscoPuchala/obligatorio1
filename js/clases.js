class Influencer{
    constructor(nombre,email,comision,totalCobrar,etiquetas,detalle){
        this.nombre = nombre
        this.email = email
        this.comision = comision
    }
}

class Articulo{
    constructor(codigo, descripcion, precio){
        this.codigo = codigo
        this.descripcion = descripcion
        this.precio = precio
    }
}

class Venta{
    constructor(numero, articulo, influencer, cantidad, medio){
        this.numero = numero
        this.articulo = articulo
        this.influencer = influencer
        this.cantidad = cantidad
        this.medio = medio
    }
}

class Sistema{
    constructor(){
        this.influencers = []
        this.articulos = []
        this.ventas = []
        this.contadorVentas = 1
    }
}