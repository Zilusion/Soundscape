export type Sound = {
	id: string;
	label: string;
	iconUrl: string;
	audioUrl: string;
	volume: number;
};

export const defaultSounds: Sound[] = [
	{
		id: 'rain',
		label: 'Дождь',
		iconUrl: './src/assets/icons/rain.svg',
		audioUrl: 'audio/rain.mp3',
		volume: 0.5,
	},
	{
		id: 'thunder',
		label: 'Камин',
		iconUrl: './src/assets/icons/thunder.svg',
		audioUrl: 'audio/fireplace.mp3',
		volume: 0.7,
	},
	{
		id: 'wind',
		label: 'Ветер',
		iconUrl: './src/assets/icons/wind.svg',
		audioUrl: 'audio/wind.mp3',
		volume: 0.3,
	},
	// … можно добавить ещё звуки
];
