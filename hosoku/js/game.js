'use strict';

// Gameクラス
class Game {
  constructor( width, height ) {
    this.objs = [];

    // もしもwidthやheightが何も代入されていなければ、320を代入する
    this.width = width || 320;
    this.height = height || 320;

    this.canvas = document.getElementById( 'canvas' );
    // canvasの横幅
    canvas.width = this.width;
    // canvasの縦幅
    canvas.height = this.height;

    this.ctx = canvas.getContext( '2d' );
  }

  // start()を呼び出すことで、メインループが開始される
  start() {
    this._main();
  }

  _main() {
    // 背景を黒く塗りつぶす
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect( 0, 0, this.width, this.height );

    // ゲームに登場する者の数だけ繰り返す
    for (let i=0; i<this.objs.length; i++ ) {
      // ゲームに登場するもののクラスからrender()を呼び出す
      this.objs[i].render( this.ctx );
    }

    // _main()を呼び出す（ループさせる）
    requestAnimationFrame(this._main.bind(this));
  }

  // ゲームにテキストなどを表示させるための関数
  add( obj, x, y ) {
    obj.x = x || 0;
    obj.y = y || 0;
    this.objs.push( obj );
  }
}

// Labelクラス
class Label {
  // Labelの初期設定
  constructor( label ) {
    this.label = label;
    this.font = "24px 'ヒラギノ角ゴ Pro', 'Hiragino Kaku Gothic Pro', 'ＭＳ　ゴシック', 'MS Gothic', sans-serif";
    this.color = '#fff';
    this.baseline = 'top';
  }

  // Labelを表示するための関数（メインループから呼び出される）
  render( ctx ) {
    ctx.fillStyle = this.color;
    ctx.font = this.font;
    ctx.textBaseline = this.baseline;
    ctx.fillText( this.label, this.x, this.y );
  }
}