//-------------------------------------//
// 本日の予定
//------------------------------------//

async function weeklyJson() {
	const today = document.getElementById("today-schedule");
	const dtoday = formatDate(new Date());
	const msgNodata = "本日のお知らせはありません";
	const res = await fetch('/files/weekly/event-calendar.json', { cache: "no-store" });
	const lists = await res.json();
	const targetIcon = '<i class="fa-solid fa-arrow-up-right-from-square"></i>';


	let shtml = "";
	let ptflg = false;
	let sameflg = false;
	//let endtflg = false;
	let sday = "";
	let eday = "";
	let stime = "";
	let etime = "";
	let title = "";
	let url = "";
	


	lists.forEach(function (list) {

		ptflg = false;
		sameflg = false;
		//endtflg = false;
		sday = list.start;
		eday = list.end;
		title = list.title;
		url = list.url;
		time = '';
		etime = '';

		//開始日と終了日の前10桁取得
		if (sday != null && sday != "") { 
			sday = sday.substring(0, 10); 
			stime = list.start.substring(11, 16); 
		}
		if (eday != null && eday != "") { 
			eday = eday.substring(0, 10);
			
			//終了時間
			if(list.end == null){
				//etime = list.end.substring(11, 16); 
				//endtflg = false;
			}else if(list.end.length > 10){
				//終了時間がある
				etime = list.end.substring(11, 16);
				//endtflg = true;
			}
		}

		if (sday == dtoday || eday == dtoday) {
			//本日が開始日もしくは終了日と等しい
			ptflg = true;
			if(sday == eday){
				//開始日と終了日が同じ
				sameflg = true;	
			}
			
		} else if (sday == '' || eday == '') {
			//開始日と終了日のどちらかか空白
			ptflg = false;
		} else if (sday < dtoday && eday > dtoday) {
			//本日が開始日と終了日の間
			ptflg = true;
		} else if (sday < dtoday && eday == null) {
			//本日(2022/1/2)が開始日(2022/1/1)より大きく終了日がnull
			ptflg = false;
		} else if (sday == null && eday > dtoday) {
			//開始日がnullで本日(2022/1/1)が終了日(2022/1/2)より小さい
			ptflg = false;
		}

		if (ptflg == true) {

			if(sameflg == true && stime && etime){
				//本日の開始日と終了日が同日かつ開始時間と終了時間がある
				time = '<span class="time">'+stime + '～' + etime + '</span>';
				//console.log(time);
				//console.log(endtflg);
			}else if(sameflg == true && stime && !etime){
				//本日の開始日と終了日が同日かつ開始時間のみある
				time = '<span class="time">'+stime +'</span>';
				console.log(time);
			}else if(sameflg == false && stime && etime ){
				//日をまたいで、かつ開始時間と終了時間がある
				time = '<span class="time">'+ sday + stime + '～' + eday + etime + '</span>';
				console.log(time);
			}
			
			if (url == null || url == "") {
				//URL設定なし
				shtml += "<p>" + title + "</p>";
			} else {
				//URL設定あり
				if (url.substring(0, 4) == 'http') {
					//URLがhttpで始まる場合別窓表示
					shtml += "<p><a href=\"" + url + "\" target=\"_blank\">" + title + time + targetIcon + "</a></p>";
				} else {
					shtml += "<p><a href=\"" + url + "\">" + title + time + "</a></p>";
				}
			}
		}
	});
	if (shtml == "") {
		today.innerHTML = msgNodata;
	} else {
		today.innerHTML = shtml;
	}
};

const formatDate = dt => {
	//システム日付をフォーマット取得
	const y = dt.getFullYear();
	const m = ('00' + (dt.getMonth() + 1)).slice(-2);
	const d = ('00' + dt.getDate()).slice(-2);
	return (y + '-' + m + '-' + d);
}

window.addEventListener('load', weeklyJson)

