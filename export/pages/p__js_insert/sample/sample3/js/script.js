let myfunc = function () {
    let id = document.getElementById("edit_area");

    id.insertAdjacentHTML("afterbegin", "<p>afterbeginの位置！</p>");
    id.insertAdjacentHTML("beforebegin", "<p>beforebeginの位置！</p>");
    id.insertAdjacentHTML("afterend", "<p>afterendの位置！</p>");
    id.insertAdjacentHTML("beforeend", "<p>beforeendの位置！</p>");
}