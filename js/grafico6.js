google.load("visualization", "2",{'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart6);

function drawChart6() {
    var queryString = encodeURIComponent('SELECT  I, SUM(S)    WHERE I="GAME_ACTION" OR I="GAME_CARD" OR I="GAME_BOARD" OR I="GAME_WORD" OR I="GAME_CASINO" GROUP BY I');
    var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/1zthFqca2RsdBVtfA4Xyl1zXemv8uSeoy/edit?usp=sharing&headers=1&tq="+queryString);
    query.send(handleQueryResponse_6)    
}



// https://docs.google.com/spreadsheets/d/1BKl62ktiWalZW3wwWkhwh2AivRdySiXb/edit?usp=sharing&ouid=115908677499214552115&rtpof=true&sd=true

function handleQueryResponse_6(response) {
    var datos= response.getDataTable();
    console.log(datos)
    //console.log(data.Wf.length)
    //console.log(datos.Wf[1].c[0].v)
    //console.log(datos.Wf[0].c[0].v)
    let action_global_Sales=datos.Wf[0].c[1].v;
    let board_global_Sales=datos.Wf[1].c[1].v
    let card_global_Sales=datos.Wf[2].c[1].v
    let casino_global_Sales=datos.Wf[3].c[1].v
    let word_global_Sales=datos.Wf[4].c[1].v

    
    //console.log(action_global_Sales)
    //console.log(card_global_Sales)
  
    //let resto = 1731 -action_global_Sales -

   let suma = 78399-action_global_Sales-board_global_Sales-card_global_Sales
  
   let vsuma = ((suma/78399)*100)
  
    var data = google.visualization.arrayToDataTable([
        ['Category', 'Glosbal Sales'],
        ['Action',     ((action_global_Sales/78399)*100)],
        ['Board',      ((board_global_Sales)/78399)*100],
        ['Card',      ((card_global_Sales)/78399)*100],
        ['Resto',      vsuma]
       
      ]);

      var options = {
        title: 'Porcentajes de ventas por categoria',
        pieHole: 0.4,
        width:400,
        height:350,
        legend: {
          position:'top'         
        
   },
   titleTextStyle:{
    
    bold:false
    
},
      };

      var chart = new google.visualization.PieChart(document.getElementById('grafico6'));

      chart.draw(data, options);
    
    
}


