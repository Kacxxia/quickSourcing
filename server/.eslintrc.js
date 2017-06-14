module.exports = {
    extends: "eslint:recommended",
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
    },
    rules: {
        "no-console": 0
    },
    globals: {
        console: false,
        module: false,
        "__dirname": false,
        require: false,
        exports: false
    }

};