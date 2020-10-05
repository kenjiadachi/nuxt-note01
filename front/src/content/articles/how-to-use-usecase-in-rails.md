---
title: '[Rails]Usecaseクラスを上手に扱おう'
description: 'fat controllerを防ぎましょう'
tags: ['Rails', 'Usecase']
image: 'img/header/how-to-use-usecase-in-rails.png'
createdAt: '2020-07-25'
---

Railsを触っていくと、どうしてもデフォルトの機能だけではController層がどんどん大きくなっていきますよね。

重複する処理を作ったりすることもあるので、どんどん内部との処理はUsecase層に振り分けていくのがいいかと思っています。

今回は、Usecase層とは？というところからどのように振り分けていく基準は？というところまでご紹介していければと思います！

-------

<!--more-->

## ことばの紹介

まずは知らない方もいるかと思うので、ことばの紹介から。

わかってるよ！って人は飛ばしてください。

-------

### fat controllerとは

[こちらの記事](https://qiita.com/nunulk/items/6ed409345efb6ee4f660)から引用させていただきます。

> 簡潔にいえば、行数が多く（個人的には Controller だとひとつのメソッドが NCLOC で 50 行を超えると Fat 感を感じます、みなさんはいかがでしょうか）、行数が多いがために処理の流れを追うことが難しく、しばしば不具合の原因になるクラスのことをいうのだと思います。

> 本記事では、ただ行数が多いというだけでなく、複数のメソッドで処理が重複していたり、メソッドの中で条件分岐が発生したりして、ひとつの変更が他の部分に及ぼす影響を検知しづらい状態にあるコントローラーを想定しています。

> 巨大なクラスであっても、そこに含まれるデータや関数が高凝集・低結合であれば問題ないと考えます。大事なのは「不具合の原因になる」ということであって、すべての巨大なクラスが悪である、ということではないと思っています。

個人的にはControllerの責務として、データを受け取って返却することまでだと思っているので、それを加工、保存するのはUseCaseに切り分けるのが綺麗かなあと思っています。

このあたりは、Clean Architecture周りのごにゃごにゃ ( ~~宗教戦争~~ ) をざっくりみておけばいいかと思います。

(個人的にはバックエンドはUsecase層つくってあとはRailsに従うぐらいがちょうどいいと思っています。)

-------

### Usecase層とは

さっきから出てきている[The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)から引用です。

とりあえずあるあるの図も貼っておきますね。

![イメージ画像](./img/1.jpg)

> The software in this layer contains application specific business rules. It encapsulates and implements all of the use cases of the system. These use cases orchestrate the flow of data to and from the entities, and direct those entities to use their enterprise wide business rules to achieve the goals of the use case.

> We do not expect changes in this layer to affect the entities. We also do not expect this layer to be affected by changes to externalities such as the database, the UI, or any of the common frameworks. This layer is isolated from such concerns.

> We do, however, expect that changes to the operation of the application will affect the use-cases and therefore the software in this layer. If the details of a use-case change, then some code in this layer will certainly be affected.

Google翻訳に突っ込むと

> この層のソフトウェアには、アプリケーション固有のビジネスルールが含まれています。システムのすべてのユースケースをカプセル化して実装します。これらのユースケースは、エンティティとの間のデータフローを調整し、エンタープライズ全体のビジネスルールを使用してユースケースの目標を達成するようにそれらのエンティティに指示します。

> このレイヤーの変更がエンティティに影響を与えることは想定されていません。また、このレイヤーがデータベース、UI、または任意の一般的なフレームワークなどの外部性の変更による影響を受けることも想定していません。この層はそのような懸念から隔離されています。

> ただし、アプリケーションの操作を変更すると、ユースケースに影響が及ぶため、このレイヤーのソフトウェアに影響が出ると予想しています。ユースケースの詳細が変更されると、このレイヤーの一部のコードが確実に影響を受けます。

エンティティと聞くとDDDの話とかとの関連が出てくる感じですが、一旦その辺の話は無しにしましょう。

とりあえず、Railsの場合はActiveRecordでupdateやsaveなどのメソッドが継承されているモデルにデータの保存などは任されていて、そのモデルの操作を依頼する元はUsecaseにまとめましょうという話だと思っています。

(理解が浅いので、書き直していく前提で書いています。)

-------

## 使ってみましょう

それでは早速サンプルをあげますね。

できるだけシンプルなUsecaseとして、UserのUpdateをするだけのUsecaseを書いてみました。

```
# app/controllers/users_controller.rb

def update
  result = Users::UpdateUsecase.new(params).execute
  render json: result, status: result.status
end

```

```
# app/usecases/users/update_usecase.rb

def initialize(params)
  @user = User.find(params[:id])
  @params = params.require(:user).permit(User::PERMIT_PARAMS)
end

def execute
  if @user.update!(@params)
    {
      status: 200,
      message: 'User update!'
    }
  else
    {
      status: 500,
      message: 'Error!'
    }
  end
end

```

こんな感じにすると、テストが書きやすくなりますよね。

Usecaseのテストとモデルのテストだけちゃんと書いとけば、安心感が出てきます。

こんな感じで、Railsの感じで上手にUsecaseを扱っていきましょう。

-------

## 参考にした記事

- [LaravelでFat Controllerを防ぐ5つのTips](https://qiita.com/nunulk/items/6ed409345efb6ee4f660)
- [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
