<template>
  <v-container py-12>
    <v-row>
      <recipe-card
        v-for="recipe of recipes"
        :key="recipe.id"
        :recipe="recipe"
      />

      <base-dialog
        title="Something went wrong!"
        :show="!!error"
        @close="handleError"
      >
        <div class="pa-12">{{ error }}</div>
      </base-dialog>

      <base-dialog title="Loading recipes..." :show="isLoading" persistent>
        <v-progress-circular indeterminate />
      </base-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import RecipeCard from "@/components/recipes/RecipeCard.vue";

export default {
  components: {
    RecipeCard,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    ...mapGetters("recipes", ["recipes"]),
  },
  methods: {
    async loadRecipes() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("recipes/loadRecipes");
      } catch (error) {
        this.error = error.message || "Something went wrong.";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>