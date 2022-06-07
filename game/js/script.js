'use strict';

// グローバル変数の定義
let canvas;
let ctx;

// マップの作成
let map = [
  [0, 0, 1, 0, 1, 0, 0, 0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0],
  [0, 1, 0, 0, 0, 1, 1, 1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,0],
  [0, 0, 1, 1, 0, 0, 0, 1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0],
  [1, 0, 1, 0, 1, 1, 0, 0 ,0 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,1 ,0 ,1 ,0],
  [0, 0, 0, 0, 0, 1, 1, 1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1 ,0],
  [0, 1, 1, 1, 0, 0, 0, 0 ,0 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0],
  [0, 1, 1, 1, 0, 1, 1, 1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,0],
  [0, 0, 0, 1, 0, 0, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0],
  [1, 1, 0, 1, 1, 1, 1, 1 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,1 ,1 ,0 ,1 ,1],
  [1, 0, 0, 0, 0, 0, 1, 1 ,0 ,0 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,0],
  [1, 0, 1, 1, 1, 0, 0, 0 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,0],
  [1, 0, 1, 0, 1, 1, 1, 0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,0 ,1],
  [0, 0, 1, 0, 0, 1, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,0 ,1 ,1 ,1 ,0 ,0],
  [0, 1, 1, 1, 0, 1, 0, 1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,0],
  [0, 0, 0, 1, 0, 1, 0, 0 ,1 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0],
  [1, 1, 0, 1, 0, 1, 0, 1 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0],
  [0, 0, 0, 1, 0, 1, 1, 1 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0],
  [0, 1, 1, 1, 0, 1, 0, 0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1],
  [0, 1, 0, 0, 0, 1, 0, 1 ,1 ,1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0],
  [0, 0, 0, 1, 0, 0, 0, 1 ,1 ,1 ,1 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,0]
];

// スプライトクラス
class Sprite {
  constructor( img, left, top ) {
    // 画像の左から何ピクセルの部分を使うか
    this.left = left || 0;
    // 画像の上から何ピクセルの部分を使うか
    this.top = top || 0;
    // img : スプライトに使う画像
    this.img = new Image();
    this.img.src = img;
    this.width = 32;
    this.height = 32;
  }
}

class Game {
  constructor( width, height ) {
    this.width = width || 320;
    this.height = height || 320;

    canvas = document.getElementById('canvas');
    // canvasの横幅
    canvas.width = this.width;
    // canvasの縦幅
    canvas.height = this.height;

    ctx = canvas.getContext( '2d' );
  }
  add( sprite, x, y ) {
    if( typeof x === "undefined" ) sprite.x = 0;
    else sprite.x = x;
    if( typeof y === "undefined" ) sprite.y = 0;
    else sprite.y = y;
    ctx.drawImage( sprite.img, sprite.left, sprite.top, sprite.width, sprite.height, sprite.x, sprite.y, sprite.width, sprite.height );
  }
}

// 入力クラス
class Input {
  constructor() {
    this.up = false;
    this.left = false;
    this.down = false;
    this.right = false;
  }
  push_key() {
    addEventListener( "keydown", () => {
        // 押されたボタンに割り当てられた数値を、key_codeに代入
        const key_code = event.keyCode;
        // 「左ボタン」が押されたとき、key.leftをtrueにする
        if( key_code === 37 ) key.left = true;
        // 「上ボタン」が押されたとき、key.upをtrueにする
        if( key_code === 38 ) key.up = true;
        // 「右ボタン」が押されたとき、key.rightをtrueにする
        if( key_code === 39 ) key.right = true;
        // 「左ボタン」が押されたとき、key.downをtrueにする
        if( key_code === 40 ) key.down = true;
        // 方向キーでブラウザがスクロールしないようにする
        event.preventDefault();
        }, false);
    addEventListener( "keyup", () => {
      // 押されたボタンに割り当てられた数値を、key_codeに代入
      const key_code = event.keyCode;
      // 「左ボタン」が押されたとき、key.leftをfalseにする
      if( key_code === 37 ) key.left = false;
      // 「上ボタン」が押されたとき、key.upをfalseにする
      if( key_code === 38 ) key.up = false;
      // 「右ボタン」が押されたとき、key.rightをfalseにする
      if( key_code === 39 ) key.right = false;
      // 「左ボタン」が押されたとき、key.downをfalseにする
      if( key_code === 40 ) key.down = false;
      }, false);
    }
  }

let input = new Input();

// プレイヤークラス
class Player {
  constructor(x,y) {
    this.sprite = new Sprite('img/character.png');
    this.x = x;
    this.y = y;
    this.move = 0;
  }
  move_sp() {
    input.push_key();
    game.add(this.sprite, this.x, this.y);
    if( this.move === 0 ) {
      if( input.left === true ) {
        var x = this.x/32;
        var y = this.y/32;
        x--;
        if(map[y][x] === 0) {
          this.move = 32;
          input.push = 'left';
        }
      }
      if( input.up === true ) {
        var x = this.x/32;
        var y = this.y/32;
        if(y > 0) {
          y--;
          if(map[y][x] === 0) {
            this.move = 32;
            input.push = 'up';
          }
        }
      }
      if( input.right === true ) {
        var x = this.x/32;
        var y = this.y/32;
        x++;
        if(map[y][x] === 0) {
          this.move = 32;
          input.push = 'right';
        }
      }
      if( input.down === true ) {
        var x = this.x/32;
        var y = this.y/32;
        if(y < 19) {
          y++;
          if(map[y][x] === 0) {
            this.move = 32;
            input.push = 'down';
          }
        }
      }
    }
    
    // this.moveが0より大きい場合は、4pxずつ移動を続ける
    if( this.move > 0 ) {
      this.move -= 4;
      if( input.push === 'left' ) this.x -= 4;
      if( input.push === 'up' ) this.y -= 4;
      if( input.push === 'right' ) this.x += 4;
      if( input.push === 'down' ) this.y += 4;
    }
  }
}

// ゲームオブジェクトの作成
let game = new Game( 640, 640 );

// プレイやーオブジェクトの作成
let player = new Player( 0, 0 );

// キャラクターオブジェクトの作成
let yamada =  new Sprite( 'img/character.png', 33, 0 );
let aru = new Sprite( 'img/character.png', 65, 0 );

// 床、壁のマッチアップのオブジェクトを作成
let floor = new Sprite( 'img/map.png', 0, 0 );
let wall = new Sprite( 'img/map.png', 33, 0 );

// メインループ
function main() {
  
  // 塗りつぶす色を指定
  ctx.fillStyle = "rgb(0, 0, 0)";
  // x=0, y=0 の位置に縦横30pxの正方形を描く
  // 塗りつぶす
  ctx.fillRect(0, 0, 640, 640);
  
  // マップを表示する
  for (var y=0; y<map.length; y++) {
    for (var x=0; x<map[y].length; x++) {
      if ( map[y][x] === 0 ) game.add( floor, 32*x, 32*y );
      if ( map[y][x] === 1 ) game.add( wall, 32*x, 32*y );
    }
  }

  // キャラクターのスプライトを表示
  player.move_sp();
  game.add( aru, 32, 64 );
  game.add( yamada, 96, 96 );

  requestAnimationFrame( main );

}

addEventListener( 'load', main(), false);

// function main() {
//     input.push_key();
//     if( input.left === true ) x-=6;
//     requestAnimationFrame( main );
//   }
//     addEventListener( 'load', main(), false );


// canvasの設定
// var canvas = document.getElementById('canvas');
// canvasの横幅
// canvas.width = 640;
// canvasの縦幅
// canvas.height = 640;
// コンテキストを取得
// var ctx = canvas.getContext('2d');

// りこちゃんのオブジェクトを作成
      // var rico = new Object();
      // rico.img = new Image();
      // rico.img.src = 'img/rico.png';
      // rico.x = 0;
      // rico.y = 0;
      // rico.move = 0;
      
      // // マッチアップのImageオブジェクトを作る
      // // 画像のオブジェクトを作る
      // var mapchip = new Image();
      // mapchip.src = 'img/map.png';
      


      // let rico = new Sprite( 'img/character.png' );
      // let yamada =  new Sprite( 'img/character.png', 33, 0 );
      // let aru = new Sprite( 'img/character.png', 65, 0 );

      // function main() {
      //   // キャラクターのスプライト表示
      //   game.add( rico, 0, 0 );
      //   game.add( yamada, 32, 64 );
      //   game.add( aru, 96, 96 );

      //   requestAnimationFrame( main );
      // }

      // addEventListener('load', main(), false);
      

      // // let aru = new Sprite( 'img/character.png', 65, 0 );
      
      // // キーボードのオブジェクトを作成
      // var key = new Object();
      // key.up = false;
      // key.down = false;
      // key.right = false;
      // key.left = false;
      // key.push = '';
      

      // // マッチアップを表示する
      // // addEventListener('load', function() {
      // // }, false);
      
      // // 画面に画像を表示する
      // // document.write( '<img id="rico" src="rico.png">' );
      // // addEventListener('load', function() {
      //   //   ctx.drawImage(img, 0, 0, 32, 32, 0, 0, 32, 32);
      //   //   ctx.drawImage(img, 32, 0, 32, 32, 0, 64, 32, 32);
      //   // }, false);
        
      //   // 画像のオブジェクトを作成
      //   // var img = new Image();
      //   // img.src = 'img/rico.png';
        
      //   // function main() {
      //     //   requestAnimationFrame(main);
      //     // }
          
      //     // キャラクターの位置
      //     // var y = 0;
      //     // var x = 0;
          
      //     // 押されたキーを入れておくための変数
      //     // var pressed_key = '';
          
      //     // メインループ
      //     function main() {
            
      //       // 塗りつぶす色を指定
      //       ctx.fillStyle = "rgb(0, 0, 0)";
      //       // x=0, y=0 の位置に縦横30pxの正方形を描く
      //       // 塗りつぶす
      //       ctx.fillRect(0, 0, 640, 640);
            
      //       // マップを表示する
      //       for (var y=0; y<map.length; y++) {
      //         for (var x=0; x<map[y].length; x++) {
      //           if ( map[y][x] === 0 ) ctx.drawImage( mapchip, 0, 0, 32, 32, 32*x, 32*y, 32, 32);
      //           if ( map[y][x] === 1 ) ctx.drawImage( mapchip, 32, 0, 32, 32, 32*x, 32*y, 32, 32);
      //         }
      //       }
            
      //       // 画像を表示
      //       ctx.drawImage(rico.img, rico.x, rico.y);
            
      //       // キーボードが押されたとき、keydownfunc関数を呼び出す
      //   addEventListener( "keydown", keydownfunc, false );
      //   // キーボードが離されたとき、keyupfunc関数を呼び出す
      //   addEventListener( "keyup", keyupfunc, false );
        
      //   // rico.moveが0のとき、りこちゃんが移動する準備をする
      //   if( rico.move === 0 ) {
      //     if( key.left === true ) {
      //       var x = rico.x/32;
      //       var y = rico.y/32;
      //       x--;
      //       if(map[y][x] === 0) {
      //         rico.move = 32;
      //         key.push = 'left';
      //       }
      //     }
      //     if( key.up === true ) {
      //       var x = rico.x/32;
      //       var y = rico.y/32;
      //       if(y > 0) {
      //         y--;
      //         if(map[y][x] === 0) {
      //           rico.move = 32;
      //           key.push = 'up';
      //         }
      //       }
      //     }
      //     if( key.right === true ) {
      //       var x = rico.x/32;
      //       var y = rico.y/32;
      //       x++;
      //       if(map[y][x] === 0) {
      //         rico.move = 32;
      //         key.push = 'right';
      //       }
      //     }
      //     if( key.down === true ) {
      //       var x = rico.x/32;
      //       var y = rico.y/32;
      //       if(y < 19) {
      //         y++;
      //         if(map[y][x] === 0) {
      //           rico.move = 32;
      //           key.push = 'down';
      //         }
      //       }
      //     }
      //   }
      //   // 「左ボタン」が押されたとき、xの値から32を引き算する
      //   // if( key.left === true ) rico.x -= 32;
      //   // 「上ボタン」が押されたとき、yの値から32を引き算する
      //   // if( key.up === true ) rico.y -= 32;
      //   // 「右ボタン」が押されたとき、xの値から32を足し算する
      //   // if( key.right === true ) rico.x += 32;
      //   // 「左ボタン」が押されたとき、yの値から32を足し算する
      //   // if( key.down === true ) rico.y += 32;
        
      //   // rico.moveが0より大きいとき、りこちゃんが移動する
      //   if( rico.move > 0 ) {
      //     rico.move -= 4;
      //     if( key.push === 'left' ) rico.x -= 4;
      //     if( key.push === 'up' ) rico.y -= 4;
      //     if( key.push === 'right' ) rico.x += 4;
      //     if( key.push === 'down' ) rico.y += 4;
      //   }
        
      //   // りこちゃんの画像の位置を反映させる
      //   // document.getElementById( 'rico' ).style.top = rico.y + "px";
      //   // document.getElementById( 'rico' ).style.left = rico.x + "px";
        
      //   // main関数、つまり自分自身の関数を呼び出すことでループさせる
      //   requestAnimationFrame(main);
        
      // }
      
      // // ページ依存している全てのデータが読み込まれたらメインループ開始
      // addEventListener('load', main(),false);

      // // requestAnimationFrame(main);
      
      // // キーが押されたときに呼び出される関数
      // function keydownfunc( event ) {
      // // 押されたボタンに割り当てられた数値を、key_codeに代入
      // var key_code = event.keyCode;
      // // 「左ボタン」が押されたとき、key.leftをtrueにする
      // if( key_code === 37 ) key.left = true;
      // // 「上ボタン」が押されたとき、key.upをtrueにする
      // if( key_code === 38 ) key.up = true;
      // // 「右ボタン」が押されたとき、key.rightをtrueにする
      // if( key_code === 39 ) key.right = true;
      // // 「左ボタン」が押されたとき、key.downをtrueにする
      // if( key_code === 40 ) key.down = true;
      // // 方向キーでブラウザがスクロールしないようにする
      // event.preventDefault();
      // }

      // // キーが離されたときに呼び出される関数
      // function keyupfunc( event ){
      //   // 押されたボタンに割り当てられた数値を、key_codeに代入
      //   var key_code = event.keyCode;
      //   // 「左ボタン」が押されたとき、key.leftをfalseにする
      //   if( key_code === 37 ) key.left = false;
      //   // 「上ボタン」が押されたとき、key.upをfalseにする
      //   if( key_code === 38 ) key.up = false;
      //   // 「右ボタン」が押されたとき、key.rightをfalseにする
      //   if( key_code === 39 ) key.right = false;
      //   // 「左ボタン」が押されたとき、key.downをfalseにする
      //   if( key_code === 40 ) key.down = false;
      //   }
      // キャラクターを動かす
      // var y = 0;
      // document.getElementById('rico').onclick = function() {
      //   y += 32;
      //   document.getElementById('rico').style.top = y + "px";
      // }

      // なにかキーが押されたときkeydownfuncという関数を呼び出す
      // addEventListener( "keydown", keydownfunc );

      // キーが押されたときに呼び出される関数
      // function keydownfunc( event ){
        // アラートを表示する
      //   alert( '押したなー');
      // }