// // router.ts
// import type { State } from '../global/state';
// import type EventBus from '../global/event-bus';
// import type { OptionsViewModel } from '../components/options-view/options-view-model';
// import type { DecisionPickerViewModel } from '../components/decision-picker-view/decision-picker-view-model';
// import type { BaseView } from '../components/view';
// import { OptionsView } from '../components/options-view/options-view';
// import { DecisionPickerView } from '../components/decision-picker-view/decision-picker-view';
// import { NotFoundView } from '../components/not-found-view/not-found-view';
// import type { ViewDependencies } from '../components/view';

// type ViewConstructor = new (dependencies: ViewDependencies) => BaseView;

// type RouteConfig = {
// 	[key: string]: {
// 		view: ViewConstructor;
// 		createDeps: (deps: RouterDependencies) => ViewDependencies;
// 	};
// };

// type RouterDependencies = {
// 	state: State;
// 	eventBus: EventBus;
// 	optionsViewModel: OptionsViewModel;
// 	decisionPickerViewModel: DecisionPickerViewModel;
// };

// export class Router {
// 	private routes: RouteConfig;
// 	private appContainer: HTMLElement;
// 	private dependencies: RouterDependencies;

// 	constructor(appContainer: HTMLElement, dependencies: RouterDependencies) {
// 		this.appContainer = appContainer;
// 		this.dependencies = dependencies;
// 		this.routes = {
// 			'': {
// 				view: OptionsView,
// 				createDeps: (deps): ViewDependencies => ({
// 					state: deps.state,
// 					eventBus: deps.eventBus,
// 					viewModel: deps.optionsViewModel,
// 				}),
// 			},
// 			'#': {
// 				view: OptionsView,
// 				createDeps: (deps): ViewDependencies => ({
// 					state: deps.state,
// 					eventBus: deps.eventBus,
// 					viewModel: deps.optionsViewModel,
// 				}),
// 			},
// 			'#options': {
// 				view: OptionsView,
// 				createDeps: (deps): ViewDependencies => ({
// 					state: deps.state,
// 					eventBus: deps.eventBus,
// 					viewModel: deps.optionsViewModel,
// 				}),
// 			},
// 			'#decision-picker': {
// 				view: DecisionPickerView,
// 				createDeps: (deps): ViewDependencies => ({
// 					state: deps.state,
// 					eventBus: deps.eventBus,
// 					viewModel: deps.decisionPickerViewModel,
// 				}),
// 			},
// 		};
// 	}

// 	public navigate(hash: string): void {
// 		const route = this.routes[hash];
// 		if (!route) {
// 			const errorDependencies: ViewDependencies = {
// 				state: this.dependencies.state,
// 				eventBus: this.dependencies.eventBus,
// 			};
// 			const errorView = new NotFoundView(errorDependencies);
// 			this.appContainer.replaceChildren(errorView.render());
// 			return;
// 		}
// 		const ViewClass = route.view;
// 		const dependencies = route.createDeps(this.dependencies);

// 		const view = new ViewClass(dependencies);
// 		this.appContainer.replaceChildren(view.render());
// 	}
// }
console.log('router');
