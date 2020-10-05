---
title: '[Rails]RSpecでstubを上手に使おう'
description: 'stubを使いこなして疎結合なコードとテストを書きましょう'
tags: ['Rails', 'RSpec']
image: 'img/header/how-to-use-stub-on-rspec.png'
createdAt: '2020-08-10'
---

RSpec本当に便利で気持ちいいですよね。

大好きです。

今回は、stubの活用方法をご紹介します。

-------

<!--more-->

## ことばの紹介

まずは知らない方もいるかと思うので、ことばの紹介から。

わかってるよ！って人は飛ばしてください。

-------

### RSpecとは

[こちらの記事](https://machiiro.github.io/bootcamp/rspec/base/01_about.html)が分かりやすかったので引用させていただきます。

> RSpec とは、Ruby における BDD (behavior driven development、ビヘイビア駆動開発) のためのテストフレームワークです。 BDD という言葉に聞き慣れないかもしれませんが、 テストコードを、自然言語を用いて要求仕様のように (Spec = 仕様) 記述するための手法です。

テストによって振る舞いを決めるためのツールということですね。

TDD(テスト駆動開発)の基盤となっているBDDという概念についてはまた別記事でご紹介したいと思います。

-------

### stubとは

[Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%B9%E3%82%BF%E3%83%96)がいい感じの文章だったのでご紹介します。

> 呼び出す側（上位）のモジュールを検査する場合に、呼び出される側（下位）の部品モジュールが未完成であることがある。

> このとき、呼び出される側の部品モジュールの代用とする仮のモジュールを、「スタブ」と呼ぶ。

> スタブモジュールは設計仕様に定義されている全ての関数を実装してあるが、関数内部は正規の動作をせず、定数を返すだけという作りになっている事が多い。

ということで、偽物の関数を作っておいてそこの責務はそちらのテストに任せようという発想ですね。

-------

## 使ってみましょう

それでは早速使っていきましょう。

RSpecの使い方については[こちら](../../blog/how-to-use-rspec/)の記事をみてみてください。

今回は、`HogeUsecase`の`sample`メソッド内で`FugaUsecase`の`execute`メソッドの結果を返す感じにしようと思います。

`execute`メソッドの前にinitializeを行う形ですね。

```
# hoge_usecase.rb

def initialize(params)
  @hoge = Hoge.find(params[:id])
end

def sample
  result = FugaUsecase.new.execute
  @hoge.update!(result)
  return hoge
end
```

さあ、このUsecaseのRSpecを書いてみましょう。

こんな感じになるかと思います。



-------

## 参考にした記事

- [winebarrel/ridgepole - GitHub](https://github.com/winebarrel/ridgepole)
