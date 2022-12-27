/** @format */

/**
 * /* eslint-env node
 *
 * @format
 */

module.exports = {
	env: {
		browser: true,
		es6: true,
		"jest/globals": true,
	},
	extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: "module",
	},
	plugins: ["react", "jest", "prettier"],
	rules: {
		indent: ["error", 2],
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "single"],
		semi: ["error", "never"],
		eqeqeq: "error",
		"no-trailing-spaces": "error",
		"object-curly-spacing": ["error", "always"],
		"arrow-spacing": ["error", { before: true, after: true }],
		"no-console": 0,
		"react/prop-types": 0,
		"react/react-in-jsx-scope": "off",
		"prettier/prettier": "warn",
	},
	settings: {
		react: {
			version: "detect",
		},
	},
};
