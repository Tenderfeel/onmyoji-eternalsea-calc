<template>
  <fieldset>
        <legend class="fs-6">
          <strong class="d-inline-block">{{ name }}</strong>
          <small class="d-inline-block ms-2"
            >{{ description }}</small
          >
        </legend>
        <div class="row" v-if="judgement">
          <div class="col-4">
            <div class="form-floating input-group">
              <input
                type="number"
                class="form-control"
                id="baseHp"
                placeholder="150"
                v-model.number="hp"
                min="0"
                @input="handleInput"
              />
              <label for="baseHp">基礎HP</label>
            </div>
          </div>
          <div class="col-4">
            <div class="form-floating input-group">
              <input
                type="number"
                class="form-control"
                id="equipHp"
                placeholder="150"
                v-model.number="equipHp"
                min="0"
                @input="handleInput"
              />
              <label for="equipHp">御霊HP</label>
            </div>
          </div>
          <div class="col-4">
            <p class="mb-0"><small>HP判定</small></p>
            <span v-if="judge" class="badge bg-primary">OK</span>
            <span v-else class="badge bg-danger">NG</span>
          </div>
        </div>
      </fieldset>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    memberHP: {
      type: Number,
      required: true
    },
    // 基礎HP(Lv40)
    baseHp: {
      type: Number,
      required: true
    },

    judgement: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      hp: this.baseHp,
      equipHp: 0, // 御霊HP
    }
  },
  computed: {
    judge() {
      return this.hp + this.equipHp < this.memberHP
    }
  },
}
</script>