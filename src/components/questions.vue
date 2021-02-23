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
      <v-card class="pa-10">
        <form
          @submit.prevent="handleSubmit"
          method="POST"
          name="submitEntry"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input type="hidden" name="submitEntry" value="submitEntry"/>
          <input type="hidden" name="bot-field" value="submitEntry" />
          <p class="h4 text-center mb-4">One last step to submit your input.</p>
          <label for="zip-code" class="grey-text">Your Zip Code</label>
          <input
            name="zipCode"
            type="zipCode"
            id="zip"
            class="form-control"
            v-model="answers.zipCode"
          />
          <br />
          <label for="resident" class="grey-text"
            >Do you live in an EHA building?</label
          >
          <div class="custom-control custom-radio">
            <input
              v-model="answers.resident"
              type="radio"
              class="custom-control-input"
              id="resident-yes"
              name="resident"
              value="yes"
            />
            <label class="custom-control-label" for="resident-yes">Yes</label>
          </div>
          <div class="custom-control custom-radio">
            <input
              v-model="answers.resident"
              type="radio"
              class="custom-control-input"
              id="resident-no"
              name="resident"
              value="no"
            />
            <label class="custom-control-label" for="resident-no">No</label>
          </div>
          <br />
          <label for="neighbor" class="grey-text"
            >Are you a neighbor to an EHA development?</label
          >
          <div class="custom-control custom-radio">
            <input
              v-model="answers.neighbor"
              type="radio"
              class="custom-control-input"
              id="neighbor-yes"
              name="neighbor"
              value="yes"
            />
            <label class="custom-control-label" for="neighbor-yes">Yes</label>
          </div>
          <div class="custom-control custom-radio">
            <input
              v-model="answers.neighbor"
              type="radio"
              class="custom-control-input"
              id="neighbor-no"
              name="neighbor"
              value="no"
            />
            <label class="custom-control-label" for="neighbor-no">No</label>
          </div>

          <div class="text-center mt-4">
            <button class="btn btn-outline-warning" type="submit">
              Send<i class="far fa-paper-plane ml-2"></i>
            </button>
          </div>
        </form>
      </v-card>

    </v-dialog>
  </div>
</template>

<script>
// const fs = require('fs');
import { mdbInput, mdbBtn, mdbTextarea } from "mdbvue";
export default {
  data: () => {
    return {
      mdbInput,
      mdbBtn,
      mdbTextarea,
      dialog: false,
      valid: true,
      answers: {
        zipCode: "",
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
      this.$emit("getData");
    },
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    },
    handleSubmit() {
      this.$emit("getData");
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
      console.log(
        this.encode({
          ...this.answers,
        })
      );
    },
  },
};
</script>


<style lang="css" scoped>
#nextbutton {
  margin-top: 100px;
}
form {
  text-align: left !important;
}
</style>