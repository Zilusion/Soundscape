import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

const prettierConfigPath = path.join(__dirname, '.prettierrc');
const prettierConfig = fs.existsSync(prettierConfigPath)
	? JSON.parse(fs.readFileSync(prettierConfigPath, 'utf8'))
	: {};

export default [
	{
		ignores: [
			'**/*.md',
			'**/tmp/**/*',
			'**/*.html',
			'**/dist/**/*',
			'**/node_modules/**/*',
			'**/eslint.config.js',
			'**/stylelint.config.js',
			'**/commitlint.config.cjs',
		],
	},

	...compat.extends(
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:prettier/recommended',
	),

	eslintPluginUnicorn.configs.recommended,
	{
		rules: {
			'unicorn/better-regex': 'warn',
			'unicorn/no-array-callback-reference': 'off',
			'unicorn/no-array-for-each': 'off',
			'unicorn/no-array-reduce': 'off',
			'unicorn/no-null': 'off',
			'unicorn/number-literal-case': 'off',
			'unicorn/numeric-separators-style': 'off',
			'unicorn/no-nested-ternary': 'off',
			'unicorn/prevent-abbreviations': [
				'error',
				{
					allowList: {
						acc: true,
						env: true,
						i: true,
						j: true,
						props: true,
						Props: true,
					},
				},
			],
		},
	},

	{
		linterOptions: {
			noInlineConfig: true,
			reportUnusedDisableDirectives: true,
		},

		languageOptions: {
			globals: {
				...globals.browser,
			},
			parser: tsParser,
			ecmaVersion: 2020,
			sourceType: 'module',
			parserOptions: {
				project: path.join(__dirname, 'tsconfig.json'),
				projectService: true,
				tsconfigRootDir: __dirname,
			},
		},

		rules: {
			'prettier/prettier': ['error', prettierConfig],

			'@typescript-eslint/consistent-type-imports': 'error',
			'@typescript-eslint/explicit-function-return-type': 'error',
			'@typescript-eslint/consistent-type-assertions': [
				'error',
				{ assertionStyle: 'never' },
			],
			'@typescript-eslint/explicit-member-accessibility': [
				'error',
				{
					accessibility: 'explicit',
					overrides: { constructors: 'off' },
				},
			],
			'@typescript-eslint/member-ordering': 'error',
			'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
			'@typescript-eslint/no-explicit-any': 'error',
		},
	},
];
