---
title: '[Heroku]Heroku上に既存の本番環境からステージング環境を作成'
description: '今はもうできないらしいですが…'
tags: ['Heroku', 'test']
image: 'img/header/copy-the-staging-environment-on-heroku.png'
createdAt: '2018-03-25'
---

2018/03/23追記:

この記事に書いている方法ではできなくなったみたいです。

参照: [heroku fork is deprecated and will be sunset 2017-12-01](https://qiita.com/mikakane/items/d49942a4ec610834a472)

--------

**※こちらの記事は、Qiitaにて公開していたものを2020/03/01にこちらに移行しています。**

元記事は[こちら](https://qiita.com/dach1_ken/items/d69dbd02caccaa03d8f1)

※現在はこちらのページのURLのみ記載されています。

-------

[LiveDeli](https://www.livedeli.com/)はHeroku上で動いているのですが、本番環境一つでは他人に開発中のものを見てもらいたい時などに不便を感じたので、ステージング環境を作成してみました。

基本的に[Heroku で既存の本番環境をコピーしてステージング環境を作る](http://qiita.com/ken_c_lo/items/32998d9dd79a15b75c14)を見ながらごちゃごちゃしてたらできました。

------

## 本番環境からforkする

terminal上で、`heroku fork --from sourceapp --to targetapp`でできます。
targetappは未作成でも自動で作成してくれました。

------

## リモートリポジトリを作成する
アプリケーション名が明示されたリモートリポジトリを作成しておくことで、heroku関連の操作をする際のミスが少なくなるはず。

`git remote add targetapp git@heroku.com:targetapp.git`のようにしておきましょう。

ただ、この作業を行った時点のブランチ名がリモートリポジトリにも引き継がれてしまいます。

Herokuはmasterブランチじゃないとbuildしてくれないので、masterブランチに切り替えてからこの操作をするようにしてください。

------

### 参考: ブランチ名を切り替え忘れた際にすること
[Herokuにmasterブランチ以外をdeployする方法](http://qiita.com/wroc/items/d15b1015c899b0cf77da)を参考にして、`git push heroku [間違えてできたブランチ名]:master --force`とすることで、masterブランチを[間違えてできたブランチ]と同じ状態にできます。

------

## おまけ
[LiveDeli](https://www.livedeli.com/)はSEOのため、[[SEO対策] Railsでherokuapp.comを正しいFQDNへリダイレクトさせる](http://qiita.com/kon_yu/items/223aa03554ff6141001f)の`ensure_domain`を設定しています。

同様の設定をされている場合は、ステージング環境の場合のみ`before_action :ensure_domain`をコメントアウトしておきましょう。

-------

## 参考にした記事

- [Heroku で既存の本番環境をコピーしてステージング環境を作る](http://qiita.com/ken_c_lo/items/32998d9dd79a15b75c14)
- [Herokuにmasterブランチ以外をdeployする方法](http://qiita.com/wroc/items/d15b1015c899b0cf77da)
- [[SEO対策] Railsでherokuapp.comを正しいFQDNへリダイレクトさせる](http://qiita.com/kon_yu/items/223aa03554ff6141001f)
