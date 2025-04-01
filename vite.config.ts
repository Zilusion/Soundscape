import Inspect from 'vite-plugin-inspect';
import ViteSvgSpritePlugin from './plugins/vite-svg-sprite';

export default {
	base: '/',
	plugins: [
		Inspect(),
		ViteSvgSpritePlugin({
			iconsDir: 'public/assets/icons',
			outputSprite: 'public/icon-sprite.svg',
		}),
	],
};
