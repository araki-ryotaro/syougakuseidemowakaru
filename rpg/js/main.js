'use strict'

// ブラウザがページを完全に読み込むまで待つ
addEventListener( 'load', () => {
  // 変数gameに、あなたはゲームですよ、と教える
  // Game( 1136, 640 )と記載すると黒塗りの部分が広がる
  const game = new Game();

  // 変数yamadaに、あなたは山田先生のスプライト画像ですよ、と教える
  const yamada = new Sprite( 'img/yamada.png' );
  // gameに、山田先生のスプライト画像を表示して、とお願いする
  game.add( yamada );

  // gameに、ゲームをスタートして、とお願いする
  game.start();
} );