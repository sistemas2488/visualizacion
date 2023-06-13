$(document).ready(function(){
  estadisticas_minas_criterios()
    $(".boton21").click(function(){

        var valores="";
        alert(valores);

        // Obtenemos todos los valores contenidos en los <td> de la fila
        // seleccionada
        $(this).parents("tr").find("td").each(function(){
            valores+=$(this).html()+"\n";
        });

        alert(valores);
    });
});


////////////////////////////////// carga la lista de minas///////////////////
$(document).ready(function() {
  $('#nav-estadisticas_dm-tab').tab('show') 
    var table =   $('#tablaMinasdm').DataTable( {
    ///////////////////////////////////////   texto en la tabla
        language: {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
             },
             "sProcessing":"Procesando...",
        },

    ///////////////////////////////////////   consumo
            "ajax":{
                "url": "http://127.0.0.1:5000/consultar_minas",
                "dataType": "JSON",
                "dataSrc":""    
              },

    ///////////////////////////////////////   datos del consumo
               "columns": [
              { "data": "id" },
              { "data": "nombre" },
              { "data": "region"  },
              { "data": "pais"  },
              { "data": "clasificacionmina"  },
              {
                "data": null,
                "orderable": false,
                "class": 'text-center  px-1',
                render: function(data, type, row, meta) {
                    return '<a class=" btn  btn-dark btn-xs      mt-2" href="javascript:void(0)"  id="' + (row.id) + '"  onclick=subirdatosaeditarmina_dm("' + (row.nombre.replaceAll(' ', '.')+'|'+row.id) + '")  >  Seleccionar  </a> '
              }
            }
            
          ], // fin de columnas
          }); // fin datatable
          
       }); /// fin del ready
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////// carga la lista de criterios///////////////////
$(document).ready(function() {
    var table =   $('#tablaCriteriodm').DataTable( {
    ///////////////////////////////////////   texto en la tabla
        language: {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
             },
             "sProcessing":"Procesando...",
        },

    ///////////////////////////////////////   consumo
            "ajax":{
                "url": "http://127.0.0.1:5000/consultar_criterios",
                "dataType": "JSON",
                "dataSrc":""    
              },

    ///////////////////////////////////////   datos del consumo
               "columns": [
              { "data": "id" },
              { "data": "codigo" },
              { "data": "descripcion"  },
              { "data": "categoria"  },
              { "data": "modulo"  },
              {
                "data": null,
                "orderable": false,
                "class": 'text-center  px-1',
                render: function(data, type, row, meta) {
                    return '<a class=" btn  btn-dark btn-xs      mt-2" href="javascript:void(0)"  id="' + (row.id) + '"  onclick=subirdatosaeditarmina_criterio_dm("' + (row.codigo)+'|'+row.id + '")  >  Seleccionar  </a> '
              }
            }
            
          ], // fin de columnas
          }); // fin datatable
          
       }); /// fin del ready
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function agregardetallemina() {
  

  let estadodetallemina=false
   
    const idmina_= document.getElementById('txtidmina_dm').value
    const idcriterio_ = document.getElementById('txtidcriterio_dm').value
    const calificacionparcial_ = document.getElementById('txtcalificacionparcial_d').value
    const fecha_ = document.getElementById('txtfecha_dm').value
    const observacion_ = document.getElementById('txtobservacion_dm').value
    const usuario_ = localStorage.getItem("usuario");
   

  ///// validar que nos e repita la mina al criterio/////







  ////////////////////////////////////////////////////////////
        const id_mina_consultar_repeticion = idmina_
        const id_criterio_consultar_repeticion = idcriterio_
        
        axios ({
            method: 'POST',
            url: 'http://127.0.0.1:5000/consultar_repeticion_mina_criterio',
            data: {idmina:id_mina_consultar_repeticion,
                   idcriterio:id_criterio_consultar_repeticion},
          }).then(function (response) {
           
            if (parseInt(response.data[0].total) >= 1) {
             alert("La mina ya tiene registrado el criterio seleccionado")
          }
          else {


            /////////////////////////INSERTAR EL DETALLE MINA

             //////////////proceso de agregar mina///////////////////////////////////////
   if(
    idmina_=="" || idcriterio_=="" || calificacionparcial_=="",fecha_=="" ){
          alert("agunos campos vacios ")
  }    
  else{
      
  
 
      if(estadodetallemina==false){
                    
          axios ({
              method: 'POST',
              url: 'http://127.0.0.1:5000/crear_detallemina',
              data: {idmina:idmina_,
                     idcriterio:idcriterio_,
                     calificacionparcial:calificacionparcial_,
                     fecha:fecha_,
                     observacion:observacion_,
                     usuario:usuario_            
                  },
            }).then(function (response) {
              console.log(response)
              if (response.data.informacion == 'ok') {
                  Swal.fire({
                  //text:"Criterio de la mina creada",
                  icon: 'success',
                  confirmButtonText: 'OK',
                  html: `  <small ><b>Criterio de la mina creada </b></small>`
                  
                }).then((result) => {

                    ////////// CREAR EL SEGUIMIENTO CRITERIO
                                axios ({
                                  method: 'POST',
                                  url: 'http://127.0.0.1:5000/crear_seguimiento_criterio',
                                  data: {idmina:idmina_,
                                        idcriterio:idcriterio_,
                                        avance:calificacionparcial_,
                                        fechahora:fecha_                                                  
                                      },
                                }).then(function (response) {
                                  console.log(response)
                                  if (response.data.informacion == 'ok') {
                                     console.log("Seguimiento_criterio ok")                          
                                      
                                      window.location.href = './detallemina.html';
                                   
                                  }
                                  else {
                                    Swal.fire({
                                      //text:"Problemas con el sistema",
                                      icon: 'error',
                                      confirmButtonText: 'OK',
                                      html: `  <small ><b>Probelma con el sistema </b></small>`
                                    });
                                  }                           
                                
                                }).catch(err => console.log('Error: ', err))
                              ///////////////////

                                ////////// FIN DE CREAR EL SEGUIMIENTO CRITERIO
                 
                  
                  
                 });
              }
              else {
                Swal.fire({
                  //text:"Problemas con el sistema",
                  icon: 'error',
                  confirmButtonText: 'OK',
                  html: `  <small ><b>Problema con el sistema </b></small>`
                });
              }                           
             
             }).catch(err => console.log('Error: ', err))
           ///////////////////
      }
     
  }
  //////////////////////////// fin del procesod e agregar una mina



            ////////////////////////////FIN DE INSERTAR DETALLE MINA           


          } //// fin del else de validacion de repeticiones 
            /////////////// catch de vaidacion de repeticiones
            }).catch(err => console.log('Error: ', err))


   
    
  
    
}
  

function subirdatosaeditarmina_criterio_dm(data) {
  //console.log(data)
  const nombrecriterio_dm = data

  let text = nombrecriterio_dm;
  const myArray = text.split("|");
  document.getElementById("txtidcriterio_dm").value = myArray[1]


  document.getElementById('txtcriterio_dm').value = myArray[0]
  let b_cancelarcriterio=document.getElementById('cancelarcriterio_dm')
  b_cancelarcriterio.click()
}

function validarcarga() {
        Swal.fire({
          title: 'Esta seguro que desea cargar todos los registros? esta operacion puede tardar un minuto',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Si',
          denyButtonText: 'No',
         
        }).then((result) => {
          if (result.isConfirmed) {

            /////////////////////// proceso jquery para data table
            var table =   $('#tabladetalleMinas').DataTable( {
                ///////////////////////////////////////   texto en la tabla
                    language: {
                        "lengthMenu": "Mostrar _MENU_ registros",
                        "zeroRecords": "No se encontraron resultados",
                        "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                        "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                        "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                        "sSearch": "Buscar:",
                        "oPaginate": {
                            "sFirst": "Primero",
                            "sLast":"Último",
                            "sNext":"Siguiente",
                            "sPrevious": "Anterior"
                         },
                         "sProcessing":"Procesando...",
                    },
            
                ///////////////////////////////////////   consumo
                        "ajax":{
                            "url": "http://127.0.0.1:5000/consultar_detalleminas",
                            "dataType": "JSON",
                            "dataSrc":""    
                          },
            
                ///////////////////////////////////////   datos del consumo
                           "columns": [
                          { "data": "id" },
                          { "data": "mina" },
                          { "data": "codigo"  },
                          { "data": "criterio"  },
                          { "data": "calificacionparcial"  },
                          { "data": "fecha"  },
                          {
                            "data": null,
                            "orderable": false,
                            "class": 'text-center  px-1',
                             render: function(data, type, row, meta) {
                                 return '<a class=" btn  btn-warning btn-xs      mt-2" href="javascript:void(0)"  data-id="' + (row.id) + '"  onclick=subirdatosaeditardetallemina_dm("' + (row.id) + '") data-bs-toggle="modal" data-bs-target="#exampleModalEditarCriterioMina" >Editar</a>                                             ';
                                 
                            }
                        }
                        
                      ], // fin de columnas
                      }); // fin datatable
                      



            /////////////////////////////////////////////////////
           



           
          } else if (result.isDenied) {
            Swal.fire('Continue en el sistema', '', 'info')
          }
        })
    
}




function subirdatosaeditardetallemina_dm(data) {

  const id_e = data
  console.log(data)
  axios ({
      method: 'POST',
      url: 'http://127.0.0.1:5000/consultar_detalle_mina_id',
      data: {id:id_e},
    }).then(function (response) {
      console.log(response)
      
      document.getElementById('txtiddetallemina_e_dm').value=response.data[0].id
      document.getElementById('txtnombremina_e_dm').value=response.data[0].mina
      document.getElementById('txtcriterio_e_dm').value=response.data[0].criterio
      document.getElementById('txtcalificacionparcial_e_dm').value=response.data[0].calificacionparcial
      document.getElementById('txtfecha_e_dm').value=response.data[0].fecha
      document.getElementById('txtobservacion_e_dm').value=response.data[0].observacion
      

      
      
      }).catch(err => console.log('Error: ', err))
  
}


function subirdatosaeditarmina_dm(data) {
    
    const nombremina_dm = data.replaceAll('.', ' ')

    ////
    let text = nombremina_dm;
    const myArray = text.split("|");
    document.getElementById("txtidmina_dm").value = myArray[1]; 

    ///
    document.getElementById('txtnombremina_dm').value = myArray[0]
    let b_cancelarmina=document.getElementById('cancelarmina_dm')
    b_cancelarmina.click()
    
}


function limpiarfrmdetallemina() {

  document.getElementById("frmcreardetallemina").reset();
  
}



function actualizareditardetallemina() {
  let estadomina__e_dm=false   
  const iddetallemina_e_dm= document.getElementById('txtiddetallemina_e_dm').value
  //const txtnombremina_e_dm= document.getElementById('txtnombremina_e_dm').value.replace(/ /g, "")
  const calificacionparcial_e_dm = document.getElementById('txtcalificacionparcial_e_dm').value
  //const txtfecha_e_dm = document.getElementById('txtfecha_e_dm')
  const observacion_e_dm = document.getElementById('txtobservacion_e_dm').value
  
 
  
 
  if(
    txtcalificacionparcial_e_dm=="" || txtobservacion_e_dm=="" || txtiddetallemina_e_dm=="" ){
          alert("agunos campos vacios ")
  }    
  else{
         
      if(estadomina__e_dm==false){
                    
          axios ({
              method: 'POST',
              url: 'http://127.0.0.1:5000/actualizar_detalle_mina',
              data: {id:iddetallemina_e_dm,
                     calificacionparcial:calificacionparcial_e_dm,
                     observacion:observacion_e_dm                   
                  },
            }).then(function (response) {
              console.log(response)
              if (response.data.informacion == 'ok') {
                  Swal.fire({
                  //text:"Criterio a la mina actualizada",
                  icon: 'success',
                  confirmButtonText: 'OK',
                  html: `  <small ><b>Criterio de la mina actualizado </b></small>`
                  
                }).then((result) => {
                 // console.log(result)
                  window.location.href = './detallemina.html';
                 });
              }
              else {
                Swal.fire({
                  //text:"Problemas con el sistema",
                  icon: 'error',
                  confirmButtonText: 'OK',
                  html: `  <small ><b>Problemas con el sistema </b></small>`
                });
              }                           
             
             }).catch(err => console.log('Error: ', err))
           ///////////////////
      }
     
  }
  
}




//////////validar decimales

$('#txtcalificacionparcial_d').on('input', function () {
  this.value = this.value.replace(/[^0-9,.]/g, '').replace(/,/g, '.');
});


$('#txtcalificacionparcial_e_dm').on('input', function () {
  this.value = this.value.replace(/[^0-9,.]/g, '').replace(/,/g, '.');
});




//////
//////////////////
function buscarentabla(dato) {  
  var rpta = false
  let datobuscar = dato 
  var resume_table = document.getElementById("tabladetalleMinas");
  for (var i = 0, row; row = resume_table.rows[i]; i++) {
      for (var j = 0, col; col = row.cells[j]; j++) {
          if(datobuscar==col.innerText){
           
            
             rpta=true
          }
          //console.log( col.innerText );
       }
  }
  if (rpta==true){
   
      return true
      
  }
  else{
   
      rpta==false
      return false
  }
}

function estadisticas_minas_criterios() {

  axios ({
    method: 'POST',
    url: 'http://127.0.0.1:5000/consultar_cantidad_criterios_minas',
          
    }).then(function (response) {
        //console.log(response.data[0].cantidad)
       // document.getElementById('num_minas').innerHTML=response.data[0].cantidad    
       //can_mina_pais
       let msg=""
       for (let i = 0; i<response.data.length ; i++) {
          
          msg=msg + "<b>"+ response.data[i].mina+"</b> : "+response.data[i].cantidad+" criterios(s)"+"<br>"
          
        
       }
       document.getElementById('mina_criterio_det').innerHTML= msg
       
        }).catch(err => console.log('Error: ', err))
  
}