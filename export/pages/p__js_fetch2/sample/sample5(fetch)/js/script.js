//画像ファイルを読み込む
window.addEventListener('DOMContentLoaded', function () {

    fetch('image/bear.png') // (1) リクエスト送信
        .then(response => response.blob()) // (2) レスポンスデータを取得
        .then(data => { // (3)レスポンスデータを処理

            const file_area = document.getElementById('file_area');
            const img_element = document.createElement('img');

            img_element.src = URL.createObjectURL(data);
            file_area.appendChild(img_element);

        });
});