<template>
  <v-row align="center">
    <v-col cols="8">
      <v-text-field
        v-model.trim="value"
        :rules="rules"
        label="Servings"
        required
        :disabled="disabled"
      />
    </v-col>
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
    servings: {
      required: true,
    },
  },
  data() {
    return {
      value: this.servings,
      rules: [
        (s) => !!s.trim() || "Servings is required.",
        (s) => !isNaN(parseFloat(s)) || "Servings should be a number.",
        (s) => s > 0 || "Servings should not be negative or zero.",
      ],
      disabled: true,
    };
  },
  methods: {
    select() {
      this.disabled = false;
    },
    adjust() {
      // mutate servings state
    },
    cancel() {
      this.value = this.servings;
      this.disabled = true;
    },
  },
};
</script>