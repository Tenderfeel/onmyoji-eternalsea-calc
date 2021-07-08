<template>
  <fieldset class="border rounded px-3 pt-3">
    <legend class="fs-6">
      <strong class="d-inline-block">{{ name }}</strong>
      <small class="d-inline-block ms-2"
        >HP12500以下, 防御力450以下, 会心100%</small
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
    </div>

    <div class="mt-3 row">
      <p class="col-6"><small>死亡時回復量：</small>{{ data.cure }}</p>
      <p class="col-6"><small>死亡後ダメ軽減：</small>{{ data.down }}%</p>
    </div>
  </fieldset>
</template>

<script>
export default {
  emits: ["change"],
  props: {
    name: {
      type: String,
      default: "SP荒川",
    },
    status: {
      type: Object,
      default: () => ({
        atk: null,
        dmg: null,
        cure: 0,
        down: 0,
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
      // 死亡時回復量 攻撃力の125%回復
      this.data.cure = Math.round(this.data.atk * 1.25 * (this.data.dmg / 100));

      // 最初の攻撃力300ごとに追加で1%のダメージダウン、最大30%
      this.data.down = Math.floor(this.data.atk / 300) + 10;
    },
  },
  mounted() {
    this.calc();
  },
};
</script>

<style>
</style>