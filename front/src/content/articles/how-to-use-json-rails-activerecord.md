---
title: '[Rails]MySQLのJSON型をActiveRecordで扱おう'
description: 'カウンタとかタグとかにふわっと使えますよ'
tags: ['Rails']
image: 'img/header/how-to-use-json-rails-activerecord.png'
createdAt: '2020-07-24'
isDraft: false
---

MySQL5.7から、JSON型のカラムを作成することができるようになりました。

それに伴い、Rails5からActiveRecordでJSON型を扱えるようになっています。

タグやカウンタなどに活用できますよ。

(個人的にはタグは検索まで考えるとリレーション組んだ方がいいかと思いますが…)

-------

<!--more-->

## ことばの紹介

まずは知らない方もいるかと思うので、ことばの紹介から。

わかってるよ！って人は飛ばしてください。

-------

### JSONとは

こまったときの[Wikipedia](https://ja.wikipedia.org/wiki/JavaScript_Object_Notation)から引用してきました。

当たり前のように使っている言葉だと、改めて説明しようとすると難しいですね…

> JavaScript Object Notation (JSON、ジェイソン) はデータ記述言語の1つである。軽量なテキストベースのデータ交換用フォーマットでありプログラミング言語を問わず利用できる。名称と構文はJavaScriptにおけるオブジェクトの表記法に由来する。

Rubyを使っている方だとHashっぽいものみたいなイメージでいいかと思います。

ただ、Hashのまま保存することはできないので、JSON型にして保存しておこうという感じですね。

似た形の分、いまHashを扱っているのか？JSONを扱っているのか？を意識しておかないとごっちゃになるので、気をつけてくださいね。

-------

### ActiveRecordとは

こちらも、こまったときの[Wikipedia](https://ja.wikipedia.org/wiki/Active_Record)から引用してきました。

> Active Recordはデータベースからデータを読み出すためのアプローチである。データベーステーブルあるいはビューの1行が1つのクラスにラップされ、オブジェクトのインスタンスがそのデータベースの1つの行に結合される。

Ruby on RailsにおけるMVCモデルのモデル部分で使われるデザインパターンですね。

-------

## 使ってみましょう

それでは早速ActiveRecordでJSONを扱ってみましょう。

まずは、DBにJSON型を指定します。

ridgepoleを使っての設定になります。

migrationファイル使っている人はいい感じに設定してください。

そのうち、ridgepoleの紹介記事も書きますね。

```
# db/Schemafile

create_table "users", force: :cascade do |t|
  t.json     "tags",                                            null: true
  t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
  t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
end
```

そして、migrationなりridgepoleしていただいて、モデルに以下のメソッドを定義しましょう。

```
# app/models/user.rb

def parsed_tags
  return JSON.parse(tags) if tags.present?
  {}
end
```

UsecaseやControllerではこんな感じになります。

(sample_keyというkeyでsample_valueというvalueが入っているイメージです)

```
# app/controllers/users_controller.rb

tags = user.parsed_tags

tags['sample_key'] # 'sample_value'

tags.store('sample_key2', 'sample_value2') # hashに値を追加

user.update!(tags: tags.to_json) # 保存

```

こんな感じで、Hashの値をJSONとして保存しておくことができます。

-------

## 参考にした記事

- [JSON - Wikipedia](https://ja.wikipedia.org/wiki/JavaScript_Object_Notation)
- [ActiveRecord - Wikipedia](https://ja.wikipedia.org/wiki/Active_Record)
- [Hash - Rubyドキュメント](https://docs.ruby-lang.org/ja/latest/method/Hash/i/=5b=5d=3d.html)
