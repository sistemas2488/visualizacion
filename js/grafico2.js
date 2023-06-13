google.load("visualization", "2",{'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart2);

function drawChart2() {
    var queryString = encodeURIComponent('SELECT  COUNT(S)    WHERE I="GAME_ACTION" OR I="GAME_CARD" GROUP BY I');
    var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/1zthFqca2RsdBVtfA4Xyl1zXemv8uSeoy/edit?usp=sharing&headers=1&tq="+queryString);
    query.send(handleQueryResponse_2)    
}

// https://docs.google.com/spreadsheets/d/1BKl62ktiWalZW3wwWkhwh2AivRdySiXb/edit?usp=sharing&ouid=115908677499214552115&rtpof=true&sd=true

function handleQueryResponse_2(response) {
    var datos= response.getDataTable();
    //console.log(data)
    //console.log(data.Wf.length)
    //console.log(datos.Wf[1].c[0].v)
    //console.log(datos.Wf[0].c[0].v)
    let action_global_Sales=datos.Wf[0].c[0].v;
    let card_global_Sales=datos.Wf[1].c[0].v
    //console.log(action_global_Sales)
    //console.log(card_global_Sales)
   
   let action= ((action_global_Sales/1731)*100)
   let card =((card_global_Sales/1731)*100)
   let resto = (1731-action_global_Sales-card_global_Sales)
   let restante = (resto/1731)*100
   
    var data = google.visualization.arrayToDataTable([
        ['Category', 'Glosbal Sales'],
        ['Action',     action],
        ['Card',      card],
        ['Resto',      restante]
       
      ]);

      var options = {
        title: 'Porcentaje de juegos en categorias action y card',
        width:400,
        height:350,
        legend: {
          position:'bottom'         
        
   },
      };

      var chart = new google.visualization.PieChart(document.getElementById('grafico2'));

      chart.draw(data, options);
    
    
}


