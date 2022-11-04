<template>
  <v-container>
    <base-card v-if="!isLoading">
      <v-card-title>{{ name }}</v-card-title>
      <v-card-actions> </v-card-actions>
      <v-card-text>
        <v-container>
          <v-row justify="space-between">
            <v-col>
              <p>
                Please select which item (e.g. servings or ingredient) you'd
                like to adjust.
              </p>
            </v-col>
            <v-col cols="auto">
              <base-button v-if="link" text link :to="link"
                >Visit Recipe Source</base-button
              >
            </v-col>
          </v-row>
          <v-row>
            <servings-detail
              :value="servings.amount"
              :selected="selected.servings"
              @select="select"
              @cancel="cancel"
              @adjust="adjust"
            ></servings-detail>
            <ingredient-detail
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              :value="ingredient.amount"
              :selected="selected.ingredients[ingredient.id]"
              :id="ingredient.id"
              :unit="ingredient.unit"
              :name="ingredient.name"
              @select="select"
              @cancel="cancel"
              @adjust="adjust"
            >
            </ingredient-detail>
            <base-dialog title="Adjusting...." persistent :show="isLoading">
              <v-progress-circular indeterminate />
            </base-dialog>
          </v-row>
        </v-container>
      </v-card-text>
    </base-card>

    <!-- Loading dialog -->
    <base-dialog
      title="Loading this recipe's details"
      :show="isLoading"
      persistent
    >
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
import { load } from "@/firebase/index.js";

import IngredientDetail from "@/components/amounts/IngredientDetail.vue";
import ServingsDetail from "@/components/amounts/ServingsDetail.vue";
import { mapGetters } from "vuex";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    IngredientDetail,
    ServingsDetail,
  },
  data() {
    return {
      recipe: null,
      servings: null,
      ingredients: null,
      selected: null,
      lastSelected: null,
      isLoading: false,
      error: null,
    };
  },
  computed: {
    ...mapGetters("recipes", ["sample"]),
    ...mapGetters(["userId"]),
    name() {
      return this.recipe.name;
    },
    link() {
      return this.recipe.link;
    },
    isLoadingDone() {
      return (
        !!this.recipe &&
        !!this.ingredients &&
        this.ingredients.length === this.recipe.ingredientIds.length &&
        !!this.servings
      );
    },
  },
  created() {
    this.isLoading = true;

    if (this.id === this.sample.recipe.id) {
      this.recipe = this.sample.recipe;
      this.ingredients = this.sample.ingredients;
      this.servings = this.sample.servings;
      return;
    }

    try {
      this.loadRecipe();
    } catch (error) {
      this.error = {
        message:
          "That's weird. We can't load your recipe at the moment. Maybe refresh this page or try again later.",
        reason: error.message || "",
      };
    }
  },
  watch: {
    isLoadingDone(done) {
      if (!done) {
        return;
      }

      this.selected = {
        servings: false,
        ingredients: this.recipe.ingredientIds.reduce((acc, id) => {
          acc[id] = false;
          return acc;
        }, {}),
      };
      this.isLoading = false;
    },
  },
  methods: {
    // button event handlers
    toggle(type, id) {
      if (type === "ingredients") {
        this.selected[type][id] = !this.selected[type][id];
      } else {
        this.selected[type] = !this.selected[type];
      }
    },
    select(type, id) {
      this.toggle(type, id);
      if (this.lastSelected) {
        this.toggle(this.lastSelected.type, this.lastSelected.id);
      }
      this.lastSelected = { type, id };
    },
    cancel(type, id) {
      this.toggle(type, id);
      this.lastSelected = null;
    },
    adjust(type, newVal, oldVal, id) {
      const multiplier = newVal / oldVal;
      for (const ingredient of this.ingredients) {
        ingredient.amount *= multiplier;
      }
      this.servings.amount *= multiplier;

      this.$store.dispatch("recipes/adjustAmounts", {
        ingredients: this.ingredients,
        servings: this.servings,
      });
      this.toggle(type, id);
      this.lastSelected = null;
    },

    // data loaders
    loadRecipe() {
      this.$store.dispatch("recipes/loadRecipes", {
        callback: this.setRecipe,
      });
    },
    loadIngredients(ingredientIds) {
      for (const ingredientId of ingredientIds) {
        load(
          `ingredients/${this.userId}/${ingredientId}`,
          this.setIngredient(ingredientId)
        );
      }
    },
    loadServings(servingsId) {
      load(
        `servings/${this.userId}/${servingsId}`,
        this.setServings(servingsId)
      );
    },

    // data setters
    setRecipe(data) {
      const found = data.find((recipe) => recipe.id === this.id);

      if (found) {
        this.recipe = found;
      } else {
        this.$router.replace({ name: "notFound" });
        return;
      }

      this.loadIngredients(found.ingredientIds);
      this.loadServings(found.servingsId);
    },
    setIngredient(id) {
      return (data) => {
        const ingredient = { id, ...data };

        if (this.ingredients === null) {
          this.ingredients = [ingredient];
          return;
        }

        const found = this.ingredients.find(
          (ingredient) => ingredient.id === id
        );

        if (!found) {
          this.ingredients.push(ingredient);
          return;
        }

        if (found.amount !== data.amount) {
          found.amount = data.amount;
        }
      };
    },
    setServings(id) {
      return (data) => {
        if (!this.servings || data !== this.servings.amount) {
          this.servings = { id, amount: data };
        }
      };
    },

    // others
    handleError() {
      this.error = null;
    },
  },
};
</script>