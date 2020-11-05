---
title: '[Rails]ransackで1画面で複数モデルの検索を実装する'
description: '日本語で書かれている記事が見つからなかったので'
tags: ['Rails']
image: 'img/header/how-to-use-ransack-in-many-models.png'
createdAt: '2018-06-25'
isDraft: false
---

日本語で書かれている記事が見つからなかったので。

--------

**※こちらの記事は、Qiitaにて公開していたものを2020/03/01にこちらに移行しています。**

元記事は[こちら](https://qiita.com/dach1_ken/items/35484bb7115ff301c9f9)

※現在はこちらのページのURLのみ記載されています。

-----

## 困りごと

複数のモデルに対して1画面で別々に検索したい時に、以下のようにしてしまうとどちらも同じパラメータで検索してしまうため、検索後片方が検索結果から消えてしまう…なんてことが起こりました。

その時のコードはこんな感じ

```haml
# index.haml

.row
 .col-6
  = search_form_for @model1_search do |f|
   = f.search_field :column1_cont
   = f.submit "検索"
  - @model1s.each do |model1|
    model1.name
 .col-6
  = search_form_for @model2_search do |f|
   = f.search_field :column2_cont
   = f.submit "検索"
  - @model2s.each do |model2|
    model2.name
```

```ruby
# controller.rb

def index
 @model1_search = Model1.ransack(params[:q])
 @model1s = @model1_search.result

 @model2_search = Model2.ransack(params[:q])
 @model2s = @model2_search.result
end
```

--------

## 解決策

[ransackのWiki](https://github.com/activerecord-hackery/ransack/wiki/Configuration)にきちんとやり方が載ってました。

こんな感じでパラメータを`:q`以外にも設定してあげればいいみたいですね。

```haml
# index.haml

.row
 .col-6
  = search_form_for @model1_search do |f|
   = f.search_field :column1_cont
   = f.submit "検索"
  - @model1s.each do |model1|
    model1.name
 .col-6
  = search_form_for (@model2_search, as: :p) do |f|
   = f.search_field :column2_cont
   = f.submit "検索"
  - @model2s.each do |model2|
    model2.name
```

```ruby
# controller.rb

def index
 @model1_search = Model1.ransack(params[:q])
 @model1s = @model1_search.result

 @model2_search = Model2.ransack(params[:p], search_key: :p)
 @model2s = @model2_search.result
end
```

適当すぎて`:q`の反対っぽいという理由で`:p`にしましたが、もう少しわかりやすい名前にすることをオススメしますw

-------

## 参考にしたサイト

- [ransackのWiki](https://github.com/activerecord-hackery/ransack/wiki/Configuration)

