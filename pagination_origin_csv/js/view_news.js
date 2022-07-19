// トップのお知らせ表示の制御
// /files/news/news.csvから引っ張ってくる

function view_news_list(fillter) {

    // var dd = 7;  //New の掲載日数
        var strId = "#csv"; //idの属性値
    
        $.ajax({
            url: "files/news/news.csv",
            cache: false,
            success: function (csvtext) {
    
    // CSVファイルを配列にセット
                var csv = $.csv()(csvtext);
    
    // お知らせを抜き出し
                csv = csv.slice(1); //2行目以降
                var nymd = csv[0][0];
    
    //  コンテンツ追加
    //	this[0] = 更新日
    //	this[1] = 発行
    //	this[2] = カテゴリ
    //	this[3] = カテゴリURL
    //	this[4] = 記事
    //	this[5] = 記事URL
    //	this[6] = 鍵マーク
                        var buf = "";
                $(csv).each(function () {
                    if (this[0] != "") {
                        var ymd = this[0];
                        var arrayYmd = ymd.split(".");
                        var y = String(Number(arrayYmd[0]));
                        var m = String(Number(arrayYmd[1]));
                        var d = String(Number(arrayYmd[2]));
                        var day = new Date(y, m - 1, d);
                        var week = ["日", "月", "火", "水", "木", "金", "土"];
                        var w = week[day.getDay()];
    
                        if (fillter != 'すべて' && fillter != this[1]) {
                          return true;
                        }
    
                        buf += '<li>';
                        buf += '<div class="news_date">';
                        buf += '<span>' + m + "月" + d + "日 " + w + '</span>';
                        buf += '</div>';
                        buf += '<div class="news_logo">';
                        buf += '<span';
                        switch (this[1]) {
                            case '企画':	buf += ' class="top__box--plan">' + this[1];	break;
                            case 'インフラ':	buf += ' class="top__box--infrastructure">' + this[1];	break;
                            case 'MCS':	buf += ' class="top__box--mcs">' + this[1];	break;
                            case 'キャリア':	buf += ' class="top__box--mcs">' + this[1];	break;
                            case 'ブログ':	buf += ' class="top__box--blog">' + this[1];	break;
                            case '営業':	buf += ' class="top__box--sales">' + this[1];	break;
                            case 'イベント':	buf += ' class="top__box--events">' + this[1];	break;
                            case 'イノベ':	buf += ' class="top__box--innovative">' + this[1];	break;
                            case 'サビマネ':	buf += ' class="top__box--SM">' + this[1];	break;
                            case '情報':	buf += ' class="csv__box--info">' + this[1];	break;
                            case '周知':	buf += ' class="csv__box--know">' + this[1];	break;
                            case 'NI 統括部':	buf += ' class="csv__box--NI">' + this[1];	break;
                            case 'キャリア規制':	buf += ' class="top__box--mcs">ｷｬﾘｱ規制';	break;
                            case 'キャリア周知':	buf += ' class="top__box--mcs">ｷｬﾘｱ周知';	break;
                            default:	buf += ' class="top__box--etc">' + this[1];	break;
                        }
                        buf += '</span>';
                        buf += '</div>';
                        var bit = 0;
                        if (this[6] == 1) {
                            bit = bit + 1;
                        }
    //					if (this[4] == 'ラベル／表示件名') {
                        if (this[4] == 'ラベル／表示件名') {
                            bit = bit + 4;
                        } else if (this[0] == nymd) {
                            bit = bit + 2;
                        }
                        switch (bit) {
                            case 0:	buf += '<div class="news_body">';	break;
                            case 1:	buf += '<div class="news_body-type1">';	break;
                            case 2:	buf += '<div class="news_body-type2">';	break;
                            case 3:	buf += '<div class="news_body-type3">';	break;
                            case 4:	buf += '<div class="news_body-type4">';	break;
                            case 5:	buf += '<div class="news_body-type5">';	break;
                            default:	buf += '<div class="news_body">';	break;
                        }
                        buf += '<div class="textoverflow">';
                        buf += '<span>';
                        buf += '<a href="' + this[5] + '" title="' + this[4] + '">' + this[4];
                        buf += '</a>';
                        buf += '</span>';
                        buf += '</div>';
                        buf += '</div>';
                        buf += '<div class="news_body-newimg">';
                        if (bit == 1 || bit == 3 || bit == 5) {
                            buf += '<div class="markKey"><span>&#x1f512;</span></div>';
                        }
                        if (bit == 4 || bit == 5) {
                            buf += '<div class="markUpdate">Update</div>';
                        } else if (bit == 2 || bit == 3) {
                            buf += '<div class="markNew">New</div>';
                        }
                        buf += '</div>';
    
                        buf += '</div>';
                        buf += '</div>';
                        buf += '</li>\n';
                    }
                });
                        $(strId).append(buf);

                        //pagenation_start();//ページネーション実行
    
                /*$('.list').pagination({
                    element: 'li',
                    prevText: '＜',
                    nextText: '＞',
                    firstText: '≪',
                    lastText: '≫',
                    ellipsisText: '…',
                    viewNum: 10,
                    pagerNum: 3,
                    ellipsis: true,
                    linkInvalid: true,
                    goTop: false,
                    firstLastNav: true,
                    prevNextNav: true
                });
    
                if($('.pager').html() == ''){
                  $('.pager').html('<span class="first">≪</span><span class="prev">＜</span><span class="current">1</span><span class="next">＞</span><span class="last">≫</span>');
                }*/
            }
        });
    
    }
    