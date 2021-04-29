<template>
  <div>
    <v-container>
    <v-img src="/img/JA-Logo-Round-Black-Transparent.png" max-width="200" max-height="200" class="mx-auto" id="logo"></v-img>
    </v-container>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      name: "footer",
    };
  },
};
</script>

<style  scoped>
#logo {
  top: 20px;
}
</style>