<template>
  <v-form ref="form" v-model="valid">
    <v-container>
      <v-row>
        <v-text-field
          v-model.trim="name.val"
          label="Recipe Name"
          :rules="name.rules"
          :placeholder="name.placeholder"
          required
          type="text"
        />
      </v-row>
      <v-row>
        <v-text-field
          v-model.trim="link.val"
          label="Recipe Link"
          :rules="link.rules"
          :placeholder="link.placeholder"
          type="url"
        />
      </v-row>
      <v-row>
        <v-text-field
          v-model.number="servings.val"
          label="Servings"
          :rules="servings.rules"
          required
          type="number"
        />
      </v-row>
      <v-row>
        <v-textarea
          v-model.trim="ingredients.val"
          label="Ingredients"
          :rows="rows"
          :rules="ingredients.rules"
          :placeholder="ingredients.placeholder"
          :hint="ingredients.hint"
          auto-grow
        ></v-textarea>
      </v-row>
      <v-row justify="center">
        <base-button :disabled="!valid" @click="addRecipe">Submit</base-button>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
// source: https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/
const isValidUrl = (urlString) => {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

export default {
  data() {
    return {
      rows: 10,
      valid: false,
      servings: {
        val: 1,
        rules: [
          (v) =>
            (!isNaN(parseFloat(v)) && v > 0) ||
            "Servings must be a positive number and not zero.",
        ],
      },
      name: {
        val: "",
        rules: [(v) => !!v || "Name must not be empty."],
        placeholder: "Homemade Tonkatsu Sauce",
      },
      link: {
        val: "",
        rules: [(v) => !v || isValidUrl(v) || "Link must be a valid URL."],
        placeholder: "https://www.justonecookbook.com/tonkatsu-sauce-recipe/",
      },
      ingredients: {
        val: "",
        rules: [(v) => !!v || "Ingredients must not be empty."],
        placeholder:
          "1 Tbsp ketchup\n" +
          "2½ tsp Worcestershire sauce\n" +
          "1 1/2 tsp oyster sauce\n" +
          "1.125 tsp sugar",
        hint: "Please enter one ingredient per line with its amount, unit, and name separated by space/s.",
      },
    };
  },
  methods: {
    addRecipe() {
      this.$refs.form.validate();
      const formData = {
        name: this.name.val,
        servings: this.servings.val,
        link: this.link.val,
        ingredients: this.ingredients.val,
      };
      this.$emit("save-data", formData);
    },
  },
};
</script>