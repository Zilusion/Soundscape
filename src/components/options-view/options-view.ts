import { BaseView } from '../view';
import ElementCreator from '../../utils/element-creator';
import classes from './options-view.module.scss';
import { OptionsViewModel } from './options-view-model';
import type { Option } from '../../state/state';
import { StateEvent } from '../../state/events';
import type { ViewDependencies } from '../view';
import { PasteListModal } from '../modals/paste-list-modal/paste-list-modal';
import { AddValidOptionsModal } from '../modals/add-valid-options-modal/add-valid-options-modal';

export class OptionsView extends BaseView {
	private viewModel: OptionsViewModel;

	private header: ElementCreator;
	private options: ElementCreator;
	private actions: ElementCreator;

	constructor(dependencies: ViewDependencies) {
		super(dependencies);
		if (dependencies.viewModel instanceof OptionsViewModel) {
			this.viewModel = dependencies.viewModel;
		} else {
			throw new TypeError('Invalid viewModel type');
		}

		this.header = this.createHeader();
		this.options = this.createOptionsList();
		this.actions = this.createActions();

		this.viewModel.subscribe(StateEvent.OptionAdded, () =>
			this.updateOptionsList(),
		);

		this.viewModel.subscribe(StateEvent.OptionDeleted, () =>
			this.updateOptionsList(),
		);

		this.viewModel.subscribe(StateEvent.OptionsLoaded, () =>
			this.updateOptionsList(),
		);

		this.render();
	}

	public createHeader(): ElementCreator {
		const header = new ElementCreator({
			tag: 'h1',
			classes: 'title',
			content: 'Decision Making Tool',
		});
		return header;
	}

	public createOptionsList(): ElementCreator {
		const optionsList = new ElementCreator({
			tag: 'ul',
			classes: [classes.options],
			children: this.viewModel
				.getOptions()
				.map((opt) => this.createOption(opt)),
		});
		return optionsList;
	}

	public createOption(option: Option): ElementCreator {
		const optionElement = new ElementCreator({
			tag: 'li',
			classes: [classes.option],
			children: [
				{
					tag: 'span',
					classes: [classes['option-id']],
					content: option.id,
				},
				{
					tag: 'input',
					classes: [classes['option-title'], 'input'],
					attributes: {
						type: 'text',
						value: `${option.title}`,
						placeholder: 'Title',
						'data-id': option.id,
						name: 'title',
					},
					on: {
						input: (event: Event): void => {
							const target = event.target;
							if (target instanceof HTMLInputElement) {
								this.viewModel.updateOption(
									target.dataset.id ?? '',
									{
										title: target.value,
									},
								);
							}
						},
					},
				},
				{
					tag: 'input',
					classes: [classes['option-weight'], 'input'],
					attributes: {
						type: 'number',
						value:
							option.weight === null
								? ''
								: option.weight.toString(),
						placeholder: 'Weight',
						'data-id': option.id,
						name: 'weight',
					},
					on: {
						input: (event: Event): void => {
							const target = event.target;
							if (target instanceof HTMLInputElement) {
								this.viewModel.updateOption(
									target.dataset.id ?? '',
									{
										weight:
											target.value === ''
												? null
												: Number(target.value),
									},
								);
							}
						},
					},
				},
				{
					tag: 'button',
					classes: [classes['delete-option-button'], 'button'],
					content: 'Delete',
					on: {
						click: (): void => {
							this.viewModel.deleteOption(option.id);
						},
					},
				},
			],
		});
		return optionElement;
	}

	public createActions(): ElementCreator {
		const actions = new ElementCreator({
			tag: 'div',
			classes: [classes['action-buttons']],
		});
		actions.append(
			new ElementCreator({
				tag: 'button',
				classes: [classes['add-option-button'], 'button'],
				content: 'Add option',
				on: {
					click: (): void => {
						this.viewModel.addOption();
					},
				},
			}),
		);
		actions.append(
			new ElementCreator({
				tag: 'button',
				classes: [classes['paste-list-button'], 'button'],
				content: 'Paste list',
				on: {
					click: (): void => {
						const modal: PasteListModal = new PasteListModal(
							(csv) => this.viewModel.parseCSV(csv),
							() => modal.close(),
						);
						modal.show();
					},
				},
			}),
		);
		actions.append(
			new ElementCreator({
				tag: 'button',
				classes: [classes['clear-list-button'], 'button'],
				content: 'Clear list',
				on: {
					click: (): void => {
						this.viewModel.deleteAllOptions();
					},
				},
			}),
		);
		actions.append(
			new ElementCreator({
				tag: 'button',
				classes: [classes['save-to-file-button'], 'button'],
				content: 'Save list to file',
				on: {
					click: (): void => {
						this.viewModel.saveToFile();
					},
				},
			}),
		);
		actions.append(
			new ElementCreator({
				tag: 'button',
				classes: [classes['load-from-file-button'], 'button'],
				content: 'Load list from file',
				on: {
					click: (): void => {
						this.viewModel.loadFromFile();
					},
				},
			}),
		);
		actions.append(
			new ElementCreator({
				tag: 'button',
				classes: [classes['start-button'], 'button'],
				content: 'Start',
				on: {
					click: (): void => {
						if (this.viewModel.hasValidOptions()) {
							location.hash = '#decision-picker';
						} else {
							const modal = new AddValidOptionsModal(() => {});
							modal.show();
						}
					},
				},
			}),
		);
		return actions;
	}

	public render(): HTMLElement {
		this.container = new ElementCreator({
			tag: 'section',
			classes: 'container',
			children: [this.header, this.options, this.actions],
		});
		return this.container.getElement();
	}

	private updateOptionsList(): void {
		const newOptions = this.createOptionsList();

		if (this.container.getElement().contains(this.options.getElement())) {
			this.container
				.getElement()
				.replaceChild(
					newOptions.getElement(),
					this.options.getElement(),
				);
		} else {
			this.container.append(newOptions.getElement());
		}

		this.options = newOptions;
	}
}
