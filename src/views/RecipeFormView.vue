<template>
  <v-container py-12>
    <v-row>
      <base-card>
        <v-card-title>Add Recipe</v-card-title>
        <v-card-text>
          <recipe-form @save-data="saveData" />

          <base-dialog
            title="Something went wrong!"
            :show="!!error"
            @close="handleError"
          >
            <div class="pa-12">{{ error }}</div>
          </base-dialog>

          <base-dialog title="Adding recipe..." :show="isLoading" persistent>
            <v-progress-circular indeterminate />
          </base-dialog>
        </v-card-text>
      </base-card>
    </v-row>
  </v-container>
</template>

<script>
import { parseIngredients } from "@/utilities/parser";
import RecipeForm from "@/components/recipes/RecipeForm.vue";

export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  components: {
    RecipeForm,
  },
  methods: {
    async saveData(data) {
      this.isLoading = true;
      try {
        const { name, link, servings } = data;
        const ingredients = parseIngredients(data.ingredients);

        const recipe = await this.$store.dispatch("recipes/addRecipe", {
          name,
          link,
          ingredients: ingredients.map((i) => ({
            unit: i.unit,
            name: i.name,
          })),
        });

        await this.$store.dispatch("amounts/addAmount", {
          recipeId: recipe.id,
          ingredients: ingredients.reduce((acc, i, idx) => {
            acc[recipe.ingredients[idx].id] = i.amount;
            return acc;
          }, {}),
          servings,
        });
      } catch (error) {
        this.error =
          error.message ||
          "Failed to add recipe. Please try again later or check your input.";
      }
      this.isLoading = false;
      this.$router.replace("/recipes");
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>