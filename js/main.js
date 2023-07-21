//Productos
const products= [
   //Abrigos 
   {    
   id:"abrigo-01",
   titulo:"Abrigo 01",
  imagen:"./img/abrigos/01.jpg",
  categoria:{
    nombre:"Abrigos",
   id:"abrigos"
   },
   precio: 1000
},
{    
   id:"abrigo-02",
   titulo:"Abrigo 02",
   imagen:"./img/abrigos/02.jpg",
   categoria:{
    nombre:"Abrigos",
   id:"abrigos"
   },
   precio: 2000
},
{    
    id:"abrigo-03",
   titulo:"Abrigo 03",
   imagen:"./img/abrigos/03.jpg",
   categoria:{
    nombre:"Abrigos",
   id:"abrigos"
   },
  precio: 3000
},
{    
   id:"abrigo-04",
   titulo:"Abrigo 04",
   imagen:"./img/abrigos/04.jpg",
   categoria:{
    nombre:"Abrigos",
    id:"abrigos"
  },
   precio: 4000
},
{    
    id:"abrigo-05",
   titulo:"Abrigo 05",
   imagen:"./img/abrigos/05.jpg",
   categoria:{
    nombre:"Abrigos",
   id:"abrigos"
   },
   precio: 5000
},
{    
    id:"abrigo-06",
  titulo:"Abrigo 06",
   imagen:"./img/abrigos/06.jpg",
   categoria:{
    nombre:"Abrigos",
    id:"abrigos"
   },
   precio: 6000
},
{    
   id:"blusa-01",
   titulo:"Blusa 01",
   imagen:"./img/blusas/01.jpg",
   categoria:{
    nombre:"Blusas",
    id:"blusas"
   },
  precio: 1000
},
{    
   id:"blusa-02",
   titulo:"Blusa 02",
   imagen:"./img/blusas/02.jpg",
  categoria:{
    nombre:"Blusas",
    id:"blusas"
   },
  precio: 1000
},
{    
  id:"blusa-03",
   titulo:"Blusa 03",
   imagen:"./img/blusas/03.jpg",
   categoria:{
    nombre:"Blusas",
   id:"blusas"
   },
   precio: 1000
},
{    
   id:"blusa-04",
   titulo:"Blusa 04",
   imagen:"./img/blusas/04.jpg",
   categoria:{
    nombre:"Blusas",
    id:"blusas"
   },
   precio: 1000
},
{    
   id:"blusa-05",
   titulo:"Blusa 05",
  imagen:"./img/blusas/05.jpg",
   categoria:{
    nombre:"Blusas",
    id:"blusas"
   },
   precio: 1000
},
{    
   id:"blusa-06",
   titulo:"Blusa 06",
   imagen:"./img/blusas/06.jpg",
   categoria:{
   nombre:"Blusas",
    id:"blusas"
   },
  precio: 1000
},
{    
   id:"falda-01",
   titulo:"Faldas 01",
  imagen:"./img/Faldas/01.jpg",
  categoria:{
   nombre:"Faldas",
    id:"faldas"
   },
   precio: 1000
},
{    
   id:"falda-02",
   titulo:"Falda 02",
   imagen:"./img/faldas/02.jpg",
   categoria:{
   nombre:"Faldas",
    id:"faldas"
   },
   precio: 1000
},
{    
   id:"falda -03",
   titulo:"Falda 03",
   imagen:"./img/faldas/03.jpg",
   categoria:{
   nombre:"Faldas",
    id:"faldas"
  },
   precio: 1000
},
{    
  id:"falda-04",
   titulo:"Falda 04",
   imagen:"./img/faldas/04.jpg",
   categoria:{
    nombre:"Faldas",
    id:"faldas"
   },
  precio: 1000
},
{    
   id:"falda-05",
  titulo:"Falda 05",
   imagen:"./img/faldas/05.jpg",
  categoria:{
   nombre:"Faldas",
    id:"faldas"
   },
   precio: 1000
},
{    
   id:"falda-06",
   titulo:"Falda 06",
   imagen:"./img/faldas/06.jpg",
   categoria:{
    nombre:"Faldas",    
    id:"faldas"
   },
   precio: 1000
},
];

let productos=[];

fetch("./js/productos.json")
.then(response =>  response.json())
.then(data => {
   productos = data;
   cargarProductos(productos); 
})


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelector(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar= document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
   aside.classList.remove("aside-visible");
}))


function cargarProductos(productosElegidos) {

contenedorProductos.innerHTML = "";

productosElegidos.forEach(producto => {

   const div = document.createElement("div");
   div.classList.add("producto");
   div.innerHTML =` 
   <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
   <div class="producto-detalles"> 
      <h3 class="producto-titulo">${producto.titulo}</h3>
      <p class="producto-precio">$${producto.precio}</p>
      <button class="producto-agregar" id="${producto.id}">Agregar</button>
  </div>
  `;


  contenedorProductos.append(div);

})

actualizarBotonesAgregar();
}



botonesCategorias.forEach(boton => {
   boton.addEventListener("click", (e) => {

    botonesCategorias.forEach (boton => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

   if (e.currentTarget.id != "todos") {

      const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
      tituloPrincipal.innerText = productoCategoria.categoria.nombre;
      const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
      cargarProductos(productosBoton);
   } else {
        tituloPrincipal.innerText="Todos los productos";
        cargarProductos(productos);
   }

})

});

function actualizarBotonesAgregar() {
   botonesAgregar = document.querySelectorAll(".producto-agregar");

   botonesAgregar.forEach(boton => {
      boton.addEventListener("click", agregarAlCarrito);
   });

}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
   productosEnCarrito = JSON.parse(productosEnCarritoLS);
   actualizarNumerito();
} else {
   productosEnCarrito = [];
}

function agregarAlCarrito(e) {

Toastify({
   text: "Producto agregado",
   duracion: 3000,
   close: true,
   gravity:"top", //`top` or 
   position: "right",// `left`,`center` or `right`
   stopOnFocus: true, // Prevents dismissing of toast on hover
   style: {
      background:"linear-gradient(to right, #4b33a8, #785ce9)",
      borderRadius: "2rem",
      textTransform: "upercase",
      fontSize: ".75rem"
   },
   offset : {
      x:'1.5rem', //horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y:'1.5rem'// vertical axis - can be a number or a string indicating unity. eg: '2em'
   },
   onClick: function(){} // Callback after click
}).showToast();

const idBoton = e.currentTarget.id;
const productoAgregado = productos.find(producto => producto.id === idBoton);

if(productosEnCarrito.some(producto => producto.id === idBoton)) {
   const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
   productosEnCarrito[index].cantidad++;
} else {
   productoAgregado.cantidad = 1;
   productosEnCarrito.push(productoAgregado);

}

actualizarNumerito();
localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

function agregarAlCarrito(e) {

}

function actualizarNumerito() {
   let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
   numerito.innerText = nuevoNumerito;
}



