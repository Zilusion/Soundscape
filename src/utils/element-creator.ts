type ElementParameters = {
	tag: string;
	classes?: string | string[];
	content?: string | Node;
	attributes?: Record<string, string>;
	style?: Partial<CSSStyleDeclaration>;
	on?: Record<string, (event: Event) => void>;
	children?: (HTMLElement | ElementCreator | ElementParameters)[];
};

export default class ElementCreator {
	protected element: HTMLElement;

	constructor(parameters: ElementParameters) {
		this.element = document.createElement(parameters.tag);
		if (parameters.classes) this.addClasses(parameters.classes);
		if (parameters.content) this.setContent(parameters.content);
		if (parameters.attributes) this.setAttributes(parameters.attributes);
		if (parameters.style) this.setStyle(parameters.style);
		if (parameters.on) this.addEventListeners(parameters.on);
		if (parameters.children) this.append(parameters.children);
	}

	public static create(parameters: ElementParameters): HTMLElement {
		return new ElementCreator(parameters).element;
	}
	public getElement(): HTMLElement {
		return this.element;
	}

	public addClass(className: string): this {
		this.element.classList.add(className);
		return this;
	}

	public removeClass(className: string): this {
		this.element.classList.remove(className);
		return this;
	}

	public addClasses(classNames: string | string[]): this {
		(Array.isArray(classNames) ? classNames : [classNames])
			.filter((className) => className !== undefined)
			.forEach((className) => {
				this.addClass(className);
			});
		return this;
	}

	public setContent(content: string | Node): this {
		if (typeof content === 'string') {
			this.element.textContent = content;
		} else {
			this.element.append(content);
		}
		return this;
	}

	public setAttribute(key: string, value: string): this {
		this.element.setAttribute(key, value);
		return this;
	}

	public setAttributes(attributes: Record<string, string>): this {
		Object.entries(attributes).forEach(([key, value]) =>
			this.setAttribute(key, value),
		);
		return this;
	}

	public setStyle(styles: Partial<CSSStyleDeclaration>): this {
		Object.assign(this.element.style, styles);
		return this;
	}

	public addEventListener(
		event: string,
		handler: (event: Event) => void,
	): this {
		this.element.addEventListener(event, handler);
		return this;
	}

	public addEventListeners(
		handlers: Record<string, (event: Event) => void>,
	): this {
		Object.entries(handlers).forEach(([event, handler]) =>
			this.addEventListener(event, handler),
		);
		return this;
	}

	public append(
		children:
			| (HTMLElement | ElementCreator | ElementParameters)[]
			| HTMLElement
			| ElementCreator
			| ElementParameters,
	): this {
		const childrenArray = Array.isArray(children) ? children : [children];
		childrenArray.forEach((child) => {
			if (child instanceof HTMLElement) {
				this.element.append(child);
			} else if (child instanceof ElementCreator) {
				this.element.append(child.element);
			} else {
				this.element.append(new ElementCreator(child).element);
			}
		});
		return this;
	}
}
