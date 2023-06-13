google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart1);

function drawChart1() {
    var queryString = encodeURIComponent('SELECT I, Q, R WHERE I="GAME_ACTION" OR I="GAME_CARD"  ');
    var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/1zthFqca2RsdBVtfA4Xyl1zXemv8uSeoy/edit?usp=sharing&headers=1&tq="+queryString);
    query.send(handleQueryResponse)    
}

// https://docs.google.com/spreadsheets/d/1BKl62ktiWalZW3wwWkhwh2AivRdySiXb/edit?usp=sharing&ouid=115908677499214552115&rtpof=true&sd=true

function handleQueryResponse(response) {
    var data= response.getDataTable();
    //console.log(data)
    //console.log(data.Wf.length)
    //console.log(data.Wf[0].c[1].v)
    let acu_game_action_jp_Sales=0;
    let acu_game_action_eu_Sales=0
    let acu_game_card_jp_Sales=0;
    let acu_game_card_eu_Sales=0
    var lista_general=[]
    var lista_particular=[]

    for (let i = 0; i<data.Wf.length ; i++) {
        for (let j = 0; j<3 ; j++) {
           // console.log(data.Wf[i].c[j].v)  
            lista_particular.push(data.Wf[i].c[j].v)
        }
        lista_general.push(lista_particular)
        lista_particular=[]

    }
    //console.log(lista_general)

    for (let i = 0; i<lista_general.length ; i++) {
        if (lista_general[i][0]=="GAME_ACTION"){
            acu_game_action_eu_Sales=acu_game_action_eu_Sales+lista_general[i][1];
            acu_game_action_jp_Sales=acu_game_action_jp_Sales+lista_general[i][2];
        }

        if (lista_general[i][0]=="GAME_CARD"){
            acu_game_card_eu_Sales=acu_game_card_eu_Sales+lista_general[i][1];
            acu_game_card_jp_Sales=acu_game_card_jp_Sales+lista_general[i][2];
        }

    }
    //console.log(acu_game_action_eu_Sales)
    //console.log(acu_game_action_jp_Sales)
    //console.log(acu_game_card_eu_Sales)
    //console.log(acu_game_card_jp_Sales)
    var data = google.visualization.arrayToDataTable([
        ['Category',              'Japon',              'Europa'],
        ['GAME_ACTION',       acu_game_action_jp_Sales,      acu_game_action_eu_Sales],
        ['GAME_CARD',        acu_game_card_jp_Sales,      acu_game_card_eu_Sales]
    
    ]);
    var options = {
        title: 'Vantas en Japon y Europa ',
        hAxis: {title: 'Caregoria', titleTextStyle: {color: 'black'}},
        legend: {
            position:'top',
            textStyle:{color:'black',fontSize:10}
        },
        width:450,
        height:350,
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('grafico1'));
    chart.draw(data, options);

    
}


