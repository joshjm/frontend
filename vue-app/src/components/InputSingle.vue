<template>
  <div class="input-group input-group-sm mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">{{ this.title }}</span>
    </div>
    <input type="text" class="form-control" v-model="this.value" />
  </div>
</template>

<script lang="ts">
export default {
  name: "InputSingle",
  props: {
    title: String,
    id: String,
    value: String
  }
}
</script>
