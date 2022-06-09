'use strict';

// Gameクラス
class Game {
  constructor(width, height) {
    this.objs = [];

    this.frame = 0;

    // もしもwidthやheightが何も代入されていなければ、320を代入する
    this.width = width || 320;
    this.height = height || 320;

    this.canvas = document.getElementById('canvas');
    // canvasの横幅
    canvas.width = this.width;
    // canvasの縦幅
    canvas.height = this.height;

    this.ctx = canvas.getContext('2d');
  }

  // start()を呼び出すことで、メインループが開始される
  start() {
    this._main();
  }

  _main() {
    // 背景を黒く塗りつぶす
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.width, this.height);

    // ゲームに登場する者の数だけ繰り返す
    for (let i = 0; i < this.objs.length; i++) {
      // ゲームに登場するもののクラスからrender()を呼び出す
      this.objs[i].render(this.ctx, this.frame);
    }

    // フレーム
    this.frame++;
    // もしコンソールで確認したいならば以下を追加
    console.log(this.frame);

    // _main()を呼び出す（ループさせる）
    requestAnimationFrame(this._main.bind(this));
  }

  // ゲームにテキストなどを表示させるための関数
  add(obj, x, y) {
    obj.x = x || 0;
    obj.y = y || 0;
    this.objs.push(obj);
  }
}

// Labelクラス
class Label {
  // Labelの初期設定
  constructor(label) {
    this._text = [];
    // 表示している文字列の長さ
    this._displayLength = 0;
    this._line = 0;
    // this._charcnt = 0;
    this.label = label;
    this.font = "20px 'ヒラギノ角ゴ Pro', 'Hiragino Kaku Gothic Pro', 'ＭＳ　ゴシック', 'MS Gothic', sans-serif";
    this.color = '#fff';
    this.maxLength = 30;
    this.baseline = 'top';
    this.interval = 0;
  }

  // Labelを表示するための関数（メインループから呼び出される）
  render(ctx, frame) {
    ctx.fillStyle = this.color;
    ctx.font = this.font;
    ctx.textBaseline = this.baseline;

    // 文字を表示する感覚が0の場合は、文字を一気に表示
    if (this.interval === 0) {
      // 表示する文字数を、1行に表示する最大の文字数で割り、切り上げることで、その文字列が何行になるのかがわかる
      this._line = Math.ceil(this.label.length / this.maxLength);
      // 文字列の行数だけ繰り返す
      for (var i = 0; i < this._line; i++) {
        this._text[i] = this._text[i] || '';
        this._text[i] = this.label.substr(i * this.maxLength, this.maxLength);
        // 文字列の表示
        ctx.fillText(this._text[i], this.x, this.y + (i * 25));
      }
    }

    // 文字を表示する間隔が0以外の場合、一文字ずつ表示していく
    else {
      if (this._displayLength < this.label.length && frame % this.interval === 0) {
        this._text[this._line] = this._text[this._line] || '';
        // this.labelに代入されている文字列を、this_text[this._line]に一文字ずつ入れていく
        this._text[this._line] += this.label.charAt(this._displayLength);
        this._displayLength++;
        if (this._displayLength % this.maxLength === 0) {
          this._line++;
        }
      }
      for (var i = 0; i < this._line + 1; i++) {
        this._text[i] = this._text[i] || '';
        ctx.fillText(this._text[i], this.x, this.y + (i * 25));
      }
    }
  }
}

// if( this.interval === 0 ) ctx.fillText( this.label, this.x, this.y );
// else {
//   if ( this._charcnt < this.label.length && frame%this.interval === 0 ) {
//     this._text += this.label.charAt( this._charcnt );
//     this._charcnt++;
//   }
// }
// ctx.fillText( this._text, this.x, this.y );

// this._text[] : 表示したい文字列を代入。配列にして、添字そえじを行数とします。
// this._displayLength : 実際に画面に表示されている文字数。一文字表示されるごとに１つずつ増えていきます。
// this._line : 表示する文字列の行数
// this.label : 表示したい文字列
// this.font : 表示したい文字列のフォント
// this.color : 表示したい文字列の色
// this.maxLength : 表示したい文字列の、一行の最大文字数
// this.baseline : 表示したい文字列のベースライン
// this.interval : 文字列を表示する速度