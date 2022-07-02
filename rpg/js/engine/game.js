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

    // ゲームに登場する全てのもの（オブジェクト）を入れるための配列 （削除）
    // this.objs = []; （削除）

    // シーンに入れておくための配列
    this.scenes = [];
    // 現在のシーンを入れておくためのもの
    this.currentScene;


    // 現在のシーンを一時的に入れておくためのもの。シーンが切り替わったかどうかを判断するのに使う
    this._temporaryCurrentScene;

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

    // 現在のシーン(currentScene)に何も入っていない時は、scene[0]を代入
    this.currentScene = this.currentScene || this.scenes[0];

    // ゲームがはじまったときと、ブラウザのサイズが変わったときに呼ばれる。縦横の日を変えずに、canvasを拡大縮小できる
    const _resizeEvent = () => {
      // ブラウザとcanvasの比率の、縦と横を計算し、小さい方を_raitoに代入する
      const _ratio = Math.min( innerWidth / this.canvas.width, innerHeight / this.canvas.height );
      // canvasのサイズを、ブラウザに合わせて変更する
      this.canvas.style.width = this.canvas.width*_ratio + 'px';
      this.canvas.style.height = this.canvas.height*_ratio + 'px';
    } // _resizeEvent() 終了

    // ブラウザのサイズが変更されたとき、_resizeを呼び出す
    addEventListener( 'resize', _resizeEvent, { passive: true } );
    // _resizeを呼び出す
    _resizeEvent();

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

    // 画面がタッチされたり、指が動いたりしたときなどに呼ばれる
    // シーンや、スプライトなどのオブジェクトの左端から見た、それぞれの指の位置を取得できる
    const _touchEvent = e => {
      // デフォルトのイベントを発生させない
      e.preventDefault();
      // タッチされた場所などの情報を取得
      const _touches = e.changedTouches[0];
      // ターゲット（今回はcanvas）のサイズ、ブラウザで表示されている部分の左上から見てどこにあるか、などの情報を取得
      const _rect = _touches.target.getBoundingClientRect();
      // タッチされた場所を計算
      const _fingerPosition = {
        x: ( _touches.clientX - _rect.left ) / _rect.width * this.canvas.width,
        y: ( _touches.clientY - _rect.top ) / _rect.height * this.canvas.height
      };
      // イベントのタイプを_eventTypeに代入
      const _eventType = e.type;
      // タッチイベントを割り当てるためのメソッドを呼び出す
      this.currentScene.assignTouchevent( _eventType, _fingerPosition );
    } // _touchEvent() 終了

    // タッチされたとき
    this.canvas.addEventListener( 'touchstart', _touchEvent, { passive: false } );
    // 指が動かされたとき
    this.canvas.addEventListener( 'touchmove', _touchEvent, { passive: false } );
    // 指がはなされたとき
    this.canvas.addEventListener( 'touchend', _touchEvent, { passive: false } );
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

    // 現在のシーンのupdateメソッドを呼び出す
    this.currentScene.update();

    // 一時的に入れておいたシーンが現在のシーンでないとき、（シーンが切り替わったとき）、現在のシーンのonchangesceneメソッドを呼び出す
    if ( this._temporaryCurrentScene !== this.currentScene ) this.currentScene.onchangescene();

    // ゲームに登場する全てのもの（オブジェクト）の数だけ繰り返す
    // 現在のシーンの、ゲームに登場するすべてのもの（オブジェクト）の数だけ繰り返す
    for ( let i=0; i<this.currentScene.objs.length; i++ ) {
      // スプライトやテキストなど、全てのオブジェクトのupdateメソッドを呼び出す
      // 現在のシーンの、すべてのオブジェクトのupdateメソッドを呼び出す
      this.currentScene.objs[i].update( this.canvas );
    }

    // 現在のシーンを覚えておいてもらう
    this._temporaryCurrentScene = this.currentScene;

    // 自分自身（_mainLoop）を呼び出して、ループさせる
    requestAnimationFrame( this._mainLoop.bind( this ) );
  } // _mainLoop() 終了

  /**
   * ゲームにシーンを追加できるようになる、addメソッドを作成
   * 引数
   * scene : 追加したいシーン
   */
  add( scene ) {
    // 引数がSceneのとき、this.sceneの末尾にsceneを追加
    if ( scene instanceof Scene ) this.scenes.push( scene );
    // 引数がSceneでなければ、コンソールにエラーを表示
    else console.error( 'Gameに追加できるのはSceneだけだよ！' );
  } // add() 終了

  /**
   * オブジェクトをゲームに追加できるようになる、addメソッドを作成
   * 引数
   * obj : 追加したいオブジェクト
   */
  // add( obj ) {
    // this.objs配列の末尾に、objの値を追加
    // this.objs.push( obj );
  // } // add() 終了

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
