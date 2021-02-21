<template>
  <div id="active-plot"></div>
</template>

<script>
import Plotly from "plotly.js"
export default {
  props: ["jsonCovidAPIData"],
  data: function() {
    return {
      layout: {
        title: "Active cases"
      },
      config: { responsive: true, displayModeBar: false }
    }
  },
  computed: {
    // TODO: do all this in a loop on the set of unique values for province to make more DRY
    qldData: function() {
      return this.jsonCovidAPIData
        .filter(data => data.Province === "Queensland")
        .map(item => [item.Date, item.Active])
    },
    vicData: function() {
      return this.jsonCovidAPIData
        .filter(data => data.Province === "Victoria")
        .map(item => [item.Date, item.Active])
    },
    nswData: function() {
      return this.jsonCovidAPIData
        .filter(data => data.Province === "New South Wales")
        .map(item => [item.Date, item.Active])
    },
    saData: function() {
      return this.jsonCovidAPIData
        .filter(data => data.Province === "South Australia")
        .map(item => [item.Date, item.Active])
    },
    ntData: function() {
      return this.jsonCovidAPIData
        .filter(data => data.Province === "Northern Territory")
        .map(item => [item.Date, item.Active])
    },
    waData: function() {
      return this.jsonCovidAPIData
        .filter(data => data.Province === "Western Australia")
        .map(item => [item.Date, item.Active])
    },
    qldTrace: function() {
      return {
        name: "QLD",
        x: this.qldData.map(item => item[0]),
        y: this.qldData.map(item => item[1])
      }
    },
    vicTrace: function() {
      return {
        name: "VIC",
        x: this.vicData.map(item => item[0]),
        y: this.vicData.map(item => item[1])
      }
    },
    nswTrace: function() {
      return {
        name: "NSW",
        x: this.nswData.map(item => item[0]),
        y: this.nswData.map(item => item[1])
      }
    },
    saTrace: function() {
      return {
        name: "SA",
        x: this.saData.map(item => item[0]),
        y: this.saData.map(item => item[1])
      }
    },
    ntTrace: function() {
      return {
        name: "NT",
        x: this.ntData.map(item => item[0]),
        y: this.ntData.map(item => item[1])
      }
    },
    waTrace: function() {
      return {
        name: "WA",
        x: this.waData.map(item => item[0]),
        y: this.waData.map(item => item[1])
      }
    },
    data: function() {
      return [
        this.qldTrace,
        this.vicTrace,
        this.nswTrace,
        this.saTrace,
        this.ntTrace,
        this.waTrace
      ]
    }
  },
  watch: {
    data() {
      Plotly.react("active-plot", this.data, this.layout, this.config)
    }
  },
  mounted() {
    Plotly.newPlot("active-plot", this.data, this.layout, this.config)
  }
}
</script>

<style></style>
