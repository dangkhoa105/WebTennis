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

retrievingDataRanking();

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

function retrievingDataRanking(){
 var docRef = db.collection("Ranking").orderBy("currentRank", "asc")
  docRef.get().then(function (querySnapshot) {
  querySnapshot.forEach(function(data){
      
      document.querySelector("#text").innerHTML += `
      ${data.data().playerName} 
      ${data.data().playerPoints} 
      ${data.data().playerCountry}  
      ${data.data().prevRank} 
      ${data.data().currentRank} 
      </br>
      ` 
  });
  });
}

  