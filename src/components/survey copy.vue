<template>
  <div>
    <canvas id="canvas"></canvas>
    <div id="clearButtonContainer">
      <v-dialog v-model="dialog" width="300"  transition="dialog-bottom-transition">
      <template v-slot:activator="{ on, attrs }">
      <v-btn v-on="on" v-bind="attrs">CLEAR</v-btn>
      </template>
        <v-card>
          <v-card-text class="pa-5">
            Are you sure you want to remove all the pieces?
          </v-card-text>
          <v-btn class="ma-5" @click="dialog=false">No</v-btn>
          <v-btn class="ma-5" @click="clear(); dialog=false">Yes</v-btn>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>


<script>
// import pieces from "../pieces.json";
import * as survey from "@/assets/js/parksurvey.js";
export default {
  data: function () {
    return {
      dialog: false,
      totalDU: 0,
      // appVar:null,
    };
  },
  name: "survey",
  surveyApp: null,
  props: {
    msg: String,
  },
  mounted: () => {
    // console.log(vm);
    survey.canvasApp();
  },
  methods: {
    clear() {
     survey.clearActive();
      // console.log("CLUCK CLUCK");
    },
    updateActive() {
      // return survey.getAllActive();
    },
    getJson() {
      // console.log(survey.exportJSON())
    },
  },
};
</script>

<style scoped>
#clearButtonContainer {
  position: relative;
  top: -680px;
  left: 500px;
}
</style>