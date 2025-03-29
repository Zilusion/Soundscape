import ElementCreator from '../../utils/element-creator';
import type { SoundCardViewModel } from './sound-card-view-model';
import classes from './_sound-card-view.module.scss';

export class SoundCardView extends ElementCreator {
	private viewModel: SoundCardViewModel;

	constructor(viewModel: SoundCardViewModel) {
		super({
			tag: 'div',
			classes: [classes.card],
		});
		this.viewModel = viewModel;

		this.setStyleProperty('--volume', this.viewModel.volume.toString());

		const svgIcon = ElementCreator.create({
			tag: 'svg',
			namespace: 'http://www.w3.org/2000/svg',
			classes: classes.icon,
			on: {
				click: () => {
					if (this.viewModel.volume === 0) {
						this.viewModel.volume = 100;
					}
					this.viewModel.toggleActive();
				},
			},
		});

		const useElement = ElementCreator.create({
			tag: 'use',
			namespace: 'http://www.w3.org/2000/svg',
			attributes: {
				'xlink:href': this.viewModel.iconPath,
			},
		});

		svgIcon.append(useElement);
		if (svgIcon instanceof SVGSVGElement) {
			this.append(svgIcon);
		}

		const range = ElementCreator.create({
			tag: 'div',
			classes: classes.range,
		});

		const rangeLabel = ElementCreator.create({
			tag: 'label',
			classes: classes['range-label'],
			attributes: {
				for: `sound-card-${this.viewModel.id}`,
			},
			content: `${this.viewModel.title}`,
		});

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
				for: `sound-card-${this.viewModel.id}`,
				id: `sound-card-${this.viewModel.id}-output`,
			},
			content: `${this.viewModel.volume}`,
		});

		const slider = ElementCreator.create({
			tag: 'input',
			classes: classes['range-input'],
			attributes: {
				id: `sound-card-${this.viewModel.id}`,
				type: 'range',
				min: '0',
				max: '100',
				value: `${this.viewModel.volume}`,
				step: '1',
			},
			on: {
				input: (event: Event): void => {
					if (event.target instanceof HTMLInputElement) {
						this.viewModel.volume = Number(event.target.value);
					}
				},
			},
		});

		thumbs.append(slider, output);
		range.append(rangeLabel, track, progress, thumbs);
		this.append(range);

		this.viewModel.onVolumeChange((volume) => {
			if (volume === 0) {
				this.removeClass(classes.active);
				this.viewModel.active = false;
				if (slider instanceof HTMLInputElement) {
					slider.disabled = true;
				}
			} else {
				if (slider instanceof HTMLInputElement) {
					slider.removeAttribute('disabled');
				}
			}

			this.setStyleProperty('--volume', this.viewModel.volume.toString());
			if (slider instanceof HTMLInputElement) {
				slider.value = String(volume);
			}
			if (output instanceof HTMLOutputElement) {
				output.value = String(volume);
			}
		});

		this.viewModel.onActiveChange((isActive) => {
			if (isActive) {
				this.addClass(classes.active);
			} else {
				this.removeClass(classes.active);
			}
		});

		if (this.viewModel.active) {
			this.addClass(classes.active);
		} else {
			this.removeClass(classes.active);
		}
	}

	public render(): Element {
		return this.getElement();
	}
}
