//-------------------------------------//
// 本日の予定
//------------------------------------//

async function weeklyJson() {
	const todaySc = document.getElementById("today-schedule");
	const dtoday = getdateName();//当日の日付、またはパラメータ?today=yyyymmddで各日付の表示が確認可能
	const msgNodata = "本日のお知らせはありません";
	const res = await fetch('/files/weekly/event-calendar.json', { cache: "no-store" });
	const lists = await res.json();
	const targetIcon = '<i class="fa-solid fa-arrow-up-right-from-square"></i>';

	let shtml = "";//挿入するHTMLまとめ
	let sday = "";//開始日
	let stime = "";//開始時間
	let title = "";//タイトル
	let url = "";//リンクパス
	let time = '';//開始時間HTML用

	lists.forEach(function (list) {

		sday = list.start;
		title = list.title;
		url = list.url;
		time = '';
		stime = '';


		//開始日の前10桁取得
		sday = sday.substring(0, 10);

		if(list.allDay==false){
			//開始時間がある
			stime = list.start.substring(11, 16);
			time = '<span class="time">'+ stime + '</span>';
		}

		//本日が開始日と等しい
		if (sday == dtoday) {
			if (url == null) {
				//URL設定なし
				shtml += "<li>" + time + title + "</li>";
			} else {
				//URL設定あり
				shtml += "<li><a href=\"" + url + "\">" + time + title + "</a></li>";
			}
		}
	});

	//本日の予定ボックスにHTML挿入
	if (shtml == "") {
		todaySc.innerHTML = msgNodata;
	} else {
		todaySc.innerHTML = '<ul>'+shtml+'</ul>';
	}
};

const formatDate = dt => {
	//システム日付をフォーマット取得
	const y = dt.getFullYear();
	const m = ('00' + (dt.getMonth() + 1)).slice(-2);
	const d = ('00' + dt.getDate()).slice(-2);
	return (y + '-' + m + '-' + d);
}


//本日の日付設定（日付のパラメータをつけるとテストができる 例)?today=20220710）
function getdateName() {
	let param = [];
	let url = location.href;
	let ret;

	if (url.indexOf("?") != -1) {
		// 確認用：～?today=表示したい企画の年月日(yyyymmdd)
		const url1 = new URL(url);
		const params = new URLSearchParams(url1.search);

		if(params.get('today') !== null){
			//パラメータにtodayがある場合
			let paraDate = params.get('today');
			ret = dateJoin(paraDate);
		}else{
			// 通常時：現在の日付(yyyy-mm-dd)
			ret = formatDate(new Date());	
		}

	} else {
		// 通常時：現在の日付(yyyy-mm-dd)
		ret = formatDate(new Date());
	}

	return ret;
}


//パラメータ日付ハイフン設置
function dateJoin(date) {
	let formattedDate = [
	  date.substring(0, 4),//年
	  date.substring(4, 6),//月
	  date.substring(6, 8),//日
	].join('-');
	return formattedDate;
}

window.addEventListener('load', weeklyJson)

