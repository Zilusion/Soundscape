import Page from '../../global/page';
import ElementCreator from '../../utils/element-creator';
import type { SoundCardsPageViewModel } from './sound-cards-page-view-model';
import { SoundCardView } from '../sound-card/sound-card-view';
import 'virtual:svg-icons-register';
import classes from './_sound-card-page-view.module.scss';

export class SoundCardsPageView extends Page {
	private viewModel: SoundCardsPageViewModel;

	constructor(viewModel: SoundCardsPageViewModel) {
		super(classes['page'], classes['container']);
		this.viewModel = viewModel;

		const controls = ElementCreator.create({
			tag: 'div',
			classes: classes.controls,
		});

		const globalVolumeSlider = ElementCreator.create({
			tag: 'input',
			classes: classes['global-volume-slider'],
			attributes: {
				type: 'range',
				min: '0',
				max: '100',
				value: `${this.viewModel.globalVolume}`,
			},
		});

		globalVolumeSlider.addEventListener('input', (event: Event) => {
			if (event.target instanceof HTMLInputElement) {
				this.viewModel.globalVolume = Number(event.target.value);
			}
		});
		controls.append(globalVolumeSlider);

		this.viewModel.onGlobalVolumeChange((vol) => {
			if (globalVolumeSlider instanceof HTMLInputElement) {
				globalVolumeSlider.value = `${vol}`;
			}
		});

		const muteButton = ElementCreator.create({
			tag: 'button',
			classes: classes['mute-button'],
			attributes: { type: 'button' },
			content: this.viewModel.globalVolume === 0 ? 'Unmute' : 'Mute',
		});

		muteButton.addEventListener('click', () => {
			this.viewModel.toggleMute();
		});

		this.viewModel.onGlobalVolumeChange((vol) => {
			muteButton.textContent = vol === 0 ? 'Unmute' : 'Mute';
		});
		controls.append(muteButton);

		const playPauseButton = ElementCreator.create({
			tag: 'button',
			classes: classes['play-pause-button'],
			attributes: { type: 'button' },
			content: this.viewModel.paused ? 'Play All' : 'Pause All',
		});

		playPauseButton.addEventListener('click', () => {
			this.viewModel.togglePlayPause();
		});

		this.viewModel.onPausedChange((paused) => {
			playPauseButton.textContent = paused ? 'Play All' : 'Pause All';
		});
		controls.append(playPauseButton);

		const resetButton = ElementCreator.create({
			tag: 'button',
			classes: classes['reset-button'],
			attributes: { type: 'button' },
			content: 'Reset Settings',
		});

		resetButton.addEventListener('click', () => {
			this.viewModel.resetSettings();
		});
		controls.append(resetButton);

		this.container.append(controls);

		const soundCardsContainer = ElementCreator.create({
			tag: 'div',
			classes: classes['sound-cards'],
		});

		this.viewModel.soundCardViewModels.forEach((cardVM) => {
			const cardView = new SoundCardView(cardVM);
			soundCardsContainer.append(cardView.render());
		});

		this.container.append(soundCardsContainer);
	}
}
