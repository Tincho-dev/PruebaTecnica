var productos = new Array();

$(document).ready(function () {


  //cargamos las categorias
  $.ajax({
    url: "https://telemedicina.jakemate.net:7141/api/webservice/metodo",
    data: { _nombreMetodo_: "categoriasProductosTienda", param1: "", param2: "" },
    method: "POST",
    headers: {
      "Token": "NJKJNTL8SNKH5JJRTS32ZGSIIDPGHLU6KRXLQMLMJJU8MD7EY5TSWMGD2D6Z",
      "ApiKey": "ISSTIXZTV53RZURJKTZD3MXVMEW7X3"
    },
    success: function (resultados) {
      $('#selector-categoria').empty();
      resultados.resultado.Table.forEach(element => {
        $('#selector-categoria').prepend(botonCategoria(element));
      });

      $('#selector-categoria').prepend(botonCategoria({
        NOMBRE: "Cualquier Categoria",
        COD_CATEGORIA: -1
      }));
    }

  })

  //cargamos todos los productos al tocar el boton
  $('.buscar-producto').on('click', function (evt) {
    evt.preventDefault();
    buscarProductosTienda(
      nombre = $('#nombre').val(),
      categoria = $('#categoria').val()
    );
  });

  //filtra por categoria, solo muestra la categoria elegida
  function filtrar(categoria) {
    $('.productos-container').children('.card').hide();
    $('.productos-container').children(`#m${categoria}`).show();
  }

  //ordena por oden alfabetico
  $('#orden-por-nombre').on('click', function (evt) {
    evt.preventDefault();
    console.log(productos)
    productos.sort(function SortArray(x, y) {
      if (x.NOMBRE < y.NOMBRE) { return -1; }
      if (x.NOMBRE > y.NOMBRE) { return 1; }
      return 0;
    });
    console.log(productos)

    $('.productos-container').empty();
    productos.forEach(element => {
      $('.productos-container').append(crearTarjeta(element));
    })
  })

  //ordena de menor a mayor los productos por precio
  $('#orden-por-precio').on('click', function (evt) {
    evt.preventDefault();
    productos.sort(function SortArray(x, y) {
      if (x.PRECIO < y.PRECIO) { return -1; }
      if (x.PRECIO > y.PRECIO) { return 1; }
      return 0;
    });

    $('.productos-container').empty();
    productos.forEach(element => {
      $('.productos-container').append(crearTarjeta(element));
    })
  })



  //crea la tarjeta
  function crearTarjeta(element) {
    return (`
      <div class="card" style="width:200px">
      <img class="card-img-top imagen-producto" src= "${element.IMAGEN}" alt="${element.NOMBRE}">
      <div class="card-body">
        <h4 class="nombre-de-producto">${element.NOMBRE}</h4>
        <p class="precio-de-producto">$ ${element.PRECIO}</p>
        <p class="categoria-de-producto">${element.CATEGORIA_PROD_TIENDA}</p>
        <button class="btn btn-primary detalle-producto" data-toggle="modal" data-target="#m${element.COD_PRODUCTO_TIENDA}">Mostrar detalle</button>
      </div>
    </div>
  ` + modal(element))
  }
  //crea el modal
  function modal(element) {
    return (
      `
        <div class="modal fade" id="m${element.COD_PRODUCTO_TIENDA}">
          <div class="modal-dialog modal-sm modal-dialog-centered">
            <div class="modal-content">

              <div class="modal-header">
                <h4 class="modal-title">${element.NOMBRE}</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>

              <div class="modal-body">
              <img class="card-img-top imagen-producto" src= "${element.IMAGEN}" alt="${element.NOMBRE}">
                <p>${element.NOMBRE}</p>
                <bold>$${element.PRECIO}</bold>
                <p>${element.PRESENTACION}</p>
                <p>Categoria: <br>${element.CATEGORIA_PROD_TIENDA}</p>
                <p>${element.DESCRIPCION}</p>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Agregar al carrito</button>
              </div>

            </div>
          </div>
        </div>
        `
    )

  }
  //crea el boton categoria
  function botonCategoria(element) {
    id = element.NOMBRE
    return (`
    <button 
      type="button" 
      class="btn btn-primary boton-categoria" 
      onclick="filtrar(${element.NOMBRE})"
      id="c${element.COD_CATEGORIA}">${element.NOMBRE}
    </button>
  `)
  }

  //filtrar por categoria
  function filtrar(id) {
    buscarProductosTienda(
      nombre = $('#nombre').val(),
      categoria = id
    );
  }

  function buscarProductosTienda(nombre, categoria){

    $.ajax({
      url: "https://telemedicina.jakemate.net:7141/api/webservice/metodo",
      data: { _nombreMetodo_: "buscarProductosTienda ", NOMBRE: nombre, CATEGORIA: categoria },
      method: "POST",
      headers: {
        "Token": "NJKJNTL8SNKH5JJRTS32ZGSIIDPGHLU6KRXLQMLMJJU8MD7EY5TSWMGD2D6Z",
        "ApiKey": "ISSTIXZTV53RZURJKTZD3MXVMEW7X3"
      },
      success: function (resultados) {
        $('.productos-container').empty();
        console.log(productos)
        productos = [];
        console.log(productos)
        resultados.resultado.Table.forEach(element => {
          productos.push(element);
          $('.productos-container').prepend(crearTarjeta(element));
        });
      }
    })
  }

})
