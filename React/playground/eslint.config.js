/* The ESLint configuration file has recently changed from the eslintrc format (typically configured
in .eslintrc.js or .eslintrc.json files) to the new flat config format (typically configured in an eslint.config.js 
file).

Documentation:

- Older eslintrc format: https://eslint.org/docs/latest/use/configure/configuration-files-deprecated
- Flat config format: https://eslint.org/docs/latest/use/configure/configuration-files  */

import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";

export default [    
  //{ files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: {
      globals: globals.browser,
      parserOptions: { 
        ecmaFeatures: { jsx: true }, 
        ecmaVersion: "latest",
        sourceType: "module",
        project: ['./tsconfig.json', './tsconfig.node.json'] } } },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked, // The '...TypeChecked' config options enable 'typed linting'. See https://typescript-eslint.io/getting-started/typed-linting
  ...tseslint.configs.stylisticTypeChecked,
  ...fixupConfigRules(pluginReactConfig),
  { rules: { "react/jsx-uses-react": "off", "react/react-in-jsx-scope": "off" } },
  { settings: { react: { version: "detect" } } },
  { files: ['eslint.config.js'], ...tseslint.configs.disableTypeChecked } // ignore type checking for this file - don't really want to do this
];
