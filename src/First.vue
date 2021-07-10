<template>
  <div class="row">
    <div class="col-md-6 mb-3">
      <Vamp :id="1" :status="vamp1" @change="vamp1 = $event" />
      <Vamp :id="2" :status="vamp2" @change="vamp2 = $event" class="mt-3" />
      <Arakawa class="mt-3" :status="arakawa" @change="arakawa = $event" />
    </div>
    <div class="col-md-6">
      <ul class="list-group">
        <li class="list-group-item">
          <div class="row">
            <div class="col-6">
              <p class="m-0">
                <strong class="d-inline-block me-2">荒川治療量</strong>
                <span v-if="test1" class="badge bg-primary">OK</span>
                <span v-else class="badge bg-danger">NG</span>
              </p>
              <p class="m-0">
                <small class="fs-7">死亡時回復量＞必須回復量</small>
              </p>
            </div>
            <div class="col-6">
              <p class="m-0">吸血姫1： {{ Math.round((arakawa.cure - vamp1.cure)) }}</p>
              <p class="m-0">吸血姫2： {{ Math.round((arakawa.cure - vamp2.cure)) }}</p>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="row">
            <div class="col-6">
              <strong class="d-inline-block me-2">吸血姫生存判定</strong><br />
              <small class="fs-7">4回攻撃に耐えられるか</small>
            </div>
            <div class="col-6">
              <p class="m-0">
                吸血姫1：
                <span v-if="test2Vamp1" class="badge bg-primary">OK</span>
                <span v-else class="badge bg-danger">NG</span>
              </p>
              <p class="m-0">
                吸血姫2：
                <span v-if="test2Vamp2" class="badge bg-primary">OK</span>
                <span v-else class="badge bg-danger">NG</span>
              </p>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="row">
            <div class="col-6"><strong>吸血姫最低HP比率</strong></div>
            <div class="col-6">
              <p class="m-0">吸血姫1： {{ vamp1Hp }}</p>
              <p class="m-0">吸血姫2： {{ vamp2Hp }}</p>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="row">
            <div class="col-5 pe-0">
              <strong>吸血姫推定与ダメ</strong><br />
              <small class="fs-7">実戦と異なる場合がある</small>
            </div>
            <div class="col-7">
              <div class="row">
                <div class="col-4 ps-0 text-end">
                  <small class="badge bg-secondary">星あり</small>
                </div>
                <div class="col-8 p-0">
                  <p class="m-0">吸血姫1： {{ vamp1Adg }}</p>
                  <p class="m-0">吸血姫2： {{ vamp2Adg }}</p>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-4 ps-0 text-end">
                  <small class="badge bg-secondary">星なし</small>
                </div>
                <div class="col-8 p-0">
                  <p class="m-0">吸血姫1： {{ vamp1Adg2 }}</p>
                  <p class="m-0">吸血姫2： {{ vamp2Adg2 }}</p>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="row">
            <div class="col-6">
              <strong>突破可否</strong><br />
              <small class="fs-7">与ダメが60万を超えていればOK</small>
            </div>
            <div class="col-6">
              <p class="m-0">
                <span>星あり：</span>
                <span
                  v-if="vamp1Adg + vamp2Adg > 600000"
                  class="badge bg-primary"
                  >OK</span
                >
                <span v-else class="badge bg-danger">NG</span>
              </p>
              <p class="m-0">
                <span>星なし：</span>
                <span
                  v-if="vamp1Adg2 + vamp2Adg2 > 600000"
                  class="badge bg-primary"
                  >OK</span
                >
                <span v-else class="badge bg-danger">NG</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vamp from "./components/Vamp.vue";
import Arakawa from "./components/Arakawa.vue";
import { decimalRound, decimalFloor } from "./util";

export default {
  name: "First",
  components: {
    Vamp,
    Arakawa,
  },
  data() {
    return {
      vamp1: { atk: 8001, hp: 12989, dmg: 243, def: 541, cure: 0, grade: 0 },
      // vamp1: { atk: 7687, hp: 14139, dmg: 227, def: 552, cure: 0, grade: 0 },
      // vamp1: { atk: 7663, hp: 13311, dmg: 222, def: 559, cure: 0, grade: 0 },
      vamp2: { atk: 7507, hp: 13673, dmg: 253, def: 566, cure: 0, grade: 0 },
      arakawa: {
        atk: 9074,
        dmg: 186.61,
        cure: 0,
        down: 0,
      },
      enmDeff: 485, // 敵防御（仮）
      enmAtk: 6050, // 敵攻撃
      enmDmg: 150, // 敵会心DMG
    };
  },
  computed: {
    // 荒川治療量判定
    test1() {
      return (
        this.vamp1.cure < this.arakawa.cure &&
        this.vamp2.cure < this.arakawa.cure
      );
    },
    /**
     * 吸血姫生存判定
     * ＜氷祭り＞
     * - 攻撃力40%相当のダメージ4回
     * - 潮汐の影響を受けてると200%アップ
     * - 敵を一人倒すと与ダメ300%アップ、被ダメ15%ダウン
     */
    test2Vamp1() {
      const cure = (this.arakawa.cure - this.vamp1.cure);
      const dmg = this.enemyAttack(this.vamp1.def, this.vamp1.hp, cure)
      return (
        this.vamp1.hp + cure - dmg >
        0
      );
    },
    test2Vamp2() {
      const cure = (this.arakawa.cure - this.vamp2.cure);
      return (
        this.vamp2.hp + cure - this.enemyAttack(this.vamp2.def, this.vamp2.hp, cure) >
        0
      );
    },
    /**
     * 吸血姫HP残量割合
     */
    vamp1Hp() {
      const cure = (this.arakawa.cure - this.vamp1.cure);
      const damage = this.enemyAttack(this.vamp1.def, this.vamp1.hp, cure);
      return decimalFloor(1 - ((this.vamp1.hp + cure) - damage) / this.vamp1.hp, 1000);
    },
    vamp2Hp() {
      const cure = (this.arakawa.cure - this.vamp2.cure);
      const damage = this.enemyAttack(this.vamp2.def, this.vamp2.hp, cure);
      return decimalFloor(1 - ((this.vamp2.hp + cure) - damage) / this.vamp2.hp, 1000);
    },
    // 吸血姫1与ダメ（星あり）
    vamp1Adg() {
      return this.attackDamage(
        this.vamp1.atk,
        this.vamp1Hp,
        this.vamp1.dmg,
        8,
        true,
        true
      );
    },
    // 吸血姫1与ダメ（星なし）
    vamp1Adg2() {
      return this.attackDamage(
        this.vamp1.atk,
        this.vamp1Hp,
        this.vamp1.dmg,
        8,
        true,
        false
      );
    },
    // 吸血姫2与ダメ（星あり）
    vamp2Adg() {
      return this.attackDamage(
        this.vamp2.atk,
        this.vamp2Hp,
        this.vamp2.dmg,
        8,
        true,
        true
      );
    },
    // 吸血姫2与ダメ（星なし）
    vamp2Adg2() {
      return this.attackDamage(
        this.vamp2.atk,
        this.vamp2Hp,
        this.vamp2.dmg,
        8,
        true,
        false
      );
    },
  },
  methods: {
    /**
     * 敵攻撃ダメージ計算（氷祭り）
     * 攻撃力の40%のダメージを4回（実は5回の間違いでは？）
     * 4回目の攻撃で荒川が死亡
     * 潮汐の影響を受けていると80%（200%UP）
     * 敵1人撃破ごとに与ダメージ300%アップ
     * 潮音：初回ダメージ50%アップ
     * 鬼王：HP1%損失ごとにダメージ減少バフ1%アップ
     * 荒川：死亡後ダメージダウン効果獲得
     * @return {number} 4回攻撃の予測総ダメージ
     */
    enemyAttack(targetDef, targetHp) {
      if (typeof targetDef !== "number") return 0;
      const atk = this.enmAtk * (this.enmDmg / 100); // 攻撃力
      const def = 1 - targetDef / (300 + targetDef); // 受け側の防御力
      const baseDmg = decimalRound(atk * 0.4 * 2 * def); // 基準ダメ
      const baseDmg2 = decimalRound(atk * 0.4 * 3 * def); // 荒川死亡後ダメ

      const damage1 = decimalRound(baseDmg * 1.5); // 初回
      const hp = 1 - (targetHp - damage1) / targetHp; // 1回後残HP

      let damage2 = baseDmg * 1.5;
      damage2 = decimalRound(damage2 - baseDmg * hp);

      const hp2 = 1 - (targetHp - (damage1 + damage2)) / targetHp; // 2回目後残HP

      let damage3 = baseDmg * 1.5;
      damage3 = decimalRound(damage3 - baseDmg * hp2)

      const hp3 = 1 - (targetHp - (damage1 + damage2 + damage3)) / targetHp; // 3回目後残HP

      let damage4 = baseDmg * 1.5;
      damage4 = decimalRound(damage4 - baseDmg * hp3);

      let damage5 = baseDmg2;
      // 鬼王のダウン効果を上書きしてる？
      damage5 = decimalRound(damage5 - (baseDmg2 * (this.arakawa.down/100)));

      const total = damage1 + damage2 + damage3 + damage4 + damage5;
      // console.log(total, damage1, damage2 ,damage3 , damage4, damage5)
      return total;
    },
    /**
     * 吸血姫ダメージ計算
     * 攻撃力 x スキル倍率 x スキル追加ダメ x 御魂ダメ
     * 吸血姫パッシブ HP1%ダウンごとにダメージ4%UP
     * SP酒呑パッシブ HP1%ダウンごとにダメージ1%UP
     * 凶骨 鬼火1ごとにダメ8%UP
     * 餓者髑髏 ダメ10% or 25% UP
     * 極寒結界潮汐免疫バフ ダメ50%UP
     * 氷祭り荒川死亡でボス被ダメ15%ダウン
     * @param {number} atk 攻撃力
     * @param {number} hp HP
     * @param {number} dmg 会心DMG
     * @param {number} mp 鬼火の数
     * @param {boolean} gasya 餓者髑髏発動の有無
     * @param {boolean} useStar 星の利用
     */
    attackDamage(atk, hp, dmg, mp, gasya, useStar) {
      const result = Math.round(
        atk * // 攻撃力
          1.5 * // 吸血姫スキル倍率
          this.vampPassive(hp) * // 吸血姫パッシブ
          this.sakePassive(hp) * // 酒呑のパッシブ
          1.5 * // 潮汐免疫
          this.kyokotsu(mp) * // 凶骨
          (gasya ? 1.1 : 1.3) * // 餓者髑髏バフ
          (dmg / 100) * // 会心DMG
          (useStar ? 1.3 : 1) * // 星
          (1 - this.enmDeff / (300 + this.enmDeff)) // 防御係数
      );
      // 氷祭り荒川死亡で被ダメ15%ダウン
      return result - Math.round(result * 0.15);
    },
    /**
     * 吸血姫パッシブ計算
     * HP1%ダウンごとにダメージ4%UP
     * @param {number} hp HP残量割合
     */
    vampPassive(hp) {
      if (typeof hp !== "number" || hp < 0) return 0;
      return (
        1 +
        decimalRound(
          new Array(Math.round(hp * 100))
            .fill(null)
            .reduce((acc) => acc + 0.04, 0)
        )
      );
    },
    /**
     * SP酒呑パッシブ計算
     * HP1%ダウンごとにダメージ1%UP
     * @param {number} hp HP残量割合
     */
    sakePassive(hp) {
      if (typeof hp !== "number" || hp < 0) return 0;
      return (
        1 +
        decimalRound(
          new Array(Math.round(hp * 100))
            .fill(null)
            .reduce((acc) => acc + 0.01, 0)
        )
      );
    },
    /**
     * 凶骨計算
     * 鬼火1ごとにダメ8%UP
     * @param {string} mp 鬼火の数
     */
    kyokotsu(mp) {
      if (typeof mp !== "number") return 0;
      return (
        1 +
        decimalRound(new Array(mp).fill(null).reduce((acc) => acc + 0.08, 0))
      );
    },
  },
};
</script>

<style>
.fs-7 {
  font-size: 0.7rem;
}
</style>
