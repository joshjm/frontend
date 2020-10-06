import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    virusParameters: {
      startTime: null,
      endTime: null,
      seedingProbability: null,
      infectionProbabilityMapP: null,
      infectionProbabilityMapK: null,
      infectionProbabilityMapL: null,
      incubationPeriodHoursAlpha: null,
      incubationPeriodHoursBeta: null,
      infectiousPeriodHoursAlpha: null,
      infectiousPeriodHoursBeta: null
    },
    jsonCovidAPIData: [],
    safeBluesData: [],
    safeBluesURL: "https://api.safeblues.org/admin/list"
  },
  mutations: {
    // updating all virus params  
    updateVirusParameters(state, virusParameters) {
      state.virusParameters = virusParameters
    },
    // update individual virus params
    updateStartTime(state, payload) {
      state.virusParameters.startTime = payload
    },
    updateEndTime(state, payload) {
      state.virusParameters.endTime = payload
    },
    updateSeedingProbability(state, payload) {
      state.virusParameters.seedingProbability = payload
    },
    updateInfectionProbabilityMapP(state, payload) {
      state.virusParameters.infectionProbabilityMapP = payload
    },
    updateInfectionProbabilityMapK(state, payload) {
      state.virusParameters.infectionProbabilityMapK = payload
    },
    updateInfectionProbabilityMapL(state, payload) {
      state.virusParameters.infectionProbabilityMapL = payload
    },
    updateIncubationPeriodHoursAlpha(state, payload) {
      state.virusParameters.incubationPeriodHoursAlpha = payload
    },
    updateIncubationPeriodHoursBeta(state, payload) {
      state.virusParameters.incubationPeriodHoursBeta = payload
    },
    updateInfectiousPeriodHoursAlpha(state, payload) {
      state.virusParameters.infectiousPeriodHoursAlpha = payload
    },
    updateInfectiousPeriodHoursBeta(state, payload) {
      state.virusParameters.infectiousPeriodHoursBeta = payload
    },
    // storing data from GET requests
    storeSafeBluesData(state, safeBluesData) {
      state.safeBluesData = safeBluesData
    },
    storeCovidData(state, covidData) {
      state.jsonCovidAPIData = covidData
    }
  },
  actions: {},
  modules: {}
})
