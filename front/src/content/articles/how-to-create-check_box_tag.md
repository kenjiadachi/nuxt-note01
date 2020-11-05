---
title: '[Rails]検索情報を保持するcheck_box_tagの作り方'
description: 'ransackで実装している検索で、チェックボックスに検索条件を保持させました'
tags: ['Rails', 'Form']
image: 'img/header/how-to-create-check_box_tag.png'
createdAt: '2018-08-06'
isDraft: false
---

ransackで実装している検索に、チェックボックスに検索条件を保持させました。

--------

**※こちらの記事は、Qiitaにて公開していたものを2020/03/01にこちらに移行しています。**

元記事は[こちら](https://qiita.com/dach1_ken/items/a7747bf730590d4c8618)

※現在はこちらのページのURLのみ記載されています。

--------

## 困りごと

ransackの検索後の画面を見たときに検索条件がcheck_boxに保持されていないので、検索条件がわからない！

(URLを見ればわかるけど、ユーザーにそこまでのリテラシーがあるとも思えない…)

---------

## 前提条件

### enumで値を扱っている

```ruby
# models/post.rb
class Post < ApplicationRecord
  enum tag: { report: 0, interview: 1, info: 2}
  # 以下略
end
```

------

### `enum_help`で日本語化している

```ruby
# Gemfile
gem 'enum_help'
```

```yml
# config/locales/ja.yml
ja:
  enums:
    post:
      tag:
        report: 開催レポート
        interview: インタビュー
        info: お知らせ
```

------

### `ransack`で検索を実装している

```ruby
# controllers/posts_controller.rb
class PostsController < ApplicationController
  def index
    @search = Post.ransack(params[:q])
    @result = @search.result
  end
  # 以下略
end
```

```html.haml
/ views/posts/index.html.haml
= search_form_for @search do |f|
  /　以下略
  = f.submit "検索"
```

---------

## 解決策

こんな感じで実装してみました。

```html.haml
/ views/posts/index.html.haml
= search_form_for @search do |f|
  - Post.tags_i18n.each do |tag|
    = check_box_tag('q[tag_eq_any][]', Post.tags[tag.first], params[:q].present?&&params[:q]["tag_eq_any"].present?&&params[:q]["tag_eq_any"].include?("#{Post.tags[tag.first]}")
    = tag.last
  = f.submit "検索"
```

---------

## 解説

`Post.tags_i18n`では、このようなhashが返ってきます。

`{"report"=>"開催レポート", "interview"=>"インタビュー", "info"=>"お知らせ"}`

なので、`Post.tags_i18n.first`は

`["report", "開催レポート"]`という配列になります。

また、`Post.tags`は、このようなhashになるので、

`{"report"=>0, "interview"=>1, "info"=>2}`

`Post.tags[Post.tags_i18n.first.first]`は、0になります。

誰かの役に立っていればいいなあ。
