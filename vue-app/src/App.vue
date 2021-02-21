<template>
  <div id="app">
    <!-- nav bar -->
    <Navbar id="nav" />
    <!-- content through router -->
    <router-view></router-view>
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Navbar from "./components/Navbar"
// import Footer from "./components/Footer"
export default {
  name: "app",
  components: {
    Navbar
    // Footer: Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  margin-bottom: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #3e7edd;
}
div.content {
  max-width: 900px;
  margin: 0 auto;
}
</style>
