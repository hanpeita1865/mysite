let simplemde = new SimpleMDE({
    element: document.getElementById("report-markdown"),
    forceSync: true,
    spellChecker: false,
    renderingConfig: {
        singleLineBreaks: false,
        codeSyntaxHighlighting: true,
    },
    insertTexts: {
        horizontalRule: ["", "\n\n-----\n\n"],
        //image: ["![](http://", ")"],
        //link: ["[", "](http://)"],
        table: ["", "\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],
    },
    toolbar: [
        'bold',
        {
            name: 'font-bold-red',
            className: 'fa fa-font fa-bold-red',
            title: '太字の赤文字',
        },
        {
            name: 'font-bold-blue',
            className: 'fa fa-font fa-bold-blue',
            title: '太字の青文字',
        },
        {
            name: 'font-bold-green',
            className: 'fa fa-font fa-bold-green',
            title: '太字の緑文字',
        },
        {
            name: 'font-bold-purple',
            className: 'fa fa-font fa-bold-purple',
            title: '太字の紫文字',
        },
        'italic',
        'heading',
        'quote',
        'unordered-list',
        'ordered-list',
        '|',
        'link',
        'image',
        'table',
        {
            name: 'tb-side',
            className: 'fa fa-tbside',
            title: '横見出しテーブル',
        },
        {
            name: 'font-red',
            className: 'fa fa-font fa-red',
            title: '赤文字',
        },
        {
            name: 'font-blue',
            className: 'fa fa-font fa-blue',
            title: '青文字',
        },
        {
            name: 'font-green',
            className: 'fa fa-font fa-green',
            title: '緑文字',
        },
        {
            name: 'fa-strikethrough',
            className: 'fa fa-strikethrough',
            title: '取り消し線',
        },
        /*{
            name: 'div',
            className: 'fa fa-div',
            title: 'div設置',
        },*/
        {
            name: 'div-mark"',
            className: 'fa fa-div-mark',
            title: 'div markdown="1"設置',
        },
        {
            name: 'tbCap',
            className: 'fa fa-tbCap',
            title: 'テーブルキャプション',
        },
        {
            name: 'details',
            className: 'fa fa-details',
            title: '<details><summary>～</summary></details>',
        },
        '|',
        {
            name: 'tmp',
            className: 'fa fa-tmp',
            title: '書式用タグ',
        },
        '|',
        {
            name: 'tmpList',
            className: 'fa fa-tmpList',
            title: 'リスト用タグ',
        },
        '|',
        {
            name: 'cmd',
            className: 'fa fa-cmd',
            title: 'コマンド用タグ',
        },
        '|',
        {
            name: 'exp',
            className: 'fa fa-exp',
            title: '例用タグ',
        },
        {
            name: 'lang',
            className: 'fa fa-lang',
            title: '言語用タグ',
        },
        '|',
        {
            name: 'emoji',
            className: 'fa fa-emoji',
            title: '絵文字参照サイトを開きます',
        },
        '|',
        {
            name: 'today',
            className: 'fa fa-clock-o',
            title: '今日の日付',
        },

        '|',
        'fullscreen',
    ]
});

//拡大
$(".fa-arrows-alt").click(function () {
    console.log('拡大');
    $('a.fa.fa-preview').toggleClass('d-inline-block');
});

$('.fa-preview').on('click', function () {
    console.log('実行');
    $('#btn-markpreview').trigger('click');
});


//マークダウンテキストエリアに![](img数字)の文字を挿入
$(".btn-markimg").click(function () {
    var valText = $(this).val();
    var line = simplemde.codemirror.getCursor().line;
    var ch = simplemde.codemirror.getCursor().ch;

    //文字列の挿入
    var text = '![](' + valText + ')';
    simplemde.codemirror.replaceRange(text, { line: line, ch: ch }, { line: line, ch: ch });

    $(this).hide();
});

//マークダウンにファイルリンクを挿入
/*$('ul').on('click', '.fileInsert', function () {
    //$('.fileInsert').on('click', function(){
    var valText = $(this).siblings('.filename').text();
    var line = simplemde.codemirror.getCursor().line;
    var ch = simplemde.codemirror.getCursor().ch;

    //文字列の挿入
    var text = '<a href="' + valText + '" target="_blank">' + valText + '</a>';
    simplemde.codemirror.replaceRange(text, { line: line, ch: ch }, { line: line, ch: ch });
    alert('「' + valText + '」 ファイルリンクを記入しました');
    return false;

});*/

/*
//文字の色　赤に変更
$('.fa-font.fa-red').on('click', function () {
    console.log('赤');
    //選択した文字列の取得
    var selected = simplemde.codemirror.getSelection();
    //文字列の置き換え
    let text = '<span class="red">' + selected + '</span>';
    simplemde.codemirror.replaceSelection(text);
});

//文字の色　青に変更
$('.fa-font.fa-blue').on('click', function () {
    //選択した文字列の取得
    var selected = simplemde.codemirror.getSelection();
    //文字列の置き換え
    let text = '<span class="blue">' + selected + '</span>';
    simplemde.codemirror.replaceSelection(text);
});

//文字の色　緑に変更
$('.fa-font.fa-green').on('click', function () {
    //選択した文字列の取得
    var selected = simplemde.codemirror.getSelection();
    //文字列の置き換え
    let text = '<span class="green">' + selected + '</span>';
    simplemde.codemirror.replaceSelection(text);
});
*/

//divを設置
$('.fa-div').on('click', function () {
    //選択した文字列の取得
    var selected = simplemde.codemirror.getSelection();
    //文字列の置き換え
    var text = '<div class="" markdown="1">\n' + selected + '\n</div>';
    simplemde.codemirror.replaceSelection(text);
});

//モーダルを設置
$('.fa-modal').on('click', function () {
    //選択した文字列の取得
    var selected = simplemde.codemirror.getSelection();
    //文字列の置き換え
    var text = '[![](img～){.wd350}](img～){.modal-win}';
    //var text = '[![](img～)](img～){.modal-win .wd300}';

    simplemde.codemirror.replaceSelection(text);
});

//YouTube動画を埋め込み
$('.fa-youtube').on('click', function () {
    tubeInput();
});

//テキストエリアの記事を削除
$('.fa-clear').on('click', function () {
    if (window.confirm('テキストエリアの記事を全部削除しますが、よろしいですか？')) {
        simplemde.value("");
        return true;
    } else {
        return false;
    }
});


function tubeInput() {
    // 入力ダイアログを表示 
    tubeUrl = window.prompt("You TubeのURLを入力してください。", "");

    var regexp = new RegExp(/www\.youtube\.com/);
    var result = regexp.test(tubeUrl);

    if (result) {
        //文字列の挿入

        var tubeUrl = tubeUrl.replace('watch?v=', 'embed/');

        var text = '<div class="embed-responsive embed-responsive-16by9">\n' +
            '<iframe class="embed-responsive-item" src="' + tubeUrl + '" allowfullscreen></iframe>\n' +
            '</div>';

        simplemde.codemirror.replaceSelection(text);
    }
}


//拡大
$(".fa-arrows-alt").click(function () {
    $('a.fa.fa-preview').toggleClass('d-inline-block');
    $('#update').toggleClass('screen-full');
});

$('.fa-preview').on('click', function () {
    $('#btn-markpreview').trigger('click');
});


//マークダウンテキストエリアに![](img数字)の文字を挿入
$(".btn-markimg").click(function () {
    let valText = $(this).val();
    let line = simplemde.codemirror.getCursor().line;
    let ch = simplemde.codemirror.getCursor().ch;

    //文字列の挿入
    let text = '![](' + valText + ')';
    simplemde.codemirror.replaceRange(text, { line: line, ch: ch }, { line: line, ch: ch });

    $(this).hide();
});

//マークダウンにファイルリンクや画像コードを挿入
//$('.file-list .fileInsert').on('click', function(){
$('ul#waitingList').on('click', '.fileInsert', function () {
    let valText = $(this).siblings('.filename').text();
    let line = simplemde.codemirror.getCursor().line;
    let ch = simplemde.codemirror.getCursor().ch;

    if ($(this).parent('li').hasClass('photo-list')) {
        //画像の挿入
        let text = '![]' + '(upload/' + valText + ')';
        simplemde.codemirror.replaceRange(text, { line: line, ch: ch }, { line: line, ch: ch });
        alert('「' + valText + '」画像のコードを記入しました');
    } else {
        //文字列の挿入
        //let text = '<a href="'+valText+'" target="_blank">'+valText+'</a>';
        let text = '[' + valText + '](upload/' + valText + ')';
        simplemde.codemirror.replaceRange(text, { line: line, ch: ch }, { line: line, ch: ch });
        alert('「' + valText + '」 ファイルリンクを記入しました');
    }
    return false;
});

//太字の赤文字「****〇〇****」
$('.fa-font.fa-bold-red').on('click', function () {
    console.log('太字の赤');
    //選択した文字列の取得
    let selected = simplemde.codemirror.getSelection();
    //文字列の置き換え
    let text = '<span class="red bold">' + selected + '</span>';
    simplemde.codemirror.replaceSelection(text);
});

//太字の青文字
$('.fa-font.fa-bold-blue').on('click', function () {
    //選択した文字列の取得
    let selected = simplemde.codemirror.getSelection();
    //文字列の置き換え
    let text = '<span class="blue bold">' + selected + '</span>';
    simplemde.codemirror.replaceSelection(text);
});

//太字の緑文字
$('.fa-font.fa-bold-green').on('click', function () {
    //選択した文字列の取得
    let selected = simplemde.codemirror.getSelection();
    //文字列の置き換え
    let text = '<span class="green bold">' + selected + '</span>';
    simplemde.codemirror.replaceSelection(text);
});


//太字の緑文字
$('.fa-font.fa-bold-purple').on('click', function () {
    //選択した文字列の取得
    let selected = simplemde.codemirror.getSelection();
    //文字列の置き換え
    let text = '<span class="purple bold">' + selected + '</span>';
    simplemde.codemirror.replaceSelection(text);
});

//文字の色　赤に変更
$('.fa-font.fa-red').on('click', function () {
    //選択した文字列の取得
    let selected = simplemde.codemirror.getSelection();
    //文字列の置き換え
    let text = '<span class="red">' + selected + '</span>';
    simplemde.codemirror.replaceSelection(text);
});

//文字の色　青に変更
$('.fa-font.fa-blue').on('click', function () {
    //選択した文字列の取得
    let selected = simplemde.codemirror.getSelection();
    //文字列の置き換え
    let text = '<span class="blue">' + selected + '</span>';
    simplemde.codemirror.replaceSelection(text);
});

//文字の色　緑に変更
$('.fa-font.fa-green').on('click', function () {
    //選択した文字列の取得
    let selected = simplemde.codemirror.getSelection();
    //文字列の置き換え
    let text = '<span class="green">' + selected + '</span>';
    simplemde.codemirror.replaceSelection(text);
});

//取り消し線
$('.fa-strikethrough').on('click', function () {
    //選択した文字列の取得
    let selected = simplemde.codemirror.getSelection();
    //文字列の置き換え
    let text = '~~' + selected + '~~';
    simplemde.codemirror.replaceSelection(text);
});

//div設置
$('.fa-div').on('click', function () {
    //選択した文字列の取得
    let selected = simplemde.codemirror.getSelection();
    //文字列の置き換え
    let text = '<div class="">\n' + selected + '\n</div>';
    simplemde.codemirror.replaceSelection(text);
});


//div class="markdown"設置
$('.fa-div-mark').on('click', function () {
    //選択した文字列の取得
    let selected = simplemde.codemirror.getSelection();
    //文字列の置き換え
    let text = '<div markdown="1" class="">\n' + selected + '\n</div>';
    simplemde.codemirror.replaceSelection(text);
});

//書式用タグ設置
$('.fa-tmp').on('click', function () {
    //コード挿入
    let text = '<p class="tmp"><span>書式</span></p>';
    simplemde.codemirror.replaceSelection(text);
});

//リスト用タグ設置
$('.fa-tmpList').on('click', function () {
    //コード挿入
    let text = '<p class="tmp list"><span>リスト</span></p>';
    simplemde.codemirror.replaceSelection(text);
});

//コマンド用タグ設置
$('.fa-cmd').on('click', function () {
    //コード挿入
    let text = '<p class="tmp cmd"><span>コマンド</span></p>';
    simplemde.codemirror.replaceSelection(text);
});

//例タグ設置
$('.fa-exp').on('click', function () {
    //コード挿入
    let text = '<div class="exp">\n\t<p class="tmp"><span>例</span></p>\n</div>';
    simplemde.codemirror.replaceSelection(text);
});

//言語用タグ設置
$('.fa-lang').on('click', function () {
    //コード挿入
    let text = '<p class="lang"></p>';
    simplemde.codemirror.replaceSelection(text);
});

//絵文字参照ページを開く
$('.fa-emoji').on('click', function () {
    window.open("https://lets-emoji.com/emojilist/emojilist-1/");
});

//横見出しテーブル
$('.fa-tbside').on('click', function () {
    //コード挿入
    let text = '<table>\n\t<tbody>\n\t\t<tr>\n\t\t\t<th>Column 1</th>\n\t\t\t<td>Text</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<th>Column 2</th>\n\t\t\t<td>Text</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<th>Column 3</th>\n\t\t\t<td>Text</td>\n\t\t</tr>\n\t</tbody>\n</table>';
    simplemde.codemirror.replaceSelection(text);
});

//details
$('.fa-details').on('click', function () {
    //コード挿入
    let text = '<details><summary>タイトル</summary>\n\t表示内容\n</details>';
    simplemde.codemirror.replaceSelection(text);
});



//今日の日付
$('.fa-clock-o').on('click', function () {
    //日付を記入

    //現日時を取得
    let now = new Date();

    //現日時から年月日取得
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    // 0～11で月を取得するので、1を足します。
    let day = now.getDate();
    //時間を取得
    let hour = now.getHours();
    //let min = now.getMinutes();
    let min = ("0" + now.getMinutes()).slice(-2) //分は2桁表示

    //現日時から曜日取得
    let week = now.getDay();
    //日曜日を0とし、0～6で曜日を取得するので、表示には変換が必要です。
    let convert = new Array("日", "月", "火", "水", "木", "金", "土");
    let today = +month + '/' + day + '（' + convert[week] + '）' + hour + ':' + min;

    simplemde.codemirror.replaceSelection(today);
});







