'use strict'

// ブラウザがページを完全に読み込むまで待つ
addEventListener( 'load', () => {
  // 変数gameに、あなたはゲームですよ、と教える
  // Game( 1136, 640 )と記載すると黒塗りの部分が広がる
  const game = new Game();

  // マップの作製
  const map = [
    [11,11,11,11,11,11,11,11,11,11],
    [11,10,10,10,10,10,10,10,10,11],
    [11, 4, 4, 4, 4, 4, 4, 4, 4,11],
    [11, 4,11, 4, 4,11,11,11, 4,11],
    [11, 4,11,11,11,11,10,10, 4,11],
    [11, 4,11,10,10,11, 4, 4, 4,11],
    [11, 4,11, 4, 4,11,11,11, 4,11],
    [11, 4, 9, 4, 4, 9,10,11, 4,11],
    [11, 4, 4, 4, 4, 4, 4,11, 4,11],
    [11,11,11,11,11,11,11,11,11,11],
  ];
  // 歩く速さ
  const WALKING_SPEED = 4;

  // 変数sceneに、あなたはシーンですよ、と教える
  const scene = new Scene();

  // 変数tilemapに、あなたはタイルマップですよ、と教える
  const tilemap = new Tilemap( 'img/tile.png' );
  // tilemap.dataに、どんなマップなのか教える
  tilemap.data = map;
  // マップを登録する
  scene.add( tilemap );

  // 変数yamadaに、あなたは山田先生のタイルですよ、と教える
  const yamada = new Tile( 'img/yamada.png' );
  // tilemapに、山田先生のタイルを追加して、とお願いする
  tilemap.add( yamada );

  // ループから常に呼び出される
  scene.onenterframe = () => {
    // キーが押されたとき、山田先生が移動する
    if ( game.input.left ) yamada.x -= WALKING_SPEED;
    if ( game.input.right ) yamada.x += WALKING_SPEED;
    if ( game.input.up ) yamada.y -= WALKING_SPEED;
    if ( game.input.down ) yamada.y += WALKING_SPEED;
  } // yamada.onenterframe 終了
  // gameに、山田先生のスプライト画像を表示して、とお願いする
  // game.add( yamada );

  // gameに、シーンを追加して、とお願いする
  game.add( scene );

  // gameに、ゲームをスタートして、とお願いする
  game.start();
} );