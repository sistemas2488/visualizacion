function cargarpaises() {

    axios.get("http://127.0.0.1:5000/consultar_paises")
     .then(function (response) {
      let lista= document.getElementById('txtpais')
      let lista_e= document.getElementById('txtpais_e')
      for (let i = 0; i < response.data.length; i++) {
       
        lista.options[i]=new Option(response.data[i].nombre,response.data[i].id)
        lista_e.options[i]=new Option(response.data[i].nombre,response.data[i].id)
      }
 

    })





   
    
/////////////////////////////////////////////////////////////






     .catch(function (error) {
      console.log(error);
    });
}

cargarpaises() 