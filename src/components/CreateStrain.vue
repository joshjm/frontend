<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <DistributionGamma />
        <p>Payload: {{this.$store.state.virusParameters}}</p>
      </v-col>
      <v-col cols="6">
        <v-form>
          <h4>Create New Strain</h4>
          <h5>Experimental Conditions</h5>
          <v-text-field
            v-model="startDate"
            label="startDate"
            type="date"
            required
          ></v-text-field>
          <v-text-field
            v-model="startTime"
            label="startTime"
            type="time"
            required
          ></v-text-field>
          <v-text-field
            v-model="endDate"
            label="endDate"
            type="date"
            required
          ></v-text-field>
          <v-text-field
            v-model="endTime"
            label="endTime"
            type="time"
            required
          ></v-text-field>

          <v-text-field
            v-model="virusParameters.seedingProbability"
            label="Seeding Probability"
            type="number"
            required
          ></v-text-field>
          <h5>Virus Phenotype</h5>

          <v-text-field
            v-model="virusParameters.infectionProbabilityMapP"
            label="Infection Probability - P"
            required
          ></v-text-field>

          <v-text-field
            v-model="virusParameters.infectionProbabilityMapK"
            label="Infection Probability - K"
            required
          ></v-text-field>

          <v-text-field
            v-model="virusParameters.infectionProbabilityMapK"
            label="Infection Probability - L"
            required
          ></v-text-field>

          <v-layout row justify-space-between>
            <v-col cols="6">
              <v-text-field
                v-model="virusParameters.incubationPeriodHoursAlpha"
                label="Incubation Shape/Alpha"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="virusParameters.incubationPeriodHoursBeta"
                label="Incubation Rate/Beta"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="virusParameters.infectiousPeriodHoursAlpha"
                label="infectious Shape/Alpha"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="virusParameters.infectiousPeriodHoursBeta"
                label="infectious Rate/Beta"
                required
              ></v-text-field>
            </v-col>
          </v-layout>

          <button
            type="button"
            @click="sendData"
            class="btn x-large  btn-success w-100"
          >
            ☣ INFECT ☣
          </button>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DistributionGamma from "@/components/DistributionGamma.vue"
import axios from "axios"
import { mapState } from "vuex"

import { time } from "d3"
export default {
  name: "CreateStrain",
  components: {
    DistributionGamma
  },
  data: () => {
    return {
      distributions: ["Gamma", "other"],
      safeBluesURL: "api.safeblues.org:5000/stats",
      safeBluesPostURL: "https://api.safeblues.org/admin/new",
      startTime: null,
      startDate: null,
      endTime: null,
      endDate: null
    }
  },
  computed: {
    // mapping data from the vuex store into the component
    ...mapState(["virusParameters"])
  },
  watch: {
    startTime() {
      if (this.startTime && this.startDate) {
        const startTimestamp = `${this.startDate}T${this.startTime}:00.000000Z`
        this.$store.commit("updateStartTime", startTimestamp)
      }
    },
    startDate() {
      if (this.startTime && this.startDate) {
        const startTimestamp = `${this.startDate}T${this.startTime}:00.000000Z`
        this.$store.commit("updateStartTime", startTimestamp)
      }
    },
    endTime() {
      if (this.endTime && this.endDate) {
        const endTimestamp = `${this.endDate}T${this.endTime}:00.000000Z`
        this.$store.commit("updateEndTime", endTimestamp)
      }
    },
    endDate() {
      if (this.endTime && this.endDate) {
        const endTimestamp = `${this.endDate}T${this.endTime}:00.000000Z`
        this.$store.commit("updateEndTime", endTimestamp)
      }
    }
  },
  methods: {
    sendData: function() {
      axios
        // .post(this.safeBluesPostURL, this.virusParameters)
        .post(this.safeBluesPostURL, {
          startTime: `${this.startDate}T${this.startTime}:00.000000Z`,
          endTime: `${this.endDate}T${this.endTime}:00.000000Z`,
          seedingProbability: this.seedingProbability,
          infectionProbabilityMapP: this.infectionProbabilityMapP,
          infectionProbabilityMapK: this.infectionProbabilityMapK,
          infectionProbabilityMapL: this.infectionProbabilityMapL,
          incubationPeriodHoursAlpha: this.incubationShape,
          incubationPeriodHoursBeta: this.incubationRate,
          infectionPeriodHoursAlpha: this.infectionShape,
          infectionPeriodHoursBeta: this.infectionRate
        })
        .then(response => console.log(response))
        .catch(error => console.log(error))
        //then update the data store
        .then(
          axios
            .get(this.$store.state.safeBluesURL)
            .then(response =>
              this.$store.commit("storeSafeBluesData", response.data)
            )
        )
        .catch(error => console.log(error))
    }
  }
}
</script>
