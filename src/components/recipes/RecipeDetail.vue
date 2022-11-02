<template>
  <base-card>
    <v-card-title>{{ name }}</v-card-title>
    <v-card-actions> </v-card-actions>
    <v-card-text>
      <v-container>
        <v-row justify="space-between">
          <v-col>
            <p>
              Select which item (e.g. servings or ingredient) you'd like to
              adjust.
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
            :value="servings"
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
</template>

<script>
import IngredientDetail from "@/components/amounts/IngredientDetail.vue";
import ServingsDetail from "@/components/amounts/ServingsDetail.vue";

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
      amounts: null,
      selected: null,
      lastSelected: null,
      isLoading: false,
    };
  },
  created() {
    this.loadRecipe();
    this.loadAmounts();

    this.selected = {
      servings: false,
      ingredients: this.recipe.ingredients.reduce((acc, ingredient) => {
        acc[ingredient.id] = false;
        return acc;
      }, {}),
    };
  },
  computed: {
    name() {
      return this.recipe.name;
    },
    link() {
      return this.recipe.link;
    },
    ingredients() {
      return this.recipe.ingredients.map((ingredient) => ({
        ...ingredient,
        amount: this.amounts.ingredients[ingredient.id],
      }));
    },
    servings() {
      return this.amounts.servings;
    },
  },
  methods: {
    loadRecipe() {
      const recipe = this.$store.getters["recipes/recipes"].find(
        (recipe) => recipe.id === this.id
      );
      this.recipe = recipe;
    },
    loadAmounts() {
      const amounts = this.$store.getters["amounts/amounts"].find(
        (amount) => amount.recipeId === this.id
      );
      this.amounts = amounts;
    },
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
    async adjust(type, newVal, oldVal, id) {
      this.isLoading = true;
      await this.$store.dispatch("amounts/adjustAmount", {
        recipeId: this.id,
        multiplier: newVal / oldVal,
      });
      this.toggle(type, id);
      this.lastSelected = null;

      this.loadAmounts();

      this.isLoading = false;
    },
  },
};
</script>