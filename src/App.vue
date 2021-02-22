<template>
  <v-app>
    <div id="app">
      <div class="canvas_container" id="canvas_wrapper">
        <displayData ref="displayData"></displayData>
        <survey ref="survey"></survey>
        <siteFooter ref="footer"></siteFooter>
      </div>

      <questions id="questions" ref="questions"></questions>
    </div>
  </v-app>
</template>

<script>
import survey from "./components/survey";
import siteFooter from "./components/footer";
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
    },
  },
  components: {
    questions,
    siteFooter,
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
.canvas_container {
  margin-left: auto;
  margin-right: auto;
  padding: auto;
  width: 1200px;
  /* height: 650px; */
}
</style>
