$(document).ready(function() {
  $('#nav-estadisticas-tab').tab('show') 
    var table =   $('#tablaMinas').DataTable( {
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
                     return '<a class=" btn  btn-warning btn-xs      mt-2" href="javascript:void(0)"  data-id="' + (row.id) + '"  onclick=subirdatosaeditarmina("' + (row.id) + '") data-bs-toggle="modal" data-bs-target="#exampleModalEditarMina" >Editar</a>                                             ';
                     /*
                    <a class="btn  btn-danger btn-xs text-white mt-3" href="javascript:void(0)"   data-id="' + (row.id) + '"  onclick=subirdatosabajar("' + (row.nombre) + '")  data-bs-toggle="modal" data-bs-target="#exampleModalBajar"      >Eliminar</a>
                     */
                }
            }
            
          ], // fin de columnas
          }); // fin datatable

       }); /// fin del ready


function subirdatosabajar(data){
    /*
    console.log(data)
    document.getElementById('txtusuario_b').value=data 
    */
}


/*
function bajarusuario(){
        
        const usuario_=document.getElementById('txtusuario_b').value
        axios ({
            method: 'POST',
            url: 'http://127.0.0.1:5000/bajar_usuario',
            data: {usuario:usuario_                     
                },
          }).then(function (response) {
            console.log(response)
            if (response.data.informacion == 'ok') {
                Swal.fire({
                text:"Usuario de baja",
                icon: 'success',
                confirmButtonText: 'OK'
                
              }).then((result) => {
               // console.log(result)
                window.location.href = './usuario.html';
               });
            }
            else {
              Swal.fire({
                text:"Problemas con el sistema",
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }                           
           
           }).catch(err => console.log('Error: ', err))
         ///////////////////   
    
    
}
*/


function subirdatosaeditarmina(data){
    
        const id_ = data
        //console.log(data)
        axios ({
            method: 'POST',
            url: 'http://127.0.0.1:5000/consultar_mina_id/'+id_,
           // data: {id:id_},
          }).then(function (response) {
            console.log(response.data[0].pais)
            
            document.getElementById('txtidmina_e').value=response.data[0].id
           
            //document.getElementById('txtregion_e').value=response.data[0].region
            document.getElementById('txtnombremina_e').value=response.data[0].nombre
            
            //document.getElementById('txtclasificacion_e').options[document.getElementById('txtclasificacion_e').selectedIndex].value =0
           
            
            }).catch(err => console.log('Error: ', err))

}



function agregarmina() {
    let estadomina=false
   
    const nombremina_= document.getElementById('txtnombremina').value.replace(/ /g, "")
    const listaclasificacion = document.getElementById('txtclasificacion')
    const clasificacion_ = listaclasificacion.options[listaclasificacion.selectedIndex].value
    const listregion = document.getElementById('txtregion')
    const region_ = listregion.options[listregion.selectedIndex].value
    const latitud_=document.getElementById('txtlat').value
    const longuitud_=document.getElementById('txtlon').value
    
   
    if(
      nombremina_=="" || region_=="" || clasificacion_==""||latitud_==""||longuitud_=="" ){
            alert("agunos campos vacios ")
    }    
    else{
        
        let duplicadomina =buscarentabla(nombremina_)
        if(duplicadomina==true){
            alert("La mina ya se encuentra registrada")
            estadomina=true
        }
        else{
          estadomina=false
        }
       
        

        if(estadomina==false){
                      
            axios ({
                method: 'POST',
                url: 'http://127.0.0.1:5000/crear_mina',
                data: {nombre:nombremina_,
                       idregion:region_,
                       clasificacionmina:clasificacion_ ,
                       latitud:latitud_,
                       longuitud:longuitud_                 
                    },
              }).then(function (response) {
                console.log(response)
                if (response.data.informacion == 'ok') {
                    Swal.fire({
                    //text:"Mina creada",
                    icon: 'success',
                    confirmButtonText: 'OK',
                    html: `  <small ><b>Mina creada </b></small>`
                    
                  }).then((result) => {
                   // console.log(result)
                    window.location.href = './mina.html';
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



function actualizarmina() {
  let estadomina__e=false   
  const idmina__e= document.getElementById('txtidmina_e').value
  const nombremina__e= document.getElementById('txtnombremina_e').value.replace(/ /g, "")
  const listaclasificacion_e = document.getElementById('txtclasificacion_e')
 const clasificacion__e = listaclasificacion_e.options[listaclasificacion_e.selectedIndex].value
  //const listregion_e = document.getElementById('txtregion_e')
 // const region__e = listregion_e.options[listregion_e.selectedIndex].value
  
 
  if(
    clasificacion__e=="" ){
          alert("agunos campos vacios ")
  }    
  else{
      
    /*
      let duplicadomina_e =buscarentabla(nombremina__e)
      if(duplicadomina_e==true){
          alert("La mina ya se encuentra registrada")
          estadomina=true
      }
      else{
        estadomina=false
      }
     
      */

      if(estadomina__e==false){
                    
          axios ({
              method: 'POST',
              url: 'http://127.0.0.1:5000/actualizar_mina_act',
              data: {id:idmina__e,
                     clasificacionmina:clasificacion__e                   
                  },
            }).then(function (response) {
              console.log(response)
              if (response.data.informacion == 'ok') {
                  Swal.fire({
                 // text:"Mina actualizada",
                  icon: 'success',
                  confirmButtonText: 'OK',
                  html: `  <small ><b>Mina actualizada </b></small>`
                  
                }).then((result) => {
                 // console.log(result)
                  window.location.href = './mina.html';
                 });
              }
              else {
                Swal.fire({
                 // text:"Problemas con el sistema",
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



function buscarentabla(dato) {  
    var rpta = false
    let datobuscar = dato 
    var resume_table = document.getElementById("tablaMinas");
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
 


 function cargardatosestadistica(){

  
   axios ({
        method: 'POST',
        url: 'http://127.0.0.1:5000/consultar_cantidad_minas',
          
        }).then(function (response) {
           //console.log(response.data[0].cantidad)
            document.getElementById('num_minas').innerHTML=response.data[0].cantidad        
            }).catch(err => console.log('Error: ', err))


   axios ({
          method: 'POST',
          url: 'http://127.0.0.1:5000/consultar_cantidad_minas_por_pais',
                
          }).then(function (response) {
              //console.log(response.data[0].cantidad)
             // document.getElementById('num_minas').innerHTML=response.data[0].cantidad    
             //can_mina_pais
             let msg=""
             for (let i = 0; i<response.data.length ; i++) {
                console.log(response.data[i].paises)
                console.log(response.data[i].cantidad)
                msg=msg +response.data[i].paises+" : "+response.data[i].cantidad+" mina(s)"+"<br>"
                
              
             }
             document.getElementById('can_mina_pais').innerHTML= msg
             
              }).catch(err => console.log('Error: ', err))
        
        


 }