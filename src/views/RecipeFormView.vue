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
            <p>{{ error && error.message }}</p>
            <code>{{ error && error.reason }}</code>
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
      error: null,
    };
  },
  components: {
    RecipeForm,
  },
  methods: {
    async saveData(data) {
      try {
        const recipe = {
          name: data.name,
          link: data.link,
          servings: data.servings,
          ingredients: parseIngredients(data.ingredients),
        };

        await this.$store.dispatch("recipes/addRecipe", recipe);

        this.$router.replace("/recipes");
      } catch (error) {
        this.error = {
          message:
            "Failed to add recipe. Please try again later or check your input.",
          reason: error.message || "",
        };
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>