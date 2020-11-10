---
title: '[Git]BitbucketからGitHubに移行しました'
description: '使い分けがめんどくさかったのですべてGitHubに移行しました'
tags: ['Git', 'GitHub']
image: 'img/header/how-to-move-from-bitbucket-to-github.png'
createdAt: '2020-05-10'
isDraft: false
---


2019/01にGitHubのPrivateリポジトリが無料で無制限に作れるようになりましたね。

GitHub買収したMicrosoftさまさまといったところでしょうか。

[元ニュース](https://github.blog/2019-01-07-new-year-new-github/)

それまではPrivateリポジトリはBitbucket、PublicにしてもいいものはGitHubで管理していたのですが、めんどくさかったのですべてGitHubに移行しました。

<!--more-->

## ことばの紹介

まずは恒例のことばの紹介から。

---------

### Gitとは？

言わずと知れたGitですが、あらためて調べてみるとこの文章がわかりやすかったです。

> Git(ギット)とは、プログラムソースなどの変更履歴を管理する分散型のバージョン管理システムのことです。もともとはLinuxの開発チームが使用して、徐々に世界中の技術者に広まっていきました。

> Gitの最大の特徴は、分散型の名の通り、ローカル環境（自分のパソコンなど）に、全ての変更履歴を含む完全なリポジトリの複製が作成されるということです。これは、各ローカル環境がリポジトリのサーバーとなれるということです。分散型ではない、これまでのバージョン管理システムでは、サーバー上にある１つのリポジトリを、利用者が共同で使っていました。このため、利用者が増えると変更内容が衝突したり、整合性を維持することが大変でした。

> Gitでは、ローカル環境にもコードの変更履歴を保存（コミット）することができるので、リモートのサーバーに常に接続する必要がありません。このため、ネットワークに接続していなくても作業を行うことができます。

> こういったメリットが受けて、近年のバージョン管理システムの主流となっています。

引用元: [「そもそもGitって何？」、「GitとGitHubは何が違うの？」にシンプルに答えるよ](https://blog.sixapart.jp/2014-03/mttips-02-what-is-git.html)

---------

### Bitbucketとは？

こちらは[公式ページ](https://www.atlassian.com/ja/software/bitbucket)から。

> Bitbucket は、単なる Git コード管理ツールではありません。Bitbucket を使用すれば、チームはプロジェクトの計画、コラボレーションによるコード開発、テスト、デプロイをすべて 1 つの場所で行うことができます。

まあ、Gitをベースにしてプロジェクト管理や共同開発をできるツールですね。

余談ですが、アトラシアンの横浜オフィスめっちゃカッコ良くて好きです。

オフィスがいいと、いい会社なんだろうなあと妄想してしまいますよね…

---------

### GitHubとは？

こちらは悪評高い？[侍エンジニア塾](https://www.sejuku.net/blog/7901)さんのページから。

個人的にはわかりやすいので好きですけどね。

> GitHubは、Gitの仕組みを利用して、世界中の人々が自分の作品(プログラムコードやデザインデータなど)を保存、公開することができるようにしたウェブサービスの名称です。GitHubはGitHub社という会社によって運営されており、個人・企業問わず無料で利用することができます。

> GitHubに作成されたリポジトリ（保存庫のようなもの）は、基本的にすべて公開されますが、有料サービスを利用すると、指定したユーザーからしかアクセスができないプライベートなレポジトリを作ったりすることができます。

情報が古いですが、Bitbucketとおなじようなサービスです。

いまや無料になったので、わざわざBitbucketを使う必要がないという感じですね。

---------

## 移行の方法

さて本題の移行の方法ですが、以下の記事が分かりやすかったです。

[BitbucketからGithubへの移行方法](https://qiita.com/takish/items/684dd34156ee3f178224)

ただ、URLが変更になっているようなのでこちらからimportしたいレポジトリのURLを入力してください。

https://github.com/new/import

また、[公式ページ](https://help.github.com/ja/github/importing-your-projects-to-github/importing-a-repository-with-github-importer)にもあるように、プライベートネットワーク上で管理している場合などはコマンドラインから行う形が良さそうですね。

コマンドラインからのインポート方法については[こちら](https://help.github.com/ja/github/importing-your-projects-to-github/importing-a-git-repository-using-the-command-line)を参考にしてください。

今日はこのあたりで。

---------

## 参考にさせていただいたサイト

- [「そもそもGitって何？」、「GitとGitHubは何が違うの？」にシンプルに答えるよ](https://blog.sixapart.jp/2014-03/mttips-02-what-is-git.html)
- [BitbucketからGithubへの移行方法](https://qiita.com/takish/items/684dd34156ee3f178224)
- [GItHub公式ドキュメント](https://help.github.com/ja/github/searching-for-information-on-github)
