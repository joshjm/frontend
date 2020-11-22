<template>
  <div class="container">
    <h2>Dashboard</h2>
    <p>
      View info on current strains here. There is currently
      {{
        this.$store.state.safeBluesData.strands
          ? this.$store.state.safeBluesData.strands.length
          : "??"
      }}
      strands.
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component
export default class Header extends Vue {}
</script>
