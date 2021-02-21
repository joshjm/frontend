<template>
  <div>
    <h2>John Hopkins Covid data:</h2>

    <v-data-table
      :headers="headers"
      :items="this.jsonCovidAPIData"
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
  name: "DataTable",
  props: ["jsonCovidAPIData"],
  data: () => {
    return {
      sortBy: "Date",
      descending: true,
      headers: [
        // {text: 'Country', value: 'Country'},
        // {text: "Country Code", value: "CountryCode"},
        { text: "Province", value: "Province" },
        // {text: "City", value: "City"},
        // {text: "City Code", value: "CityCode"},
        // {text: "Latitude", value: "Lat"},
        // {text: "Longitude", value: "Lon"},
        { text: "Confirmed", value: "Confirmed" },
        { text: "Deaths", value: "Deaths" },
        { text: "Recovered", value: "Recovered" },
        { text: "Active", value: "Active" },
        { text: "Date", value: "Date" }
      ]
    }
  }
}
</script>

<style></style>
