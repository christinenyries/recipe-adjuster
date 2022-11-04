<template>
  <v-container>
    <base-card>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            label="E-Mail"
            type="email"
            :rules="email.rules"
            v-model.trim="email.val"
            required
          />
          <v-text-field
            label="Password"
            type="password"
            :rules="password.rules"
            v-model.trim="password.val"
            required
          />
          <base-button @click="submitForm" class="mr-2" :disabled="!valid">{{
            submitButtonCaption
          }}</base-button>
          <base-button @click="switchAuthMode" outlined>{{
            switchModeButtonCaption
          }}</base-button>
        </v-form>
      </v-card-text>
    </base-card>

    <!-- Loading dialog -->
    <base-dialog title="Authenticating" :show="isLoading" persistent>
      <div class="text-center">
        <p><v-progress-circular indeterminate /></p>
        <p>ε=ε=ε=ε=┌(;￣▽￣)┘</p>
      </div>
    </base-dialog>

    <!-- Error dialog -->
    <base-dialog
      title="Something went wrong!"
      :show="!!error"
      @close="handleError"
    >
      <p>{{ error && error.message }}</p>
      <code>{{ error && error.reason }}</code>
    </base-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: {
        val: "",
        rules: [
          (v) => !!v || "Email is required.",
          (v) => v.includes("@") || "Please enter a valid email address",
        ],
      },
      password: {
        val: "",
        rules: [
          (v) => !!v || "Password is required.",
          (v) => v.length >= 8 || "Password should have a minimum length of 8.",
          (v) =>
            /[A-Z]/.test(v) ||
            "Password should have at least one uppercase letter.",
          (v) =>
            /[a-z]/.test(v) ||
            "Password should have at least one lowercase letter.",
          (v) =>
            /[0-9]/.test(v) ||
            "Password should have at least one numeric character.",
        ],
      },
      valid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      return this.mode === "login" ? "Login" : "Signup";
    },
    switchModeButtonCaption() {
      return this.mode === "login" ? "Signup instead" : "Login instead";
    },
  },
  methods: {
    async submitForm() {
      this.$refs.form.validate();
      this.isLoading = true;

      try {
        await this.$store.dispatch(this.mode, {
          email: this.email.val,
          password: this.password.val,
        });
        const redirectUrl = `/${this.$route.query.redirect || "recipes"}`;
        this.$router.replace(redirectUrl);
      } catch (error) {
        this.error = {
          message:
            "Authentication failed. Please try again later or check your input.",
          reason: error.message || "",
        };
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      this.mode = this.mode === "login" ? "signup" : "login";
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>