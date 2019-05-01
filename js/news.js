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


//storeNews();

retrievingNews();

function storeNews(){
    for(let i = 0 ; i<10 ; i++){
        db.collection("News").doc("2019."+i).set({
    
            id : "",    
            image : "",
            mainTitle : "Fed Cup",
            subheading : "Fed Cup semifinal: Australia, Belarus level after first day",
            endPage : "Australian Ashleigh Barty beat Victoria Azarenka of Belarus 7-6 (2), 6-3 to level their Fed Cup semifinal at 1-1 after the opening day of singles on hard courts at Pat Rafter Arena ",
            hours : "",
            day: ""
        
            }).then(function(){
                console.log("Document successfully written!");
            }).catch(function (error){
                console.error("Error writing document: ", error);
            });
    }
    
}
function retrievingNews() {
    
    var docRef = db.collection("News").where("id", "==","1")
    docRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function(data){
        document.querySelector("#header-main-news").innerHTML += data.data().mainTitle;
        document.querySelector("#title-main-news").innerHTML += data.data().subheading;
        document.querySelector("#content-main-news").innerHTML += data.data().endPage;
      })
    });

    db.collection("News").where("id", "==","3").get().then(function (querySnapshot){
        querySnapshot.forEach(function(data){
            document.querySelector("#header-right-news-00").innerHTML += data.data().mainTitle;
            document.querySelector("#title-right-news-00").innerHTML += data.data().subheading;
            document.querySelector("#time-00").innerHTML += data.data().hours;
            document.querySelector("#day-00").innerHTML += data.data().day;
        })
    });

}

    