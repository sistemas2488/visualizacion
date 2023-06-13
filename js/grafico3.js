google.charts.load('current',{packages:['bar']});
google.charts.setOnLoadCallback(drawVisualization3);


      function drawVisualization3() {
        var queryString = encodeURIComponent('SELECT  SUM(P)    WHERE I="GAME_ACTION" OR I="GAME_CARD" OR I="GAME_BOARD" GROUP BY I');
        var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/1zthFqca2RsdBVtfA4Xyl1zXemv8uSeoy/edit?usp=sharing&headers=1&tq="+queryString);
        query.send(handleQueryResponse_3)    
    }

      function handleQueryResponse_3(response) {
       var datos = response.getDataTable();
      // console.log(datos)
      // console.log(datos.Wf[0].c[0].v)
       //console.log(datos.Wf[1].c[0].v)
       //console.log(datos.Wf[2].c[0].v)
        
        var data = google.visualization.arrayToDataTable([
         ['Ventas', 'Ventas'  ],
         ['Action', (datos.Wf[0].c[0].v)],            // RGB value
         ['Card', (datos.Wf[1].c[0].v), ],            // English color name
         ['Board', (datos.Wf[2].c[0].v),  ], // CSS-style declaration
      ]);
      var options = {
        title: 'Total venta en Estados Unidos',
        legend: {
            position:'top',
            textStyle:{color:'black',fontSize:10}
        },
        width:400,
        height:350,
      };
        
      var chart = new google.visualization.BarChart(document.getElementById("grafico3"));
      chart.draw(data, options);
      
      }