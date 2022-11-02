<template>
  <v-btn
    v-if="link"
    target="_blank"
    :href="to"
    :color="color"
    :text="text"
    :block="block"
    :outlined="outlined"
    :disabled="disabled"
    depressed
    @click="$emit('click')"
  >
    <slot></slot>
  </v-btn>
  <v-btn
    v-else
    :to="to"
    :color="color"
    :text="text"
    :block="block"
    :outlined="outlined"
    :disabled="disabled"
    depressed
    @click="$emit('click')"
  >
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
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
  computed: {
    color() {
      return "primary";
    },
  },
};
</script>