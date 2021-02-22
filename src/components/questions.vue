<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          id="nextbutton"
          dark
          color="#5d8aa8"
          @click="sendData"
          v-bind="attrs"
          v-on="on"
          >next</v-btn
        >
      </template>
      <v-card>
        <v-form
          ref="form"
          method="post"
          name="sumbitEntry"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          v-model="valid"
          lazy-validation
          class="pa-10"
        >
          <input type="hidden" name="form" value="submitEntry" />
          <v-text-field
            v-model="answers.email"
            :rules="emailRules"
            label="E-mail"
            name="email"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="answers.zipCode"
            label="Zip Code"
            name="zipCode"
            :counter="5"
            required
          >
          </v-text-field>
          <span class="question">Do you live in an EHA building?</span>
          <v-radio-group v-model="answers.resident" name="resident">
            <v-radio label="yes" value="yes"></v-radio>
            <v-radio label="no" value="no"></v-radio>
          </v-radio-group>

          <span class="question"
            >Are you a neighbor to an EHA development?</span
          >
          <v-radio-group v-model="answers.neighbor" name="neighbor">
            <v-radio label="yes" value="yes"></v-radio>
            <v-radio label="no" value="no"></v-radio>
          </v-radio-group>
          <v-btn class="mr-4" @click="handleSubmit">submit</v-btn>
          <!-- <v-btn @click="clear">clear</v-btn> -->
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// const fs = require('fs');
export default {
  data: () => {
    return {
      dialog: false,
      valid: true,
      answers: {
        zipCode: "",
        email: "",
        resident: null,
        neighbor: null,
        data: null,
      },
      emailRules: [
        // (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      counter: 0,
    };
  },
  mounted() {
    this.$root.$on("JSONData", (data) => {
      this.answers.data = data;
    });
  },
  methods: {
    sendData() {
      console.log("SEND DATA", this.answers.data);
      // this.$emit("getData");
    },
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    },
    handleSubmit() {
      fetch("/", {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: this.encode({
          "form-name": "submitEntry",
          ...this.answers,
        }),
      })
        .then(() => console.log("successfully sent"))
        .catch((e) => console.error(e));
      // console.log(body);
    },
  },
};
</script>


<style lang="css" scoped>
#nextbutton {
  margin-top: 50px;
}
</style>