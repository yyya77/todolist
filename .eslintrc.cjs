module.exports = {
    root: true, // new
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        // 'standard-with-typescript'
        'standard'
    ],
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser', // new
        sourceType: 'module'
    },
    plugins: [
        'vue',
        '@typescript-eslint'
    ],
    rules: {
        // 风格样式缩进检测，eslint给出的规则是2个缩进，但我们通常是4个缩进
        indent: 0
    }
}
