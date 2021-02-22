<template>
  <v-app>
    <div id="app">
      <div class="canvas_container" id="canvas_wrapper">
        <displayData ref="displayData"></displayData>
        <survey ref="survey"></survey>
        <siteFooter ref="footer"></siteFooter>
      </div>

      <questions id="questions" ref="questions" ></questions>
      <div id="about-splash">
        <v-dialog v-model="dialogAbout" width="60%">
          <v-card>
            <v-fab-transition>
              <v-btn fab small absolute right text @click="dialogAbout = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-fab-transition>
            <about></about>
          </v-card>
        </v-dialog>
      </div>

      <div id="side-panel">
        <v-btn color="yellow" @click.stop="aboutDrawer = !aboutDrawer" tile>
          <v-icon>mdi-help</v-icon>
        </v-btn>
      </div>
      <v-navigation-drawer
        v-model="aboutDrawer"
        absolute
        bottom
        right
        temporary
        width="40%"
      >
        <about></about>
      </v-navigation-drawer>
    </div>
  </v-app>
</template>

<script>
import survey from "./components/survey";
import siteFooter from "./components/footer";
import displayData from "./components/displayData";
import about from "./components/about";
import Vue2Filters from "vue2-filters";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import questions from "./components/questions.vue";
export default {
  name: "App",
  mixins: [Vue2Filters.mixin],
  data: () => {
    return {
      dialogAbout: true,
      aboutDrawer: false,
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
    about,
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
#side-panel {
  position: absolute;
  top: 10px;
  right: 0px;
}
</style>
