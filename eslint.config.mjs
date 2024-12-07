import antfu from "@antfu/eslint-config"
import nextPlugin from "@next/eslint-plugin-next"
import jestDom from "eslint-plugin-jest-dom"
import playwright from "eslint-plugin-playwright"
import tailwind from "eslint-plugin-tailwindcss"
import testingLibrary from "eslint-plugin-testing-library"

export default antfu(
  {
    react: true,
    typescript: true,
    lessOpinionated: true,
    isInEditor: false,
    stylistic: false,
    ignores: ["migrations/**/*", "next-env.d.ts"]
  },
  ...tailwind.configs["flat/recommended"],
  {
    plugins: {
      "@next/next": nextPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules
    }
  },
  {
    files: ["**/*.test.ts?(x)"],
    ...testingLibrary.configs["flat/react"],
    ...jestDom.configs["flat/recommended"]
  },
  {
    files: ["**/*.spec.ts", "**/*.e2e.ts"],
    ...playwright.configs["flat/recommended"]
  },
  {
    rules: {
      "unused-imports/no-unused-imports": "off",
      "antfu/no-top-level-await": "off", // Allow top-level await
      "ts/consistent-type-definitions": ["error", "type"], // Use `type` instead of `interface`
      "ts/no-require-imports": "off", // Allow using `require`
      "react/prefer-destructuring-assignment": "off", // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
      "node/prefer-global/process": "off", // Allow using `process.env`
      "test/padding-around-all": "error", // Add padding in test files
      "test/prefer-lowercase-title": "off" // Allow using uppercase titles in test titles
    }
  }
)
