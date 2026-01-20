import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),

  {
    files: ["**/*.{ts,tsx}"],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: 2020,
        sourceType: "module",
      },
      globals: globals.browser,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      prettier,
      // ❌ NO react-refresh aquí
    },

    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      react.configs.flat.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite, // 👈 ya lo incluye
      eslintConfigPrettier,
    ],

    rules: {
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": "warn",
    },
  },
]);
