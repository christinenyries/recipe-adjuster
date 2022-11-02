<template>
  <amount-detail
    :selected="selected"
    :cols="2"
    :initial-value="value"
    label="Amount"
    @select="select"
    @cancel="cancel"
    @adjust="adjust"
  >
    <v-col cols="2">{{ unit }}</v-col>
    <v-col cols="4">{{ name }}</v-col>
  </amount-detail>
</template>

<script>
import AmountDetail from "@/components/amounts/AmountDetail.vue";

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
    AmountDetail,
  },
  methods: {
    select() {
      this.$emit("select", "ingredients", this.id);
    },
    cancel() {
      this.$emit("cancel", "ingredients", this.id);
    },
    adjust(newVal, oldVal) {
      this.$emit("adjust", "ingredients", newVal, oldVal, this.id);
    },
  },
};
</script>