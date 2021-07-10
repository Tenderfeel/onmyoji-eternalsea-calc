<template>
  <div class="row">
    <div class="col-6">
      <Andon :status="attacker"  @change="attacker = $event" />
      <Rengoku :status="rengoku" @change="rengoku = $event" class="mt-3" />
    </div>
    <div class="col-6">
      <ul class="list-group">
        <li class="list-group-item">
          <div class="row">
            <div class="col-7">
              <p class="m-0">
                <strong class="d-inline-block me-2">青行燈の必要火力</strong>
                <span v-if="attackerTest" class="badge bg-primary">OK</span>
                <span v-else class="badge bg-danger">NG</span>
              </p>
            </div>
            <div class="col-5">
              {{ needGrade - rengoku.grade }}
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="row">
            <div class="col-7">
              <p class="m-0">
                <strong class="d-inline-block me-2">煉獄茨木の必要火力</strong>
                <span v-if="rengokuTest" class="badge bg-primary">OK</span>
                <span v-else class="badge bg-danger">NG</span>
              </p>
            </div>
            <div class="col-5">
              {{ needGrade - attacker.grade }}
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="row">
            <div class="col-7">
              <p class="m-0">
                <strong class="d-inline-block me-2">アタッカー2人の火力</strong>
                <span v-if="totalGrade >= needGrade" class="badge bg-primary">OK</span>
                <span v-else class="badge bg-danger">NG</span>
              </p>
              <p class="m-0">
                <small class="fs-7">{{needGrade}}以上でOK</small>
              </p>
            </div>
            <div class="col-5">
              {{ totalGrade }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Andon from './components/Andon.vue'
import Rengoku from './components/Rengoku.vue'

// import { decimalRound } from './util'

export default {
  name: 'Second',
  components: { Andon, Rengoku },
  setup() {
    
  },
  data () {
    return {
      needGrade: 35800,
      attacker: { atk: 6137, dmg: 253, grade: 0},
      rengoku: { atk: 8701, dmg: 233, grade: 0}
    }
  },
  computed: {
    totalGrade () {
      return this.attacker.grade + this.rengoku.grade
    },
    attackerTest() {
      return this.attacker.grade >= (this.needGrade - this.rengoku.grade)
    },
    rengokuTest() {
      return this.rengoku.grade >= (this.needGrade - this.attacker.grade)
    }
  }
}
</script>
