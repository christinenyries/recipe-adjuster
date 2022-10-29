<template>
  <v-container pa-0 ma-0>
    <v-btn
      v-if="link"
      target="_blank"
      :href="to"
      :color="color"
      :text="text"
      :block="block"
      :outlined="outlined"
      :disabled="disabled"
      :class="btnClasses"
      depressed
      @click="$emit('click')"
    >
      <slot></slot>
    </v-btn>
    <v-btn
      v-else
      :to="to"
      :text="text"
      :block="block"
      :outlined="outlined"
      :disabled="disabled"
      :class="btnClasses"
      depressed
      @click="$emit('click')"
    >
      <slot></slot>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      color: "teal",
      btnClasses: ["pa-0", "ma-0"],
    };
  },
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    text: {
      type: Boolean,
      required: false,
      default: false,
    },
    block: {
      type: Boolean,
      required: false,
      default: false,
    },
    outlined: {
      type: Boolean,
      required: false,
      default: false,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
    },
  },
};
</script>