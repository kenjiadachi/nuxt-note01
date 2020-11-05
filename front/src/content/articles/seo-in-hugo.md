---
title: '[Hugo]SEOのためにやったことをまとめてみた'
description: 'Hugoの設定はシンプルでいいですね'
tags: ['Hugo', 'SEO']
image: 'img/header/seo-in-hugo.png'
createdAt: '2020-05-20'
isDraft: false
---

※こちらの記事は公開しながらどんどん追記していく形で書いていこうと思っています。

定期的にご確認いただくことをオススメします！

---------

ブログでアフィリエイト！とかは考えていないのですが、せっかく書いたものは多くの人に見てもらいたいですよね。

この記事では、このHugoで作成したブログでSEOのために行った技術的な工夫をご紹介します。

---------

## テーマのhtmlタグに問題がないか調べる

はじめに、採用したテーマで自動生成される`htmlタグ`に問題がないか確認をしました。

極端なはなし、`pタグ`しか使われていないテーマだとどこがタイトルで…とかの判断ができずにクローリングbot空の可読性が悪いですからね。

マークダウンに対応するごとの`htmlタグ`を確認するのは、chromeの拡張機能で行いました。

僕の使用しているテーマである、`future-imperfect-slim`では特に問題なさそうでしたので、そのままにしています。

---------

## GTMをつける

つぎに、Googleタグマネージャーのための設定を行いました。

僕の使用しているテーマである、`future-imperfect-slim`には、Google Analytics用の設定はあったのですが、Googleタグマネージャー用の設定はなかったので、ここは自分で設定しました。

僕の場合、以下のような形に設定を行いました。

`config.toml`で設定値を行った方が綺麗だなとは思いつつ、自分一人だけなので…ww

```
# site/layouts/partials/head.html

<head>
  {{ partial "gtm" . }}
  <!-- 以下省略-->
</head>

```

```
# site/layouts/partials/site-header.html

{{ partial "gtm-body" . }}
<!-- 以下省略-->

```

```
# site/layouts/partials/gtm.html

{{ if not .Site.IsServer }}
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','XXXXXXXXXX');</script> ←ここの'XXXXXXXXXXX'には自分のタグマネージャIDを入れてください
  <!-- End Google Tag Manager -->
{{ end }}

```

```
# site/layouts/partials/gtm.html

{{ if not .Site.IsServer }}
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','XXXXXXXXXX');</script> ←ここの'XXXXXXXXXXX'には自分のタグマネージャIDを入れてください
  <!-- End Google Tag Manager -->
{{ end }}

```

```
# site/layouts/partials/gtm-body.html

{{ if not .Site.IsServer }}
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=XXXXXXXXXX"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
{{ end }}


```

------------

## searchConsoleにてsitemapを登録する

つぎに、sitemapの登録です。

HugoでHPを作成すると、自動でsitemapも作ってくれるので忘れず登録しましょう。

作成時に指定したフォルダ直下にあり、`<ドメイン>/sitemap.xml`で呼び出せるので、わすれずsearch consoleに登録しておきましょう。

---------

現状ここまでですが、また何か設定したら追加していこうと思います。

