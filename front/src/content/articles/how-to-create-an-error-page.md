---
title: '[Rails]404/500などのエラーページって結局どうすればいいの？'
description: '「そういえば404エラーのページってどうやって作るんだろう」と思い調べてみました'
tags: ['Rails']
image: 'img/header/how-to-create-an-error-page.png'
createdAt: '2019-06-24'
isDraft: false
---

Railsでアプリケーションを開発している時にふと、「そういえば404エラーのページってどうやって作るんだろう」と思い調べてみました。

---------

**※こちらの記事は、Qiitaにて公開していたものを2020/03/01にこちらに移行しています。**

元記事は[こちら](https://qiita.com/dach1_ken/items/6bbdfdd56ef84e3b2233)

※現在はこちらのページのURLのみ記載されています。

-------

## 基本Railsが勝手にいい感じにしてくれます。

まず大前提として、作る必要はありません。

というのも、Railsが自動で作ってくれています。

じゃあルーティングはどうするの？ということですが、それも勝手になんとかしてくれています。

なのでとくにエラー画面をおしゃれにしたい！とかじゃない場合はなにもしなくても大丈夫です。

Railsさんすごい。

--------

### 参考: 他の記事と言ってることが違う！と思ったあなたへ

「rails 404」とかでググると、こんな記事がたくさん出てきます。

- [Railsの404/500エラーページ、簡単作成手順](http://morizyun.github.io/blog/custom-error-404-500-page/)
- [Railsで404/500エラーの処理](http://qiita.com/blueinkinc/items/fb1ea251197003deec12)
- [Railsで404エラーメッセージを出すために](http://qiita.com/suzuki_koya/items/b2a7039b08917e2171df)

これらの記事では、application_controller.rbを触ったり、404ページを1から作ったりしていますが、よくない方法のようです。

僕には理解できませんでしたが、[Railsの404,500エラーページをカスタマイズのコメント](http://qiita.com/mr-myself/items/c2f4fb2e5dcee6a336f3#comment-23298b703d75b7d27487)で詳しく説明してくださっています。

※[ここ](http://qiita.com/mr-myself/items/c2f4fb2e5dcee6a336f3#comment-23298b703d75b7d27487)に書いてあることがわかる人はこちらの方法で動的なページを作られるといいと思います。とりあえず公開したい！という僕のような人は後に書いてある方法でおとなしく静的なページを作るべきだと思います。(動的、静的については後で少し触れます。)

僕もはじめこれらの方法でやっていたのですが、http://localhost:3000/hoge.txt のように、拡張子がhtmlじゃない場合に意図した画面遷移にならなかったので修正しました。

-----------

## まずはエラー画面を確認しよう

先ほどRailsが自動で作ってくれていると書いたエラーページについては、publicの中にあります。

- public/404.html
- public/422.html
- public/500.html

の3つがエラーページになります。(これらの違いは後で説明します。)

まずはこれらのページが実際にエラーの際に表示されるようにしましょう。

なにも触らないままdevelopment環境で適当なアドレス打ってみても、こんな画面が出ますよね。

![エラー画面1.png](img/how-to-create-an-error-page/1.png)

なのでエラー画面を確認したい！という時は、config/environments/development.rb の中身を少しいじる必要があります。
こんな感じでコメントアウトしてある部分を、コメントアウトを外しfalseにしてみてください。

```ruby
# config/environments/development.rb

config.consider_all_requests_local = false
```

参考: [Railsで404/500エラーの処理](http://qiita.com/blueinkinc/items/fb1ea251197003deec12)

僕の場合は13行目ぐらいにありました。

その後サーバーを再起動して、適当なアドレスを打ち込むとこんな画面が出てくるようになると思います。

![エラー画面2.png](img/how-to-create-an-error-page/2.png)

この画面がRailsが自動で作ってくれた404エラーページ(=public/404.html)になります。

これを修正すれば、自分だけのエラーページの完成です！

-----------

## エラーページを修正しよう

エラーページを修正するために、まずは400、422、500の違いを知りましょう。

[LIGさんの記事](https://liginc.co.jp/web/programming/164003)によれば、

> - 404 Not Found: リソースが見つからなかった場合。
> - 422 Unprocessable Entity: WebDAVの拡張ステータスコード。
> - 500 Internal Server Error: サーバ内部でエラーが発生した場合に返される。

だそうです。

僕は修正するための文言はこちらの記事を参考にして作ってみました。

[Railsアプリケーションの422エラーページの文言をどうするといいのか調べてみた](http://qiita.com/icb54615/items/d6a1b504c4d1a5288d73)

-----------

### 参考: 静的ページ、動的ページについて

なぜRailsなのに、エラーページは拡張子が.htmlなんだろう？と思われた方もいらっしゃるかもしれません。

これには、この作り方では静的なエラーページしか作れないことが関係しています。

めっちゃ簡単に説明すると、静的なページとはデータをそのまま表示するページのことです。

.html.erbにしてしまうと、.htmlに変換が必要なので、静的なページとは言えないのですね。

参考: [静的ページ/動的ページとは？](http://htmlspecial.net/2008/03/17/aaaaeawebyuy/)

-----------

### 静的ページをRails慣れした人が触る際に注意すべきこと

先ほど説明したように、この方法ではエラーページが静的なページになってしまいます。

そのため、cssファイルの読み込み等はできません。

cssなんかはhtmlファイルにベタ書きすればいいのですが、僕は画像の挿入で少し戸惑いました。

Rails慣れしていると、` <%= image_tag %>`が使えないとURLの指定をどうしたらいいかわかりませんね…

結局、public/imagesの中に入れて、以下のような書き方でなんとかしました。

` <img src="https://hogehoge.com/images/[画像ファイル名]">`

エラーページにはロゴとかないと「急にわけわからないページになった！」と不安になりそうなので、ロゴ入れておいたほうがいいかなと思います。

---------

## 参考にした記事

- [Railsの404/500エラーページ、簡単作成手順](http://morizyun.github.io/blog/custom-error-404-500-page/)
- [Railsで404/500エラーの処理](http://qiita.com/blueinkinc/items/fb1ea251197003deec12)
- [Railsで404エラーメッセージを出すために](http://qiita.com/suzuki_koya/items/b2a7039b08917e2171df)
- [Railsの404,500エラーページをカスタマイズ](http://qiita.com/mr-myself/items/c2f4fb2e5dcee6a336f3)
- [【エラーコード】HTTPステータスコードの原因一覧](https://liginc.co.jp/web/programming/164003)
- [Railsアプリケーションの422エラーページの文言をどうするといいのか調べてみた](http://qiita.com/icb54615/items/d6a1b504c4d1a5288d73)
- [静的ページ/動的ページとは？](http://htmlspecial.net/2008/03/17/aaaaeawebyuy/)
