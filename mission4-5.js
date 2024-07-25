function omikujishow(){
    var omikuji = ["大吉", "中吉", "小吉"];
    var number1 = Math.random();
    var number2 = number1 * 3;
    var number = Math.floor(number2);
    var message = omikuji[number];

    var object = document.getElementById("omikuji");
    object.innerText = message;
    };
function luckyitemshow(){
    var item = ["おにぎり", "リップクリーム", "日傘", "充電器"];
    var number3 = Math.random();
    var number4 = number3 * 4;
    var number = Math.floor(number4);
    var message = item[number];
    var object = document.getElementById("luckyitem");
    object.innerText = message;
}