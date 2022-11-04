<template>
  <v-container py-12>
    <v-row>
      <v-col cols="12" lg="8" offset-lg="2">
        <v-row class="justify-end">
          <base-button to="/recipes/add" class="mx-3">Add Recipe</base-button>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-if="!isLoading && hasRecipes">
      <recipe-card
        v-for="recipe of recipes"
        :key="recipe.id"
        :recipe="recipe"
      />
    </v-row>
    <v-row v-else>
      <base-card>
        <v-card-title>Nothing to show here .･ﾟﾟ･(／ω＼)･ﾟﾟ･.</v-card-title>
        <v-card-text>You don't seem to have any recipes yet. </v-card-text>
      </base-card>
    </v-row>

    <!-- Loading dialog -->
    <base-dialog title="Loading your recipes" :show="isLoading" persistent>
      <div class="text-center">
        <p><v-progress-circular indeterminate /></p>
        <p>ε=ε=ε=ε=┌(;￣▽￣)┘</p>
      </div>
    </base-dialog>

    <!-- Error dialog -->
    <base-dialog
      title="Something went wrong!"
      :show="!!error"
      @close="handleError"
    >
      <p>{{ error && error.message }}</p>
      <code>{{ error && error.reason }}</code>
    </base-dialog>
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
    ...mapGetters("recipes", ["recipes", "hasRecipes"]),
    ...mapGetters(["userId"]),
  },
  async created() {
    this.isLoading = true;
    try {
      await this.$store.dispatch("recipes/loadRecipes", {
        callback: () => {
          this.isLoading = false;
        },
      });
    } catch (error) {
      this.error = {
        message:
          "That's weird. We can't load your recipes at the moment. Maybe refresh this page or try again later.",
        reason: error.message || "",
      };
    }
  },
  methods: {
    handleError() {
      this.error = null;
    },
  },
};
</script>