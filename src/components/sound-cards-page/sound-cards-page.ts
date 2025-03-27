import Page from '../../global/page';
import ElementCreator from '../../utils/element-creator';
import { GlobalSettings } from '../../global/global-settings';
import { SoundCardModel } from '../sound-card/sound-card-model';
import { SoundCardViewModel } from '../sound-card/sound-card-view-model';
import { SoundCardView } from '../sound-card/sound-card-view';
import 'virtual:svg-icons-register';

export default class SoundCardsPage extends Page {
	constructor() {
		super('page', 'container');

		const globalSettings = GlobalSettings.getInstance();

		const globalVolumeSlider = ElementCreator.create({
			tag: 'input',
			attributes: {
				type: 'range',
				min: '0',
				max: '100',
				value: `${globalSettings.volume}`,
			},
		});
		globalVolumeSlider.addEventListener('input', (event: Event) => {
			if (event.target instanceof HTMLInputElement) {
				globalSettings.volume = Number(event.target.value);
			}
		});
		this.container.appendChild(globalVolumeSlider);

		globalSettings.onVolumeChange(() => {
			if (globalVolumeSlider instanceof HTMLInputElement) {
				globalVolumeSlider.value = `${globalSettings.volume}`;
			}
		});

		const muteButton = ElementCreator.create({
			tag: 'button',
			classes: ['mute-button'],
			attributes: { type: 'button' },
			content: globalSettings.volume === 0 ? 'Unmute' : 'Mute',
		});
		globalSettings.onVolumeChange(() => {
			muteButton.textContent =
				globalSettings.volume === 0 ? 'Unmute' : 'Mute';
		});
		muteButton.addEventListener('click', () => {
			if (globalSettings.volume === 0) {
				globalSettings.volume = globalSettings.previousVolume;
			} else {
				globalSettings.previousVolume = globalSettings.volume;
				globalSettings.volume = 0;
			}
		});
		this.container.appendChild(muteButton);

		const playPauseButton = ElementCreator.create({
			tag: 'button',
			classes: ['play-pause-button'],
			attributes: { type: 'button' },
			content: globalSettings.paused ? 'Play All' : 'Pause All',
		});
		playPauseButton.addEventListener('click', () => {
			globalSettings.paused = !globalSettings.paused;
		});
		globalSettings.onPausedChange((paused) => {
			playPauseButton.textContent = paused ? 'Play All' : 'Pause All';
		});
		this.container.appendChild(playPauseButton);

		const resetButton = ElementCreator.create({
			tag: 'button',
			classes: ['reset-button'],
			attributes: { type: 'button' },
			content: 'Reset Settings',
		});
		resetButton.addEventListener('click', () => {
			globalSettings.reset();
		});
		this.container.appendChild(resetButton);

		const soundCardData = [
			{
				id: 'wind',
				title: 'Ветер',
				iconPath: '#icon-wind',
				soundPath: '/assets/sounds/light-breeze.mp3',
				volume: 0,
			},
			{
				id: 'rain',
				title: 'Дождь',
				iconPath: '#icon-rain',
				soundPath: '/assets/sounds/rain.mp3',
				volume: 0,
			},
			{
				id: 'thunder',
				title: 'Гроза',
				iconPath: '#icon-thunder',
				soundPath: '/assets/sounds/thunder.mp3',
				volume: 0,
			},
		];

		soundCardData.forEach((data) => {
			try {
				const model = new SoundCardModel(
					data.id,
					data.title,
					data.iconPath,
					data.soundPath,
					data.volume,
				);
				const viewModel = new SoundCardViewModel(model);
				const view = new SoundCardView(viewModel);
				this.container.appendChild(view.render());
			} catch (error) {
				console.error(error);
			}
		});
	}
}
