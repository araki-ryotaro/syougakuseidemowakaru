
      // 画面に画像を表示する
      document.write( '<img id="rico" src="rico.png">' );

      // キャラクターの位置
      // var y = 0;
      // var x = 0;

      var rico = new Object();
      rico.x = 0;
      rico.y = 0;

      var key = new Object();
      key.up = false;
      key.down = false;
      key.right = false;
      key.left = false;

      // メインループ
      function main() {

        // キーボードが押されたとき、keydownfunc関数を呼び出す
        addEventListener( "keydown", keydownfunc );
        // キーボードが離されたとき、keyupfunc関数を呼び出す
        addEventListener( "keyup", keyupfunc );

        // 「左ボタン」が押されたとき、xの値から32を引き算する
        if( key.left === true ) rico.x -= 32;
        // 「上ボタン」が押されたとき、yの値から32を引き算する
        if( key.up === true ) rico.y -= 32;
        // 「右ボタン」が押されたとき、xの値から32を足し算する
        if( key.right === true ) rico.x += 32;
        // 「左ボタン」が押されたとき、yの値から32を足し算する
        if( key.down === true ) rico.y += 32;

        // りこちゃんの画像の位置を反映させる
        document.getElementById( 'rico' ).style.top = rico.y + "px";
        document.getElementById( 'rico' ).style.left = rico.x + "px";

        // main関数、つまり自分自身の関数を呼び出すことでループさせる
        requestAnimationFrame(main);

      }

      requestAnimationFrame(main);

      // キーが押されたときに呼び出される関数
      function keydownfunc( event ) {
      // 押されたボタンに割り当てられた数値を、key_codeに代入
      var key_code = event.keyCode;
      // 「左ボタン」が押されたとき、key.leftをtrueにする
      if( key_code === 37 ) key.left = true;
      // 「上ボタン」が押されたとき、key.upをtrueにする
      if( key_code === 38 ) key.up = true;
      // 「右ボタン」が押されたとき、key.rightをtrueにする
      if( key_code === 39 ) key.right = true;
      // 「左ボタン」が押されたとき、key.downをtrueにする
      if( key_code === 40 ) key.down = true;
      }

      // キーが離されたときに呼び出される関数
      function keyupfunc( event ){
        // 押されたボタンに割り当てられた数値を、key_codeに代入
        var key_code = event.keyCode;
        // 「左ボタン」が押されたとき、key.leftをfalseにする
        if( key_code === 37 ) key.left = false;
        // 「上ボタン」が押されたとき、key.upをfalseにする
        if( key_code === 38 ) key.up = false;
        // 「右ボタン」が押されたとき、key.rightをfalseにする
        if( key_code === 39 ) key.right = false;
        // 「左ボタン」が押されたとき、key.downをfalseにする
        if( key_code === 40 ) key.down = false;
        }
      // キャラクターを動かす
      // var y = 0;
      // document.getElementById('rico').onclick = function() {
      //   y += 32;
      //   document.getElementById('rico').style.top = y + "px";
      // }

      // なにかキーが押されたときkeydownfuncという関数を呼び出す
      // addEventListener( "keydown", keydownfunc );

      // キーが押されたときに呼び出される関数
      // function keydownfunc( event ){
        // アラートを表示する
      //   alert( '押したなー');
      // }