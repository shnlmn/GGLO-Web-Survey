<template>
<div>
  <canvas id="canvas"></canvas>
</div>
</template>


<script>
  // import pieces from "../pieces.json";
import * as survey from "@/assets/js/parksurvey.js";
export default {
  name: "survey",
  props: {
    msg: String,
  },
  mounted: function () {
    survey.canvasApp();
  },
};
</script>

<style scoped>

</style>