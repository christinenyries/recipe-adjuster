<template>
  <v-container py-12>
    <v-row>
      <base-card>
        <v-card-title>Motivations</v-card-title>
        <v-card-text>
          <p>This tool was created for two main reasons:</p>
          <ul>
            <li>#1 is to learn Vue and Firebase.</li>
            <li>
              #2 is because the author frequently finds herself in a situation
              where she don't have the right amount of ingredients as suggested
              in a recipe. Adjustments are needed and sometimes this is done
              manually on a piece of paper. Sometimes with the help of Excel.
              The frustration from doing these adjustments time and time again
              have sparked the ideas for making this tool.
            </li>
          </ul>
        </v-card-text>
      </base-card>
      <base-card>
        <v-card-title>Technologies Learned</v-card-title>
        <v-card-text>
          <v-container d-flex>
            <a href="https://vuejs.org/" target="_blank">
              <v-img
                src="https://cdn.freebiesupply.com/logos/large/2x/vue-9-logo-svg-vector.svg"
                max-width="50"
              ></v-img>
            </a>
            <a href="https://vuetifyjs.com/en/" target="_blank">
              <v-img
                src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-light-text.svg"
                max-width="175"
              ></v-img>
            </a>
            <a href="https://firebase.google.com/" target="_blank">
              <v-img
                src="https://cdn.freebiesupply.com/logos/large/2x/firebase-1-logo-svg-vector.svg"
                max-width="35"
              ></v-img>
            </a>
          </v-container>
        </v-card-text>
      </base-card>
      <base-card>
        <v-card-title>Contact</v-card-title>
        <v-card-text>
          <v-container d-flex>
            <a href="https://github.com/christinenyries" target="_blank">
              <v-img
                src="https://cdn.freebiesupply.com/logos/large/2x/github-icon-1-logo-svg-vector.svg"
                max-width="50"
              ></v-img>
            </a>
            <a
              href="https://www.linkedin.com/in/christine-nyries-yambao/"
              target="_blank"
            >
              <v-img
                src="https://cdn.freebiesupply.com/logos/large/2x/linkedin-icon-logo-svg-vector.svg"
                max-width="50"
              ></v-img>
            </a>
          </v-container>
        </v-card-text>
      </base-card>
      <base-card>
        <v-card-title>Support</v-card-title>
        <v-card-text>
          <v-container d-flex>
            <a href="https://ko-fi.com/N4N1G6GSL" target="_blank"
              ><img
                height="36"
                style="border: 0px; height: 36px"
                src="https://storage.ko-fi.com/cdn/kofi1.png?v=3"
                border="0"
                alt="Support Me on Ko-fi"
            /></a>
          </v-container>
        </v-card-text>
      </base-card>
    </v-row>
  </v-container>
</template>

<style scoped>
a {
  margin: 0 0.75rem;
}
</style>