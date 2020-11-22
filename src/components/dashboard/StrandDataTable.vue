<template>
  <div>
    <h3>Current Strain Info</h3>
    <v-data-table
      :headers="headers"
      :items="$store.state.safeBluesData.strands"
      :items-per-page="10"
      :sort-by.sync="sortBy"
      :sort-desc.sync="descending"
      class="elevation-1"
    >
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "StrandDataTable",
  data: () => {
    return {
      sortBy: "Date",
      descending: true,
      // TODO: generate headers programatically based on what is in the strand.
      headers: [
        { text: "strandId", value: "strandId" },
        { text: "seedingProbability", value: "seedingProbability" },
        { text: "infection Map P", value: "infectionProbabilityMapP" },
        { text: "infection Map K", value: "infectionProbabilityMapK" },
        { text: "infection Map L", value: "infectionProbabilityMapL" },
        { text: "incubation Alpha", value: "incubationPeriodHoursAlpha" },
        { text: "incubation Beta", value: "incubationPeriodHoursBeta" },
        { text: "infectious Alpha", value: "infectiousPeriodHoursAlpha" },
        { text: "infectious Beta", value: "infectiousPeriodHoursBeta" },
        { text: "startTime", value: "startTime" },
        { text: "endTime", value: "endTime" }
      ]
    }
  }
}
</script>

<style></style>
