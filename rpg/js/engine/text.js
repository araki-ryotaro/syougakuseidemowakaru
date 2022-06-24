'use strict'

/**
 * テキストに関してのクラス
 */

class Text {

  /**
   * 引数
   * text : 表示する文字列
   */
  constructor( text ) {
    // this.textに表示する文字列を代入
    this.text = text;
    // デフォルトのフォントを指定
    this.font = "游ゴシック体, 'Yu Gothic', YuGothic, sans-serif";
    // テキストを表示する位置
    this.x = this.y =0;
    // 数値によってテキストを移動させることが出来る（移動速度）
    this.vx = this.vy = 0;
    // テキストのベースラインの位置
    this.baseline = 'top';
    // テキストのサイズ
    this.size = 20;
    // テキストの色
    this.color = '#ffffff';
    // テキストの太さ
    this.weight = 'normal';
    // テキストの幅
    this._width = 0;
    // テキストの高さ
    this._height = 0;
  } // constructor() 終了

  /**Gameクラスのメインループからずっと呼び出され続ける
   * 引数
   * canvas : 紙（キャンバス）
   */
  update( canvas ) {
    // 画家さん（コンテキスト）を呼ぶ
    const _ctx = canvas.getContext( '2d' );

    // テキストの太さ、サイズ、フォントを設定
    _ctx.font = `${this.weight} ${this.size}px ${this.font}`;
    // テキストの色を設定
    _ctx.fillStyle = this.color;
    // テキストのベースラインの位置を設定
    _ctx.textBaseline = this.baseline;

    // テキストの幅を計算
    this._width = _ctx.measureText( this.text ).width;
    // テキストの高さを計算
    this._height = Math.abs( _ctx.measureText( this.text ).actualBoundingBoxAscent ) + Math.abs( _ctx.measureText( this.text ).actualBoundingBoxAscent );

    // 画材などを画面に表示するためのメソッドを呼び出す
    this.render( canvas, _ctx );
    // テキストを動かしたりするために使うメソッドを呼び出す
    this.onenterframe();

    // テキストを移動する
    this.x += this.vx;
    this.y += this.vy;
  } // update() 終了

  /**
   * テキストを画面に表示するためのメソッド
   * 引数
   * canvas : 紙（キャンバス）
   */
  render( canvas, ctx ) {
    // 画面の外にテキストがあるとき、表示しないようにする
    if ( this.x < -1 * this._width || this.x > canvas.width ) return;
    if ( this.y < -1 * this._height || this.y > canvas.height ) return;
    // テキストを表示
    ctx.fillText( this.text, this.x, this.y );
  } // render() 終了

  /**
   * 常に呼び出されるメソッド。空なのはオーバーライド（上書き）して使うため
   */
  onenterframe() {}
}