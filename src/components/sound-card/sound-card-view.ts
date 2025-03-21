import ElementCreator from '../../utils/element-creator';

export class SoundCardView extends ElementCreator {
	private iconElement: HTMLImageElement | undefined;
	private labelElement: HTMLElement | undefined;
	private sliderElement: HTMLInputElement | undefined;

	constructor() {
		super({ tag: 'div', classes: 'sound-card' });

		// 1. Иконка
		const icon = ElementCreator.create({
			tag: 'img',
			style: {
				transition: 'opacity 0.2s ease',
			},
		});

		if (icon instanceof HTMLImageElement) {
			this.iconElement = icon;
		}

		// 2. Название
		const label = ElementCreator.create({
			tag: 'p',
			classes: 'sound-card__label',
		});

		if (label instanceof HTMLElement) {
			this.labelElement = label;
		}

		// 3. Ползунок громкости
		const slider = ElementCreator.create({
			tag: 'input',
			attributes: {
				type: 'range',
				min: '0',
				max: '1',
				step: '0.01',
			},
			classes: 'sound-card__slider',
		});

		if (slider instanceof HTMLInputElement) {
			this.sliderElement = slider;
		}

		if (this.iconElement && this.labelElement && this.sliderElement) {
			this.append([
				this.iconElement,
				this.labelElement,
				this.sliderElement,
			]);
		}
	}

	public setIconUrl(url: string, altText?: string): void {
		if (!this.iconElement) return;
		this.iconElement.src = url;
		if (altText) {
			this.iconElement.alt = altText;
		}
	}

	public setLabel(text: string): void {
		if (!this.labelElement) return;
		this.labelElement.textContent = text;
	}

	public setVolume(volume: number): void {
		if (!this.sliderElement || !this.iconElement) return;
		this.sliderElement.value = volume.toString();
		this.iconElement.style.opacity = volume.toString();
	}

	public onVolumeChange(callback: (volume: number) => void): void {
		if (!this.sliderElement) return;
		this.sliderElement.addEventListener('input', (event) => {
			const volume = Number.parseFloat(
				event.target instanceof HTMLInputElement
					? event.target.value
					: '0',
			);
			callback(volume);
		});
	}
}
