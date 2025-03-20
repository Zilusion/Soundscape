import BaseModal from '../base-modal';
import ElementCreator from '../../../utils/element-creator';
import classes from './add-valid-options-modal.module.scss';

export class AddValidOptionsModal extends BaseModal {
	constructor(private onClose: () => void) {
		super();
		const message = new ElementCreator({
			tag: 'p',
			classes: classes['message'],
			content:
				'You need at least two valid options to proceed. Please add options with non-empty titles and weights > 0.',
		});
		const closeButton = new ElementCreator({
			tag: 'button',
			classes: ['button', classes['close-button']],
			content: 'Close',
			on: { click: (): void => this.handleClose() },
		});
		this.createContent(message, closeButton);
	}

	private handleClose(): void {
		this.onClose();
		this.close();
	}
}
