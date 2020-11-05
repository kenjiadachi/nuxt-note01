---
title: '[Rails]enumの値を日本語化してラジオボタンに突っ込む'
description: 'enumの値ごとにラジオボタンを作るのがめんどくさいなと思っていろいろ調べた時の備忘録です'
tags: ['Rails', 'Form']
image: 'img/header/how-to-create-radio-button-using-enum.png'
createdAt: '2018-07-16'
isDraft: false
---

enumの値ごとにラジオボタンを作るのがめんどくさいなと思っていろいろ調べた時の備忘録です。

------

**※こちらの記事は、Qiitaにて公開していたものを2020/03/01にこちらに移行しています。**

元記事は[こちら](https://qiita.com/dach1_ken/items/4443333fb9fd722bd28a)

※現在はこちらのページのURLのみ記載されています。

--------

## 前提条件

こんなモデルがあったとして

```ruby
# models/user.rb
class User < ApplicationRecord
  enum area: {east: 0, west: 1}
  # (以下略)
end
```

[enum_help](https://github.com/zmbacker/enum_help)というgemを入れたとして

```ruby
# Gemfile
gem 'enum_help'
```

enumの値に対応した日本語を`ja.yml`に入れたとして

```yml
# ja.yml
ja:
  enums:
    user:
      area:
        east: 関東
        west: 関西
```

そこから、どうやってlabelに日本語、valueに英語が入ったのラジオボタンを作るかという話です。

------

## 結論

こんな感じでできました！嬉しい！

```html.haml
# users/_form.haml
= form_for(@user) do |f|
  = f.collection_radio_buttons :area, User.areas_i18n, :first, :last, include_hidden: false do |b|
    - content_tag(:div, class: "wrapper-class") do
      - b.radio_button(class: "button-class") + b.label(class: "label-class")
  = f.submit
```

[collection_radio_buttons](https://apidock.com/rails/v4.0.2/ActionView/Helpers/FormOptionsHelper/collection_radio_buttons)というメソッドがあるんですね。

ただ、f.collection_radio_buttonsとは少し違うようです。

詳しくは[ここ](https://stackoverflow.com/questions/36393489/how-to-use-enum-in-collection-radio-buttons)に書いてました。

日本語でなんとなくイメージを掴みたいなら[この記事](https://qiita.com/ykyk1218/items/2541a313aac0f0e5d81a#%E3%83%A9%E3%82%B8%E3%82%AA%E3%83%9C%E3%82%BF%E3%83%B3)が読みやすかったです。

-------

## 参考にした記事

- [collection_radio_buttons - APIdock](https://apidock.com/rails/v4.0.2/ActionView/Helpers/FormOptionsHelper/collection_radio_buttons)
- [How to use enum in collection_radio_buttons - stackoverflow](https://stackoverflow.com/questions/36393489/how-to-use-enum-in-collection-radio-buttons)
- [Railsのフォーム基本的な作成方法まとめ（form_forとかform_tag）](https://qiita.com/ykyk1218/items/2541a313aac0f0e5d81a)
