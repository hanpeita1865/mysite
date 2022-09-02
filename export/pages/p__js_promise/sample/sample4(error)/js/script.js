function getNumber(num) {
    return new Promise(function(resolve, reject) {
        if (num >= 3) {
            setTimeout(function() {
                resolve(num);
            }, 500);
        } else {
            reject("Falied!");    
        }
    });  
}

// 今回は3を渡しているので、resolveから3が返ってくる
getNumber(3).then(function(result) {
    console.log(result);
    return result + 3;
}).then(function(result) {
    // 2つ目の処理でエラーを発生させる
    throw new Error('エラー！失敗しました');
    console.log(result);
    return result + 3;
}).then(function(result) {
    console.log(result);
    // catchを使うことで、エラーが発生した時点でエラーメッセージを返す
}).catch(function(e) {
    console.log('error: ', e);
});