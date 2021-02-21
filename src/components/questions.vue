<template>
  <div>
    <v-dialog v-model="dialog" width="500"  transition="dialog-bottom-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on">next</v-btn>
      </template>
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation class="pa-10">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="zipCode"
            label="Zip Code"
            :counter="5"
            required
          >
          </v-text-field>
          <span class="question">Do you live in an EHA building?</span>
          <v-radio-group v-model="resident">
            <v-radio label="yes" value="yes"></v-radio>
            <v-radio label="no" value="no"></v-radio>
          </v-radio-group>

          <span class="question"
            >Are you a neighbor to an EHA development?</span
          >
          <v-radio-group v-model="neighbor">
            <v-radio label="yes" value="yes"></v-radio>
            <v-radio label="no" value="no"></v-radio>
          </v-radio-group>
          <!-- <v-btn class="mr-4" type="submit" :disabled="invalid">submit</v-btn> -->
          <!-- <v-btn @click="clear">clear</v-btn> -->
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
const fs = require('fs');
export default {
  data: () => {
    return {
      dialog: false,
      valid: true,
      zipCode: "",
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      resident: null,
      neighbor: null,
      counter: 0,
    };
  },
  methods: {
    
  }
};
</script>


<style lang="css" scoped>
</style>