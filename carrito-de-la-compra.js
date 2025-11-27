//Constantes
const inputNombre = document.getElementById("inputNombre");
const inputPrecio = document.getElementById("inputPrecio");
const btnAgregar = document.getElementById("btnAgregar");
const lista = document.getElementById("listaProductos");
const total = document.getElementById("total");

//Variables
let carrito = [];

//Funciones 

//Guardamos en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    return;
}
//Cargamos desde localStorage comprobamos antes si hay datos o no
function cargarCarrito() {
    const datos = localStorage.getItem("carrito");
    if (!datos){
        return [];
    }
    return JSON.parse(datos);  
}
//Generamos un id con los milisegundos desde el 1 de enero de 1970 mas un número aleatorio
function generarId() {
    return Date.now() + Math.random();
}

//Agregamos un producto, no tiene que estar vacio ninguno de los dos campos, una vez comprobado metemos los datos en el array de objetos y llamamos a la funcion guardar carrito y renderizarlo.
function agregarProducto() {
        const nombreLimpio = inputNombre.value.trim();
        const precioTextoLimpio = inputPrecio.value.trim();
        const precioLimpio = parseFloat(inputPrecio.value);

        if(nombreLimpio === ""){
            alert("El nombre del producto debe de estar rellenado");
            return;
        }else if(precioTextoLimpio === ""){
            alert ("El campo precio tiene que estar relleno");
            return;
        }

        const array = {
            id: generarId(),
            nombre: nombreLimpio,
            precio: precioLimpio
        };

        carrito.push(array);
        guardarCarrito();
        renderizarCarrito();
        return;
}

//Eliminamos el producto correspondiente pasandole la id desde renderizarCarrito, filtramos con filter y nos devuelve un array con las condiciones que le hemos dado, a parte tendremos que preguntarle al usuario si de verdad lo quiere eliminar.
function eliminarProducto(id) {
    const confirmar = confirm("¿Estas seguro de que quieres elimimar el producto?");
    if (!confirmar){
        return;
    }

    carrito = carrito.filter(n => n.id !== id);
    guardarCarrito();
    renderizarCarrito();
}
//Funcion para mostrar el carrito, primero limpiamos toda la lista y despues cargamos desde localstorage y crea un elemento li para cada producto en el que mostraremos su nombre, precio e id. Y el precio total que lo cogemos de la funcion calcularTotal.
function renderizarCarrito() {
    lista.innerHTML="";
    const productos = cargarCarrito();

    productos.forEach(p => {
        const hijoLista = document.createElement("li");
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        hijoLista.textContent = `Nombre del producto --> ${p.nombre}, precio del producto ${p.precio}€`;
        hijoLista.appendChild(btnEliminar);
        lista.appendChild(hijoLista);

        btnEliminar.addEventListener("click", () => eliminarProducto(p.id));


    });
    total.textContent = `El total de la compra es de: ${calcularTotal()}€`;
    return;
    
}


//Calculamos el total de todos los precios
function calcularTotal() {
    let totalSuma = 0;
    const productos = cargarCarrito();

    productos.forEach(p => {
        totalSuma += p.precio; 
    });
    return totalSuma;
}

//Inicializamos la aplicación simplemente nos sirve como indicador. A parte asi nada mas inicar la aplicación podemos cargar desde localStorage.
function inicializar() {
    console.log('🚀 Iniciando aplicación...');
    carrito = cargarCarrito();
    renderizarCarrito();
    console.log('✅ Aplicación inicializada');
}

inicializar();
btnAgregar.addEventListener("click", agregarProducto);