function suma__() {
    var queryString = encodeURIComponent('SELECT   SUM(S)    ');
    var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/1zthFqca2RsdBVtfA4Xyl1zXemv8uSeoy/edit?usp=sharing&headers=1&tq="+queryString);
    query.send(datos_s)
   
  }

function datos_s(response) {
    let vsuma = suma__()
    
  var datos_suma= vsuma.getDataTable();
  alert(datos_suma)
  console.log(datos_suma)
}
  