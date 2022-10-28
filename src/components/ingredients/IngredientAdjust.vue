<template>
  <v-row align="center">
    <v-col cols="2">
      <v-text-field
        v-model.trim="value"
        :rules="rules"
        label="Amount"
        required
        :disabled="disabled"
      />
    </v-col>
    <v-col cols="2">{{ unit }}</v-col>
    <v-col cols="4">{{ name }}</v-col>
    <v-col v-if="disabled" cols="4">
      <base-button block @click="select">Select</base-button>
    </v-col>
    <v-col v-if="!disabled" cols="2">
      <base-button block @click="adjust">Adjust</base-button>
    </v-col>
    <v-col v-if="!disabled" cols="2">
      <base-button block outlined @click="cancel">Cancel</base-button>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    ingredient: {
      required: true,
    },
  },
  data() {
    return {
      value: this.ingredient.amount,
      rules: [
        (s) => !!s.trim() || "Amount is required.",
        (s) => !isNaN(parseFloat(s)) || "Amount should be a number.",
        (s) => s > 0 || "Amount should not be negative or zero.",
      ],
      disabled: true,
    };
  },
  computed: {
    unit() {
      return this.ingredient.unit;
    },
    name() {
      return this.ingredient.name;
    },
  },
  methods: {
    select() {
      this.disabled = false;
    },
    adjust() {
      // mutate servings state
    },
    cancel() {
      this.value = this.ingredient.amount;
      this.disabled = true;
    },
  },
};
</script>