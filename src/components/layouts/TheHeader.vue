<template>
  <v-app-bar app :class="appBarClasses">
    <v-toolbar-title>Recipe Adjuster</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn to="/" :class="appBarBtnClasses">Home</v-btn>
      <v-btn v-if="isAuthenticated" to="/recipes" :class="appBarBtnClasses"
        >Recipes</v-btn
      >
      <v-btn to="/about" :class="appBarBtnClasses">About</v-btn>
      <v-btn v-if="!isAuthenticated" to="/auth" :class="appBarBtnClasses"
        >Sign-in</v-btn
      >
      <v-btn v-if="isAuthenticated" @click="logout" :class="appBarBtnClasses"
        >Logout</v-btn
      >
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      appBarClasses: ["elevation-0"],
      appBarBtnClasses: ["elevation-0"],
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/");
    },
  },
};
</script>