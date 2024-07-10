module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        'no-unused-vars': 'off',
        'react/jsx-filename-extension': [
            2,
            {
                extensions: ['.js', '.jsx', '.tsx'],
            },
        ],
        // 'react/react-in-jsx-scope': 'off',
        // 'react/jsx-props-no-spreading': 'warn',
        // 'jsx-a11y/no-static-element-interactions': 'off',
        // 'jsx-a11y/click-events-have-key-events': 'off',
        'react/function-component-definition': 'off',
        indent: ['error', 4],
        'linebreak-style': 'off',
        'import/no-unresolved': 'off',
        'no-shadow': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-import-module-exports': 'off',
        'consistent-return': 'warn',
        'no-underscore-dangle': 'off',
        camelcase: 'off',
        'prefer-destructuring': 'off',
        'react/jsx-indent': ['error', 4],
        'import/prefer-default-export': 'off',
        'no-mixed-spaces-and-tabs': 'off',
        'no-tabs': 'off',
        'prefer-const': 'off',
        'import/no-mutable-exports': 'off',
    },
};