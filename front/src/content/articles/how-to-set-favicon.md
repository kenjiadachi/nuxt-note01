---
title: '[Hugo]faviconを設定する方法'
description: 'Hugoをつかっているこのページにfaviconを設定してみました'
tags: ['Hugo', 'favicon']
image: 'img/header/how-to-set-favicon.png'
createdAt: '2020-02-28'
---

Hugoで作成したこちらのページに、faviconを設定してみました。

この記事では、Hugoで作られたページにfaviconを設定する方法についてご紹介します。

-------

<!--more-->

## ことばの紹介

まずは知らない方もいるかと思うので、ことばの紹介から。

わかってるよ！って人は飛ばしてください。

-------

### faviconとは？

こちらの[ferretさんの記事](https://ferret-plus.com/387)が効果も含めわかり易かったので引用します。

> ファビコンとは、Webブラウザでページを開いた際、タブ部分に表示されるアイコンを指します。タブブラウザ（1つの画面で複数のページが開けるブラウザ）で複数のタブを開いた時に、ファビコンはページを判別する際の目印となります。

> タブを開きすぎて、見たいホームページがどのタブなのかを見失ってしまったという経験をしたことはありませんか？
そういった迷子になってしまったユーザーに対して、ファビコンを目印に目当てのホームページみつけてもらうことも可能になります。

> また、ユーザーがホームページをお気に入りに登録した際にも、ファビコンがあるのと無いのとでは印象と見つけやすさが変わってきます。

まあ、あったほうがいいよね、という感じですね。

なければないで全然いいとは思うのですが、ぼくはなんとなくこだわりたかったので作成しました。

-------

### Hugoとは？

こちらについては詳しく、[このページ](../../blog/how-to-create-this-page/#hugo)で紹介しています。

いろいろテーマを設定できるのが便利ですね。

こちらのページでは、現在`hugo-future-imperfect-slim`というテーマを設定しています。

-------

## 設定していきましょう

さあ、いよいよ設定していきましょう。

-------

### faviconを作成する

まずはfaviconを作らないといけませんね。

ぼくは[こちら](https://www.favicon-generator.org/)のサイトを使用しました。

スマートフォン向けのfaviconも自動で大量に生成してくれるのですごく便利です。


ほかにもいくつかfaviconを作成するためのサイトがあるので紹介しますね。

- [favicon.cc](http://www.favicon.cc/)
- [Favicon generator](http://favicon-generator.org/editor/)
- [favikon](http://www.favikon.com/)
- [favicon generator](http://tools.dynamicdrive.com/favicon/)

いろいろ試してみたのですが、最初にあげた[Favicon & App Icon Generator](https://www.favicon-generator.org/)が一番使いやすいように思いました。

ほかにも、ぼくの使用しているテーマ`hugo-future-imperfect-slim`では、[RealFaviconGenerator](https://realfavicongenerator.net/)が推奨されていました。

version指定とかができるのかな？と思いますが試していません…

まあいずれかのサイトでサクッと作ってしまいましょう。

画像ベースで作成するときは、ベースの画像を正方形にしておくといらないところに気を使わずに済むのでオススメです。

-------

### Hugoの設定を行う

**※こちらはテーマごとに設定が異なります！**

いよいよHugoの設定です。

冒頭にもある通り、こちらはテーマごとに設定が異なりそうです。

詳しくは[こちら](https://discourse.gohugo.io/t/should-themes-include-favicons/10033)に書いているのですが、faviconをテーマに含めるべきか？というのが議論されています。

作ってみればわかるのですが、faviconが無数に増えすぎてテーマに含めていいのか？という議論になっていますね。

こちらでは、「`config.toml`で設定できるようにテーマも設定するべき」という結論になっていますが、テーマによってはその設定をそもそも入れていないこともありそうです。

-------

さて、今回僕が使用しているテーマ`hugo-future-imperfect-slim`では`config.toml`で設定できるようになっていましたのでこちらで設定してみます。

設定できるかどうか？は設定しているテーマの`exampleSite/config.toml`をみれば判断できそうですね。

ちなみに、`hugo-future-imperfect-slim`の`exampleSite/config.toml`ではこんな感じになっていました。

```toml
# config.toml

# 省略

[params]
  # 省略

  [params.meta]
    # Sets the meta tag description
    description         = "A theme by HTML5 UP, ported by Julio Pescador. Slimmed and enhanced by Patrick Collins. Multilingual by StatnMap. Powered by Hugo."
    # Sets the meta tag author
    author              = "HTML5UP and Hugo"
    # If you would like to add more comprehensive favicon support passed root
    # directory favicon.ico, utlize this funtion. It is recommened to use
    # https://realfavicongenerator.net to generate your icons as that is the basis
    # for the theme's naming.
    favicon             = false
    svg                 = true
    faviconVersion      = "1"
    msColor             = "#ffffff" # Copy from the https://realfavicongenerator.net
    iOSColor            = "#ffffff" # Copy from the https://realfavicongenerator.net

```

こちらの、`favicon`、`svg`、`faviconVersion`、`msColor`、`iOSColor`の項目がfaviconの設定に関わってそうですね。

ぼくは、これらをこのような設定に変えました。

```toml
# config.toml

# 省略

[params]
  # 省略

  [params.meta]
    # Sets the meta tag description
    description         = ""
    # Sets the meta tag author
    author              = "kenji adachi"
    # If you would like to add more comprehensive favicon support passed root
    # directory favicon.ico, utlize this funtion. It is recommened to use
    # https://realfavicongenerator.net to generate your icons as that is the basis
    # for the theme's naming.
    favicon             = true
    svg                 = true
    faviconVersion      = ""
    msColor             = "#ffffff" # Copy from the https://realfavicongenerator.net
    iOSColor            = "#ffffff" # Copy from the https://realfavicongenerator.net

```

大事なのは、`faviconVersion = ""`の部分ですかね。

これに値が入っていると、`?v=1`というパラメータがついたfavicon設定データを探しているようです。

この設定を行ったあと、作成したfaviconファイル一式を`static/favicon`内にまとめて入れます。

最後に、jsonファイルの名前を`site.webmanifest`に変更すれば、faviconの設定が完了しました！

-------

## 参考にしたサイト

- [Hugoでfaviconをつけよう](https://xn--v6q832hwdkvom.com/post/hugo%E3%81%A7favicon%E3%82%92%E3%81%A4%E3%81%91%E3%82%88%E3%81%86/)
- [ファビコンとは〜設置すべき理由と無料で簡単に作成できるツールを紹介](https://ferret-plus.com/387)

-------

## こちらもぜひご一緒に！

- [[Hugo]Docker上で管理できるポートフォリオを作ってみたよ](../../blog/how-to-create-this-page/)
- [[Hugo]Hugoを使いこなすためのオススメファイル構造](../../blog/file-structure-for-mastering-hugo/)
