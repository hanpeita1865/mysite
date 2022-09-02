//テキストファイルを読み込む
window.addEventListener('DOMContentLoaded', () => {
    fetch('text/test.txt') // (1) リクエスト送信
        .then(response => response.text()) // (2) レスポンスデータを取得
        .then(data => { // (3)レスポンスデータを処理

            const file_area = document.getElementById('file_area');
            file_area.innerHTML = data.replace(/\n/g, "<br>");
        });
});