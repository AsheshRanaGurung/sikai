module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["react", "prettier", "jsx-a11y", "import", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-unused-vars": ["error"],
    "no-console": 1,
    "no-unused-vars": ["error"],
    "import/first": "error",
    "react/prop-types": 0,
    // "linebreak-style": [
    //   "error",
    //   process.platform === "win32" ? "windows" : "unix"
    // ],
    "prefer-arrow-callback": "off",
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        trailingComma: "none",
      },
    ],
  },
};
