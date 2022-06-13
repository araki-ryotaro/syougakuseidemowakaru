'use strict';

// ゲーム作りの基本となるクラス
class Game {

  /**
   * 引数
   * width：ゲームの横幅
   * height：ゲームの縦幅
   */
  constructor( width, height ) {
    // canvasの要素を作成
    this.canvas = document.createElement( 'canvas' );
    // 作成したcanvas要素をbodyタグに追加
    document.body.appendChild( this.canvas );
    // canvasの横幅（ゲームの横幅）を設定。もし横幅が指定されえていなければ320を代入
    this.canvas.width = width || 320;
    // canvasの縦幅（ゲームの縦幅）を設定。もし縦幅が指定されえていなければ320を代入
    this.canvas.height = height || 320;

    // ゲームに登場する全てのもの（オブジェクト）を入れるための配列
    this.objs = [];

    // ゲームに使用するキーと、そのキーが押されているかどうかを入れるための連想配列
    // 例 { up: false, down: false }
    this.input = {};
    // 登録されたキーに割り当てられたプロパティ名と、キー名を、関連付けるための連想配列
    // 例{ up : "ArrowUp", down: "ArrowDown" }
    this._keys = {};
  } // constructor() 終了


  /**
   * startメソッドを呼び出すことで、メインループが開始される
   */
  start() {
    // デフォルトのキーバインドを登録する（使いたいキーを登録する）
    this.keybind( 'up', 'ArrowUp' );
    this.keybind( 'down', 'ArrowDown' );
    this.keybind( 'right', 'ArrowRight' );
    this.keybind( 'left', 'ArrowLeft' );

    // メインループを呼び出す
    this._mainLoop();

    // イベントリスナーをセットする
    this._setEventListener();
  } // start() 終了

  /**
   * イベントリスナーをセットするためのメソッド
   */
  _setEventListener() {
    // なにかキーが押されたときと、離されたときに呼ばれる
    const _keyEvent = e => {
      // デフォルトのイベントを発生させない
      e.preventDefault();
      // _keysに登録された数だけ繰り返す
      for ( let key in this._keys ) {
        // イベントのタイプによって呼び出すメソッドを変える
        switch ( e.type ) {
          case 'keydown' :
            // 押されたキーが登録されたキーの中に存在するとき、inputのそのキーをtrueにする
            if ( e.key === this._keys[key] ) this.input[key] = true;
            break;
          case 'keyup' :
             // 押されたキーが、登録されたキーの中に存在するとき、inputのそのキーをfalseにする
             if ( e.key === this._keys[key] ) this.input[key] = false;
             break;
        }
      }
    }
    // なにかキーが押されたとき
    addEventListener( 'keydown', _keyEvent, { passive: false } );
    // キーが離れたとき
    addEventListener( 'keyup', _keyEvent, { passive: false } );
  } // _setEventListener() 終了

  /**
   * メインループ
   */
  _mainLoop() {
    // 画家さん（コンテキスト）を呼ぶ
    const ctx = this.canvas.getContext( '2d' );
    // 塗りつぶしの色に、黒を指定する
    ctx.fillStyle = '#000000'
    // 左上から、画面のサイズまでを、塗りつぶす
    ctx.fillRect( 0, 0, this.canvas.width, this.canvas.height );

    // ゲームに登場する全てのもの（オブジェクト）の数だけ繰り返す
    for ( let i=0; i<this.objs.length; i++ ) {
      // スプライトやテキストなど、全てのオブジェクトのupdateメソッドを呼び出す
      this.objs[i].update( this.canvas );
    }

    // 自分自身（_mainLoop）を呼び出して、ループさせる
    requestAnimationFrame( this._mainLoop.bind( this ) );
  } // _mainLoop() 終了

  /**
   * オブジェクトをゲームに追加できるようになる、addメソッドを作成
   * 引数
   * obj : 追加したいオブジェクト
   */
  add( obj ) {
    // this.objs配列の末尾に、objの値を追加
    this.objs.push( obj );
  } // add() 終了

  /**
   * 使いたいキーを登録できるようになる、keybindメソッドを作成
   * 引数
   * name : キーに着ける名前
   * key : キーコード
   */
  keybind( name, key ) {
    // キーの名前と、キーコードを関連付ける
    this._keys[name] = key;
    // キーが押されているかどうかを入れておく変数に、まずはfalseを代入しておく
    this.input[name] = false;
  } // keybind() 終了
}
