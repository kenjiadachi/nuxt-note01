---
title: '[Bootstrap]Bootstrapを使っているサービスでCSSで画面の一部をスクロールさせる'
description: 'slackのように、画面の一部だけスクロールするcssの設定です'
tags: ['Bootstrap']
image: 'img/header/how-to-scroll-part-of-the-screen-with-css.png'
createdAt: '2018-06-25'
isDraft: false
---

slackのように、画面の一部だけスクロールするようなcssの設定の仕方を調べる際に少し困ったので備忘録に。

Bootstrapを使っている前提で話を進めます。

--------

**※こちらの記事は、Qiitaにて公開していたものを2020/03/02にこちらに移行しています。**

元記事は[こちら](https://qiita.com/dach1_ken/items/b0407f2c875fdef4c942)

※現在はこちらのページのURLのみ記載されています。

--------

## 基本
[[CSS]画面内の一部だけをスクロール](http://www.vanfu-vts.jp/blog/2012/10/css-2/)に書いてあるように、縦へのスクロールのみ可能にしたければ、基本はこの形で実装が可能です。

```scss
//sample.scss

.scroll {
  overflow-y: auto;
}
```

ただ、Bootstrapを使っていると、おそらく分割の際にこのような形で実装していると思われるため、これだけでは動かないかと思います。

```html.haml
# sample.haml

.row
  .col-3.scroll
    スクロールを分ける場所その1
  .col-9.scroll
    スクロールを分ける場所その2
```

[cssで画面内の一部だけスクロールさせる](https://qiita.com/Yorinton/items/49c93a8c3233f204c677)では、

> ※なぜか親要素(スクロールさせるdiv要素のさらに親要素)にposition:absouteをしないと出来なかった。

とありますが、`position: absoute`は設定したくない…と思い悩んでいましたが、これはrowの設定として、cssがdefaultで`height: 100%`になっているため、起きてしまっていました。

--------

## height固定のオススメの方法

このようにするのがオススメです。

```scss
// sample.scss

.scroll {
  overflow-y: auto;
}

.height-fixed {
  height: 95vh;
}
```

```haml
# sample.haml

.row.height-fixed
  .col-3.scroll
    スクロールを分ける場所その1
  .col-9.scroll
    スクロールを分ける場所その2
```

[画面サイズに合わせて高さを指定する3つの方法](http://weboook.blog22.fc2.com/blog-entry-411.html)に詳しく載っていますが、`row`の高さを`height: 95vh;`に指定することで、画面の95%で固定をしてくれます。

直感的な指定方法で、画面に合わせて固定サイズも設定してくれるので、こちらが便利かと思います。

-------

## 参考にしたサイト

- [cssで画面内の一部だけスクロールさせる - Qiita](https://qiita.com/Yorinton/items/49c93a8c3233f204c677)
- [画面サイズに合わせて高さを指定する3つの方法](http://weboook.blog22.fc2.com/blog-entry-411.html)
