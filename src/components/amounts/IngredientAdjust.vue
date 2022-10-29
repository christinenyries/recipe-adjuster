<template>
  <amount-adjust
    :selected="selected"
    :cols="2"
    :value="value"
    label="Amount"
    @select="select"
    @cancel="cancel"
    @adjust="adjust"
  >
    <v-col cols="2">{{ unit }}</v-col>
    <v-col cols="4">{{ name }}</v-col>
  </amount-adjust>
</template>

<script>
import AmountAdjust from "@/components/amounts/AmountAdjust.vue";

export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
    selected: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  components: {
    AmountAdjust,
  },
  methods: {
    select() {
      this.$emit("select", "ingredients", this.id);
    },
    cancel() {
      this.$emit("cancel", "ingredients", this.id);
    },
    adjust(amount) {
      this.$emit("adjust", "ingredients", amount, this.id);
    },
  },
};
</script>