


function buscarlistaminas() {
  document.getElementById("txtbuscarmina_act").value="";
  document.getElementById("txtidmina_act").value=""
  document.getElementById("txtbuscarcriterio_act").value="";
  
  document.getElementById("txtidcriterio_act").value=""
  document.getElementById("txtiddetallemina").value=""

}
  

  ////////////////////////////////// carga la lista de criterios///////////////////
  id_mina_a_buscar=document.getElementById('txtidmina_act').value

////////////////////////////////// carga la lista de minas///////////////////
$(document).ready(function() {
    var table =   $('#tablaMinasact').DataTable( {
  
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


  function subirdatosaeditarmina_dm(data) {
    
    const nombremina_dm = data.replaceAll('.', ' ')

    ////
    let text = nombremina_dm;
    const myArray = text.split("|");
    document.getElementById("txtidmina_act").value = myArray[1]; 

    ///
    document.getElementById('txtbuscarmina_act').value = myArray[0]
    let b_cancelarmina=document.getElementById('cancelarmina_dm')
    b_cancelarmina.click()
    let btnbuscarcriterio=document.getElementById('btnbuscarcriterio')
    btnbuscarcriterio.disabled = false;//no habilitado 

    
    
}


function buscarcriteriopormina() {
  

  ////////////////////////////////// carga la lista de criterios///////////////////
  id_mina_a_buscar=document.getElementById('txtidmina_act').value
  $("#tablaCriterio_act").dataTable().fnDestroy();
  
  tablecriterio =   $('#tablaCriterio_act').DataTable( {
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
              "url": "http://127.0.0.1:5000/consultar_criterio_por_mina2/"+id_mina_a_buscar,
              "dataType": "JSON",
              "dataSrc":""    
            },

  ///////////////////////////////////////   datos del consumo
             "columns": [
            { "data": "id" },
            { "data": "mina" },
            { "data": "idcriterio"  },
            { "data": "criterio"  },
            { "data": "codigo"  },
            { "data": "calificacionparcial"  },
          
            {
              "data": null,
              "orderable": false,
              "class": 'text-center  px-1',
              render: function(data, type, row, meta) {
                  return '<a class=" btn  btn-dark btn-xs      mt-2" href="javascript:void(0)"  id="' + (row.id) + '"  onclick=subirdatoscriterios_act_dm("' + (row.codigo)+'|'+row.id +'|'+row.idcriterio + '")  >  Seleccionar  </a> '
            }
          }
          
        ], // fin de columnas
        }); // fin datatable
        
     /// fin del ready
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  

actividad=document.getElementById('btncrearnuevaactividad')
    btncrearnuevaactividad.disabled = false;//no habilitado 


}



function subirdatoscriterios_act_dm(data) {

  const nombrecriterio_dm = data.replaceAll('.', ' ')

  ////
  let text_ = nombrecriterio_dm;
  const myArray_ = text_.split("|");
  document.getElementById("txtiddetallemina").value = myArray_[1]; 

  ///
  document.getElementById('txtbuscarcriterio_act').value = myArray_[0]
  document.getElementById('txtidcriterio_act').value = myArray_[2]


  ////////////////////////// cargar tabla actividades /////////////////////
  let mina_actividad=document.getElementById('txtidmina_act').value
  let criterio_actividad=document.getElementById('txtidcriterio_act').value

  let ruta="http://127.0.0.1:5000/consultar_actividades_mina_criterio/"+mina_actividad+"/"+criterio_actividad
 // alert(ruta)
  $("#tablaactividades").dataTable().fnDestroy();
  
  tablaactividades =   $('#tablaactividades').DataTable( {
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
              "url": ruta,
              "dataType": "JSON",
              "dataSrc":""    
            },

  ///////////////////////////////////////   datos del consumo
             "columns": [
            { "data": "id" },
            { "data": "mina" },
            { "data": "criterio"  },
            { "data": "descripcion"  },
            { "data": "fecha"  },
            { "data": "responsable"  },
          
            {
              "data": null,
              "orderable": false,
              "class": 'text-center  px-1',
              render: function(data, type, row, meta) {
                  return '<button class=" btn  btn-dark btn-xs mt-2"   data-bs-toggle="modal" data-bs-target="#exampleModalseguimiento"      href="javascript:void(0)"  id="' + (row.id) + '"  onclick=subirseguimiento("' + (row.id) + '")  >  Seguimiento  </button> '
            }
          }
          
        ], // fin de columnas
        }); // fin datatable


  //////////////////////////////////////////////////////////////////////////
  let cancelarcriterio_act=document.getElementById('cancelarcriterio_act')
  cancelarcriterio_act.click()
  
  
  
}


function subirseguimiento(data) {

let idact__=data
document.getElementById('txtidactividad_seg').value=data


 ////////////////////////// cargar tabla seguimiento ////////////////

 $("#tablaseguimientos").dataTable().fnDestroy();
  
 tablaactividades =   $('#tablaseguimientos').DataTable( {
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
             "url": "http://127.0.0.1:5000/consultar_seguimientos_idactividad/"+idact__,
             "dataType": "JSON",
             "dataSrc":""    
           },

 ///////////////////////////////////////   datos del consumo
            "columns": [
           { "data": "id" },
           { "data": "idactividad" },
           { "data": "avance"  },
           { "data": "observacion"  },
           { "data": "fecha"  },
         
         
           {
             "data": null,
             "orderable": false,
             "class": 'text-center  px-1',
             render: function(data, type, row, meta) {
                 return '<a class=" btn  btn-dark btn-xs mt-2"   data-bs-toggle="modal" data-bs-target="#exampleModalseguimiento"      href="javascript:void(0)"  id="' + (row.id) + '"  onclick=subirdatosseguimiento("' + (row.id) + '")  >  Editar  </a> '
           }
         }
         
       ], // fin de columnas
       }); // fin datatable

////////////////////////////////////////////////////////////////// 
}


function subirdatosseguimiento(data) {

  const idseg_subir =data
  let btneditarseg=document.getElementById('btneditarseg')
  btneditarseg.disabled = false;//no habilitado 
  let btncrearseg=document.getElementById('btncrearseg')
  btncrearseg.disabled = true;//no habilitado 

  axios ({
    method: 'GET',
    url: 'http://127.0.0.1:5000/consultar_seguimientos_idseg/'+idseg_subir,
    
  }).then(function (response) {
    console.log(response.data[0].id)   
    document.getElementById('txtidactividad_seg').value=response.data[0].idactividad
    document.getElementById('txtavance_seg').value=response.data[0].avance
    document.getElementById('txtobservacion_seg').value=response.data[0].observacion
    //txtid_seg
    document.getElementById('txtid_seg').value=response.data[0].id


      //////// formato fecha////
   // Create a date object from a date string
   var date = new Date(response.data[0].fecha);
   // Get year, month, and day part from the date
   var year = date.toLocaleString("default", { year: "numeric" });
   var month = date.toLocaleString("default", { month: "2-digit" });
   var day = date.toLocaleString("default", { day: "2-digit" });
   // Generate yyyy-mm-dd date string
  // day = parseInt(day)+parseInt(1)
   var formattedDate = year + "-" + month + "-" + (day);
   console.log(formattedDate);  // Prints: 04-05-2022
   document.getElementById('txtfecha_seg').value=formattedDate

   //////////////////////////
   
        }).catch(err => console.log('Error: ', err))
  
}




function consultariddetallemina() {

  const id_min = document.getElementById('txtidmina_act').value
  const id_cri = document.getElementById('txtidcriterio_act').value


  document.getElementById('txtIDmina_n_act').value=document.getElementById('txtidmina_act').value 
  document.getElementById('txtmina_n_act').value  =document.getElementById('txtbuscarmina_act').value 
  document.getElementById('txtcriterio_n_act').value  =document.getElementById('txtbuscarcriterio_act').value 
  document.getElementById('txtIDcriterio_n_act').value  =document.getElementById('txtidcriterio_act').value 
  document.getElementById('txtid_detallemina').value  =document.getElementById('txtiddetallemina').value 
  
  
  axios ({
      method: 'POST',
      url: 'http://127.0.0.1:5000/consultar_iddetallemina_mina_criterio',
      data: {idmina:id_min,
             idcriterio:id_cri
      
      },
    }).then(function (response) {
      console.log(response.data[0].id)
    
      
      
      //document.getElementById('txtid_detallemina').value=response.data[0].id
      //document.getElementById('txtid_detallemina').value=response.data[0].id

      //txtid_detallemina
      
      
      }).catch(err => console.log('Error: ', err))
  
}




function agregar_actividad() {

 //// cargar a la modal
  document.getElementById('txtIDmina_n_act').value="150"
  //document.getElementById('txtmina_n_act').value  =document.getElementById('txtbuscarmina_act').value 
  //document.getElementById('txtcriterio_n_act').value  =document.getElementById('txtidcriterio_act').value 
  //document.getElementById('txtIDcriterio_n_act').value  =document.getElementById('txtbuscarcriterio_act').value 

 ///

  let estadoactividad=false 
  const txtid_detallemina_= document.getElementById('txtid_detallemina').value
  const txtdescripcion_n_act_ = document.getElementById('txtdescripcion_n_act').value
  const txtfecha_n_act_ = document.getElementById('txtfecha_n_act').value
  const txtproducto_n_act_ = document.getElementById('txtproducto_n_act').value
  const txtresponsable_n_act_ = document.getElementById('txtresponsable_n_act').value
   console.log(txtid_detallemina_)
 
  if(
    txtdescripcion_n_act_=="" || txtfecha_n_act_=="" || txtproducto_n_act_==""|| txtresponsable_n_act_=="" ){
          alert("agunos campos vacios ")
  }    
  else{   

      if(estadoactividad==false){
                    
          axios ({
              method: 'POST',
              url: 'http://127.0.0.1:5000/crear_actividad',
              data: {iddetallemina:txtid_detallemina_,
                     descripcion:txtdescripcion_n_act_,
                     fecha:txtfecha_n_act_ ,
                     producto:txtproducto_n_act_,
                     responsable:txtresponsable_n_act_

                  },
            }).then(function (response) {
              console.log(response)
              if (response.data.informacion == 'ok') {
                  Swal.fire({
                  //text:"Actividad creada",
                  icon: 'success',
                  confirmButtonText: 'OK',
                  html: `  <small ><b>Actividad creada</b></small>`
                  
                }).then((result) => {
                 // console.log(result)
                  window.location.href = './actividad.html';
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



function crearseguimiento() {

  let estadoseguimiento=false
  const idactividad_s= document.getElementById('txtidactividad_seg').value
  const avance_s = document.getElementById('txtavance_seg').value
  const observacion_s = document.getElementById('txtobservacion_seg').value
  const fecha_s = document.getElementById('txtfecha_seg').value
 if(
    avance_s=="" || observacion_s=="" || fecha_s=="" ){
          alert("agunos campos vacios ")
  }    
  else{
      if(estadoseguimiento==false){
                    
          axios ({
              method: 'POST',
              url: 'http://127.0.0.1:5000/crear_seguimiento',
              data: {idactividad:idactividad_s,
                     avance:avance_s,
                     observacion:observacion_s,
                     fecha:fecha_s
                  },
            }).then(function (response) {
              console.log(response)
              if (response.data.informacion == 'ok') {
                  Swal.fire({
                  //text:"Seguimiento creado",
                  icon: 'success',
                  confirmButtonText: 'OK',
                  html: `  <small ><b>Seguimiento creado</b></small>`
                  
                }).then((result) => {
                 // console.log(result)
                  window.location.href = './actividad.html';
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

function editarseguimiento_s() {
 
  let estadoseguimiento_e=false
  const id_seg_e= document.getElementById('txtid_seg').value
  const idactividad_s_e= document.getElementById('txtidactividad_seg').value
  const avance_s_e = document.getElementById('txtavance_seg').value
  const observacion_s_e = document.getElementById('txtobservacion_seg').value
  const fecha_s_e = document.getElementById('txtfecha_seg').value
 if(
  avance_s_e=="" || observacion_s_e=="" || fecha_s_e=="" ){
          alert("agunos campos vacios ")
  }    
  else{
      if(estadoseguimiento_e==false){
                    
          axios ({
              method: 'POST',
              url: 'http://127.0.0.1:5000/actualizar_seguimiento',
              data: {id:id_seg_e,
                     idactividad:idactividad_s_e,
                     avance:avance_s_e,
                     observacion:observacion_s_e,
                     fecha:fecha_s_e
                  },
            }).then(function (response) {
              console.log(response)
              if (response.data.informacion == 'ok') {
                  Swal.fire({
                  //text:"Seguimiento actualizado",
                  icon: 'success',
                  confirmButtonText: 'OK',
                  html: `  <small ><b>Seguimiento actualizado </b></small>`
                  
                }).then((result) => {
                 // console.log(result)
                  window.location.href = './actividad.html';
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