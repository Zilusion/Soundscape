export default {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-clean-order',
		'stylelint-config-standard-scss',
	],
	rules: {
		'no-descending-specificity': null,
	},
};
