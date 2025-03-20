import ElementCreator from '../utils/element-creator';
import type { State } from '../state/state';
import type EventBus from '../state/event-bus';
import type { OptionsViewModel } from './options-view/options-view-model';
import type { DecisionPickerViewModel } from './decision-picker-view/decision-picker-view-model';

export type ViewDependencies = {
	state: State;
	eventBus: EventBus;
	viewModel?: OptionsViewModel | DecisionPickerViewModel;
};

export abstract class BaseView {
	protected container: ElementCreator;
	protected dependencies: ViewDependencies;

	constructor(dependencies: ViewDependencies) {
		this.dependencies = dependencies;
		this.container = new ElementCreator({
			tag: 'div',
		});
	}

	public abstract render(): HTMLElement;
	public unmount?(): void;
}
