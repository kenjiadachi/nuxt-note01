---
title: '[Circleci]slackに通知を送ろう'
description: 'CircleCIの待ち時間の気持ちが楽になります'
tags: ['CircleCI', 'slack']
image: 'img/header/how-to-send-notify-by-circleci.png'
createdAt: '2020-08-02'
isDraft: false
---

CIツールで企業では一番ポピュラーに使われているのでは？というCircleCI。

使いはじめはPRを作成する度怒られてイラだちを覚えるツールでしたが、今はすっかり通った時の快感に魅了されています。

ただ、いまだに待ち時間はソワソワするんですよね…

今回はソワソワをおさえるため、slackに通知を送るようにしてみました。

-------

<!--more-->

## ことばの紹介

まずは知らない方もいるかと思うので、ことばの紹介から。

わかってるよ！って人は飛ばしてください。

-------

### CircleCIとは

[CircleCIの公式ドキュメント](https://circleci.com/docs/ja/2.0/about-circleci/)からとってきました。

> CircleCI- CircleCI のミッションは、テクノロジー主導型の組織が最高の成果を上げられるようにサポートすることです。

> インテリジェントな自動化を通して、エンジニアリング チームの生産性を向上させます。

> CircleCI は、エンタープライズ クラスのサポートとサービスを提供すると共に、高い柔軟性によってスタートアップにも対応しています。

> Linux、macOS、Android、Windows、さらに SaaS やファイアウォールの内側など、必要な場所で動作します。

![CircleCI](img/how-to-send-notify-by-circleci/1.png)

めっちゃわかりやすい図ですね…

とりあえず、GitHubにPRを作成するといい感じにチェックをしてくれるやつです。

今回はslackに通知を送る方法のみご紹介します。

それまでの設定については[こちら](../how-to-use-circleci/)をご覧ください。

-------

## 使ってみましょう

今回は、version 2.1から実装されたOrbという機能を使って実装します。

> CircleCI Orbs は、ジョブ、コマンド、Executor などの構成要素をまとめた共有可能なパッケージです。

特に設定をすることなく、パッケージに用意された機能であればこれを入れることで使用で使用可能です。

こんな感じで、`.circleci/config.yml`にslackのOrbを追加しましょう。

versionは今回は3.4.2を使っています。

[公式ドキュメント](https://circleci.com/orbs/registry/orb/circleci/slack)にあるstatusというcommandを使います。

```
# .circleci/config.yml

version: 2.1

orbs:
  slack: circleci/slack@3.4.2

workflows:
  build-test-deploy:
    jobs:
      - deploy:
          steps:
            # 省略
            - slack/status:
                webhook: '${SLACK_WEBHOOK}'
```

環境変数`SLACK_WEBHOOK`は、CircleCIのProject Status → Slack Integrationから設定できます。

-------

## 参考にした記事

- [CircleCIの公式ドキュメント](https://circleci.com/docs/ja/2.0/about-circleci/)
