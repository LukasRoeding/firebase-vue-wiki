<template>
  <div>
    <top-header></top-header>
    <router-link to="/">Home</router-link>|
    <router-link to="/login">Login</router-link>|
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Top-Header";
export default {
  components: {
    "top-header": Header
  },
  data() {
    return {
      blah: "erik"
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
