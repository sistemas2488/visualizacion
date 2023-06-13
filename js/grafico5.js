google.charts.load('current', {'packages':['treemap']});
google.charts.setOnLoadCallback(drawChart5);

function drawChart5() {
    
    var queryString = encodeURIComponent('SELECT  A, I , S WHERE I="GAME_ACTION" OR I="GAME_CARD" OR I="GAME_CASINO"  ORDER BY Q LIMIT 15 ');
    var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/1zthFqca2RsdBVtfA4Xyl1zXemv8uSeoy/edit?usp=sharing&headers=1&tq="+queryString);
    query.send(handleQueryResponse_5)    
}
function handleQueryResponse_5(response) {
  let lista=[]

  let sub_lista=['Name','Category','Global_Sales']  
  lista.push(sub_lista)
  sub_lista=[]

  sub_lista=['Global',null,0]
  lista.push(sub_lista)
  sub_lista=[]

  sub_lista=['GAME_ACTION','Global',0]
  lista.push(sub_lista)
  sub_lista=[]

  sub_lista=['GAME_CARD','Global',0]
  lista.push(sub_lista)
  sub_lista=[]

  sub_lista=['GAME_CASINO','Global',0]
  lista.push(sub_lista)
  sub_lista=[]
  

  //console.log(lista)


    var data = response.getDataTable();
   // console.log(data)
    
    for (let i = 0; i<data.Wf.length ; i++) {
      for (let j = 0; j<3 ; j++) {
          //console.log(data.Wf[i].c[j].v)  
          
          sub_lista.push(data.Wf[i].c[j].v)
      }
      lista.push(sub_lista)
      //console.log(sub_lista)
      sub_lista=[]
    }
   
   
   

   
   
    
    var data = google.visualization.arrayToDataTable(lista);
      var options = {
        title: 'Juegos por categorias',
        legend: {
            position:'top',
            textStyle:{color:'black',fontSize:8}
        },
        minColor: 'blue',
        midColor: '#C39BD3',
        maxColor: 'red',
        headerHeight: 14,
        fontColor: 'black',
        width:400,
        height:300
        
    };
      tree = new google.visualization.TreeMap(document.getElementById('grafico5'));
      tree.draw(data, options);

    }


