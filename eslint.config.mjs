import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig(
  [
    {
      files: ["**/*.{js,mjs,cjs}"],
      plugins: { js },
      extends: ["js/recommended"]
    },
    {
      files: ["**/*.{js,mjs,cjs}"],
      languageOptions: { globals: { ...globals.browser, ...globals.node } }
    },
    {
      files: ["**/*.json"],
      plugins: { json },
      language: "json/json",
      extends: ["json/recommended"]
    },
    {
      files: ["**/*.css"],
      plugins: { css },
      language: "css/css",
      extends: ["css/recommended"]
    },
    {
      files: ["package-lock.json"],
      rules: {
        "json/no-empty-keys": "off"
      }
    }
  ],
  {
    ignores: ["__tests__/"]  
  }
);
