module.exports = {
    "env": {
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        'airbnb',
        'airbnb-typescript',
        "plugin:react/jsx-runtime"
    ],
    "overrides": [],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": './tsconfig.json',
        "tsconfigRootDir": __dirname
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "linebreak-style": 0,
        "semi": [
            "error",
            "always"
        ],
        "max-len": [
            "error",
            {
                "code": 120
            }
        ]
    }
}