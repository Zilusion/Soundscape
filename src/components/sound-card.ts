import ElementCreator from '../utils/element-creator';

export type SoundCardParameters = {
	/** URL иконки, например, иконка дождя */
	iconUrl: string;
	/** Текстовое название, например "Rain" */
	label: string;
	/** Начальный уровень громкости (0…1) */
	initialVolume?: number;
	/** Обработчик изменения громкости */
	onVolumeChange?: (volume: number) => void;
};

export class SoundCard extends ElementCreator {
	private iconElement: HTMLImageElement | undefined;
	private labelElement: HTMLElement | undefined;
	private sliderElement: HTMLInputElement | undefined;

	public constructor(parameters: SoundCardParameters) {
		super({
			tag: 'div',
			classes: 'sound-card',
		});

		const icon = ElementCreator.create({
			tag: 'img',
			attributes: {
				src: parameters.iconUrl,
				alt: parameters.label,
			},
			style: {
				opacity: (parameters.initialVolume ?? 0.5).toString(),
				transition: 'opacity 0.2s ease',
			},
		});

		if (icon instanceof HTMLImageElement) {
			this.iconElement = icon;
		}

		// 2. Название
		const label = ElementCreator.create({
			tag: 'p',
			content: parameters.label,
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
				value: (parameters.initialVolume ?? 0.5).toString(),
			},
			classes: 'sound-card__slider', // класс для стилизации ползунка
			on: {
				input: (event) => {
					const volume = Number.parseFloat(
						event.target instanceof HTMLInputElement
							? event.target.value
							: '0',
					);

					// Меняем прозрачность иконки
					if (this.iconElement)
						this.iconElement.style.opacity = volume.toString();

					if (parameters.onVolumeChange) {
						parameters.onVolumeChange(volume);
					}
				},
			},
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
}
