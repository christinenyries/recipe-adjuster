<template>
  <v-container py-12>
    <base-card>
      <v-card-title>{{ name }}</v-card-title>
      <v-card-subtitle v-if="link">
        <base-button link text :to="link">Visit Recipe Source</base-button>
      </v-card-subtitle>
      <v-card-text>
        Please select which item (e.g. servings or ingredient) to adjust.
        <v-container>
          <servings-adjust
            :value="servings"
            :selected="selected.servings"
            @select="select"
            @cancel="cancel"
            @adjust="adjust"
          ></servings-adjust>
          <ingredient-adjust
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
          </ingredient-adjust>
        </v-container>
      </v-card-text>
    </base-card>
  </v-container>
</template>

<script>
import IngredientAdjust from "@/components/amounts/IngredientAdjust.vue";
import ServingsAdjust from "@/components/amounts/ServingsAdjust.vue";

export default {
  props: {
    recipe: {
      required: true,
    },
  },
  components: {
    IngredientAdjust,
    ServingsAdjust,
  },
  data() {
    return {
      selected: {
        servings: false,
        ingredients: this.recipe.ingredients.reduce((acc, ingredient) => {
          acc[ingredient.id] = false;
          return acc;
        }, {}),
      },
      lastSelected: null,
    };
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
  methods: {
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
    adjust(type, amount, id) {
      if (type === "ingredients") {
        this.$store.dispatch("amounts/adjustIngredient", {
          ingredientId: id,
          newAmount: amount,
        });
      } else {
        this.$store.dispatch("amounts/adjustServings", { newAmount: amount });
      }
      this.toggle(type, id);
      this.lastSelected = null;
    },
  },
};
</script>