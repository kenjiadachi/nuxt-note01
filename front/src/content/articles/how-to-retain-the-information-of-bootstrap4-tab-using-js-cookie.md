---
title: '[jQuery]js-cookie.jsを使ってBootstrap4のタブの情報を保持する'
description: 'ページ更新でタブが初期値に戻ってしまうのをCookieを用いてなんとかします'
tags: ['jQuery', 'Bootstrap']
image: 'img/header/how-to-retain-the-information-of-bootstrap4-tab-using-js-cookie.png'
createdAt: '2018-08-13'
isDraft: false
---

タブ内にフォームがある時、postするたびに更新でタブが初期値に戻ってしまうのをなんとかしたいと思っていろいろ調べた結果、Cookieに保持するのがいいとわかりました。

そこで、こちらの[js-cookie.js](https://github.com/js-cookie/js-cookie)を使ってみました。

--------

**※こちらの記事は、Qiitaにて公開していたものを2020/03/01にこちらに移行しています。**

元記事は[こちら](https://qiita.com/dach1_ken/items/f8c67a1e08fac5b46cb3)

※現在はこちらのページのURLのみ記載されています。

---------

## 現状

```html.haml
# views/user/show.html.haml

.container.mt-5
  = user.name
  さん
  .row
    .col-12.py-2
      %nav#user-tab.nav.nav-tabs.nav-fill{:role => "tablist"}
        %a#user-tab-info.nav-item.nav-link.active{"aria-controls" => "#user-info", "data-toggle" => "tab", "aria-selected" => "true", :href => "#user-info", :role => "tab"} User情報
        %a#user-tab-posts.nav-item.nav-link{"aria-controls" => "#user-posts", "data-toggle" => "tab", "aria-selected" => "false", :href => "#user-posts", :role => "tab"} 投稿

  #user-tabContent.tab-content
    #user-info.tab-pane.fade.show.active{"aria-labelledby" => "user-tab-info", :role => "tabpanel"}
      = render partial: 'users/info', locals:{user: user} # 大事じゃないので割愛

    #user-posts.tab-pane.fade{"aria-labelledby" => "user-tab-posts", :role => "tabpanel"}
      = render partial: 'users/post', collection: player.posts, as: :post # 大事じゃないので割愛

```

こんな感じのBootstrap4のタブを、更新してもタブは開いていたもののままで残しておきたい！

---------

## 解決策

[こちら](https://github.com/js-cookie/js-cookie/blob/latest/src/js.cookie.js)をコピーして、app/assets/javascripts/packages内に保存します。

viewを編集します。

```html.haml
# views/user/show.html.haml

.container.mt-5
  = user.name
  さん
  .row
    .col-12.py-2
      %nav#user-tab.nav.nav-tabs.nav-fill{:role => "tablist"}
        %a#user-tab-info.nav-item.nav-link.active{"aria-controls" => "#user-info", "data-toggle" => "tab", "aria-selected" => "true", :href => "#user-info", :role => "tab"} User情報
        %a#user-tab-posts.nav-item.nav-link{"aria-controls" => "#user-posts", "data-toggle" => "tab", "aria-selected" => "false", :href => "#user-posts", :role => "tab"} 投稿

  #user-tabContent.tab-content
    #user-info.tab-pane.fade.show.active{"aria-labelledby" => "user-tab-info", :role => "tabpanel"}
      = render partial: 'users/info', locals:{user: user} # 大事じゃないので割愛

    #user-posts.tab-pane.fade{"aria-labelledby" => "user-tab-posts", :role => "tabpanel"}
      = render partial: 'users/post', collection: player.posts, as: :post # 大事じゃないので割愛

-# 以下を追記

:coffee
  $("#user-tab a").on 'click', -> # #user-tab内の<a>タグがクリックされたら
    active =  $(this).attr("id"); # クリックされたやつのidを取得
    Cookies.set "#{user.id}Tab", active, expires: 1 # #{user.id}Tabという名前でidを1日保持
    return

  # 以下読み込み時の話
  last = Cookies.get("#{user.id}Tab") # #{user.id}Tabの値(<a>タグのid)を取ってくる
  if last != null # #{user.id}Tabの値(<a>タグのid)が存在するなら
    $('#' + last).tab('show') # そのタブに'show'classをつける
  return

```

これで状態を保持できるはずです。

思ったより簡単でびっくりしました。

.tab('show')に関しては、Bootstrap4側で準備してくれているイベントです。

これの一つ微妙なところが、haml内にcoffeescriptを書いてるところですね。

読み込み場所を指定して、別ファイルで作ると本当はいいのでしょうが、それはそのうちなんとかしようと思います。

-------

## 参考にしたサイト

- [js-cookie - GitHub](https://github.com/js-cookie/js-cookie)
- [JavaScriptでcookie処理（読み・書き・削除） - Qiita](https://qiita.com/takanorip/items/4e23b803bb1393176636)
- [Bootstrap4移行ガイド](http://cccabinet.jpn.org/bootstrap4/components/navs#using-data-attributes)
