module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'standard'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        indent: ['error', 4],
        'no-unused-vars': 0,
        'no-undef': 0,
        camelcase: 0,
        'prefer-const': 0
    }
}
