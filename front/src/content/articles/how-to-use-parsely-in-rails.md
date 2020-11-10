---
title: '[jQuery]動的なvalidationをParsleyと、Bootstrap4を使っておしゃれに実装する'
description: 'Form離脱の原因となる、validationでのイライラをましにします'
tags: ['jQuery', 'Bootstrap', 'Form']
image: 'img/header/how-to-use-parsely-in-rails.png'
createdAt: '2018-11-10'
isDraft: false
---

Form離脱の原因として、validation関連は間違いなくあげられると思います。

送信してから、「ここおかしいから直して！」とか言われても「は？(威圧)」ってなりますよね。私もそうです。

なので、フォーム入力時にvalidationを行うように変更しました。

---------

**※こちらの記事は、Qiitaにて公開していたものを2020/03/01にこちらに移行しています。**

元記事は[こちら](https://qiita.com/dach1_ken/items/7d77f2b7c0d75ec9b53c)

※現在はこちらのページのURLのみ記載されています。

--------

## Parsleyの導入

調べてみると、動的なvalidationをするためのjQueryプラグインっていっぱいあるのですが、今回はわりと新しい情報が多いParsleyを使うことにしました。


ポイントとしては、日本語化したい場合は後で読み込むように調整することです。

僕の場合は、javascripts内にPackageとAppsという2つのFolderを切ってます。

こうすると、他のjQueryのPackageもまとめて後から調整用のAppsを読み込めるので便利です。

```coffeescript
# app/assets/javascripts/application.js.coffee

#= 上は省略
#= require_directory ./packages ここにparsely.min.jsを入れます
#= require_directory ./apps ここに調整用を入れます
```

あと、jsをprecompileする設定もしておいてくださいね。

```ruby
# config/initializers/assets.rb

Rails.application.config.assets.precompile += %w( *.js)
```

viewの設定は、[公式ページ](https://parsleyjs.org/)を見ればだいたいできるので省略します。

-----

## Bootstrap4の設定

さあ、ParsleyをBootstrap4に当てはめましょう。

```scss
// app/assets/stylesheets/parsely.scss

input {
	&.parsley-success {
		@extend .is-valid;
	}
	&.parsley-error {
		@extend .is-invalid;
	}
}
select {
	&.parsley-success {
		@extend .is-valid;
	}
	&.parsley-error {
		@extend .is-invalid;
	}
}
textarea {
	&.parsley-success {
		@extend .is-valid;
	}
	&.parsley-error {
		@extend .is-invalid;
	}
}
.parsley-errors-list {
	margin: 2px 0 3px;
	padding: 0;
	list-style-type: none;
	opacity: 0;
  @extend .text-danger;
  @extend .small;
	//Instead of the line below you could use @include transition($transition-1, $transition-2, $transition-3, $transition-4, $transition-5, $transition-6, $transition-7, $transition-8, $transition-9, $transition-10)
	transition: all .3s ease-in;
	&.filled {
		opacity: 1;
	}
}

```

```scss
// app/assets/stylesheets/application.scss

@import 'parsley';
```

これで、error時もsuccess時も、おしゃれにvalidationの結果をすぐに示せます！

-------

## 参考にしたサイト

- [Railsにparsleyというjavascriptのバリデータを導入 - Qiita](https://qiita.com/mekemo_dao/items/4875a45c971091401ff1)
- [parsley公式ページ](https://parsleyjs.org/)
