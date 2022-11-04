<template>
  <v-col cols="12" lg="8" offset-lg="2">
    <v-card :outlined="outlined" min-width="374">
      <slot></slot>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    outlined: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
};
</script>