import Page from '../../global/page';
import ElementCreator from '../../utils/element-creator';

export class NotFoundPageView extends Page {
	constructor() {
		super('not-found-page');
		const header = ElementCreator.create({
			tag: 'h1',
			content: '404 - Страница не найдена',
		});
		const paragraph = ElementCreator.create({
			tag: 'p',
			content: 'Извините, такой страницы не существует.',
		});
		this.append([header, paragraph]);
	}
}
