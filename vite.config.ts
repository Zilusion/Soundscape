import Inspect from 'vite-plugin-inspect';
import ViteSvgSpritePlugin from './plugins/vite-svg-sprite';
// import { patchCssModules } from 'vite-css-modules';

export default {
	base: '/',
	plugins: [
		Inspect(),
		ViteSvgSpritePlugin({
			iconsDir: 'public/assets/icons',
			outputSprite: 'public/icon-sprite.svg',
		}),
		// patchCssModules(),
	],
};
