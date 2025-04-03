import ElementCreator from '../utils/element-creator';

export default class Section extends ElementCreator {
	public container: Element;

	constructor(
		sectionClasses: string | string[],
		containerClasses: string | string[],
	) {
		super({
			tag: 'section',
			classes: Array.isArray(sectionClasses)
				? sectionClasses
				: [sectionClasses],
		});
		this.container = ElementCreator.create({
			tag: 'div',
			classes: Array.isArray(containerClasses)
				? containerClasses
				: [containerClasses],
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
