---
title: '[Rails]1つのformを複数画面に分割して表示するwizard formを実装する'
description: 'Formをスッキリと見せて入力してもらいやすくするため、Wizard Formの形式に変更してみました'
tags: ['Rails', 'Form']
image: 'img/header/how-to-create-wizard-form-in-rails.png'
createdAt: '2018-11-10'
isDraft: false
---


どんなwebサービスでさえ、Formでの離脱率は可能な限り下げたいですよね。

ただ、サービスの性質上どうしてもFormの項目が多くなってしまうこともあります。

そんなサービスでも、Formの離脱率を下げるため、今回Formをスッキリと見せて入力してもらいやすくするため、Wizard Formの形式に変更してみました。

------

**※こちらの記事は、Qiitaにて公開していたものを2020/03/01にこちらに移行しています。**

元記事は[こちら](https://qiita.com/dach1_ken/items/9a1ef6f237300f96d734)

※現在はこちらのページのURLのみ記載されています。

--------

**※Wizard Formについては、それ自体に賛否両論あること、もちろんサービスの性質やターゲットによって、使うべきかどうかの判断が必要なことについては今回の記事では書きません。**
また別の記事にでも書こうかな…

------

## 実装方法の選択

Railsでは、[wicked](https://github.com/schneems/wicked)というgemがWizard Form用に存在します。


ただ、毎回updateを回して情報を更新するための仕組みなので、今回の要件では、こんな問題が出てくるよう感じました。

- Form入力を途中でやめた場合も情報が保存されてしまう
- ある程度厳密なDB作成を初期の方に行ったので、初期値を色々触る必要があって今更めんどくさい
    - 名前、メールアドレスは必須　とかとか

というわけで、下記2つの方法が残されていましたが、結論として「ActiveModelゴリゴリしてみる」で実装することにしました。

Form関連はある程度厳密さが求められるので、jQueryでブラウザ依存にすることに若干の不安があったため、このような判断をしました。

- ActiveModelゴリゴリしてみる
- jQueryでURLは変えずに画面の見た目だけ変わるようなFormを作る
  - [フォームをぐっと使いやすくする！ウィザード型jQueryプラグイン6選【2017年版】](https://www.webprofessional.jp/jquery-form-wizard-plugins/)に色々載ってます

------

## さて、実装。

基本的には、こちらの記事を参考にしました。
[Developing a wizard or multi-steps forms in Rails – Nicolas Blanco – Medium](https://medium.com/@nicolasblanco/developing-a-wizard-or-multi-steps-forms-in-rails-d2f3b7c692ce)

読んでみると、ActiveModelとsessionとでなんやかんやしてなんやかんやしそうですね。

デモはこちら(ダウンロードしてlocalで実行するのが良さそうです。なぜかHerokuは動かなかった…)
[GitHub - nicolasblanco/wizard_app](https://github.com/nicolasblanco/wizard_app)

基本的には、この通りにやったらできました。

ただ[LiveDeli](https://www.livedeli.com/)の場合、ネストした値のValidationとかの関係からすでにActiveModelを作成していたので、そこで少し戦いました。

参考： [Rails で複数モデルに関連したパラメータを検証する方法 - ボクココ](https://www.bokukoko.info/entry/2016/04/29/Rails_%E3%81%A7%E8%A4%87%E6%95%B0%E3%83%A2%E3%83%87%E3%83%AB%E3%81%AB%E9%96%A2%E9%80%A3%E3%81%97%E3%81%9F%E3%83%91%E3%83%A9%E3%83%A1%E3%83%BC%E3%82%BF%E3%82%92%E6%A4%9C%E8%A8%BC%E3%81%99%E3%82%8B%E6%96%B9)


Railsのversionが5.01なので、ActiveModelではAttributesが使えない…

参考： [ActiveModel::Attributes が最高すぎるんだよな。 - Qiita](https://qiita.com/alpaca_taichou/items/bebace92f06af3f32898)

なので、下記のようにむりやり使えるようにしています。

- Userがユーザー情報を扱うApplicationRecord
- Projectが案件情報を扱うApplicationRecord
- Contactがその複合のActiveModel

```ruby
# app/controllers/wizards_controller.rb

class WizardsController < ApplicationController
  before_action :load_contact_wizard, except: %i(validate_step)

  def validate_step
    @current_step = params[:current_step] # current_stepをviewで使いたかったのでインスタンス変数にしています

    @contact_wizard = wizard_contact_for_step(@current_step)
    @contact_wizard.contact.assign_attributes(contact_wizard_params)
    session[:contact_attributes] = @contact_wizard.contact.to_hash # ここがポイント

    if @contact_wizard.valid?
      next_step = wizard_contact_next_step(@current_step)
      create and return unless next_step
      redirect_to action: next_step
    else
      render @current_step
    end
  end

  def create
    @contact_wizard = Contact.new(session[:contact_attributes])
    if @contact_wizard.valid?

      @user = User.create!(@contact_wizard.user_params)
      @project = Project.create!(@contact_wizard.project_params)

      session[:contact_attributes] = nil
      flash[:success] = "送信完了しました。メールをご確認ください。"

      redirect_to root_path
    else
      flash[:alert] = "送信時にエラーが発生しました。お手数ですが、もう一度ご入力ください。"
      redirect_to({ action: Wizard::Contact::STEPS.first })
    end
  end

  private

  def load_contact_wizard
    @contact_wizard = wizard_contact_for_step(action_name)
  end

  def wizard_contact_next_step(step)
    Wizard::Contact::STEPS[Wizard::Contact::STEPS.index(step) + 1]
  end

  def wizard_contact_for_step(step)
    raise InvalidStep unless step.in?(Wizard::Contact::STEPS)

    "Wizard::Contact::#{step.camelize}".constantize.new(session[:contact_attributes])
  end

  def contact_wizard_params
    params.require(:contact_wizard).permit(Contact::ALLOWED_PARAMS)
  end

  class InvalidStep < StandardError; end
end
```

```ruby
# app/models/wizard.rb

class Contact
  include ActiveModel::Model

  # この辺ちょっとムダ感すごい
  ALLOWED_PARAMS = User::ALLOWED_PARAMS + Project::ALLOWED_PARAMS

  # この辺ちょっとムダ感すごい
  def self.attributes
    User::ALLOWED_PARAMS + Project::ALLOWED_PARAMS
  end

  def self.attribute_names
    User.attribute_names + Project.attribute_names
  end

  # validationは省略

  attr_accessor *self.attributes

  def to_hash # この辺がポイント
    self.class.attributes.inject({}) do |hash, key|
      hash.merge({ key => self.send(key) })
    end
  end

  def project_params
    {
      # ここは省略
    }
  end

  def user_params
    {
      # ここは省略
    }
  end
end
```

今日はこのあたりで。

-------

## 参考にしたサイト

- [フォームをぐっと使いやすくする！ウィザード型jQueryプラグイン6選【2017年版】](https://www.webprofessional.jp/jquery-form-wizard-plugins/)
- [Developing a wizard or multi-steps forms in Rails – Nicolas Blanco – Medium](https://medium.com/@nicolasblanco/developing-a-wizard-or-multi-steps-forms-in-rails-d2f3b7c692ce)
- [ActiveModel::Attributes が最高すぎるんだよな。 - Qiita](https://qiita.com/alpaca_taichou/items/bebace92f06af3f32898)
- [Rails で複数モデルに関連したパラメータを検証する方法 - ボクココ](https://www.bokukoko.info/entry/2016/04/29/Rails_%E3%81%A7%E8%A4%87%E6%95%B0%E3%83%A2%E3%83%87%E3%83%AB%E3%81%AB%E9%96%A2%E9%80%A3%E3%81%97%E3%81%9F%E3%83%91%E3%83%A9%E3%83%A1%E3%83%BC%E3%82%BF%E3%82%92%E6%A4%9C%E8%A8%BC%E3%81%99%E3%82%8B%E6%96%B9)
