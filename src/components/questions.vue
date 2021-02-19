<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required>
      </v-text-field>
      <v-text-field
        v-model="zipCode"
        :counter="5"
        :error-messages="errors"
        label="Zip Code"
        required
      >
      </v-text-field>
      <span class="question">Do you live in an EHA building?</span>
      <v-radio-group v-model="resident">
        <v-radio :label="yes" :value="yes"></v-radio>
        <v-radio :label="no" :value="no"></v-radio>
      </v-radio-group>

      <span class="question">Are you a neighbor to an EHA development?</span>
      <v-radio-group v-model="neighbor">
        <v-radio :label="yes" :key="yes" :value="yes"></v-radio>
        <v-radio :label="no" :key="no" :value="no"></v-radio>
      </v-radio-group>
      <v-btn class="mr-4" type="submit" :disabled="invalid">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      valid: true,
      zipCode: "",
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      resident: 1,
      neighbor: 1,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>