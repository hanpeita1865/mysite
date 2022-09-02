*[page-title]:名前空間について

参考サイト
: [【JavaScript入門】使わなきゃ損！名前空間をやさしく解説！](https://www.sejuku.net/blog/65850)

## 概略

### 名前空間とは

名前空間は、英語ではNamespace（ネームスペース）と言い、プログラミングにおける概念のひとつです。
「<span class="purple bold">名前空間</span>」という概念は、名前の衝突を避けるために存在します。  

その「空間」の中に、同じ名前のものが複数存在しないように仕分ける仕組みのことを指します。  
空間とは一種の容器のようなものです。

例えば、「太郎」という名前は複数の人を指す可能性がありますが、名字ごとに名前空間を作成することによって、どの「太郎」かの区別がつきます。  
実際、名前空間「鈴木」の中の「太郎」と、名前空間「佐々木」の中の「太郎」は別人と認識することができます。

### 名前空間を使用するメリット
「名前の衝突を避ける」という主な目的を持っている「名前空間」という概念ですが、他に名前空間を使用するメリットとは何でしょうか。

小さな規模のプログラムの場合、名前空間を使用するメリットはあまり感じられないかもしれません。  
しかし、ある程度の規模のプログラムは、他のプログラムやサーバーなどとの関りを持つことなども考えられます。  
このような場合には、名前空間を使用することによってプログラマーの負担が軽減されるのです。  
名前の衝突により発生する不具合などを予防することができるので、要らない処理を省く事が出来るのです。

<span class="red bold">名前空間という概念を知っていると、より簡潔で美しいプログラムを書く事が出来、ミスなども抑える事が出来ます。</span>

### 名前空間とスコープの違いについて

スコープと名前空間という二つの概念は似ていますが、厳密に言うと違いがあります。  
名前空間は「名前の衝突を避ける」為に存在する概念ですが、スコープは「参照できる範囲」の事を指します。

スコープには名前の衝突を避けるなどといった目的はなく、単にあるスコープ内に定義された変数や関数はそのスコープ内でしか使用できないという事です。

## 使用方法

では実際に、JavaScriptプログラムで「名前空間」という概念を導入してみましょう。  

### 普通の書き方

まずは最初に、名前空間を使用しない簡単なプログラムをご覧ください。

<p class="lang">JS</p>
```
function addition(num1,num2) {
		return num1+num2;
}

function multiplication(num1,num2) {
		return num1*num2;
}

var operation = addition(5,10);
console.log(operation)
```

実行結果は以下の通りです。
```
15
```

上のコードでは、まずは足し算を行う関数additionと掛け算を行う関数multiplicationを定義しました。  
そしてグローバル変数operationに足し算の結果を格納し、それをJavaScriptコンソールに表示させています。  
関数additionに渡した引数は5と10なので、コンソールに表示されたのは15です。  
ご覧いただけるように、上のコードではすべてがグローバル変数として存在しています。  
その為、グローバルスコープ内に同じ名前の関数や変数が存在すると、衝突の原因になります。

### 名前空間で書いてみる

では次に、上のコードを名前空間を使用して改善してみました。


<p class="lang">JS</p>
```
let MYFUNCTIONS = {

		addition: function(num1,num2){
				return num1+num2;
		},

		multiplication: function(num1,num2){
				return num1*num2;
		}
} 

let operation = MYFUNCTIONS.addition(5,10);
console.log(operation)
```

実行結果は以下の通りです。
```
15
```

上のコードでは、唯一定義されているグローバル変数は大文字のMYFUNCTIONS変数です。  
その中に、addition関数とmultiplication関数を定義しています。  
こうすることでMYFUNCTIONSという名の空間を作成し、その中に任意の関数を含ませています。 

MYFUNCTIONS内の関数を呼び出すためには、MYFUNCTIONS.関数名 という構文を使用します。  
ご覧いただけるように、MYFUNCTIONS.addition(5,10) と書く事によって、addition関数が呼び出されました。

結果は、先ほどのコードと同じ15です。


### 名前空間を階層化する方法

名前空間を「階層化」する方法をご紹介します。  
階層化することによって、より多くの関数や変数を管理することが出来るので便利です。

以下のコードをご覧ください。

<p class="lang">JS</p>
```
let MYAPPLICATION = {
		OPERATIONS: {
				addition: function(num1,num2){
						return num1+num2;
				},

				multiplication: function(num1,num2){
						return num1*num2;
				}
		},

		OTHER: {
				show: function(num1,num2){
						console.log("Your numbers are " + num1 + " and " + num2);
				} 
		}
} 

MYAPPLICATION.OTHER.show(5,10);
```

実行結果は以下の通りです。
```
Your numbers are 5 and 10
```
上のコードでは、唯一のグローバル変数MYAPPLICATIONを複数の空間に小分けしました。  
OPERATION空間には、addition関数やmultiplication関数を記入し、OTHER空間には新たな関数showを含ませました。

空間の中に空間を作ることによって、より仕分けがしやすくなり、簡潔なコードに仕上がります。  
例えば、OTHER空間にあるshow関数を呼び出すには、外側の空間.内側の空間.関数名 といった構文をしようします。

実際、MYAPPLICATION.OTHER.show(5,10) と書くと、引数5と10に指定されたshow関数が呼び出されます。  
show関数は、JavaScriptコンソールに 「Your numbers are 引数1 and 引数2」 といったフレーズを出力します。

その為、今回はご覧いただけるように、Your numbers are 5 and 10 と表示されました。













