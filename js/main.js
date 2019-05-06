var pictureSrcList = [
  "http://college-mirbis.ru/wp-content/uploads/2017/10/php2hCKii.jpg",
  "https://zdnet2.cbsistatic.com/hub/i/r/2014/08/26/a8f31faf-2cf1-11e4-9e6a-00505685119a/resize/770xauto/ec806b03de3d8bdd33b8948cdbf00d68/java-logo.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/2000px-PHP-logo.svg.png",
  "http://yumurtabilekiramam.com/images/580a24fb4a508.png",
  "https://i.pinimg.com/originals/3a/51/12/3a51129274fc2cf77ec774ed11845928.jpg",
  "https://codeschool.cct.bg/wp-content/uploads/2017/09/c.png"
    
];
$(document).ready(function(){
  var a = getCookie("time");
  if(a==""){
    a=60;
  }
  $("h1").html("Find image pairs in "+a+" seconds");
})

pictureSrcList.push.apply(pictureSrcList, pictureSrcList);

function newBoard(numOfDivs){
  var properClass;
    if(numOfDivs>60){
      properClass="img-place-small";
    }else if(numOfDivs > 13){
      properClass = "img-place-medium";
    }else{
      properClass="img-place";
    }

    var htmlString="";
    $("#wrapper").html(function(){
        for (var i = 0; i < numOfDivs; i++) {
            htmlString+='<div onclick="flipCard(this)" class='+ properClass +' id="position'+i+'"><img class="cards" src=""> <img class="closedCards" src="http://glamorouslymommy.com/wp-content/uploads/2012/09/small-background.jpg"/> </div>';
        }
        return htmlString;
    });    

    $("."+ properClass).each(function(){
      var index= Math.floor(Math.random() * pictureSrcList.length);
      var randomSrc = pictureSrcList[index];
      pictureSrcList.splice(index, 1); //deleting the chosen src
      $(this).children(".cards").attr("src", randomSrc);
    });

}
var guessedPositions=0;
var openedSrcs=[];
var openedPositionsId=[];
var username;
function start(){
  username = $("#playerName").val();
  if(getCookie("time")==""){
    setCookie("time", "60");
  }
  var duration = parseInt(getCookie("time"));  
  timer(duration);
  newBoard(pictureSrcList.length);
  $("button").css("display", "none");
  $("h1").css("display", "none");
  $(".startBack").addClass("animateBack");
  $("input").css("display","none");
}


function flipCard(position){
  if(openedSrcs.length < 2){

    $(position).children(".closedCards").addClass("openBackAnimation");
    $(position).addClass("openCardAnimation");

    if(openedSrcs.length == 0){ //if no position is clicked

      openedSrcs.push($(position).children(".cards").attr("src"));
      openedPositionsId.push(position.id);

    }else if(openedSrcs.length == 1){ //if one is already clicked

      openedSrcs.push($(position).children(".cards").attr("src"));
      openedPositionsId.push(position.id);

      if(openedPositionsId[0]== openedPositionsId[1]){ //check if they are the same img
        $("#"+openedPositionsId[0]).removeClass("openCardAnimation");
        $("#"+openedPositionsId[0]).children(".closedCards").removeClass("openBackAnimation");
        //clearing memory of clicks
        openedSrcs=[];
        openedPositionsId=[];

      }else if(openedSrcs[0]==openedSrcs[1]){ //check if are the same img

          guessedPositions+=2;
          $("#"+openedPositionsId[0]).attr("onclick", "").unbind("click");//TO:DO
          $("#"+openedPositionsId[1]).attr("onclick", "").unbind('click');


          $("#"+openedPositionsId[0]).addClass("guessedCardAnimation");
          $("#"+openedPositionsId[1]).addClass("guessedCardAnimation");

          //clearing memory of clicks
          openedSrcs=[];
          openedPositionsId=[];

          if(guessedPositions == $(".img-place").length){ //checking if all divs open
            setTimeout(function(){
              alert("You won "+ username + "!! Next level...");
              if(getCookie("time")=="60"){
                setCookie("time", "45");
              }else if(getCookie("time")=="45"){
                setCookie("time", "30");
              }

              location.reload();
            } , 1000);

          }
      }else{
          function flipCardBack(){
            $("#"+openedPositionsId[0]).removeClass("openCardAnimation");
            $("#"+openedPositionsId[1]).removeClass("openCardAnimation");
            $("#"+openedPositionsId[0]).children(".closedCards").removeClass("openBackAnimation");
            $("#"+openedPositionsId[1]).children(".closedCards").removeClass("openBackAnimation");
            //clearing memory of clicks
          openedSrcs=[];
          openedPositionsId=[];
          }
          setTimeout(flipCardBack, 1000);
      }
    }
  }
}

$(document).ready(function(){
  
});

function timer(duration){
  var isGameOver = false;
  var looper = setInterval(function(){
   
    var minutes = parseInt(duration/60 , 10);
    var seconds = parseInt(duration%60 , 10);

    minutes = minutes <10 ? "0" + minutes : minutes;
    seconds = seconds <10 ? "0"+ seconds : seconds;
    $("#timer").text(minutes +":"+  seconds);
    duration--;

    if(duration<0 && !isGameOver){
      alert("Game over");
      isGameOver=true;
      duration=0;
      clearInterval(looper);
      location.reload();//TO-do
    }
  }, 1000);
}

function setCookie(cname, cvalue){
  document.cookie = cname+ "=" + cvalue;
}

function getCookie(cname){
  var name = cname + "=";
  var splitted = (document.cookie).split(";");

  for(var i =0; i<splitted.length; i++){
    var c = splitted[i];
    if(c.indexOf(name)==0){
      return c.substring(name.length, c.length);
    }
    return "";
  }
}
