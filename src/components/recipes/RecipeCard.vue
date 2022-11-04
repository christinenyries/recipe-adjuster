<template>
  <base-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle>{{ link }}</v-card-subtitle>
    <v-card-actions>
      <base-button text :to="adjustRecipeLink">Adjust</base-button>
      <base-button text @click="deleteRecipe">Delete</base-button>
    </v-card-actions>
  </base-card>
</template>

<script>
export default {
  props: {
    recipe: {
      required: true,
    },
  },
  computed: {
    id() {
      return this.recipe.id;
    },
    title() {
      return this.recipe.name;
    },
    link() {
      return this.recipe.link;
    },
    adjustRecipeLink() {
      return `${this.$route.path}/${this.id}`;
    },
  },
  methods: {
    deleteRecipe() {
      this.$store.dispatch("recipes/removeRecipe", {
        recipeId: this.id,
        ingredientIds: this.recipe.ingredientIds,
        servingsId: this.recipe.servingsId,
      });
    },
  },
};
</script>