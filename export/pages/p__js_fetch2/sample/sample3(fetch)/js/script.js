//XMLファイルを読み込む
window.addEventListener('DOMContentLoaded', function () {

    fetch('text/test.xml') // (1) リクエスト送信
        .then(response => response.text()) // (2) レスポンスデータを取得
        .then(data => { // (3)レスポンスデータを処理

            const parser = new DOMParser();
            const sitemap = parser.parseFromString(data, "application/xml");

            const urls = sitemap.querySelectorAll('url');
            const ul_element = document.createElement('ul');

            for (var url_data of urls) {

                const li_element = document.createElement('li');
                const url = url_data.querySelector("loc");
                const last_update = url_data.querySelector("lastmod");

                li_element.innerHTML = "URL：" + url.textContent + "<br>最終更新日：" + last_update.textContent;
                ul_element.appendChild(li_element);
            }

            file_area.appendChild(ul_element);

        });
});