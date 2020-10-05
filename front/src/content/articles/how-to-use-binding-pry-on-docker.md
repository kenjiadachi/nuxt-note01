---
title: '[Rails]Docker環境上でbinding.pryを使う'
description: 'デバッグツールを使いこなしましょう'
tags: ['Rails']
image: 'img/header/how-to-use-binding-pry-on-docker.png'
createdAt: '2020-08-02'
---

`binding.pry`。とりあえずデバッグのときに何回も試すアレですね。

今回はそれをDocker上でできる方法をご紹介します。

-------

<!--more-->

## ことばの紹介

まずは知らない方もいるかと思うので、ことばの紹介から。

わかってるよ！って人は飛ばしてください。

-------

### pryとは

[pry-byebugのGitHub](https://github.com/deivid-rodriguez/pry-byebug)からとってきました。

> Adds step-by-step debugging and stack navigation capabilities to pry using byebug.

> To use, invoke pry normally. No need to start your script or app differently. Execution will stop in the first statement after your `binding.pry`.

Google翻訳にぶちこむと

> byebugを使用して、段階的なデバッグおよびスタックナビゲーション機能を追加します。 

> 使用するには、通常どおりpryを呼び出します。スクリプトやアプリを別に起動する必要はありません。 

> `binding.pry`の後の最初のステートメントで実行が停止します。

はい。デバッグツールという感じですね。

とりあえず使っておいて損はないツールだと思います。

-------

## 使ってみましょう

それでは早速使っていきましょう。

まずはgemfileに追加しましょう。

```
# gemfile

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]

  # デバッグツール
  gem 'pry-rails'
  gem 'pry-byebug'
end

```

その後、`bundle install`を忘れず実行してください。

docker環境だと、`docker-compose build`やり直しがいいと思います。

僕の場合、spring環境を別に作成しているため同期がうまく取れないようなんですよね…

(また調べてまとめておきたいと思います。)

-------

そのあと、気になるところに`binding.pry`を記入してください。

```
# /app/controllers/users_controller.rb

class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  # POST /users
  def create
    binding.pry # こんな感じ！
    @user = User.find_or_initialize_by(uid: params[:uid])
    if @user.update(user_params)
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # 以下省略
end

```

その後、`docker attach <コンテナID>`を実行後に動かすと`binding.pry`を入力していたところで止まってくれますよ。

-------

## おまけ

pryの使い方、こちらで知らないものいっぱいご紹介いただいていたので、参考までに載せておきます。

[今更聞けないpryの使い方と便利プラグイン集 - Qiita](https://qiita.com/k0kubun/items/b118e9ccaef8707c4d9f)

-------

## 参考にした記事

- [deivid-rodriguez/pry-byebug - GitHub](https://github.com/deivid-rodriguez/pry-byebug)
- [今更聞けないpryの使い方と便利プラグイン集 - Qiita](https://qiita.com/k0kubun/items/b118e9ccaef8707c4d9f)
