'use strict'

/**
 * タイルマップに関するクラス
 */
class Tilemap {

  /**
   * 引数
   * img : 画像ファイルまでのパス
   * size : タイル一つの大きさ（一片の長さ）
   *
   * タイルひとつは正方形にする
   */
  constructor( img, size ) {
    // Imageのインスタンスを作成
    this.img = new Image();
    // this.img.srcに画像ファイルまでのパスを代入
    this.img.src = img;
    // 画像の初期位置
    this.x = this.y = 0;
    // 数値によってタイルマップを移動させることが出来る（移動速度）
    this.vx = this.vy = 0;
    // 引数sizeが指定されていない場合、this.sizeに32を代入
    this.size = size || 32;
    // 二次元配列で数値を入力すると、マップを作ることが出来る
    this.data = [];
    // タイルマップに重ねるように置きたいタイルを追加できる
    this.tiles = [];
  } // constructor() 終了

  /**
   * タイルマップの上にタイルを重ねるように追加できるメソッド
   * 引数
   * tile : 追加したいタイル
   */
  add( tile ) {
    // 引数がTileのとき、this.tilesの末尾にtileを追加
    if ( tile instanceof Tile ) this.tiles.push( tile );
    // 引数がTileでなければ、コンソールにエラーを表示
    else console.error( 'Tilemapに追加できるのはTileだけだよ！' );
  } // add() 終了

  /**Gameクラスのメインループからずっと呼び出され続ける
   * 引数
   * canvas : 紙（キャンバス）
   */
  update( canvas ) {
    // 画像などを画面に表示するためのメソッドを呼び出す
    this.render( canvas );
    // 常に呼び出される、オーバーライド用のメソッドを呼び出す
    this.onenterframe();
    // タイルマップを移動する
    this.x += this.vx;
    this.y += this.vy;

    // タイルの数だけ繰り返す
    for ( let i=0; i<this.tiles.length; i++ ) {
      // タイルマップの位置の分、それぞれのタイルの位置をずらす
      this.tiles[i].shiftX = this.x;
      this.tiles[i].shiftY = this.y;
      // それぞれのタイルのupdateメソッドを呼び出す
      this.tiles[i].update( canvas );
    }
  } // update() 終了

  /**
   * Gameクラスのメインループからずっと呼び出され続ける。画像を表示したりするためのメソッド
   * 引数
   * canvas : 紙（キャンバス）
   */
  render( canvas ) {
    // マップの縦方向の数だけ繰り返す
    for ( let y=0; y<this.data.length; y++ ) {
      // タイルの縦の位置
      const _tileY = this.size * y + this.y;
      // タイルが、画面から縦にはみ出しているとき、この下をスキップして、次から繰り返し
      if ( _tileY < -1 * this.size || _tileY > canvas.height ) continue;

      // マップの横方向の数だけ繰り返す
      for ( let x=0; x<this.data[y].length; x++ ) {
        // タイルの横の位置
        const _tileX = this.size * x + this.x;
        // タイルが、画面から横にはみ出しているとき、この下をスキップして、次から繰り返し
        if ( _tileX < -1 * this.size || _tileX > canvas.width ) continue;

        // X方向に、何番目の画像か
        const _frameX = this.data[y][x] % ( this.img.width / this.size );
        // Y方向に、何番目の画像か
        const _frameY = ~~ ( this.data[y][x] / ( this.img.width / this.size ) );

        // 画家さん（コンテキスト）を呼ぶ
        const _ctx = canvas.getContext( '2d' );

        // タイルを表示
        _ctx.drawImage(
          this.img,
          this.size * _frameX,
          this.size * _frameY,
          this.size,
          this.size,
          _tileX,
          _tileY,
          this.size,
          this.size
        );
      }
    }
  } // render() 終了

  /**
   * 常に呼び出されるメソッド。空なのはオーバーライド（上書き）して使うため
   */
  onenterframe() {}

}