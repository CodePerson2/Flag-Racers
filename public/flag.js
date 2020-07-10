var flagsArray;
var flagURL;
function setFlag(id){
  var flagArr = flagsArray[id];
  $('#flag-name').empty();
  $('#flag-facts').empty();
  $('#flag-name').attr({style: 'content:URL(' + flagArr.flag + ')'});
  $('#flag-name').text(flagArr.name);
  flagURL = flagArr.flag;
  $('#flag-facts').html("Name: " + flagArr.name + '<br>' + "Language: " + flagArr.languages[0].name + '<br>' + "Pop: " + flagArr.population + '<br>' + "Native Name: " + flagArr.nativeName + '<br>' + "Capital: " + flagArr.capital + '<br>' + "Subregion: " + flagArr.subregion + '<br>' + "Currency: " + flagArr.currencies[0].name);
}

function getFlag(flagArr, index){
  console.log(flagArr.name);
  
  var div = document.createElement('div');
  $(div).addClass('box');
  $(div).attr({style: 'content:URL(' + flagArr.flag + ')'});
  $(div).attr('id', index);
  $(div).attr('onclick', 'setFlag(this.id)');
  $(div).prop('title', "Name: " + flagArr.name + '\n' + "Language: " + flagArr.languages[0].name + '\n' + "Pop: " + flagArr.population + '\n' + "Native Name: " + flagArr.nativeName + '\n' + "Capital: " + flagArr.capital + '\n' + "Subregion: " + flagArr.subregion + '\n' + "Currency: " + flagArr.currencies[0].name);
  $('#flag-cont').append(div);
   
}

function allFlags(){
  $("#flag-cont").empty();
  var xhttp = new XMLHttpRequest();
  var loc = "https://restcountries.eu/rest/v2/all";
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
      //alert(this.responseText);
      var flags = JSON.parse(this.responseText);
      flagsArray = flags;
      for(var i = 0; i < flags.length; i++){
        //console.log(flags[i].name);
        getFlag(flags[i], i);
      }
      setFlag(42);
    }
    
  };
  xhttp.open('GET', loc, true);
  xhttp.send();

}
function selectFlag(){
  var val = window.location.href.split('?');
  window.location = "racetrack.html" + val[1];
}