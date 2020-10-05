---
title: '[Rails]Bootstrapでレスポンシブな『吹き出し』を作る方法'
description: 'Bootstrapで簡単に人が話しているような吹き出しを作る方法を模索したのでまとめてみました'
tags: ['Rails']
image: 'img/header/make-responsive-speech-bubbles-with-bootstrap.png'
createdAt: '2017-01-17'
---

2018/03/25追記：

こちら、Bootstrap3の話です。

Bootstrap4では、.row-centerなど実装されたようなので、もっと簡単に作成できますね。

詳しくは[Bootstrap4移行ガイド](http://cccabinet.jpn.org/bootstrap4/)をみてください。

--------

**※こちらの記事は、Qiitaにて公開していたものを2020/03/01にこちらに移行しています。**

元記事は[こちら](https://qiita.com/dach1_ken/items/02f7bd65e3a9f7c8d89a)

※現在はこちらのページのURLのみ記載されています。


-------


![イメージ画像](./img/1.png)

Bootstrapを導入しているRailsアプリで、できるだけ簡単に人が話しているような吹き出しの作り方を模索したのでまとめてみました。

------

## はじめに完成系を

![吹き出し画像1](./img/2.png)

このように、人が話しているような吹き出しの作り方をご紹介します。

![吹き出し画像2](./img/3.png)

画面を小さくしても、きちんとレスポンシブに変化してくれます。

ソースコードはこんな感じになっています。

```html.erb
<!-- sample.html.erb -->

<div class="row row-center">
 <div class="col-lg-2 col-md-3 col-sm-4 col-xs-5">
  <%= image_tag "/images/woman.png", alt: "東京藝術大学 Mさん", class:"img-responsive img-circle reviews" %>
 </div>
 <div class="col-lg-10 col-md-9 col-sm-8 col-xs-7">
  <div class="popover right show"style="position:relative; top=-90px; left=100px; max-width:100%; display:inline;">
   <div class="arrow"></div>
   <h3 class="popover-title">東京藝術大学 Mさん</h3>
   <div class="popover-content">
    <p>兵庫県神戸市出身。4歳よりピアノ、12歳よりフルートをはじめる。<br>東京藝術大学　音楽学部器楽科フルート専攻在学中。<br>第67回全日本学生音楽コンクール大阪大会入選。第9回神戸新人音楽賞コンクール優秀賞受賞。</p>
   </div>
  </div>
 </div>
</div>
```

```scss
// sample.scss

// 吹き出し用の設定
.popover.show{
  margin-bottom: 10px;
}

// 横の画像用の設定
img.reviews {
  margin-bottom: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

// 並んでいるものを上下中央で揃える設定
.row-center{
  text-align: center;
  letter-spacing: -0.4em;
}
.row-center > [class*='col-'] {
  display: inline-block;
  letter-spacing: 0;
  vertical-align: middle;
  float: none !important;
}
```

これからできるだけ詳しくこのコードが何を書いているのか？を紹介していきます。

---------

## 吹き出しの作り方

これは、Bootstrapにある機能で簡単に作ることが可能です。

このページ([twitter bootstrapの吹き出し](http://endoyuta.com/2013/09/30/twitter-bootstrap%E3%81%AE%E5%90%B9%E3%81%8D%E5%87%BA%E3%81%97/))を参考にしながら、上下左右向きの静的な吹き出しを作りましょう。

この吹き出しですが、本来modal的に表示するものなので、z-indexの値が異常に高く(確か1000)設定されています。

動くナビバー等を設定されている方はz-indexの値を上書きしておきましょう。

また、marginが設定されてないので、以下のように設定しておきましょう。


```scss
// sample.scss

// 吹き出し用の設定
.popover.show{
  margin-bottom: 10px;
}
```

--------

## レスポンシブな図の大きさの変え方

これも基本的にBootstrapの機能だけで作れます。

- `class:"img-responsive"`を`image_tag`に設定
- 画像、吹き出しを横に並べる場合は`col-xs-*`を足して12になるようにそれぞれを囲む`div`に設定(僕の場合はどのデバイスでもできるだけ綺麗なバランスで見られるよう、`col-sm-*`、`col-md-*`、`col-lg-*`のそれぞれを指定しています)

また、こちらもmarginがまったく設定されていなく、影が吹き出しにしか無いのも変なので、以下のように設定しておきましょう。

```scss
// sample.scss

// 横の画像用の設定
img.reviews {
  margin-bottom: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
```

------

## 図と並べる時に上下中央で揃える方法

Bootstrapのグリッドシステムでは、rowの中身が横に並ぶ時には上揃えになってしまいます。

そこで、この設定を変更しておきましょう。

こちらは、このページ([簡単！Bootstrap拡張：センタリンググリッドシステム](https://www.riarise.com/coding/bootstrap-extends-center-grid/))を参考にしました。

```scss
// sample.scss

// 並んでいるものを上下中央で揃える設定
.row-center{
  text-align: center;
  letter-spacing: -0.4em;
}
.row-center > [class*='col-'] {
  display: inline-block;
  letter-spacing: 0;
  vertical-align: middle;
  float: none !important;
}
```

これで完成です。

今回は右に吹き出しがあるパターンを作りましたが、左にあるパターンも見たい場合は、[LiveDeliのHP](https://www.livedeli.com/)をご覧ください。

-------

## 参考にしたサイト

- [Bootstrap4移行ガイド](http://cccabinet.jpn.org/bootstrap4/)
- [twitter bootstrapの吹き出し](http://endoyuta.com/2013/09/30/twitter-bootstrap%E3%81%AE%E5%90%B9%E3%81%8D%E5%87%BA%E3%81%97/)
- [簡単！Bootstrap拡張：センタリンググリッドシステム](https://www.riarise.com/coding/bootstrap-extends-center-grid/)

-------

## こちらもぜひご一緒に！

- [[Rails]js-cookie.jsを使ってbootstrap4のタブの情報を保持する](../../blog/how-to-retain-the-information-of-bootstrap4-tab-using-js-cookie/)
- [[Rails]動的なvalidationをParsleyと、Bootstrap4を使っておしゃれに実装する](../../blog/how-to-use-parsely-in-rails/)
