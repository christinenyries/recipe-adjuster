<template>
  <amount-detail
    :selected="selected"
    :cols="8"
    :initial-value="value"
    label="Servings"
    @select="select"
    @cancel="cancel"
    @adjust="adjust"
  >
  </amount-detail>
</template>

<script>
import AmountDetail from "@/components/amounts/AmountDetail.vue";

export default {
  components: {
    AmountDetail,
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
    adjust(newVal, oldVal) {
      this.$emit("adjust", "servings", newVal, oldVal);
    },
  },
};
</script>