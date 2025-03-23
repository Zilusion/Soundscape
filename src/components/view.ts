import ElementCreator from '../utils/element-creator';
// import type { State } from '../global/state';
import type EventBus from '../global/event-bus';

export type ViewDependencies = {
	// state: State;
	eventBus: EventBus;
	// viewModel?: SoundCardViewModel;
};

export abstract class BaseView {
	protected container: ElementCreator;
	// protected dependencies: ViewDependencies;

	constructor() {
		// constructor(dependencies: ViewDependencies) {
		// this.dependencies = dependencies;
		this.container = new ElementCreator({
			tag: 'div',
		});
	}

	public abstract render(): Element;
	public unmount?(): void;
}
