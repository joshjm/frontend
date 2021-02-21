<template>
  <div>
    <h3>Manage Strains</h3>
    <create-strain />
  </div>
</template>

<script>
import CreateStrain from "@/components/CreateStrain.vue"
export default {
  name: "Admin",
  components: {
    CreateStrain
  }
}
</script>
