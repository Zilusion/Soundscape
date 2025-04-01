import ElementCreator from '../utils/element-creator';

export default class Page extends ElementCreator {
	constructor(pageClass: string) {
		super({ tag: 'main', classes: [pageClass] });
	}

	public getElement(): Element {
		return this.element;
	}
}
