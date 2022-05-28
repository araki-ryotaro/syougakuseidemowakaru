
      // 画面に画像を表示する
      document.write( '<img id="rico" src="rico.png">' );

      // キャラクターの位置
      var y = 0;
      var x = 0;

      // なにかキーが押されたとき、keydownという関数を呼び出す
      addEventListener( "keydown", keydownfunc );

      // キーが押されたときに呼び出される関数
      function keydownfunc( event ){

        // 押されたボタンに割り当てられた数値を、key_codeに代入
        var key_code = event.keyCode;

        // 「左ボタン」が押されたとき、xの値から32を引き算する
        if( key_code === 37 ) x -= 32;

        // 「上ボタン」が押されたとき、yの値から32を引き算する
        if( key_code === 38 ) y -= 32;

        // 「右ボタン」が押されたとき、xの値から32を足し算する
        if( key_code === 39 ) x += 32;

        // 「左ボタン」が押されたとき、yの値から32を足し算する
        if( key_code === 40 ) y += 32;

        // りこちゃんの画像の位置を反映させる
        document.getElementById( 'rico' ).style.top = y + "px";
        document.getElementById( 'rico' ).style.left = x + "px";

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