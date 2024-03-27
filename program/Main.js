'use strict';

function onClick(e) {
	let x = e.offsetX;
 	let y = e.offsetY;

	//画面更新-1->0
 	if (screen == -1 && name.value.length>0) {
 		name_input();
 	}

	//画面0->1 ... 4->5 ... 11->12 ->20
 	if (0 <= x && x < imgsize*3 && 0 <= y && y < imgsize*3 && screen%20 >=1 && screen%20 <= 12) {

 		context.clearRect(0, 0, 1500, 1000);
        let x = e.offsetX;
        let y = e.offsetY;
        let number = Math.floor(y / imgsize) * 3 + Math.floor(x / imgsize);

        answer.push(number);

		var now_time = new Date();
        times.push(now_time.getTime()-n_time);
        n_time = now_time;


        if (screen%20 <= 11) {

			let hack = new Hack();
			hack.draw();
			screen++;
        }
        else{

        	screen++;
			let pass = Math.floor(screen / 20);

     		//screen%20==13
			window.scrollTo(0,0);
			context.clearRect(0, 0, 1500, 1000);

			document.getElementById('next').style.visibility = 'visible';

 		
 			let correct = all_data[pass][1];
 			let point = 0;
 			let pointA = 0;
 			let pointB = 0;
 			let pointC = 0;
 			for (let i=0; i<12; i++) {
 				if (answer[12*pass+i] == correct[i]) {
 					point++;
 				}
 			}

 			for (let i=0; i<4; i++) {
 				if (answer[12*pass+i] == correct[i]) {
 					pointA++;
 				}
 			}

 			for (let i=4; i<8; i++) {
 				if (answer[12*pass+i] == correct[i]) {
 					pointB++;
 				}
 			}			

 			for (let i=8; i<12; i++) {
 				if (answer[12*pass+i] == correct[i]) {
 					pointC++;
 				}
 			}


 			screen+=7;

 			context.clearRect(0, 0, 1500, 1000);
			context.font = "24px sans-serif";
			let sentences = ["正解数 "+point+"/12"]
			for (let i = 0; i < sentences.length; i++) {
				context.fillText(sentences[i], 0, 32*i+32);
				}
			points.push(point);
			pointsA.push(pointA);
			pointsB.push(pointB);
			pointsC.push(pointC);

 		}

        return ;
        
 	}

}

//画面更新
function next() {

	//画面更新0->1
 	if (screen%20 == 0 & screen<200) {
 		let pass = Math.floor(screen / 20);
 		alert("顔画像の条件は「"+all_data[pass][0]+"」です。最も条件を満たす画像を選択してください。")
 		context.clearRect(0, 0, 1500, 1000);
 		document.getElementById('next').style.visibility = 'hidden';

		var now_time = new Date();
        times.push(String(now_time.getTime()-n_time));
        n_time = now_time;

		let hack = new Hack();
		hack.draw();

        screen++;

		return;
 	}

 	if (screen == 200) {

		console.log("finished");

 		context.clearRect(0, 0, 1500, 1000);

	    var now_time = new Date();
 		all_time=now_time.getTime()-all_start_time;

	    //送信データ
	    var dt = [name.value,age.value, gender.value, points, pointsA, pointsB, pointsC, answer, rand, times, all_time];
	    var json_data = JSON.stringify(dt);

		fetch("https://script.google.com/macros/s/AKfycbybe79F3JXpto1VFPohTQfO2uqX07_sk_FxHu5IYekWSeZLvJLmjatJ9PFm-6fxLE5O/exec" , {
			method: "POST",
			body: json_data,
			mode: 'no-cors',
			headers: {"Content-Type": "application/json"}
		}).then((dat) => {
	    	console.log(dat);
	  	});;

		context.font = "24px sans-serif";
		let sentences = ["これで実験は終了です。お疲れ様でした。"];

			for (let i = 0; i < sentences.length; i++) {
				context.fillText(sentences[i], 0, 32*i+32*4);
				}

		document.getElementById('next').style.visibility = 'hidden';		

 	}

}
	

// 画面番号
let screen = -1;

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
canvas.addEventListener('click', onClick, false);
let imgsize = 128;

//認証回答時間
let times = ["N"];


//実験開始時間
var now_time = new Date();
let n_time = now_time;
let all_start_time = now_time.getTime();;
//実験総時間
let all_time;

let answer = [];

//実験用データ
let data =[["歯が見えている人", [0, 2, 7, 5, 4, 1, 4, 1, 4, 4, 3, 6]],

	["前髪で額が隠れている人", [8, 7, 8, 1, 0, 5, 3, 6, 5, 4, 1, 7]],

	["背景が緑", [0, 2, 6, 2, 5, 6, 6, 2, 1, 0, 3, 1]],

	["耳に髪がかかっていない(短髪の)人", [1, 6, 4, 6, 2, 6, 8, 6, 8, 0, 8, 5]],

	["頭に被り物をしている人", [7, 3, 8, 4, 4, 2, 1, 7, 6, 3, 5, 7]],


	//diverse-dummy
	["歯が見えている人", [4, 3, 1, 2, 0, 4, 7, 2, 6, 5, 4, 6]],

	["前髪で額が隠れている人", [7, 2, 2, 5, 4, 1, 0, 7, 1, 7, 6, 3]],

	["背景が緑", [1, 0, 8, 1, 1, 6, 1, 3, 0, 6, 5, 8]],

	["耳に髪がかかっていない(短髪の)人", [3, 1, 6, 1, 5, 0, 3, 4, 3, 1, 2, 6]],

	["頭に被り物をしている人", [1, 0, 2, 3, 2, 2, 5, 4, 4, 8, 6, 1]]

	];

//random順番
let rand = [0,1,2,3,4,5,6,7,8,9];

//randomの逆対応
let rev_rand = [-1,-1,-1,-1,-1];

for(let i = rand.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = rand[i];
    rand[i] = rand[j];
    rand[j] = tmp;
}

for (let i=0; i<rand.length; i++) {
	rev_rand[rand[i]] = i;
}

let all_data = [];

for (let i=0; i<rand.length; i++) {
	all_data.push(data[rand[i]]);
}

//認証時間
let auth_time = [];


//初期画面
context.font = "24px sans-serif";
context.fillText("あなたの情報を入れ画面をクリックしてください。", 0, 24*2);

document.getElementById('next').style.visibility = 'hidden';
document.getElementById('next').style.display = 'none';

//非正規認証者の属性
let name = document.getElementById("name");
let gender = document.getElementById("gender");
let age = document.getElementById("age");



//point
let points = [];
let pointsA = [];
let pointsB = [];
let pointsC = [];

//名前入力
function name_input() {

	//画面更新-1->0
 	if (screen == -1 && name.value.length>0) {

 		if (name.value == "") {
 			alert("名前を入力してください");
 			return;
 		}
 		if (age.value == "") {
 			alert("年齢を入力してください");
 			return;
 		}
 		if (gender.value == 0) {
 			alert("性別を選択してください");
 			return;
 		}

 		if (confirm("あなたの情報を全て入力しましたか？")==false) {
 			return;
 		}

		document.getElementById('name').style.visibility = 'hidden';
		document.getElementById('gender').style.visibility = 'hidden';
		document.getElementById('age').style.visibility = 'hidden';
		document.getElementById('next').style.display = 'inline';

        var now_time = new Date();
 		all_start_time=now_time.getTime();

		window.scrollTo(0,0);
		context.clearRect(0, 0, 1500, 1000);
		context.font = "24px sans-serif";
		let sentences = [
			"これから画面に9枚の顔画像が表示されます。",
			"同時に、画面には顔画像に関する条件が表示されます。",
			"表示されている条件を最も満たす画像を1枚選択してください。",
			"12回の選択を1セットとして、10セットの実験を行います。",
			"条件はセットごとに異なりますが、5種類の条件が2回ずつ出現します。",
			"準備が出来たら「次に進む」をクリックしてください。"]

		for (let i = 0; i < sentences.length; i++) {
			context.fillText(sentences[i], 0, 32*i+32);
			}

		document.getElementById('next').style.visibility = 'visible';
 		screen++;
 	}

}

window.onbeforeunload = function(e) {
    e.returnValue = "ページを離れようとしています。よろしいですか？";
}