import ElementCreator from '../utils/element-creator';

export default class Page extends ElementCreator {
	protected container: Element;

	constructor(sectionClass: string, containerClass: string) {
		// Создаем <section class="sectionClass">
		super({ tag: 'section', classes: [sectionClass] });
		// Внутри section создаем <div class="containerClass">
		this.container = ElementCreator.create({
			tag: 'div',
			classes: [containerClass],
		});
		this.append([this.container]);
	}

	public getElement(): Element {
		return this.element;
	}

	public getContainer(): Element {
		return this.container;
	}
}
