import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
// REVIEW: Reativar quando houver versão compatível do eslint-plugin-tailwindcss com Tailwind v4
// import tailwindcss from "eslint-plugin-tailwindcss";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  // REVIEW: Plugin tailwindcss removido temporariamente (Tailwind v4 não exporta resolveConfig); reativar quando houver versão compatível
  // {
  //   files: ["**/*.{ts,tsx}"],
  //   plugins: {
  //     tailwindcss,
  //   },
  //   rules: {
  //     "tailwindcss/classnames-order": "warn",
  //     "tailwindcss/no-custom-classname": "warn",
  //     "tailwindcss/no-contradicting-classname": "error",
  //   },
  // },
]);
