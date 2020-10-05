---
title: '[Rails]ridgepoleを使おう'
description: 'migrationファイルより簡単に管理できます'
tags: ['Rails']
image: 'img/header/how-to-use-ridgepole.png'
createdAt: '2020-07-31'
---

`bundle exec rails db:migrate`ってこれまで何回実行したことでしょうか。

migrationファイルが間違っていたら`bundle exec rails db:rollback`して、みたいな…

初心者のうちは特に経験することが多いんじゃないでしょうか。

今日はそんなmigrationを行わなくてもいいようなgemの`ridgepole`をご紹介します。

-------

<!--more-->

## ことばの紹介

まずは知らない方もいるかと思うので、ことばの紹介から。

わかってるよ！って人は飛ばしてください。

-------

### ridgepoleとは

Rails界隈ではめちゃめちゃ有名なcookpadのメンバーの方が作られたスキーマ管理用のgemです。

migrationファイルのようにファイルをどんどん追加していく形ではなく、`schemafile`を適宜変更していく形でスキーマ管理をおこないます。

現状と`schemafile`との差分を抽出して自動でスキーマを変更してくれる感じですね。

-------

## 使ってみましょう

それでは早速使っていきましょう。

まずはgemfileに追加しましょう。

```
# gemfile

gem 'ridgepole'

```

その後、`schemafile`を作成します。

`bundle install`は忘れず実行してくださいね。

```
# /db/Schemafile

create_table "users", force: :cascade do |t|
  t.string "name", null: false
  t.string "email", null: false
  t.string "image"
  t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
  t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
end

```

書き方とかはGitHubの[README](https://github.com/winebarrel/ridgepole)がわかりやすいんですよね。(優しい…)

こんな感じで、`schemafile`を触りましょう。

そのあとは、下記コマンドで実行しましょう。

```
bundle exec ridgepole --config ./config/database.yml --file ./db/Schemafile --apply
```

こんな感じで、ridgepoleで便利にスキーマ管理をおこないましょう！

-------

## 参考にした記事

- [winebarrel/ridgepole - GitHub](https://github.com/winebarrel/ridgepole)
