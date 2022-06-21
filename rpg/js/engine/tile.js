'use strict'

/**
 * タイルに関してのクラス
 */
class Tile extends Sprite {

  /**
   * 引数
   * img : 画像ファイルまでのパス
   * size : タイルの大きさ
   */
  constructor( img, size ) {
    // 親クラスのコンストラクタを呼び出す
    super( img, size, size );
    // 引数sizeが指定されていない場合、this.sizeに32を代入
    this.size = size || 32;
    // タイルマップと同期して動くかどうか
    this.isSynchronize = true;
  } // constructor() 終了

}