<template>
  <div>
    <v-container class="pa-0 pb-8">
      <v-row class="pa-0">
        <v-col
          v-for="key in Object.keys(surveyData)"
          :key="key"
          sm="0"
          class="pa-0 ma-2"
        >
          <v-card outlined class="pa-3" elevation="0">
            {{ surveyData[key]['label'] }}: {{ surveyData[key]['total'] | number("0,0") }}
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      surveyData: {
        DU: { label: "Total Units", total: 0 },
        // bldgArea: { label: "Total Built Area", total: 0 },
        floorArea: { label: "Total Floor Area", total: 0 },
        publicArea: { label: "Total Public Area", total: 0 },
        greenArea: { label: "Total Green Area", total: 0 },
        playArea: { label: "Total Play Area", total: 0 },
      },
    };
  },
  mounted() {
    this.$root.$on("update-data", (data) => {
      this.surveyData = data;
    });
  },
};
</script>

<style lang="css" scoped>
.col {
  padding: 4px 0 4px 0 !important;
}
</style>