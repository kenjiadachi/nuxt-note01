---
title: '[Rails]controllerで作るflashメッセージの中にlink_toを入れる方法'
description: 'Railsで、flashにLinkを入れる方法を調べました。'
tags: ['Rails']
image: 'img/header/how-to-put-link_to-in-flash-message-created-by-controller.png'
createdAt: '2018-09-28'
---


Railsで、flashにLinkを入れたい時に調べるのに苦労したのでまとめておきます。

--------

**※こちらの記事は、Qiitaにて公開していたものを2020/03/01にこちらに移行しています。**

元記事は[こちら](https://qiita.com/dach1_ken/items/5845c45a951b14482364)

※現在はこちらのページのURLのみ記載されています。

--------

## 結論

```ruby
# controllers/application_controller.rb

if アラートを出したい条件
  text = "#{view_context.link_to 'こちら', hoge_path}をクリックしてください".html_safe
  flash[:hoge_alert] = text
else
  flash[:hoge_alert] = nil
end
```

-------

## ポイント

- viewのヘルパーメソッドをcontroller内で使うときは `view_context` を使いましょう
- flashの消える条件をつけておきましょう。そうじゃないと画面更新時に `html_safe` がかかっていない状態で表示されることがあります。
    - それに伴い、flashには独自の名前をつけておくことをお勧めします。他のアラートまで消えるのは嫌なので。

-------

## ダメな例(僕がダメだった例)

調べてると、よくこんな解決策が出てきます。

[link_to() in Rails flash](https://stackoverflow.com/questions/1598150/link-to-in-rails-flash)とか。

```ruby
# controllers/application_controller.rb

flash[:error] = render_to_string(:partial => "shared/login_failed_message")
```

```html.erb
<%- shared/_login_failed_message.html.erb %>

<%= "Login failed.  If you have forgotten your password, you can #{link_to('reset it', reset_path)}" %>
```

ただ、これだと他の`render`と重複した時に不思議な挙動になったので、やめておいたほうがいいかもです。

-------

## 参考にしたサイト

- [コントローラーからヘルパーメソッドを呼ぶ - Qiita](https://qiita.com/rin_mu/items/18353723c6a9d78d8473)
- [link_to() in Rails flash](https://stackoverflow.com/questions/1598150/link-to-in-rails-flash)とか。
