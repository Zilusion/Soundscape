import ElementCreator from '../../../utils/element-creator';
import classes from './paste-list-modal.module.scss';
import BaseModal from '../base-modal';

export class PasteListModal extends BaseModal {
	private textArea: ElementCreator;
	private buttons: ElementCreator;

	constructor(
		private onConfirm: (csv: string) => void,
		private onCancel: () => void,
	) {
		super();
		this.textArea = this.createTextArea();
		this.buttons = this.createButtons();
		this.createContent(this.textArea, this.buttons);
	}

	private createTextArea(): ElementCreator {
		return new ElementCreator({
			tag: 'textarea',
			classes: classes['modal-textarea'],
			attributes: {
				placeholder: `Paste a list of new options in a CSV-like format:\ntitle,1\t→\ttitle\t| 1 |`,
			},
		});
	}

	private createButtons(): ElementCreator {
		return new ElementCreator({
			tag: 'div',
			classes: classes['modal-buttons'],
			children: [
				this.createButton(
					'Confirm',
					() => this.handleConfirm(),
					classes['confirm-button'],
				),
				this.createButton(
					'Cancel',
					() => this.handleCancel(),
					classes['cancel-button'],
				),
			],
		});
	}

	private createButton(
		text: string,
		handler: () => void,
		className: string,
	): ElementCreator {
		return new ElementCreator({
			tag: 'button',
			classes: ['button', className],
			content: text,
			on: { click: handler },
		});
	}

	private handleConfirm(): void {
		const inputElement = this.textArea.getElement();
		const input =
			inputElement instanceof HTMLTextAreaElement
				? inputElement.value
				: '';
		this.onConfirm(input);
		this.close();
	}

	private handleCancel(): void {
		this.onCancel();
		this.close();
	}
}
