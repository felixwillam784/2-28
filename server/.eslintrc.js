module.exports = {
  env: {
    es2021: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  extends: ['standard', 'airbnb-base',
    'airbnb-typescript/base'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    semi: 0,
    "linebreak-style":0,
    "import/extensions": 0
  },
  ignorePatterns: ["/dist/*", "__tests__/*"],
}
