


      function drawVisualization4() {
        var queryString = encodeURIComponent('SELECT  SUM(P),SUM(Q),SUM(R),SUM(S) ');
        var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/1zthFqca2RsdBVtfA4Xyl1zXemv8uSeoy/edit?usp=sharing&headers=1&tq="+queryString);
        query.send(handleQueryResponse_44)    
    }

      function handleQueryResponse_44(response) {
       var datos = response.getDataTable();
       //console.log(datos)

      // console.log(Math.round(datos.Wf[0].c[0].v))
       //console.log(Math.round(datos.Wf[0].c[1].v))
      // console.log(Math.round(datos.Wf[0].c[2].v))
      // console.log(Math.round(datos.Wf[0].c[3].v))
       document.getElementById('indicador1').innerHTML=Math.round(datos.Wf[0].c[0].v)
       document.getElementById('indicador2').innerHTML=Math.round(datos.Wf[0].c[1].v)
       document.getElementById('indicador3').innerHTML=Math.round(datos.Wf[0].c[2].v)
       document.getElementById('indicador4').innerHTML=Math.round(datos.Wf[0].c[3].v)

     
      
      }