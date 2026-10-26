import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        document: "readonly",
        window: "readonly",
        location: "readonly",
        $: "readonly",
        bootstrap: "readonly",
        angular: "readonly",
        WOW: "readonly",
        setTimeout: "readonly",
      },
    },
    files: ["**/*.js"],
    rules: {
      "no-console": "warn",
      "no-unused-vars": "warn",
    },
  },
  {
    languageOptions: {
      globals: {
        module: "readonly",
        process: "readonly",
      },
    },
    files: ["src/helpers/**/*.js"],
  },
];