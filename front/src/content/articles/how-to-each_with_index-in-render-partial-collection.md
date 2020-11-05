---
title: '[Rails]render partial collectionでeach_with_indexができる話'
description: 'partial内でindexも使いたい場合はどうするのかなーと思い調べてみました'
tags: ['Rails']
image: 'img/header/how-to-each_with_index-in-render-partial-collection.png'
createdAt: '2018-08-02'
isDraft: false
---


partial内でindexも使いたい場合はどうするのかなーと思い調べてみました。

--------

**※こちらの記事は、Qiitaにて公開していたものを2020/03/01にこちらに移行しています。**

元記事は[こちら](https://qiita.com/dach1_ken/items/1963543b05ce1f9f088e)

※現在はこちらのページのURLのみ記載されています。

--------

## 困りごと

調べはじめるきっかけはこの記事でした。

[パーシャルをrenderする際のパフォーマンスに関する注意点](https://qiita.com/itmammoth/items/612efc6ad3280349b7e1)

とりあえず、`each`内で`render partial: 'posts/post', locals: { post: post }`みたいにそれぞれに`locals`で変数渡すぐらいなら`render partial: 'posts/post', collection: @posts`みたいに`collection`にしちゃおう！その方が高速だよ！という話でした。

この記事を読んでさっそく自分の書いたコードを直していたのですが、どうするんだろう…ってなったのがこの部分。

```html.haml
/ view.html.haml

- post.comments.each_with_index do |comment, idx|
  = render partial: 'posts/partials/comment', locals: {comment: comment, idx: idx}
```

このように、`partial`内で`index`も使いたい場合はどうするのかなーと思い調べてみました。

--------

## 解決策

```html.haml
/ view.html.haml

= render partial: 'posts/partials/comment', collection: post.comments, as: :comment
```

```html.haml
/ posts/partials/_comment.html.haml

- if comment_counter == 0
  -# 一つ目の挙動
- else
  -# それ以外の挙動
```

このように、`as`で指定した`comment`に`_counter`をつけると、`index`の役割をはたしてくれそう。

[Render partial with collection has "hidden" index](https://coderwall.com/p/t0no0g/render-partial-with-collection-has-hidden-index)のコメントにありました。

省略できる形の場所にある`partial`についての`index`指定方法は、日本語の記事が見つかったのですが、省略できない場所の`partial`についての記事がなかったので、書いてみました。

-------

## 参考にしたサイト

- [パーシャルをrenderする際のパフォーマンスに関する注意点](https://qiita.com/itmammoth/items/612efc6ad3280349b7e1)
- [Render partial with collection has "hidden" index](https://coderwall.com/p/t0no0g/render-partial-with-collection-has-hidden-index)
