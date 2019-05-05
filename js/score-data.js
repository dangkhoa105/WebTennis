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

// function retrievingData() {
//   const list_div = document.querySelector("#list-score");
//   var inputDatetime = $('#date_time').value;
//   var docRef = db.collection("Schedule").where("Date", "==", "12/31/18")
//   docRef.get().then(function (querySnapshot) {
//   const tableBody = $("#tb-score");
//     // tableBody.css('backgroundColor', 'red');
//     // tableBody.css('color', 'blue');
//     console.log(tableBody);

//     querySnapshot.forEach(function (data) {
//       tableBody.append($(
//         `<tr>
//         <td><img src='img/core-img/chat.png'/></td>
//         <td>${data.data().Location}</td>
//         <td>${data.data().Winner}</td>
//         <td>${data.data().ATP}</td>
//         <td>${data.data().Round}</td>
//         </tr>`
//       ));
//     });
//   });
// }

db.collection('Schedule').get().then(snap => {
  size = snap.size // will return the collection sizes
  document.getElementById("countData").value ="" + size;
});

let set_size = `width = '20' hight = 30 style="text-align:center" `;
document.getElementById("addDelete").onclick  = function(){Delete()};
function Delete(){
  $('button[id^="delete"]').show();
}
function updateKey()
{
    var key=$("#title").val();
    key=key.replace(" ","_");
    $("#url_key").val(key);
}
function retrievingData() {
  
  const list_div = document.querySelector("#list-score");
  let inputDatetime =""+ $('#datetime').val();
  if(checkScoreDay != inputDatetime){
    $('#list-score').empty();
    var docRef = db.collection("Schedule").where("Date", "==",""+ inputDatetime)
    docRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function(data){
        let imgW = data.data().Winner;
        let imgL = data.data().Loser;
        imgW = imgW.replace(" ","%20");
        imgL = imgL.replace(" ","%20");
        list_div.innerHTML += 
     `
        <style>
          .container_score {
            width: 75%;
            text-align: center;
            padding-left: 25%;         
          }
  
          .wrap_score {
            background: white;
          }
          
          .score {
            width: 100%;
            text-align: center;
          }
          
          .score td {
            border: 1px solid gray;
          }
          
          .score .time_begin {
            border-left: 0;
          }
          
          .score .score_finish {
            border-right: 0;
          }
          
          .flag img {
            width: 30px;
            height: 20px;
          }      
       
          .country {
            text-align: left;
          }      
        </style>
  
        <div class="container_score">     
          <div class="wrap_score">
            <table class="score">
              <tr style="background:#02031c; color: white;">
                <td style="background:#02031c; text-align: left; color: white; padding-left:40px;" colspan="5" ${set_size}><i class="fas fa-map-marker-alt"></i> Stadium: ${data.data().Location}</td>
                <td style="background:white;" rowspan="3" ><button id = "delete${data.data().ID}" onclick = "deleteData(${data.data().ID})" style="display: none;">- </button></td>
              </tr>
              <tr>
                <td width = "15%" class="flag"><img src="img/flag/${data.data().Winner}.png"></td>
                <td width = "35%" class="country"><i class="fas fa-racquet"></i> ${data.data().Winner}</td>
                <td width = "17%">${data.data().W1}</td>
                <td width = "17%">${data.data().W2}</td>
                <td width = "17%">${data.data().W3 != "undefined" ? + data.data().W3 : ""}</td>
                
              </tr>
              <tr>
                <td width = "15%" class="flag"><img src="img/flag/${data.data().Loser}.png"></td>
                <td width = "30%" class="country"><i class="fas fa-racquet"></i> ${data.data().Loser}</td>
                <td width = "17%">${data.data().L1}</td>
                <td width = "17%">${data.data().L2}</td>
                <td width = "17%">${data.data().W3 != "undefined" ? + data.data().L3 : ""}</td>
              </tr>
            </table>             
            </div>
          </div>`   
      })
    });
    checkScoreDay = inputDatetime;
  }
}
function deleteData(id){

  $(document).ready(function(){
      db.collection("Schedule").doc("2019."+id).delete().then(function() {
          console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
  });


  
  
  let count = document.getElementById("countData").value -1;
  $(document).ready(function(){
    db.collection("Schedule").doc("2019."+count).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  });
  db.collection('Schedule').get().then(snap => {
    size = snap.size // will return the collection sizes
    document.getElementById("countData").value ="" + size;
  });
  storeData(id);
}


function storeData(start) {

  var url = "https://raw.githubusercontent.com/NguyenTanPhucK11/tennis123/master/2019.json";

  $(document).ready(function () {
    $.getJSON(url, function (data) {
      let k ;
      if(start == -1){
        start = -2;
        k = 15;  // length of list watch

      }else{
        k = document.getElementById("countData").value;
      }
      // if else use determined update new or update list since delete 
      for (let i = 0, j = 0; i < k; j++ ,i++) {
        let idNew = i;
        if(i == start+1){j--; idNew --};                                // delete id = start
        db.collection("Schedule").doc("2019." + j).set({
          ID : "" + idNew,                                        // **** id = j because delete id = start
          ATP: "" + data["2019"][i]["ATP"],
          Location: "" + data["2019"][i]["Location"],
          Tournament: "" + data["2019"][i]["Tournament"],
          Date: "" + data["2019"][i]["Date"],
          Series: "" + data["2019"][i]["Series"],
          Court: "" + data["2019"][i]["Court"],
          Surface: "" + data["2019"][i]["Surface"],
          Round: "" + data["2019"][i]["Round"],
          Best: "" + data["2019"][i]["Best of"],
          Winner: "" + data["2019"][i]["Winner"],
          Loser: "" + data["2019"][i]["Loser"],
          WRank: "" + data["2019"][i]["WRank"],
          LRank: "" + data["2019"][i]["LRank"],
          WPts: "" + data["2019"][i]["WPts"],
          LPts: "" + data["2019"][i]["LPts"],
          W1: "" + data["2019"][i]["W1"],
          L1: "" + data["2019"][i]["L1"],
          W2: "" + data["2019"][i]["W2"],
          L2: "" + data["2019"][i]["L2"],
          W3: "" + data["2019"][i]["W3"],
          L3: "" + data["2019"][i]["L3"],
          Wsets: "" + data["2019"][i]["Wsets"],
          Lsets: "" + data["2019"][i]["Lsets"],
          Comment: "" + data["2019"][i]["Comment"],
          B365W: "" + data["2019"][i]["B365W"],
          B365L: "" + data["2019"][i]["B365L"],
          PSW: "" + data["2019"][i]["PSW"],
          PSL: "" + data["2019"][i]["PSL"],
          MaxW: "" + data["2019"][i]["MaxW"],
          MaxL: "" + data["2019"][i]["MaxL"],
          AvgW: "" + data["2019"][i]["AvgW"],
          AvgL: "" + data["2019"][i]["AvgL"],
        }).then(function () {
          console.log("Document successfully written!");
        }).catch(function (error) {
          console.error("Error writing document: ", error);
        });
      }

    });
  });
}
