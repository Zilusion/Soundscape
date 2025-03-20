import ElementCreator from '../../utils/element-creator';
import classes from './base-modal.module.scss';

export default class BaseModal extends ElementCreator {
	private static scrollbarWidth: number | null = null;
	private originalPaddingRight: string;
	private isMouseDevice: boolean;

	constructor() {
		super({
			tag: 'dialog',
			classes: classes.modal,
			on: {
				click: (event: Event) => {
					if (event.target === this.element) this.close();
				},
				keydown: (event: Event) => {
					if (
						event instanceof KeyboardEvent &&
						event.key === 'Escape'
					) {
						this.close();
					}
				},
			},
		});

		this.originalPaddingRight = '';
		this.isMouseDevice = BaseModal.detectMouseDevice();
	}

	private get originalPaddingRightPx(): number {
		return Number.parseFloat(this.originalPaddingRight) || 0;
	}

	private static detectMouseDevice(): boolean {
		return globalThis.matchMedia?.('(pointer: fine)').matches;
	}

	private static getScrollbarWidth(): number {
		if (this.scrollbarWidth !== null) return this.scrollbarWidth;

		const outer = document.createElement('div');
		outer.style.visibility = 'hidden';
		outer.style.overflow = 'scroll';
		document.body.append(outer);

		const inner = document.createElement('div');
		outer.append(inner);

		this.scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
		outer.remove();

		return this.scrollbarWidth;
	}

	public show(): void {
		if (
			this.isMouseDevice &&
			document.body.scrollHeight > window.innerHeight
		) {
			this.originalPaddingRight = globalThis.getComputedStyle(
				document.body,
			).paddingRight;
			document.body.style.paddingRight = `${this.originalPaddingRightPx + BaseModal.getScrollbarWidth()}px`;
		}

		document.body.append(this.element);
		if (this.element instanceof HTMLDialogElement) {
			this.element.showModal();
		}
		document.body.style.overflow = 'hidden';
	}

	public close(): void {
		this.element.remove();
		document.body.style.overflow = '';

		if (this.isMouseDevice) {
			document.body.style.paddingRight = this.originalPaddingRight;
		}
	}

	protected createContent(...children: ElementCreator[]): void {
		const content = new ElementCreator({
			tag: 'div',
			classes: classes['modal-content'],
			children: children.map((c) => c.getElement()),
		});
		this.append(content);
	}
}
