<template>
  <div>
    <h5>Incubation Mean</h5>
    <div class="row">
      <input type="text" class="form-control w-25" v-model="incubationMean" />
      <input
        type="range"
        v-model="incubationMean"
        min="0"
        max="20"
        class="custom-range w-75"
        step="0.5"
        id="customRange1"
      />
    </div>
    <h5>Incubation Variance</h5>
    <div class="row">
      <input
        type="text"
        class="form-control w-25"
        v-model="incubationVariance"
      />
      <input
        type="range"
        v-model="incubationVariance"
        min="0"
        max="25"
        class="custom-range w-75"
        step="0.1"
        id="customRange2"
      />
    </div>
    <h5>Infectious Mean</h5>
    <div class="row">
      <input type="text" class="form-control w-25" v-model="infectiousMean" />
      <input
        type="range"
        v-model="infectiousMean"
        min="0"
        max="20"
        class="custom-range w-75"
        step="0.5"
        id="customRange1"
      />
    </div>
    <h5>Infectious Variance</h5>
    <div class="row">
      <input
        type="text"
        class="form-control w-25"
        v-model="infectiousVariance"
      />
      <input
        type="range"
        v-model="infectiousVariance"
        min="0"
        max="25"
        class="custom-range w-75"
        step="0.1"
        id="customRange2"
      />
    </div>
    <div id="plot"></div>
    <p v-if="overflow">Shape has grown too large to display graph.</p>
  </div>
</template>

<script>
import Plotly from "plotly.js"
import { gamma } from "mathjs"
export default {
  name: "DistributionGamma",
  data: () => {
    return {
      incubationMean: 14,
      incubationVariance: 5,
      infectiousMean: 7,
      infectiousVariance: 6,
      x: [],
      incubationY: [],
      infectiousY: [],
      overflow: false,
      layout: {
        title: "Incubation Period PDF",
        autosize: true,
        legend: {
          x: 1,
          xanchor: "right",
          y: 1
        },
        xaxis: {
          title: "days"
        },
        yaxis: {
          range: [0, 1]
        },
        width: 500
      },
      config: { responsive: true, displayModeBar: false }
    }
  },
  computed: {
    incubationShape: function() {
      return this.incubationMean ** 2 / this.incubationVariance
    },
    incubationRate: function() {
      return this.incubationMean / this.incubationVariance
    },
    infectiousShape: function() {
      return this.infectiousMean ** 2 / this.infectiousVariance
    },
    infectiousRate: function() {
      return this.infectiousMean / this.infectiousVariance
    }
  },
  watch: {
    // TODO: move all these watchers into computed properties (if possible) ie watch all in one line and call plotly react
    // and move all the store calls to the computed?
    incubationShape() {
      this.updateData()
      this.$store.commit(
        "updateIncubationPeriodHoursAlpha",
        this.incubationRate
      )
      this.$store.commit(
        "updateIncubationPeriodHoursBeta",
        this.incubationShape
      )
      // TODO: move plotly.react into its own method for DRY
      Plotly.react(
        "plot",
        [
          { x: this.x, y: this.incubationY, name: "incubation" },
          { x: this.x, y: this.infectiousY, name: "infectious" }
        ],
        this.layout
      )
    },
    incubationRate() {
      this.updateData()
      this.$store.commit(
        "updateIncubationPeriodHoursAlpha",
        this.incubationRate
      )
      this.$store.commit(
        "updateIncubationPeriodHoursBeta",
        this.incubationShape
      )
      Plotly.react(
        "plot",
        [
          { x: this.x, y: this.incubationY, name: "incubation" },
          { x: this.x, y: this.infectiousY, name: "infectious" }
        ],
        this.layout
      )
    },
    infectiousShape() {
      this.updateData()
      this.$store.commit(
        "updateInfectiousPeriodHoursAlpha",
        this.infectiousRate
      )
      this.$store.commit(
        "updateInfectiousPeriodHoursBeta",
        this.infectiousShape
      )
      Plotly.react(
        "plot",
        [
          { x: this.x, y: this.incubationY, name: "incubation" },
          { x: this.x, y: this.infectiousY, name: "infectious" }
        ],
        this.layout
      )
    },
    infectiousRate() {
      this.updateData()
      this.$store.commit(
        "updateInfectiousPeriodHoursAlpha",
        this.infectiousRate
      )
      this.$store.commit(
        "updateInfectiousPeriodHoursBeta",
        this.infectiousShape
      )
      Plotly.react(
        "plot",
        [
          { x: this.x, y: this.incubationY, name: "incubation" },
          { x: this.x, y: this.infectiousY, name: "infectious" }
        ],
        this.layout
      )
    }
  },
  methods: {
    gammaDist: function(x, shape, rate) {
      if (gamma(shape) == Infinity) {
        // gamma(shape) can grow to 10**300, and cause NaNs.
        this.overflow = true
        return 0
      }
      this.overflow = false
      const value =
        (Math.pow(rate, shape) / gamma(shape)) *
        Math.pow(x, shape - 1) *
        Math.pow(Math.E, -x * rate)
      return value
    },
    updateData: function() {
      //TODO: only update the data for the parameter that has been changed to make the page react faster
      this.incubationY = this.x.map(val =>
        this.gammaDist(val, this.incubationShape, this.incubationRate)
      )
      this.infectiousY = this.x.map(val =>
        this.gammaDist(val, this.infectiousShape, this.infectiousRate)
      )
    }
  },

  mounted() {
    this.x = [...Array(25 * 10).keys()].map(val => val / 10) // keep above this.updateData
    this.updateData()
    Plotly.newPlot(
      "plot",
      [
        { x: this.x, y: this.incubationY, name: "incubation" },
        { x: this.x, y: this.infectiousY, name: "infectious" }
      ],
      this.layout,
      this.config
    )
    // TODO refactor this block into the new parameter names
    this.$store.commit(
      "updateIncubationPeriodHoursAlpha",
      this.incubationMean ** 2 / this.incubationVariance
    )
    this.$store.commit(
      "updateIncubationPeriodHoursBeta",
      this.incubationMean / this.incubationVariance
    )
    this.$store.commit(
      "updateInfectiousPeriodHoursAlpha",
      this.infectiousMean ** 2 / this.infectiousVariance
    )
    this.$store.commit(
      "updateInfectiousPeriodHoursBeta",
      this.infectiousMean / this.infectiousVariance
    )
  }
}
</script>

<style scoped>
.custom-range {
  padding: 10px;
}
div.row {
  align-items: center;
}
</style>
