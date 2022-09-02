//JSONファイルを読み込む
window.addEventListener('DOMContentLoaded', function () {

    fetch('text/test.json') // (1) リクエスト送信
        .then(response => response.json()) // (2) レスポンスデータを取得
        .then(data => { // (3)レスポンスデータを処理

            const file_area = document.getElementById('file_area');
            const ul_element = document.createElement('ul');

            for (var d of data) {

                const li_element = document.createElement('li');
                li_element.textContent = d.title + " (リリース日：" + d.release_date + ")";

                ul_element.appendChild(li_element);
            }

            file_area.appendChild(ul_element);

        });
});