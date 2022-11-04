<template>
  <v-dialog
    max-width="600"
    transition="dialog-top-transition"
    :value="show"
    :persistent="persistent"
  >
    <template v-slot:activator="{ on, attrs }">
      <slot name="activator" :on="on" :attrs="attrs"></slot>
    </template>
    <v-card>
      <v-toolbar :color="color" dark>{{ title }}</v-toolbar>
      <v-card-text class="pt-5">
        <slot></slot>
      </v-card-text>
      <v-card-actions v-if="!persistent" class="justify-center">
        <slot name="actions">
          <base-button outlined @click="tryClose">Close</base-button>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    persistent: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    tryClose() {
      if (this.persistent) {
        return;
      }
      this.$emit("close");
    },
  },
  computed: {
    color() {
      return this.persistent ? "primary" : "red accent-4";
    },
  },
};
</script>