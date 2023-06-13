google.charts.load('current', {'packages':['gauge']});
      google.charts.setOnLoadCallback(drawChart4);

      function drawChart4() {
        var queryString = encodeURIComponent('SELECT  AVG(U)  ');
        var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/1zthFqca2RsdBVtfA4Xyl1zXemv8uSeoy/edit?usp=sharing&headers=1&tq="+queryString);
        query.send(handleQueryResponse_4)    
    }

      function handleQueryResponse_4(response) {
       var datos = response.getDataTable();
       //console.log(datos)
      // console.log(datos.Wf[0].c[0].v)
       //console.log(datos.Wf[1].c[0].v)
       //console.log(datos.Wf[2].c[0].v)
       var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['AVG', (Math.round(datos.Wf[0].c[0].v))]
      ]);
        
       var options = {
       
        width: 450, height: 300,
        redFrom: 90, redTo: 100,
        yellowFrom:75, yellowTo: 90,
        minorTicks: 5
      };

      var chart = new google.visualization.Gauge(document.getElementById('grafico4'));

      chart.draw(data, options);
            /*
      setInterval(function() {
        data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
        chart.draw(data, options);
      }, 13000);
      setInterval(function() {
        data.setValue(1, 1, 40 + Math.round(60 * Math.random()));
        chart.draw(data, options);
      }, 5000);
      setInterval(function() {
        data.setValue(2, 1, 60 + Math.round(20 * Math.random()));
        chart.draw(data, options);
      }, 26000);
      */
    }