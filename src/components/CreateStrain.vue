<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <DistributionGamma />
        <p>Payload: {{ this.$store.state.virusParameters }}</p>
      </v-col>
      <v-col cols="6">
        <v-form>
          <h4>Create New Strain</h4>

          <v-text-field
            v-model="virusParameters.strandID"
            label="Strand ID"
            required
          ></v-text-field>
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
            v-model="virusParameters.infectionProbabilityMap"
            label="Infection Probability"
            required
          ></v-text-field>

          <v-layout row justify-space-between>
            <v-col cols="6">
              <v-text-field
                v-model="virusParameters.incubationShape"
                label="Incubation Shape"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="virusParameters.incubationRate"
                label="Incubation Rate"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="virusParameters.infectiousShape"
                label="infectious Shape"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="virusParameters.infectiousRate"
                label="infectious Rate"
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
        const startTimestamp = this.dateStringToTimestampConverter(
          this.startDate,
          this.startTime
        )
        this.$store.commit("updateStartTimestamp", startTimestamp)
      }
    },
    startDate() {
      if (this.startTime && this.startDate) {
        const startTimestamp = this.dateStringToTimestampConverter(
          this.startDate,
          this.startTime
        )
        this.$store.commit("updateStartTimestamp", startTimestamp)
      }
    },
    endTime() {
      if (this.endTime && this.endDate) {
        const endTimestamp = this.dateStringToTimestampConverter(
          this.endDate,
          this.endTime
        )
        this.$store.commit("updateEndTimestamp", endTimestamp)
      }
    },
    endDate() {
      if (this.endTime && this.endDate) {
        const endTimestamp = this.dateStringToTimestampConverter(
          this.endDate,
          this.endTime
        )
        this.$store.commit("updateEndTimestamp", endTimestamp)
      }
    }
  },
  methods: {
    sendData: function() {
      // PROTOBUF/gRPC STUFF TO BE REPLACED BY REST
      // const incubationGamma = new Schema.GammaDistribution()
      // incubationGamma.setShape(this.virusParameters.incubationShape)
      // incubationGamma.setRate(this.virusParameters.incubationRate)

      // const infectiousGamma = new Schema.GammaDistribution()
      // infectiousGamma.setShape(this.virusParameters.infectiousShape)
      // infectiousGamma.setRate(this.virusParameters.infectiousRate)

      // const mystrain = new Schema.Strand()
      // mystrain.setStrandId(this.virusParameters.strandId)
      // mystrain.setStartTime(this.virusParameters.startTimestamp)
      // mystrain.setEndTime(this.virusParameters.endTimestamp)
      // mystrain.setSeedingProbability(this.virusParameters.seedingProbability)
      // mystrain.setInfectionProbability(
      //   this.virusParameters.infectionProbabilityMap
      // )
      // mystrain.setIncubationPeriod(this.virusParameters.incubationGamma)
      // mystrain.setInfectiousPeriod(this.virusParameters.infectiousGamma)

      axios
        .post(this.safeBluesPostURL, this.virusParameters)
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
    },

    dateStringToTimestampConverter: function(dateString, timeString) {
      const dateArr = dateString.split("-")
      const timeArr = timeString.split(":")
      const seconds = 0
      const milliseconds = 0
      const dateGenerationArray = [
        ...dateArr,
        ...timeArr,
        seconds,
        milliseconds
      ]
      const date = new Date(...dateGenerationArray)
      // PROTOBUF STUFF
      // const timestamp = new proto.google.protobuf.Timestamp()
      // timestamp.fromDate(date)
      // TODO fix the time stamp and remove legacy protos
      return "TEST TIMESTAMP"
    }
  }
}
</script>
