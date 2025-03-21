// import './styles/global.scss';
// import ElementCreator from './utils/element-creator';
// import { SoundCard } from './components/sound-card';
// import { OptionsViewModel } from './components/options-view/options-view-model';
// import { DecisionPickerViewModel } from './components/decision-picker-view/decision-picker-view-model';
// import EventBus from './state/event-bus';
// import { State } from './state/state';
// import { Router } from './router/router';

// const app = ElementCreator.create({
// 	tag: 'main',
// 	attributes: { id: 'app' },
// 	content: 'Hello world',
// });

// document.body.append(app);

// const rainCard = new SoundCard({
// 	iconUrl: 'https://img.icons8.com/color/48/000000/rain.png',
// 	label: 'Rain',
// 	initialVolume: 0.5,
// 	onVolumeChange: (volume: number): void =>
// 		console.log(`Volume changed: ${volume}`),
// });

// app.append(rainCard.getElement());

// const eventBus = new EventBus();
// const state = State.create(eventBus);
// const optionsViewModel = new OptionsViewModel(state, eventBus);
// const decisionPickerViewModel = new DecisionPickerViewModel(state, eventBus);

// const router = new Router(app.getElement(), {
// 	state,
// 	eventBus,
// 	optionsViewModel,
// 	decisionPickerViewModel,
// });

// globalThis.addEventListener('hashchange', () => {
// 	router.navigate(location.hash);
// });

// router.navigate(location.hash || '#');

import { SoundCardModel } from './components/sound-card/sound-card-model';
import { SoundCardView } from './components/sound-card/sound-card-view';
import { SoundCardViewModel } from './components/sound-card/sound-card-view-model';

import rain from './assets/icons/rain.svg';
// 1. Создаём модель (сразу попытается загрузить volume из localStorage)
const model = new SoundCardModel(rain, 'Rain', 0);

// 2. Создаём View (визуальное представление)
const view = new SoundCardView();

// 3. Создаём ViewModel, связывающую модель и представление
const viewModel = new SoundCardViewModel(model, view);

// 4. Добавляем View в DOM
document.body.append(view.getElement());
