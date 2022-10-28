<template>
  <v-container py-12>
    <base-card>
      <v-card-title>{{ name }}</v-card-title>
      <v-card-subtitle v-if="link">
        <base-button link text :to="link">Visit Recipe Source</base-button>
      </v-card-subtitle>
      <v-card-text>
        Please select which item (e.g. servings or ingredient) to adjust.
        <v-form ref="form">
          <v-container>
            <servings-adjust :servings="servings" />
            <ingredient-adjust
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              :ingredient="ingredient"
            />
          </v-container>
        </v-form>
      </v-card-text>
    </base-card>
  </v-container>
</template>

<script>
import IngredientAdjust from "@/components/ingredients/IngredientAdjust.vue";
import ServingsAdjust from "@/components/servings/ServingsAdjust.vue";

export default {
  props: {
    recipe: {
      required: true,
    },
  },
  components: {
    ServingsAdjust,
    IngredientAdjust,
  },
  computed: {
    name() {
      return this.recipe.name;
    },
    link() {
      return this.recipe.link;
    },
    servings() {
      return this.recipe.servings;
    },
    ingredients() {
      return this.recipe.ingredients;
    },
  },
};
</script>