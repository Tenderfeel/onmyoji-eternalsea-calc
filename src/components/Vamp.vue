<template>
  <fieldset class="border rounded px-3 pt-3">
    <legend class="fs-6">
      <strong class="d-inline-block">{{ name }}{{ id }}</strong>
      <small class="d-inline-block ms-2 fs-7"
        >攻撃xDMG 18000以上, 素早さ128以下</small
      >
    </legend>
    <div class="row mb-2">
      <div class="col-6">
        <div class="form-floating">
          <input
            type="number"
            class="form-control"
            id="atk"
            placeholder="3002"
            v-model.number="data.atk"
            @input="handleInput"
          />
          <label for="atk">攻撃力</label>
        </div>
      </div>
      <div class="col-6">
        <div class="form-floating">
          <input
            type="number"
            class="form-control"
            id="hp"
            placeholder="10937"
            v-model.number="data.hp"
            @input="handleInput"
          />
          <label for="hp">HP</label>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="form-floating input-group">
          <input
            type="number"
            class="form-control"
            id="dmg"
            placeholder="150"
            v-model.number="data.dmg"
            min="150"
            max="999"
            @input="handleInput"
          />
          <label for="dmg">会心DMG(%)</label>
        </div>
      </div>
      <div class="col-6">
        <div class="form-floating">
          <input
            type="number"
            class="form-control"
            id="def"
            placeholder="406"
            v-model.number="data.def"
            @input="handleInput"
          />
          <label for="def">防御力</label>
        </div>
      </div>
    </div>
    <div class="mt-3 row">
      <p class="col-6"><small>攻撃xDMG：</small> {{ data.grade }}</p>
      <p class="col-6">
        <small>必須回復量：</small> {{ data.cure }}
        <i
          class="bi bi-question-circle"
          title="この数値よりも多く回復すると潮汐を免疫してダメージが50%アップします"
        ></i>
      </p>
    </div>
  </fieldset>
</template>

<script>
export default {
  emits: ["change"],
  props: {
    name: {
      type: String,
      default: "吸血姫",
    },
    id: {
      type: Number,
      default: 1,
    },
    status: {
      type: Object,
      default: () => ({
        atk: 0,
        hp: 0,
        dmg: 0,
        def: 0,
        cure: 0,
        grade: 0, // 攻撃 x DMG
      }),
    },
  },
  data() {
    return {
      data: this.status,
    };
  },
  methods: {
    handleInput() {
      this.calc();
      this.$emit("change", this.data);
    },

    calc() {
      // 必須回復量
      // ボスの極寒結界、潮汐の力で与ダメ99%ダウン
      // 凍結された目標がHPの150%以上の回復を受けると
      // 潮汐の力を免疫してダメージ50％アップ
      // 末尾の-1は誤差分
      this.data.cure = Math.floor(this.data.hp * 1.5) - 1;

      // 攻撃xDMG
      this.data.grade = (this.data.atk * this.data.dmg) / 100;
    },
  },
  mounted() {
    this.calc();
  },
};
</script>

<style>
</style>