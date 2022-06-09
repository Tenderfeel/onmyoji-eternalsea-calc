<template>
  <div>
    <fieldset class="border rounded px-3 pt-3">
    <legend class="fs-6">
      <strong class="d-inline-block">蛍草</strong>
      <small class="d-inline-block ms-2"
        >バラ：②攻撃 ④攻撃 ⑥会心DMG（１速、会心2セット×3、素早さ128以上）</small
      >
    </legend>
    <div class="row mb-2">
      <div class="col-4">
        <div class="form-floating">
          <input
            type="number"
            class="form-control"
            id="atk"
            min="114"
            max="2680"
            placeholder="2680"
            v-model.number="hota.baseAtk"
            @input="handleInput"
          />
          <label for="atk">基礎攻撃力</label>
        </div>
      </div>
      <div class="col-4">
        <div class="form-floating">
          <input
            type="number"
            class="form-control"
            id="atk"
            placeholder="4382"
            v-model.number="hota.equipAtk"
            @input="handleInput"
          />
          <label for="atk">御霊攻撃力</label>
        </div>
      </div>
      <div class="col-4">
        <div class="form-floating input-group">
          <input
            type="number"
            class="form-control"
            id="dmg"
            placeholder="270"
            v-model.number="hota.dmg"
            min="150"
            max="999"
            @input="handleInput"
          />
          <label for="dmg">会心DMG(%)</label>
        </div>
      </div>
    </div>
    <div class="mt-3 row">
      <p class="col-12 mb-0"><small>（基礎攻撃力×1.6+御霊攻撃力）×1.04×会心DMG：</small>{{ totalHeal }}</p>
    </div>
    <div class="row">
      <p class="col-12"><small> 蛍草の回復量÷1.5：</small>{{ memberHP }}</p>
    </div>
  </fieldset>

  <ul class="list-group mt-3">
    <li class="list-group-item">
      <Member name="帝釈天" description="バラ：②攻撃 ④攻撃 ⑥攻撃（2速、5番未強化推奨、素早さ128以上）" :memberHP="memberHP" :baseHp="15380" />
    </li>
    <li class="list-group-item">
      <Member name="座敷童子" description="火霊：②④⑥自由（3速、覚醒後星2の餌運用可、素早さ128以上）" :memberHP="memberHP" :baseHp="12418" :judgement="false" />
    </li>
    <li class="list-group-item">
      <Member name="阿修羅" description="破勢＋歌姫：②攻撃 ④攻撃 ⑥会心/会心DMG（4速、燼天玉藻前OK、素早さ128以上）" :memberHP="memberHP" :baseHp="11279" />
    </li>
    <li class="list-group-item">
      <Member name="燼天玉藻前" description="心眼＋歌姫：②攻撃 ④攻撃 ⑥会心/会心DMG（5速、針女でも可、素早さ128以上）" :memberHP="memberHP" :baseHp="12532" />
    </li>
  </ul>
  </div>
</template>

<script>
import Member from '@/components/DayflowerMember.vue'
export default {
  components: {
    Member
  },
  data() {
    return {
      //蛍草
      hota: {
        baseAtk: 2680, // 基礎攻撃力(Lv40)
        equipAtk: 4382, // 御霊で増える攻撃力
        dmg: 275 // 会心DMG(%)
      },
      totalHeal: 0,
      memberHP: 0
    }
  },
  methods: {
    handleInput() {
      this.calc();
    },
    calc() {
      const dmg = (this.hota.dmg / 100)
      // ①基礎攻撃力×1.6
      const calc1 = (this.hota.baseAtk * 1.6)
      // ②❶+御霊攻撃力
      const calc2 = calc1 + this.hota.equipAtk
      // ③❷x1.04
      const calc3 = calc2 * 1.04
      // ④❸xDMG
      const calc4 = calc3 * dmg
      // console.log(`DMG: ${dmg}`)
      // console.log(`①基礎攻撃力×1.6: ${calc1}`)
      // console.log(`②❶+御霊攻撃力: ${calc2}`)
      // console.log(`③❷x1.04: ${calc3}`)
      // console.log(`④❸xDMG: ${calc4}`)
      
      this.totalHeal = Math.round(calc4);
      this.memberHP = Math.round(this.totalHeal / 1.5) 
    },
  },
  mounted() {
    this.calc();
  }
}
</script>