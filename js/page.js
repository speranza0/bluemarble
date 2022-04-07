// 말판 css
$("span").parent().css("border", "2px solid black");
$("#pos1").parent().css("background-color", "blue");

// 위치 무작위 전역 변수
var squareNum = $("span").parent().length;

// 함정 위치 무작위 배치
var resetArray = [];
var resetCount = 2;

while (resetArray.length < resetCount) {
  var resetRandom = Math.floor(Math.random() * squareNum - 1) + 1;
  if (resetRandom > 1 && resetArray.indexOf(resetRandom) === -1) {
    resetArray.push(resetRandom);
  }
}
for (var i = 0; i < resetArray.length; i++) {
  $("span").parent().eq(resetArray[i]).addClass("reset");
  $(".reset").css("background-color", "red");
}

// 보너스 위치 무작위 배치
var bonusArray = [];
var bonusCount = 1;

while (bonusArray.length < bonusCount) {
  var bonusRandom = Math.floor(Math.random() * squareNum - 1) + 1;
  if (bonusRandom > 1 && bonusArray.indexOf(bonusRandom) === -1) {
    bonusArray.push(bonusRandom);
  }
}
for (var i = 0; i < bonusArray.length; i++) {
  $("span").parent().eq(bonusArray[i]).addClass("bonus");
  $(".bonus").css("background-color", "green");
}

// 변수 선언
var nowNum = 1;
var roundNum = 0;

// 이벤트 동작
$(".shuffle").on("click", function () {
  var res = Math.floor(Math.random() * 6) + 1; // 주사위 1~6 굴리기
  nowNum = nowNum + res;

  // 주사위 이미지 전환
  var count = 0;
  var image = $("#dicepic");
  var frames = ["d1.png", "d2.png", "d3.png", "d4.png", "d5.png", "d6.png"];

  $(image).addClass("dicepic"); // 주사위 이미지 회전 시작

  var interval = setInterval(function () {
    count = count + 1;
    $(image).attr("src", "/images/" + frames[count % frames.length]);
  }, 100);

  //주사위 눈 표시 및 말 이동 이벤트
  setTimeout(function () {
    clearInterval(interval); // 주사위 이미지 전환 멈춤
    $(image).removeClass("dicepic"); // 주사위 회전 제거

    // 바퀴 수 체크
    if (nowNum >= 25) {
      roundNum = roundNum + 1;
      $("#round").html("현재 " + roundNum + "바퀴");
      nowNum = nowNum - 24;
    }

    $("#dicepic").attr("src", "/images/d" + res + ".png"); // 주사위 표시
    $("#announce").html("주사위만큼 " + "말을 " + res + "칸 이동합니다.");
    $("#alert").html("");
    for (var i = 0; i < 25; i++) {
      $("#pos" + i).html("");
    }
    $("#pos" + nowNum).html("<img id='horse' src='/images/knight.png'>");

    // 승리 선언
    if (roundNum === 3) {
      $("#round").html("");
      $("#announce").html("");
      $("#alert").html("승리하셨습니다.");
    }
  }, 1500);

  // 함정에 걸렸을 때 이동 이벤트
  if (
    $("#pos" + nowNum)
      .parent()
      .hasClass("reset") === true
  ) {
    setTimeout(function () {
      $("#alert").html("함정입니다. 시작 위치로 돌아갑니다.");
      nowNum = 1;
      for (var i = 0; i < 25; i++) {
        $("#pos" + i).html("");
      }
      $("#pos" + nowNum).html("<img id='horse' src='/images/knight.png'>");
    }, 2500);
  }

  // 보너스 위치에 걸렸을 때 이동 이벤트
  if (
    $("#pos" + nowNum)
      .parent()
      .hasClass("bonus") === true
  ) {
    setTimeout(function () {
      var bonusNum = Math.floor(Math.random() * 3) + 1;
      $("#alert").html("보너스입니다. 추가로 " + bonusNum + "칸 이동합니다.");
      nowNum = nowNum + bonusNum;
      for (var i = 0; i < 25; i++) {
        $("#pos" + i).html("");
      }
      $("#pos" + nowNum).html("<img id='horse' src='/images/knight.png'>");
    }, 2500);
  }
});
