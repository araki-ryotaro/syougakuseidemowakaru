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
  // タイルのサイズ
  const TILE_SIZE = 32;
  // 歩く速さ
  const WALKING_SPEED = 4;

  // 変数sceneに、あなたはシーンですよ、と教える
  const scene = new Scene();

  // 変数tilemapに、あなたはタイルマップですよ、と教える
  const tilemap = new Tilemap( 'img/tile.png' );
  // tilemap.dataに、どんなマップなのか教える
  tilemap.data = map;
  // マップ全体の位置をずらす
  tilemap.x = TILE_SIZE*4 - TILE_SIZE/2;
  tilemap.y = TILE_SIZE*3 - TILE_SIZE/2;
  // 移動できないタイルを指定する
  tilemap.obstacles = [0, 3, 6, 7, 8, 9, 10, 11];
  // マップを登録する
  scene.add( tilemap );

  // 変数startに、あなたはスタートのタイルですよ、と教える
  const start = new Tile( 'img/start.png' );
  // マップ左上からの座標を指定する
  start.x = TILE_SIZE;
  start.y = TILE_SIZE*2;
  // スタートのタイルを、tilemapに追加して、とお願いする
  tilemap.add( start );

  // 変数goalに、あなたはゴールのタイルですよ、と教える
  const goal = new Tile( 'img/goal.png' );
  // マップ左上からの座標を指定する
  goal.x = TILE_SIZE*8;
  goal.y = TILE_SIZE*8;
  // ゴールのタイルを、tilemapに追加して、とお願いする
  tilemap.add( goal );

  // 変数yamadaに、あなたは山田先生のタイルですよ、と教える
  const yamada = new Tile( 'img/yamada.png' );
  // 山田先生を画面の中央を配置
  yamada.x = yamada.y = TILE_SIZE*5 - TILE_SIZE/2;
  // タイルマップの動きと同期させない
  yamada.isSynchronize = false;
  // tilemapに、山田先生のタイルを追加して、とお願いする
  tilemap.add( yamada );

  // ループから常に呼び出される
  scene.onenterframe = () => {
    // タイルマップの位置がタイルのサイズで割り切れるとき
    if ( ( tilemap.x - TILE_SIZE/2 ) % TILE_SIZE === 0 && ( tilemap.y - TILE_SIZE/2 ) % TILE_SIZE === 0 ) {
      // タイルマップの移動速度に0を代入する
      tilemap.vx = tilemap.vy = 0;
      // キーが押されたとき、山田先生が移動する
      if ( game.input.left ) tilemap.vx = WALKING_SPEED;
      else if ( game.input.right ) tilemap.vx = -1 * WALKING_SPEED;
      else if ( game.input.up ) tilemap.vy = WALKING_SPEED;
      else if ( game.input.down ) tilemap.vy = -1 * WALKING_SPEED;

      // 移動後のマップ座標を求める
      const yamadaCoordinateAfterMoveX = yamada.mapX - tilemap.vx/WALKING_SPEED;
      const yamadaCoordinateAfterMoveY = yamada.mapY - tilemap.vy/WALKING_SPEED;
      // もし移動後のマップ座標に障害物があるならば、移動量に0を代入する
      if ( tilemap.hasObstacle( yamadaCoordinateAfterMoveX, yamadaCoordinateAfterMoveY ) ) tilemap.vx = tilemap.vy = 0;

      // コンソールにマップ座標を表示
      // console.log( `${yamada.mapX} ${yamada.mapY}` );（削除）
    }
  } // scene.onenterframe 終了
  // gameに、山田先生のスプライト画像を表示して、とお願いする
  // game.add( yamada );

  // gameに、シーンを追加して、とお願いする
  game.add( scene );

  // gameに、ゲームをスタートして、とお願いする
  game.start();
} );