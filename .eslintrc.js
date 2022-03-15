module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [ 'airbnb-base' ],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: [ '@typescript-eslint', 'immutable' ],
	rules: {
		'immutable/no-mutation': 4
	}
};
