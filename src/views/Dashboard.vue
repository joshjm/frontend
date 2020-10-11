<template>
  <div class="my-dashboard-container">
    <Header />
    <div v-show="jsonCovidAPIData.length == 0 || safeBluesData.length == 0">
      <h3>Loading...</h3>
      <img
        alt="SafeBlues logo"
        class="loading-spinner"
        src="../assets/logo.svg"
      />
    </div>
    
    <div
      v-show="
        $store.state.jsonCovidAPIData.length !== 0 &&
          $store.state.safeBluesData.length !== 0
      "
    >
     
      <!-- <v-data-table
      :headers="headers"
      :items="jsonCovidAPIData"
      :items-per-page="20"
      class="elevation-1"
    >
      </v-data-table>-->
   
     <v-row>
        <v-col cols="12">
          <StrandDataTable />
        </v-col>

        <v-col cols="12">
          <!-- TODO: remove the bind, and fetch that data from vuex store -->
          <data-table v-bind:jsonCovidAPIData="this.jsonCovidAPIData" />
        </v-col>
      </v-row>    
      <v-row>
        <v-col cols="12">
          <confirmed-cases-plot
            v-bind:jsonCovidAPIData="this.jsonCovidAPIData"
          />
        </v-col>
      
        <v-col cols="12">
          <active-cases-plot v-bind:jsonCovidAPIData="this.jsonCovidAPIData" />
        </v-col>
      </v-row>
  
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue"
import ActiveCasesPlot from "@/components/dashboard/ActiveCasesPlot.vue"
import ConfirmedCasesPlot from "@/components/dashboard/ConfirmedCasesPlot.vue"
import { mapState } from "vuex"
import DataTable from "@/components/dashboard/DataTable.vue"
import StrandDataTable from "@/components/dashboard/StrandDataTable.vue"
const axios = require("axios").default
export default {
  name: "Dashboard",
  components: {
    Header,
    ActiveCasesPlot,
    ConfirmedCasesPlot,
    DataTable,
    StrandDataTable
  },
  data: () => {
    return {
      // jsonCovidAPIData: [],
      // safeBluesData: []
    }
  },
  methods: {},
  computed: {
    ...mapState(["safeBluesData", "jsonCovidAPIData"])
  },
  watch: {},
  mounted() {
    // get data from covid19 api
    // NOTE: keeping out of the active-plot component as other components may need this data
    if (
      // TODO always make the safeblues fetch to update/reflect new strains
      this.$store.state.safeBluesData.length == 0 ||
      this.$store.state.jsonCovidAPIData.length == 0
    ) {
      axios
        .get("https://api.covid19api.com/dayone/country/australia")
        .then(response => this.$store.commit("storeCovidData", response.data))
        .catch(error => console.log(error))
      // get data from safe blues AWS
      // const safeBluesURL = "https://api.safeblues.org/stats"
      // const safeBluesURL = "https://api.safeblues.org/admin/list"
      axios
        .get(this.$store.state.safeBluesURL)
        .then(response =>
          this.$store.commit("storeSafeBluesData", response.data)
        )
        .catch(error => console.log(error))
    }
  }
}
</script>
<style scoped>
@keyframes rotation {
  from {
    transform: rotate(359deg);
  }
  to {
    transform: rotate(0deg);
  }
}
.loading-spinner {
  max-width: 60px;
  animation: rotation 2s infinite linear;
}
</style>
