<template>
  <div>
    <canvas id="canvas"></canvas>
    <!-- <v-btn @click="getJson" value="SUBMIT"></v-btn> -->
  </div>
</template>


<script>
// import pieces from "../pieces.json";
import * as survey from "@/assets/js/parksurvey.js";
export default {
  name: "survey",
  surveyApp: null,
  props: {
    msg: String,
  },
  mounted: function () {
    survey.canvasApp();
  },
  methods: {
    getJson() {
      survey.canvasApp.testing();
    }
  },
};
</script>

<style scoped>
</style>