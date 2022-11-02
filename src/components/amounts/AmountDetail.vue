<template>
  <v-container>
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
        <base-button
          v-if="isMdAndDown"
          block
          :disabled="!adjustable"
          @click="adjust"
        >
          <v-icon>mdi-content-save</v-icon>
        </base-button>
        <base-button v-else block @click="adjust" :disabled="!adjustable"
          >Adjust</base-button
        >
      </v-col>
      <v-col v-if="selected" cols="2">
        <base-button v-if="isMdAndDown" block outlined @click="cancel">
          <v-icon>mdi-close</v-icon>
        </base-button>
        <base-button v-else block outlined @click="cancel">Cancel</base-button>
      </v-col>
    </v-row>
  </v-container>
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
    initialValue: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      amount: this.initialValue,
      rules: [
        (v) =>
          (!isNaN(parseFloat(v)) && v > 0) ||
          `${this.label} must be a positive number and not zero`,
      ],
      valid: true,
    };
  },
  computed: {
    adjustable() {
      return this.valid && this.amount !== this.initialValue;
    },
    isMdAndDown() {
      return this.$vuetify.breakpoint.mdAndDown;
    },
  },
  watch: {
    initialValue() {
      this.amount = this.initialValue;
    },
  },
  methods: {
    select() {
      this.$emit("select");
    },
    cancel() {
      this.amount = this.initialValue;
      this.$emit("cancel");
    },
    adjust() {
      this.$refs.form.validate();

      const newVal = this.amount;
      const oldVal = this.initialValue;

      this.$emit("adjust", newVal, oldVal);
    },
  },
};
</script>