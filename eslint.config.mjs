import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: ["src/generated/**", ".next/**", "node_modules/**"],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
    },
  },
  {
    files: ["src/services/**/*.service.ts"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "Program > ImportDeclaration:first-child:not([source.value='server-only'])",
          message: "Service files must start with import \"server-only\".",
        },
      ],
    },
  },
];

export default eslintConfig;
