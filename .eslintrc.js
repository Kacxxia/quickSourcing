module.exports = {
    extends: ["eslint:recommended", "plugin:react/recommended"],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            "jsx": true,
            "blockBindings": true
        }
    },
    plugins: [
        "react"
    ],
    rules: {"no-console": 0},
    globals: {
        document: false,
        window: false,
        console: false,
        fetch: false,
        module: false,
        "__dirname": false,
        alert: false,
        Headers: false,
        FileReader: false,
        setTimeout: false,
        Promise: false,
        global: false
    }

};