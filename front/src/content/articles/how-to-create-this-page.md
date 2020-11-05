---
title: '[Hugo]Docker上で管理できるポートフォリオを作ってみたよ'
description: 'Hugoをつかってこのページを作ってみたので、作り方をまとめてみました。'
tags: ['Hugo', 'Docker', 'GitHub']
image: 'img/header/how-to-create-this-page.png'
createdAt: '2020-01-06'
isDraft: false
---

Hugoをつかってこのページを作ってみたので、作り方をまとめてみました。

ローカルでは、Dockerを用いて仮想環境上で動かしています。

また、ホスティングサービスはGitHub Pagesを用いています。

この記事では、HugoをDocker上で動かし、それをGitHub Pagesで公開するまでをご紹介します。

-------

<!--more-->

## ことばの紹介

まずは知らない方もいるかと思うので、ことばの紹介から。

わかってるよ！って人は飛ばしてください。

-------

### Hugoとは？

[Hugoの公式ページ](https://gohugo.io/)によると、

> Hugo is one of the most popular open-source static site generators. With its amazing speed and flexibility, Hugo makes building websites fun again.

Google翻訳にぶちこむと

> Hugoは、最も人気なオープンソースの静的サイトジェネレーターの1つです。その驚くべき速度と柔軟性により、HugoはWebサイトの構築を再び楽しくします。

とのことです。

これまで、BlogなどはWordPressが主流でしたが、わざわざすべての機能を管理画面からしなくてもよくない？という流れから、このような静的サイトジェネレーターが流行り出しているのかなあという個人的な見解です。

WordPress、ちょっと触っただけでも結構めんどくさいですもんね…

その点、このような静的サイトジェネレーターだとファイルの移動とかするだけで簡単に思った通りになる、というのがいいところかなあと思います。

Hugo以外にも

- [Jekyll](https://jekyllrb.com/)
- [Hexo](https://hexo.io/)
- [Gatsby](https://www.gatsbyjs.org/)

などが有名ですね。

-------

### Dockerとは

これも[Dockerの公式ページ](https://www.docker.com/why-docker)によると、

> The only independent container platform that enables organizations to seamlessly build, share and run any application, anywhere—from hybrid cloud to the edge.

はたまたGoogle翻訳にぶちこむと

> 組織がハイブリッドクラウドからエッジまで、あらゆるアプリケーションをシームレスに構築、共有、実行できるようにする唯一の独立したコンテナプラットフォーム。

誰とでも簡単に開発環境を共有できるプラットフォーム、といった感じですかね。

僕個人としては、けっこう一人で開発などすることが多いのであまりそのような面では恩恵を受けられていないのですが、ローカルのPCの環境をできるだけ汚したくないので、新しいPCに変えてからはDockerを個人でも使用するようにしています。

`rbenv`とか`pyenv`とかあるにはあるけどめんどくさいですもんね。

こっちのバージョンでは入ってるけど、こっちでは入ってなかったっけ？とか。

そーゆーのもふくめて、簡単に作って壊してできるのがDockerのよさかなあと個人でやっている身からは思います。

-------

### GitHub Pagesとは？

最後はGitHub Pagesですね。

もちろんこれも[公式ページ](https://help.github.com/en/github/working-with-github-pages/about-github-pages)からとってきました。

> GitHub Pages is a static site hosting service that takes HTML, CSS, and JavaScript files straight from a repository on GitHub, optionally runs the files through a build process, and publishes a website.

Google翻訳にぶちこんで

> GitHub Pagesは、GitHubのリポジトリから直接HTML、CSS、およびJavaScriptファイルを取得し、オプションでビルドプロセスを介してファイルを実行し、Webサイトを公開する静的サイトホスティングサービスです。

ということです。Hugoでgenerateした静的サイトをこちらで公開できるんですね。

他にも有名なものとしては

- [Netlify](https://www.netlify.com/)
- [Firebase Hosting](https://firebase.google.com/products/hosting/)

などがありますね。

[Heroku](https://heroku.com/)も使おうと思えば使えるんじゃないでしょうか。

わざわざHerokuを使う意味がよくわかりませんが…

-------

## つくっていきましょう

さあ、いよいよつくっていきましょう。

-------

### Dockerの環境準備

はじめに、Dockerの環境を準備します。

あたらしいディレクトリを作成して、その中に以下の2ファイルをいれてください。

```bash
# Dockerfile

FROM node:8

# Download and install hugo
ENV HUGO_VERSION 0.60.1
ENV HUGO_BINARY hugo_extended_${HUGO_VERSION}_Linux-64bit.deb

RUN curl -sL -o /tmp/hugo.deb \
    https://github.com/spf13/hugo/releases/download/v${HUGO_VERSION}/${HUGO_BINARY} && \
    dpkg -i /tmp/hugo.deb && \
    rm /tmp/hugo.deb && \
    mkdir /usr/share/blog

WORKDIR /usr/share/blog

RUN  npm -g config set user root && \
     npm install -g firebase-tools

# Expose default hugo port
EXPOSE 1313

# Automatically build site
ONBUILD ADD site/ /usr/share/blog
ONBUILD RUN hugo -d /usr/share/nginx/html/

# By default, serve site
ENV HUGO_BASE_URL http://localhost:1313
CMD hugo server -b ${HUGO_BASE_URL} --bind=0.0.0.0

```

```yml
# docker-compose.yml

version: '3'
services:
  web:
    build: .
    image: my/hugo
    volumes:
      - ./site:/usr/share/blog
    ports:
      - "1313:1313"
    stdin_open: true
    tty: true
```

後述しますが、使いたいHugoのthemeがHugoのversionが0.60以上じゃないと使えなかったので、参考にしたサイトから少し修正してあります。

-------

### Hugoの設定

次にHugoの設定です。

Dockerfileをおいたディレクトリにターミナルで移動したのち、下記コマンドを入力します。

`docker-compose run -w /usr/share web hugo new site blog`

すると、こんな返事があったあと、直下に`site`というディレクトリができているはずです。

```
Creating network "************_default" with the default driver
Congratulations! Your new Hugo site is created in /usr/share/blog.

Just a few more steps and you're ready to go:

1. Download a theme into the same-named folder.
   Choose a theme from https://themes.gohugo.io/ or
   create your own with the "hugo new theme <THEMENAME>" command.
2. Perhaps you want to add some content. You can add single files
   with "hugo new <SECTIONNAME>/<FILENAME>.<FORMAT>".
3. Start the built-in live server via "hugo server".

Visit https://gohugo.io/ for quickstart guide and full documentation.
```

とりあえず記事を書きはじめたい場合は、

`docker-compose run web hugo new post/sample-page.md`

などで記事を作成し、書きはじめてください。

ここあたりで`git init`など、gitが使える準備をしておくのがいいかもですね。


さて、ここでテーマの設定をしましょう。

今回は`hugo-theme-dream`というテーマを適用しています。

[Hugoのテーマページ](https://themes.gohugo.io/hugo-theme-dream/)

ターミナルで、以下のように入力してください。
場所は`Dockerfile`のあるディレクトリ直下での入力を想定しています。

`git submodule add https://github.com/g1eny0ung/hugo-theme-dream.git site/themes/hugo-theme-dream`

この後に、`site`直下の`config.toml`を以下のように書き換えましょう。

```toml
baseurl = "https://*****.github.io/*****/" # 後ほどGitHub Pagesの設定ができたらこちらを修正します。
languageCode = "ja"
defaultContentLanguage = "ja"
title = "Title"
theme = "hugo-theme-dream"

# パスの指定。これをしないとcssがうまく反映されません。
canonifyurls = true

# copyright = ""

# googleAnalyticsのIDをここに入力
googleAnalytics = "*************"

# disqusのShortnameをここに入力(コメントできるようにしたい場合)
disqusShortname = "*************"

enableRobotsTXT = true

[params]
  background = "black"
  # backgroundImage = "/me/background.jpg"
  linkColor = "seagreen"

  author = "*************"
  # description = ""

  # static以降のURLを指定します。
  avatar = "/images/avatar.png"

  motto = "****************"

  # この辺は入れたい人はどうぞ
  # email = ""
  # github = ""
  # linkedin = ""
  # codepen = ""
  # stackoverflow = ""

  siteStartYear = 2020

  # favicon = "/favicon.ico"

  # dark mode
  darkLinkColor = "darkseagreen"
  darkNav = true
  dark404Button = true

```
------------

#### 2020/02/29追記

お気づきの方もいらっしゃるかもしれませんが、こちらのページのテーマを変えました。

`hugo-theme-dream` → `hugo-future-imperfect-slim` に変更しています。

テーマごとに`config.toml`の設定も結構変わってくるので、`themes/[テーマ名]/exampleSite/config.toml`をコピペして、作りなおすのが早いかと思います。

-----------

現状どんな感じか見たい場合は、

`docker-compose up`

でサーバーを立ち上げ、`http://localhost:1313`を見てみてください。

すると、ローカル上ではうまく動いているはずです！

-------

### GitHub Pagesで公開

さて、いよいよGitHub Pagesで公開しましょう。

今回、GitHubにpushするまではできる前提とさせてください。

多分この辺りはたくさん紹介してくれているページがあるかと思いますので…

さて、GitHubにpushすると、こんな感じになっているはずです。

違いとしては、`update.sh`はまだないはずなので、こちらを追加しておいてください。

```sh
# update.sh

#!/bin/bash

# 既存のdocsフォルダの削除
rm -rf docs

# docsファイルの作成
docker-compose exec web hugo

# docsファイルの移動
mv site/public docs

# Commit comment
ct="$(date +'%Y:%m:%d-%H:%M:%S')"

# Management
git add .
git commit -m $ct
git push
```

![githubの設定1](img/how-to-create-this-page/1.png)

ここまでいけばもうすぐです。

Dockerfileをおいたディレクトリで、以下のコマンドを入力してください。

`sh update.sh`

すると、自動で静的ページを作成し、それを直下の`docs`に移動、GitHubにpushまでしてくれるはずです。

GitHubのページを更新してみると、以下のようになっていませんか？(docsができているはず)

![githubの設定2](img/how-to-create-this-page/2.png)

こうなっていれば、Settingsに移動し、部分を選択されているものに変えてください。

![githubの設定3](img/how-to-create-this-page/3.png)

すると、緑色の部分にあるURLで静的ページとして公開されているはずです。

(最初はとくに反映まで時間がかかります。気長に待ちましょう。)

これでポートフォリオサイトの完成です！

修正して公開したい場合は、再度`sh update.sh`と打ち込めば自動で反映されるはずです。

-------

## 参考にした記事

- [[Docker知識不要]Docker上でのHugo環境の作り方](https://qiita.com/you1978/items/204c2cf75f86043dfe68)
- [HugoでWebサイトを立ち上げる+テーマを適用してみる](https://qiita.com/bake0937/items/e0914efbd9434be474a4)
- [Hugo Part 2 - Hugo で github にブログを立ち上げる](http://blog.syati.info/post/create_hugo_2/)
- [hugo-theme-dreamのドキュメント](https://g1eny0ung.site/hugo-theme-dream/#/)
