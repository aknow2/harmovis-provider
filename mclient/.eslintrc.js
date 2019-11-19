module.exports = {
  "parser": "@typescript-eslint/parser",
  "env": {
    "es6": true,
    "browser": true
  },
  "extends": [
    "airbnb",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint"
  ],
  "globals": {
    "__DEV__": true
  },
  "plugins": [
    "@typescript-eslint",
    "react-hooks"
  ],
  "parserOptions": {
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "settings": {
    "import/extensions": [
      ".js",
      ".jsx",
      ".ts",
      ".tsx"
    ],
    "import/core-modules": [
      "app"
    ],
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ]
      }
    }
  },
  "rules": {
    "no-console": "off",
    "prettier/prettier": ["error", { "singleQuote": true }],
    "react/prop-types": [
      0
    ],
    "no-debugger": "off",
    'no-unused-vars': 'off',
    "react-hooks/rules-of-hooks": "error",
    "react/jsx-filename-extension": [
      "error",
      {
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ]
      }
    ],
    "import/extensions": [
      "error", "always",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ]
  }
}
