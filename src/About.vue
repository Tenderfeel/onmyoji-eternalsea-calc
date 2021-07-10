<template>
  <div>
    <h1 class="fs-5 fw-bold">パーティ編成</h1>
    <p>この計算機で想定している編成について。</p>
    <section class="mt-5">
      <h2 class="fs-5 fw-bold">1回戦目の編成</h2>
      <p>
        重要なのは荒川の主が氷祭りでお亡くなりになることと、吸血姫の攻撃力です。<br />
        詳しいギミックの仕様については<a
          href="https://tenderfeel.xsrv.jp/mistyrose/2021/07/08/220808/13428/"
          target="_blank"
          rel="nofollow noopener"
          >この記事</a
        >を見てください。
      </p>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">式神（行動順）</th>
            <th scope="col">御魂</th>
            <th scope="col">備考</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">晴明（1）</th>
            <td>星 or 滅</td>
            <td>スキル固定しておく</td>
          </tr>
          <tr>
            <th scope="row">吸血姫（2、3）</th>
            <td>凶骨＋餓者髑髏<br />②攻撃 ④攻撃 ⑥会心/会心DMG</td>
            <td>
              素早さ128以下<br />攻撃x会心DMG 18000以上<br />2体合計36000以上
            </td>
          </tr>
          <tr>
            <th scope="row">驍浪荒川の主（4〜6）</th>
            <td>なんでも<br />②攻撃 ④攻撃 ⑥会心</td>
            <td>
              HP12500以下<br />防御力450以下<br />会心率100%<br />氷祭りで戦闘不能になる
            </td>
          </tr>
          <tr>
            <th scope="row">鬼王酒呑童子（4〜6）</th>
            <td>火霊 or なんでも<br />②HP ④HP ⑥HP</td>
            <td>氷祭りに耐えられない場合は社鯰2セット<br />座ってるだけ</td>
          </tr>
          <tr>
            <th scope="row">座敷童子（4〜6）</th>
            <td>火霊 or なんでも<br />②HP ④HP ⑥HP</td>
            <td>氷祭りに耐えられない場合は社鯰2セット<br />開幕鬼火補給</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="mt-5">
      <h2 class="fs-5 fw-bold">2回戦目の編成</h2>
      <p>
        最後の煉獄茨木童子の追加ダメージによってボスのHP388888を稼ぐ戦法。<br />
        茨木童子の行動時に鬼火8であることが必須になるので、座敷童子はスキル3固定で煉獄より前に動くこと。
      </p>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">式神（行動順）</th>
            <th scope="col">御魂</th>
            <th scope="col">備考</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">薫（1）</th>
            <td>塗仏</td>
            <td>素早さ240以上<br />煉獄の倍以下</td>
          </tr>
          <tr>
            <th scope="row">阿修羅（2）</th>
            <td>陰摩羅鬼<br />②攻撃 ④攻撃 ⑥攻撃/会心</td>
            <td>
              素早さ240以上<br />
              ⑥攻撃の場合： 攻撃 11126以上<br />
              ⑥会心の場合：攻撃xDMG 11126以上
            </td>
          </tr>
          <tr>
            <th scope="row">座敷童子（3〜5）</th>
            <td>火霊</td>
            <td>餌OK<br />スキル3固定<br />煉獄より前に行動</td>
          </tr>
          <tr>
            <th scope="row">晴明（3〜5）</th>
            <td>星or滅</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">青行燈（4〜5）</th>
            <td>破勢＋餓者髑髏<br />②攻撃 ④攻撃 ⑥会心/会心DMG</td>
            <td>攻撃x会心DMG 18102以下<br />素早さ125〜128</td>
          </tr>
          <tr>
            <th scope="row">煉獄茨木童子（6）</th>
            <td>凶骨＋餓者髑髏<br />②攻撃 ④攻撃 ⑥会心/会心DMG</td>
            <td>素早さ125以上青行燈以下</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>