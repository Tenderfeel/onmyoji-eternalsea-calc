<template>
  <fieldset class="border rounded px-3 pt-3">
    <legend class="fs-6">
      <strong class="d-inline-block">{{ name }}</strong>
      <small class="d-inline-block ms-2"
        >{{description}}</small
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
      <p class="col-6"><small>攻撃力xDMG：</small>{{ data.grade }}</p>
      <p class="col-6">
        <span v-if="data.grade > 18102" class="badge bg-danger">火力オーバー</span>
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
      default: "青行燈",
    },
    description: {
      type: String,
      default: '素早さ125〜128、破勢、餓者髑髏2セット'
    },
    status: {
      type: Object,
      default: () => ({
        atk: null,
        dmg: null,
        grade: 0
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
      // 攻撃xDMG
      this.data.grade = Math.round(this.data.atk * (this.data.dmg/ 100));
    },
  },
  mounted() {
    this.calc();
  },
};
</script>

<style>
</style>