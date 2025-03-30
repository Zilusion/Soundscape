import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import SVGSpriter from 'svg-sprite';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

export default function ViteSvgSpritePlugin(options = {}) {
	const iconsDir =
		options.iconsDir || path.resolve(process.cwd(), 'public', 'icons');
	const outputSprite =
		options.outputSprite ||
		path.resolve(process.cwd(), 'public', 'icon-sprite.svg');

	const config = {
		dest: '.',
		mode: {
			symbol: {
				inline: true,
				sprite: 'icon-sprite.svg',
			},
		},
	};

	const plugin = {
		name: 'vite-svg-sprite',
		async buildStart() {
			const spriter = new SVGSpriter(config);
			try {
				const files = await fs.promises.readdir(iconsDir);
				for (const file of files) {
					if (file.endsWith('.svg')) {
						const filePath = path.join(iconsDir, file);
						const content = await readFileAsync(filePath, 'utf8');
						spriter.add(filePath, file, content);
					}
				}
				const compileAsync = promisify(spriter.compile.bind(spriter));
				const result = await compileAsync();
				const spriteContent = result.symbol.sprite.contents;
				await writeFileAsync(outputSprite, spriteContent);
				console.log('SVG sprite generated at:', outputSprite);
			} catch (error) {
				console.error('Error generating SVG sprite:', error);
			}
		},
		configureServer(server) {
			server.watcher.add(iconsDir);
			server.watcher.on('all', async (event, changedPath) => {
				if (!changedPath.endsWith('.svg')) return;
				if (path.resolve(changedPath) === path.resolve(outputSprite))
					return;
				if (['add', 'change', 'unlink'].includes(event)) {
					console.log(
						`SVG file ${event}: ${changedPath}. Regenerating sprite...`,
					);
					await plugin.buildStart();
				}
			});
		},
	};

	return plugin;
}
