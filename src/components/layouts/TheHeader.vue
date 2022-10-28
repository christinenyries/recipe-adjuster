<template>
  <v-app-bar app :class="appBarClasses">
    <v-toolbar-title>Recipe Adjuster</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn to="/home" :class="appBarBtnClasses">Home</v-btn>
      <v-btn :class="appBarBtnClasses">Recipes</v-btn>
      <v-btn to="/about" :class="appBarBtnClasses">About</v-btn>
      <v-btn :class="appBarBtnClasses">Sign-in</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      appBarClasses: ["elevation-0"],
      appBarBtnClasses: ["elevation-0"],
    };
  },
};
</script>