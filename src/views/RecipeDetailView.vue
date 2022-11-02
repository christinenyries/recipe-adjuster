<template>
  <recipe-detail :id="id"></recipe-detail>
</template>

<script>
import RecipeDetail from "@/components/recipes/RecipeDetail.vue";
export default {
  props: {
    id: {
      required: true,
    },
  },
  components: {
    RecipeDetail,
  },
};
</script>