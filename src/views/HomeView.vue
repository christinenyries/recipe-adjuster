<template>
  <recipe-adjust :recipe="fullRecipe"></recipe-adjust>
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
    ...mapGetters("recipes", ["recipe"]),
    ...mapGetters("amounts", ["amounts"]),
    fullRecipe() {
      const ingredients = this.recipe.ingredients.map((ingredient) => {
        return {
          ...ingredient,
          amount: this.amounts.ingredients[ingredient.id],
        };
      });

      const servings = this.amounts.servings;

      return {
        id: this.recipe.id,
        name: this.recipe.name,
        link: this.recipe.link,
        ingredients,
        servings,
      };
    },
  },
};
</script>
