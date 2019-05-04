var config = {
  apiKey: "AIzaSyBXhP9jGoX0UGV3KpBezbmywwayVehOn64",
  authDomain: "tennis-d904d.firebaseapp.com",
  databaseURL: "https://tennis-d904d.firebaseio.com",
  projectId: "tennis-d904d",
  storageBucket: "tennis-d904d.appspot.com",
  messagingSenderId: "1070894637338"
};

firebase.initializeApp(config);


var db = firebase.firestore();


function storeDataRanking() {

  var url = "https://raw.githubusercontent.com/NguyenTanPhucK11/dataOfTennis/master/atp-rankings.json";

  $(document).ready(function () {
    $.getJSON(url, function (data) {
      for (let i = 0; i < 185; i++) {
        db.collection("Ranking").doc("" + i).set({
          ID : "" + i,                                        
          playerName :data["Sheet"][i]["player-name"],
          playerPoints :data["Sheet"][i]["player-points"],
          prevRank :data["Sheet"][i]["prev-rank"],
          playerCountry :data["Sheet"][i]["player-country"],
          currentRank : Number(data["Sheet"][i]["current-rank"]),
          
        }).then(function () {
          console.log("Document successfully written!");
        }).catch(function (error) {
          console.error("Error writing document: ", error);
        });
      }

    });
  });
}

function rRankingATP(){

    var docRef = db.collection("Ranking-ATP").orderBy("currentRank", "asc")
    docRef.get().then(function (querySnapshot) {
    querySnapshot.forEach(function(data){
        
        document.querySelector("#name").innerHTML += `  
        <div align=center>
<table>
        <tr>
        <td width=30%>
        ${data.data().playerName}
        </td>        
        </tr>
        </table>
        </div>
        </br>
        ` 
        document.querySelector("#country").innerHTML += `
        <div align=center>
<table>
        <tr width=30%>
        <td>
        ${data.data().playerCountry}
        </td>        
        </tr>
        </table>
        </div>
        </br>
        ` 
        document.querySelector("#pre-rank").innerHTML += `
        <div align=center>
<table>
        <tr>
        <td width=15%>
        ${data.data().prevRank}
        </td>        
        </tr>
        </table>
        </div>
        </br>
        ` 
        document.querySelector("#rank").innerHTML += `
        <div align=center>
<table>
        <tr>
        <td width=15%>
        ${data.data().currentRank}
        </td>        
        </tr>
        </table>
        </div>
        </br>
        ` 
        document.querySelector("#point").innerHTML += `
        <div align=center>
<table>
        <tr>
        <td width=20%>
        ${data.data().playerPoints}
        </td>        
        </tr>
        </table>
        </div>
        </br>
        ` 

    });
    });


}


function rRankingWTA(){

  var docRef = db.collection("Ranking-WTA").orderBy("currentRank", "asc")
  docRef.get().then(function (querySnapshot) {
  querySnapshot.forEach(function(data){
      
     document.querySelector("#name").innerHTML += `  
        <div align=center>
<table>
        <tr>
        <td width=30%>
        ${data.data().playerName}
        </td>        
        </tr>
        </table>
        </div>
        </br>
        ` 
        document.querySelector("#country").innerHTML += `
        <div align=center>
<table>
        <tr width=30%>
        <td>
        ${data.data().playerCountry}
        </td>        
        </tr>
        </table>
        </div>
        </br>
        ` 
        document.querySelector("#pre-rank").innerHTML += `
        <div align=center>
<table>
        <tr>
        <td width=15%>
        ${data.data().prevRank}
        </td>        
        </tr>
        </table>
        </div>
        </br>
        ` 
        document.querySelector("#rank").innerHTML += `
        <div align=center>
<table>
        <tr>
        <td width=15%>
        ${data.data().currentRank}
        </td>        
        </tr>
        </table>
        </div>
        </br>
        ` 
        document.querySelector("#point").innerHTML += `
        <div align=center>
<table>
        <tr>
        <td width=20%>
        ${data.data().playerPoints}
        </td>        
        </tr>
        </table>
        </div>
        </br>
        ` 
  });
  });


}