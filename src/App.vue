<template>
  <div id="app">
    <survey></survey>
    <questions></questions>
  </div>
</template>

<script>
import survey from "./components/survey";
import questions from "./components/questions";
import "material-design-icons-iconfont/dist/material-design-icons.css";
// import { log } from 'fabric/fabric-impl';
export default {
  name: "App",
  data: () => {
    return {
    }
  },
  iconfont: "md",
  components: {
    questions,
    survey,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
