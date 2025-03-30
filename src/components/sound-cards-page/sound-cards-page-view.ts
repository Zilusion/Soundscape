import Page from '../../global/page';
import ElementCreator from '../../utils/element-creator';
import type { SoundCardsPageViewModel } from './sound-cards-page-view-model';
import { SoundCardView } from '../sound-card/sound-card-view';
import classes from './_sound-cards-page-view.module.scss';

export class SoundCardsPageView extends Page {
	private viewModel: SoundCardsPageViewModel;

	constructor(viewModel: SoundCardsPageViewModel) {
		super(classes['page'], classes['container']);
		this.viewModel = viewModel;

		const controls = ElementCreator.create({
			tag: 'div',
			classes: classes.controls,
		});

		const globalSliderRange = new ElementCreator({
			tag: 'div',
			classes: classes.range,
		});

		globalSliderRange.setStyleProperty(
			'--volume',
			this.viewModel.globalVolume.toString(),
		);

		const track = ElementCreator.create({
			tag: 'div',
			classes: classes.track,
		});

		const progress = ElementCreator.create({
			tag: 'div',
			classes: classes.progress,
		});

		const thumbs = ElementCreator.create({
			tag: 'div',
			classes: classes.thumbs,
		});

		const output = ElementCreator.create({
			tag: 'output',
			classes: classes['range-output'],
			attributes: {
				for: 'global-volume-slider',
				id: 'global-volume-slider-output',
			},
			content: `${this.viewModel.globalVolume}`,
		});

		const slider = ElementCreator.create({
			tag: 'input',
			classes: classes['range-input'],
			attributes: {
				id: 'global-volume-slider',
				type: 'range',
				min: '0',
				max: '100',
				value: `${this.viewModel.globalVolume}`,
				step: '1',
			},
			on: {
				input: (event: Event): void => {
					if (event.target instanceof HTMLInputElement) {
						this.viewModel.globalVolume = Number(
							event.target.value,
						);
					}
				},
			},
		});

		thumbs.append(slider, output);

		globalSliderRange.append([track, progress, thumbs]);

		controls.append(globalSliderRange.getElement());

		this.viewModel.onGlobalVolumeChange((vol) => {
			globalSliderRange.setStyleProperty('--volume', vol.toString());

			if (slider instanceof HTMLInputElement) {
				slider.value = String(vol);
			}
			if (output instanceof HTMLOutputElement) {
				output.value = String(vol);
			}
		});

		const muteButton = ElementCreator.create({
			tag: 'button',
			classes: classes['mute-button'],
			attributes: { type: 'button' },
		});

		const muteIcon = ElementCreator.create({
			tag: 'svg',
			namespace: 'http://www.w3.org/2000/svg',
		});

		const muteUseElement = ElementCreator.create({
			tag: 'use',
			namespace: 'http://www.w3.org/2000/svg',
			attributes: {
				'xlink:href':
					this.viewModel.globalVolume === 0
						? '/icon-sprite.svg#mute'
						: '/icon-sprite.svg#volume',
			},
		});

		muteIcon.append(muteUseElement);
		if (muteIcon instanceof SVGSVGElement) {
			muteButton.append(muteIcon);
		}

		muteButton.addEventListener('click', () => {
			this.viewModel.toggleMute();
		});

		this.viewModel.onGlobalVolumeChange((vol) => {
			muteUseElement.setAttribute(
				'href',
				vol === 0 ? '/icon-sprite.svg#mute' : '/icon-sprite.svg#volume',
			);
		});
		controls.append(muteButton);

		const playPauseButton = ElementCreator.create({
			tag: 'button',
			classes: [
				classes['play-pause-button'],
				this.viewModel.paused ? classes.play : classes.pause,
			],
			attributes: { type: 'button' },
			// content: this.viewModel.paused ? 'Play All' : 'Pause All',
		});

		playPauseButton.addEventListener('click', () => {
			this.viewModel.togglePlayPause();
		});

		this.viewModel.onPausedChange((paused) => {
			// playPauseButton.textContent = paused ? 'Play All' : 'Pause All';
			playPauseButton.classList.toggle(classes.play, paused);
			playPauseButton.classList.toggle(classes.pause, !paused);
		});
		controls.append(playPauseButton);

		const resetButton = ElementCreator.create({
			tag: 'button',
			classes: classes['reset-button'],
			attributes: { type: 'button' },
		});

		const resetIcon = ElementCreator.create({
			tag: 'svg',
			namespace: 'http://www.w3.org/2000/svg',
		});

		const resetUseElement = ElementCreator.create({
			tag: 'use',
			namespace: 'http://www.w3.org/2000/svg',
			attributes: {
				'xlink:href': '/icon-sprite.svg#reset',
			},
		});

		resetIcon.append(resetUseElement);
		if (resetIcon instanceof SVGSVGElement) {
			resetButton.append(resetIcon);
		}

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

		const lineBlock = ElementCreator.create({
			tag: 'div',
			classes: classes['line-block'],
		});

		this.container.append(lineBlock);
	}
}
