<template>
  <recipe-adjust :recipe="recipe"></recipe-adjust>
</template>

<script>
import { mapGetters } from "vuex";
import RecipeAdjust from "@/components/recipes/RecipeAdjust.vue";

export default {
  name: "HomeView",
  components: {
    RecipeAdjust,
  },
  computed: {
    ...mapGetters("recipes", ["sampleRecipe"]),
    ...mapGetters("ingredients", ["sampleIngredients"]),
    ...mapGetters("servings", ["sampleServings"]),
    recipe() {
      return {
        ...this.sampleRecipe,
        servings: this.sampleServings.value,
        ingredients: this.sampleIngredients.value,
      };
    },
  },
};
</script>
