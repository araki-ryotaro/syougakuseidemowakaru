// 【配列】：

// var kanjani = [ '丸山くん', '大倉くん', '村上くん', '横山くん', '錦戸くん', '安田くん' ]

// // 錦戸くん
// alert (kanjani[4]);

// // kanjaniに含まれている数
// alert (kanjani.length);

// var johnnys = [
//   [ '丸山くん', '大倉くん', '村上くん', '横山くん', '錦戸くん', '安田くん' ],
//   [ '中島くん', '菊池くん', '佐藤くん', '松島くん', 'マリウスくん' ]
// ];

// // 佐藤くん
// alert (johnnys[1][2]);

// // ：【配列】

// // 【繰り返し】：

// // for文の場合
// for (var i=0; i<5; i++) {
//   alert( '5回繰り返すよ！' );
// }

// // while文の場合
// var x = 0;
// while ( x < 5 ) {
//   alert( '5回繰り返すよ！' );
//   x++;
// }

// 下記はNG例
// var x = 0;
// while ( x === 0 ) {
//   alert( 'xは0です' );
// }

// ：【繰り返し】

// 【クラス】：

class KougekiMahouClass {
  constructor(name) {
    this.name = name;
    this.kougeki = 280;
    this.bougyo = 120;
  }
  mahou() {
    alert(this.name + 'はメラを使った！');
  }
}

class KaihukuMahouClass {
  constructor(name) {
    this.name = name;
    this.kougeki = 160;
    this.bougyo = 240;
  }
  mahou() {
    alert(this.name + 'はホイミを使った！');
  }
}

let aru = new KougekiMahouClass('アルくん');
aru.mahou();

let rico = new KaihukuMahouClass('りこちゃん');
rico.mahou();

class Cat {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  profile() {
    alert('わだずは猫だべ。名前は' + this.name + 'っていうべ。としは' + this.age + 'さいだべ');
  }
}

let yamada = new Cat('山田', 5);
yamada.profile();

let kity = new Cat('グッバイキティ', 3);
kity.profile();

// ：【クラス】