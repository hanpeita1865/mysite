//動画ファイルを読み込む
window.addEventListener('DOMContentLoaded', function () {

    fetch('movie/mizuki.mp4') // (1) リクエスト送信
        .then(response => response.blob()) // (2) レスポンスデータを取得
        .then(data => { // (3)レスポンスデータを処理

            const file_area = document.getElementById('file_area');
            const video_element = document.createElement('video');

            video_element.src = URL.createObjectURL(data);
            video_element.controls = true;
            file_area.appendChild(video_element);

        });
});