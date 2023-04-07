module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		jest: true
	},
	settings: {
		react: {
			version: 'detect'
		}
	},
	extends: [
		'plugin:react/recommended',
		'standard'
	],
	overrides: [
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: [
		'react',
		'react-hooks',
		'simple-import-sort'
	],
	rules: {
		indent: [ 'error', 'tab', { SwitchCase: 2 } ],
		quotes: [ 'error', 'single' ],
		semi: [ 'error', 'always', {
			omitLastInOneLineBlock: true
		} ],
		'react/prop-types': 0,
		'no-console': 'error',
		'object-curly-spacing': [ 'error', 'always' ],
		'array-bracket-spacing': [ 'error', 'always' ],
		'arrow-parens': [ 'error', 'as-needed' ],
		'react/prefer-stateless-function': 'error',
		'react-hooks/exhaustive-deps': 'error',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'react/react-in-jsx-scope': 'off',
		'no-tabs': 0
	}
};
