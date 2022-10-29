<template>
  <v-row align="center">
    <v-col cols="cols">
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model.number="amount"
          :label="label"
          :rules="rules"
          :disabled="!selected"
          required
          type="number"
        />
      </v-form>
    </v-col>
    <slot></slot>
    <v-col v-if="!selected" cols="4">
      <base-button block @click="select">Select</base-button>
    </v-col>
    <v-col v-if="selected" cols="2">
      <base-button block @click="adjust" :disabled="!valid">Adjust</base-button>
    </v-col>
    <v-col v-if="selected" cols="2">
      <base-button block outlined @click="cancel">Cancel</base-button>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    selected: {
      type: Boolean,
      required: true,
    },
    cols: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      amount: this.value,
      rules: [
        (v) => !!v.toString().trim() || `${this.label} is required.`,
        (v) => !isNaN(parseFloat(v)) || `${this.label} should be a number.`,
        (v) =>
          parseFloat(v) > 0 || `${this.label} should not be negative or zero.`,
      ],
      valid: true,
    };
  },
  watch: {
    value() {
      this.amount = this.value;
    },
  },
  methods: {
    select() {
      this.$emit("select");
    },
    adjust() {
      this.$refs.form.validate();
      this.$emit("adjust", this.amount);
    },
    cancel() {
      this.amount = this.value;
      this.$emit("cancel");
    },
  },
};
</script>