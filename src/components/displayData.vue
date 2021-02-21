<template>

  <div>
    <v-container>
      <v-row class="pa-0">
        <v-col v-for="key in Object.keys(surveyData)" :key="key"  sm="4" class="pa-0 ma-0">
          <v-item tile class="pa-0">
{{ key }}: {{ surveyData[key] | number('0,0') }}            
          </v-item>
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
        DU: 0,
        bldgArea: 0,
        floorArea: 0,
        publicArea: 0,
        greenArea: 0,
        playArea: 0,
      },
    };
  },
};
</script>

<style lang="css" scoped>
.col {
  padding: 4px 0 4px 0 !important
}
</style>