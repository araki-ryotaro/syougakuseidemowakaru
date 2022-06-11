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
  } // constructor() 終了

  /**
   * startメソッドを呼び出すことで、メインループが開始される
   */
  start() {
    // メインループを呼び出す
    this._mainLoop();
  } // start() 終了
  
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
  
    // 自分自身（_mainLoop）を呼び出して、ループさせる
    requestAnimationFrame( this._mainLoop.bind( this ) );
  } // _mainLoop() 終了
}
