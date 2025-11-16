$(function(){
    /*----------------------------------
    タイトルのスライド
    ------------------------------------*/
    //スクロールのたびにチェック
    $(window).on('scroll',function(){
        $('.slide').each(function(){
            let position = $(this).offset().top;
            let scroll = $(window).scrollTop();
            let windowHeight = $(window).height();
            if(scroll > position - windowHeight + 100){
                $(this).addClass('inview');
            }
        });
    });

    // ページ読み込み時にもチェック
    $(window).trigger('scroll');

    /*-------------------------------------------
    ハンバーガーメニュー
    --------------------------------------------*/
    $('.hamburger').on('click',function(){
        //ハンバーガーメニューの共通処理を呼び出す
        hamburger();
    });
    //メニューのリンクをクリックしたとき
    $('.hamburger-navi ul a').on('click',function(){
        hamburger();
    });

    /*-------------------------------------------
    ページのスクロール遷移
    --------------------------------------------*/
    // TOP と CONTACT へのリンクだけを対象にする
    $('a[href="#work-list"], a[href="#contact"]').on('click', function(e){
      e.preventDefault(); // 瞬間移動を止める

      let targetId = $(this).attr('href');
      let $target = (targetId === "#top") ? $('html') : $(targetId);

      // 位置を取得
      let position = $target.offset().top;

      // アニメーションスクロール
      $('html, body').animate(
        {scrollTop: position}, // スクロール先
        700,                   // 時間 (ms)
        'swing'                // 動き方
      );
    });

    /*-------------------------------------------
    作品モーダルウィンドウ
    --------------------------------------------*/
    $(".work img").on("click", function() {
      const $img = $(this);

      let points = [];
      for (let i = 1; i <= 5; i++) { // 最大5個まで対応
        if ($img.data("points" + i)) {
          points.push($img.data("points" + i));
        }
      }

      $("#work-title").text($img.data("title"));
      $("#work-catch").text($img.data("catch"));
      $("#work-img").attr("src", $img.attr("src"));
      $("#work-period").text($img.data("period"));
      $("#work-skill").text($img.data("skill"));
      $("#work-role").text($img.data("role"));
      $("#work-points").html(points.map(p => "<li>" + p + "</li>").join(""));
      $("#work-demo").attr("href", $img.data("demo"));
      $("#work-github").attr("href", $img.data("github"));

      $("#work-modal").fadeIn();
    });

    $(".close, #work-modal").on("click", function(e) {
      if (e.target === this) { // 背景クリックでも閉じる
        $("#work-modal").fadeOut();
      }
    });

    /*-------------------------------------------
    スキルモーダルウィンドウ
    --------------------------------------------*/
    const skills = {
        html: {
          title: "HTML",
          description: "セマンティックなマークアップを意識してコーディング可能。",
          example: "ポートフォリオサイト全体、FigmaのデザインをHTMLで設計。レスポンシブ対応も可能。",
          strengths: "デザインカンプを正確に反映し、整理されたHTMLを書くことが可能"
        },
        css: {
          title: "CSS",
          description: "FlexboxやGridを用いたレイアウト構築、アニメーション表現が可能。",
          example: "案件用ランディングページを制作し、スタイルとアニメーションを担当。",
          strengths:"コメントを使い、保守しやすいスタイル設計を意識"
        },
        django: {
          title: "Django",
          description: "モデル・ビュー・テンプレートを使った小規模Webアプリ開発経験あり。",
          example: "予約管理システムを開発し、ユーザーCRUDを実装。",
          strengths: "小規模案件に必要な機能を短期間で形にできる"
        },
        js: {
          title: "JavaScript/jQuery",
          description: "DOM操作、イベント処理、Ajaxなどを活用可能。",
          example: "モーダルやスムーススクロールを実装。",
          strengths: "jQueryによって、様々なアニメーションの実装が可能"
        },
        figma: {
          title: "Figma",
          description: "UI設計やデザインカンプの作成が可能。",
          example: "Web制作案件でワイヤーフレーム作成に使用。",
          strengths: "デザインと実装の橋渡しができるため、スムーズな制作進行が可能"
        }
    };

    // スキル名をクリックしたらモーダルを開く
    $(".skill-row").on("click", function(e) {
      e.preventDefault();
      const key = $(this).data("skill"); // data-skillの値を取得
      const skill = skills[key];

      // モーダルに内容をセット
      $("#skill-title").text(skill.title);
      $("#skill-description").text(skill.description);
      $("#skill-example").text(skill.example);
      $("#skill-strengths").text(skill.strengths);


      // モーダルを表示
      $("#skill-modal").fadeIn();
    });

    // 閉じるボタン
    $(".close").on("click", function() {
      $("#skill-modal").fadeOut();
    });

    // 背景クリックでも閉じる
    $(window).on("click", function(e) {
      if ($(e.target).is("#skill-modal")) {
        $("#skill-modal").fadeOut();
      }
    });

    /*=========================================
    ハンバーガーメニュー共通処理
    ===========================================*/
    //ハンバーガーメニューをクリックしたときとメニュー内のリンクをクリックしたときの
    //処理が同じなので処理を共通化する
    function hamburger() {
        //toggleClassを使用することで、hanburgerクラスにactiveクラスが存在する場合は削除、
        //存在しない場合を追加する処理を自動で行ってくれる
        $('.hamburger').toggleClass('active');

        if($('.hamburger').hasClass('active')){
            //hamburgerクラスにactiveクラスが存在する場合は、hamburder-naviにもactiveクラスを追加する
            $('.hamburger-navi').addClass('active');
        } else {
            //hambugerクラスにactiveクラスが存在しない場合は、hamburder-naviからactiveクラスを削除する
            $('.hamburger-navi').removeClass('active');
        }
    }
});