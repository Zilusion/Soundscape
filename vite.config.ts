import Inspect from 'vite-plugin-inspect';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'node:path';

export default {
	base: './',
	plugins: [
		Inspect(),
		createSvgIconsPlugin({
			iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
			symbolId: 'icon-[name]',
			svgoOptions: true,
		}),
	],
};
