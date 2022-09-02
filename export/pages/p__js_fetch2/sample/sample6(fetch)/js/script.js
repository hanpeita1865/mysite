//音声ファイルを読み込む
window.addEventListener('DOMContentLoaded', function () {

    fetch('audio/sawano.mp3') // (1) リクエスト送信
        .then(response => response.blob()) // (2) レスポンスデータを取得
        .then(data => { // (3)レスポンスデータを処理

            const file_area = document.getElementById('file_area');
            const audio_element = document.createElement('audio');

            audio_element.src = URL.createObjectURL(data);
            audio_element.controls = true;
            file_area.appendChild(audio_element);

        });
});