<template>
  <amount-adjust
    :selected="selected"
    :cols="8"
    :value="value"
    label="Servings"
    @select="select"
    @cancel="cancel"
    @adjust="adjust"
  >
  </amount-adjust>
</template>

<script>
import AmountAdjust from "@/components/amounts/AmountAdjust.vue";

export default {
  components: {
    AmountAdjust,
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
    selected: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    select() {
      this.$emit("select", "servings");
    },
    cancel() {
      this.$emit("cancel", "servings");
    },
    adjust(amount) {
      this.$emit("adjust", "servings", amount);
    },
  },
};
</script>