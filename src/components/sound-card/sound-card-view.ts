import ElementCreator from '../../utils/element-creator';
import type { SoundCardViewModel } from './sound-card-view-model';
import classes from './sound-card-view.module.scss';
export class SoundCardView extends ElementCreator {
	private viewModel: SoundCardViewModel;
	private icon: SVGSVGElement | undefined;
	private title: HTMLElement | undefined;
	private slider: HTMLInputElement | undefined;

	constructor(viewModel: SoundCardViewModel) {
		super({
			tag: 'div',
			classes: classes.card,
		});
		this.viewModel = viewModel;

		// Создаём SVG-иконку через ElementCreator с указанием namespace для SVG
		const svgIcon = ElementCreator.create({
			tag: 'svg',
			namespace: 'http://www.w3.org/2000/svg',
			classes: classes.icon,
			style: {
				opacity: String(this.viewModel.volume / 100),
			},
		});

		// Создаём элемент <use> внутри SVG
		const useElement = ElementCreator.create({
			tag: 'use',
			namespace: 'http://www.w3.org/2000/svg',
			attributes: {
				'xlink:href': this.viewModel.iconPath,
			},
		});

		svgIcon.append(useElement);
		if (svgIcon instanceof SVGSVGElement) {
			this.icon = svgIcon;
			this.append([this.icon]);
		}

		const title = ElementCreator.create({
			tag: 'h2',
			classes: classes.title,
			content: this.viewModel.title,
		});

		if (title instanceof HTMLElement) {
			this.title = title;
			this.append(this.title);
		}

		const slider = ElementCreator.create({
			tag: 'input',
			attributes: {
				type: 'range',
				min: '0',
				max: '100',
				value: '0',
			},
			classes: classes.slider,
			on: {
				input: (event: Event): void => {
					if (event.target instanceof HTMLInputElement) {
						this.viewModel.volume = Number(event.target.value);
					}
				},
			},
		});

		if (slider instanceof HTMLInputElement) {
			this.slider = slider;
			this.append(this.slider);
			this.slider.value = String(this.viewModel.volume);
		}

		this.viewModel.onVolumeChange((volume) => {
			if (this.slider) {
				this.slider.value = String(volume);
			}
			if (this.icon) {
				this.icon.style.opacity = String(volume / 100);
			}
			this.viewModel.playSound();
		});
	}

	public render(): Element {
		return this.getElement();
	}
}
