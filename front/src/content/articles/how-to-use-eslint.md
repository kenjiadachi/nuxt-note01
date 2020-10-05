---
title: '[Node.js]eslintことはじめ ~キレイなJSコードを担保しよう~'
description: 'eslintはいいぞ'
tags: ['JavaScript', 'Node.js', 'eslint']
image: 'img/header/how-to-use-eslint.png'
createdAt: '2020-05-31'
---

最近テストにはまっています。

いらんことに脳のリソースをさかれない状態で開発を進めたいですよね。

そんなわけで今回は、JavaScriptの静的検証ツールeslintをご紹介します。

-------

<!--more-->

## ことばの紹介

まずは知らない方もいるかと思うので、ことばの紹介から。

わかってるよ！って人は飛ばしてください。

-------

### eslintとは

[こちら](https://qiita.com/mysticatea/items/f523dab04a25f617c87d)のページが分かりやすかったのでそのまま引用させていただきます。

> ESLintはJavaScriptのための静的検証ツールです。
>
> コードを実行する前に明らかなバグを見つけたり、括弧やスペースの使い方などのスタイルを統一したりするのに役立ちます。
>
> 同様のツールとしては JSLint, JSHint 等があります。
>
> ESLint の特色は、
>
> - すべての検証ルールを自由に on/off できる
> - 自分のプロジェクトに合わせたカスタムルールを簡単に作れる
> - 豊富なビルトインルール (5.0.0 時点で 260 個) に加えて、たくさんのプラグインが公開されている
> - ECMAScript 2015 (ES6), 2016, 2017, 2018, 2019を標準サポートしている
> - JSX記法をサポートしている
> - Babel と連携することで、仕様策定中の新しい構文や Flow 型注釈にも対応できる

いろいろ書いていますが、eslintを使えばデバッグせずとも最低限のエラーになりそうなところをアラートで教えてくれます。

TypeScriptにも対応しているので、JavaScriptの型がないフワッとした感覚が苦手な人はTypeScriptと組み合わせると気持ちよく書けるかもしれません。

--------

## 使い方

それでは早速、使い方のご紹介です。

npmの場合、`npm install --save-dev eslint`、yarnを使用している場合は`yarn add --dev eslint`と`node_modules`が含まれるディレクトリで入力してください。

すると、`package.json`が以下のようになるはずです。

```
# package.json

{
  # 省略

  "devDependencies": {
    "eslint": "^6.8.0", # versionはなんでもいいです
    # 省略
  }
}
```

これで、開発環境にのみeslintが導入できましたね。

--------

## おすすめのセッティング

続いて、`.eslintrc.json`を作成しましょう。

以下の設定が無難でおすすめです。

AirBnBで導入している設定などもあるのですが、ややこしすぎてエラーでまくるのでやめました。

```
# .eslintrc.json

{
  "env": {
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "rules": {
    "semi": [2, "always"]
  }
}
```

--------

## VSCodeを使おう

そして、エディタはVSCodeがおすすめです。

Node系だとデバックも簡単だし、eslintのエラーもすぐ表示してくれます。

[この記事](https://qiita.com/Mount/items/5f8196b891444575b7db)が分かりやすかったですが、VSCodeないに`ESLint`パッケージを導入したらすごく簡単にできました。


![VSCodeの画像](./img/1.png)

こんな感じで、「セミコロン抜けてるよ！」とかをすぐ教えてくれます。

--------

## 参考にした記事
- [ESLint 最初の一歩](https://qiita.com/mysticatea/items/f523dab04a25f617c87d)
- [VSCodeでESLint+typescript-eslint+Prettierを導入する v3.0.0](https://qiita.com/madono/items/a134e904e891c5cb1d20)
- [npmとyarnのコマンド早見表](https://qiita.com/rubytomato@github/items/1696530bb9fd59aa28d8)
- [VS CodeにESLintを設定する](https://qiita.com/Mount/items/5f8196b891444575b7db)