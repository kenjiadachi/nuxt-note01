---
title: '[Heroku]Docker環境をHerokuにあげる'
description: '時代はコンテナ管理'
tags: ['Heroku', 'Docker', 'Nuxt.js', 'Rails']
image: 'img/header/how-to-deploy-on-heroku-with-docker.png'
createdAt: '2020-07-31'
---

近年(といっても数年前からですが…)コンテナ、Dockerなどでインフラ管理をするのがますます当たり前になってきますね。

最近知ったのですが、Herokuでもコンテナ管理できるようなので試してみました。

-------

<!--more-->

## ことばの紹介

まずは知らない方もいるかと思うので、ことばの紹介から。

わかってるよ！って人は飛ばしてください。

-------

### Herokuとは

[Herokuの公式ページ](https://jp.heroku.com/what)から引用してきました。

> Herokuはインフラストラクチャ管理が不要なクラウドベースのPaaS(サービスとしてのプラットフォーム)で、開発チームがアプリの開発、配信、監視、スケールに集中できます。

個人開発でインフラこだわりたくない時にとりあえず使えるサービスですね。

まずはHeroku、その後AWSなイメージです。

複雑なアプリケーションになってきたらAWSに移行していく感じですかね。

-------

### Dockerとは

これも[Dockerの公式ページ](https://www.docker.com/why-docker)によると、

> The only independent container platform that enables organizations to seamlessly build, share and run any application, anywhere—from hybrid cloud to the edge.

Google翻訳にぶちこむと

> 組織がハイブリッドクラウドからエッジまで、あらゆるアプリケーションをシームレスに構築、共有、実行できるようにする唯一の独立したコンテナプラットフォーム。

誰とでも簡単に開発環境を共有できるプラットフォーム、といった感じですかね。

僕個人としては、けっこう一人で開発などすることが多いのであまりそのような面では恩恵を受けられていないのですが、ローカルのPCの環境をできるだけ汚したくないので、新しいPCに変えてからはDockerを個人でも使用するようにしています。

`rbenv`とか`pyenv`とかあるにはあるけどめんどくさいですもんね。

こっちのバージョンでは入ってるけど、こっちでは入ってなかったっけ？とか。

そーゆーのもふくめて、簡単に作って壊してできるのがDockerのよさかなあと個人でやっている身からは思います。

-------

## 使ってみましょう

それでは早速使っていきましょう。

今回は、nuxt.js、railsの2種類のアプリケーションをデプロイしてみようと思います。

### nuxt.jsをデプロイ

結論言うとこんな感じです。

[こちらの記事](https://blog.cloud-acct.com/posts/u-nuxtjs-herokudeploy-dcokerfile)のほぼまるパクリですが…

```
# heroku.yml

build:
  docker:
    web: Dockerfile.prd
  config:
    WORKDIR: app
    API_URL: ############### ←rails側のURLを記入
run:
  web: yarn run start
```

```
# Dockerfile.prd

FROM node:14.4.0-alpine

ARG WORKDIR
ARG CONTAINER_PORT
ARG API_URL

ENV HOME=/${WORKDIR} \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    HOST=0.0.0.0  \
    API_URL=${API_URL} \
    NPM_CONFIG_PRODUCTION=false

WORKDIR ${HOME}

COPY package*.json ./
RUN yarn install

COPY . .

RUN yarn run build

EXPOSE ${CONTAINER_PORT}

```

この

### railsをデプロイ

こちらも回答から。

[こちらの記事](https://blog.cloud-acct.com/posts/u-nuxtjs-heroku-push)のほぼまるパクリです。

```
# heroku.yml

build:
  docker:
    web: Dockerfile
  config:
    WORKDIR: app
run:
  web: bundle exec puma -C config/heroku_puma.rb

```

```
# config/heroku_puma.rb

workers Integer(ENV.fetch('WEB_CONCURRENCY', 2))

max_threads_count = ENV.fetch('RAILS_MAX_THREADS', 5)
min_threads_count = ENV.fetch('RAILS_MIN_THREADS') { max_threads_count }
threads min_threads_count, max_threads_count

preload_app!

rackup DefaultRackup
port ENV.fetch('PORT', 3000)
environment ENV.fetch('RAILS_ENV') { 'development' }

on_worker_boot do
  ActiveRecord::Base.establish_connection
end
```

その後、`heroku stack:set container`を実行後にデプロイすれば完了です。

-------

## 参考にした記事

- [Herokuとは | Heroku](https://jp.heroku.com/what)
- [Why Docker? | Docker](https://www.docker.com/why-docker)
- [Dockerfile解説編。Docker環境のNuxt.jsをHerokuにデプロイする(1/2) - 独学プログラマ](https://blog.cloud-acct.com/posts/u-nuxtjs-herokudeploy-dcokerfile)
- [デプロイ完結編。Docker環境のNuxt.jsをHerokuにデプロイする(2/2) - 独学プログラマ](https://blog.cloud-acct.com/posts/u-nuxtjs-heroku-push)
