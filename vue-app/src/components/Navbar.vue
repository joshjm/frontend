<template>
  <v-toolbar>
    <v-btn icon>
      <img alt="SafeBlues logo" src="../assets/logo.svg" />
    </v-btn>
    <v-toolbar-title class="title">SafeBlues</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn @click="$router.push('/')" text> Home Page </v-btn>
      <v-btn @click="$router.push('/about')" text> About </v-btn>
      <v-btn @click="$router.push('/dashboard')" text> Dashboard </v-btn>
      <v-btn @click="$router.push('/admin')" text> Admin </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
<style scoped>
img {
  height: 35px;
}
</style>
