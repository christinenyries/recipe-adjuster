<template>
  <v-container py-12>
    <v-row>
      <base-card>
        <v-card-title
          >( ´ ▽ ` )ﾉ Need to adjust a recipe?</v-card-title
        >
        <v-card-text>
          <p>This tool can help if you have a recipe but...
            <ul>
              <li>You want to make more/less servings.</li>
              <li>You have more/less of an ingredient.</li>
            </ul>
          </p>
          <p>Click <base-button to="/recipes/add" class="mx-2">Add Recipe</base-button> to get started.</p>
          <p>Or get a feel for how this tool work first. Try adjusting the recipe below:</p>
        </v-card-text>
      </base-card>
    </v-row>
    <v-row>
      <recipe-detail :id="recipeId"/>
    </v-row>
  </v-container>
</template>

<script>
import RecipeDetail from "@/components/recipes/RecipeDetail.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

export default {
  name: "HomeView",
  components: {
    RecipeDetail,
    BaseButton,
  },
  data() {
    return {
      recipeId: "r0", // id of sample recipe
    };
  },
};
</script>
