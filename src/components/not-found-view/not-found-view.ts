import { BaseView } from '../view';
import ElementCreator from '../../utils/element-creator';
import classes from './not-found-view.module.scss';

export class NotFoundView extends BaseView {
	public render(): HTMLElement {
		this.container = new ElementCreator({
			tag: 'section',
			classes: ['container', classes['not-found-container']],
			children: [
				{
					tag: 'h1',
					content: '404 Not Found',
					classes: ['title', classes['not-found-title']],
				},
				{
					tag: 'button',
					classes: ['button', classes['back-button']],
					content: '← Back to options',
					on: {
						click: (): void => {
							location.hash = '#options';
						},
					},
				},
			],
		});
		return this.container.getElement();
	}
}
