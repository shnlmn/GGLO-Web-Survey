<template>
  <v-app>
    <div id="app">
      <displayData ref="displayData"></displayData>
      <survey ref="survey"></survey>

      <questions id="questions" ref="questions"></questions>
    </div>
  </v-app>
</template>

<script>
import survey from "./components/survey";
import displayData from "./components/displayData";
import Vue2Filters from "vue2-filters";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import questions from "./components/questions.vue";
export default {
  name: "App",
  mixins: [Vue2Filters.mixin],
  data: () => {
    return {
      dialog: false,
      hi: "HELLO",
    };
  },
  iconfont: "md",
 mounted() {
  this.sayHi(); 
 },
  methods: {
    sayHi() {
      console.log(this.hi);
    }

 },
  components: {
    questions,
    displayData,
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
  z-index: 0;
  margin-top: 15px;
}
.questions {
  z-index: 100;
}
</style>
