// import { SoundCardViewModel } from './components/options-view/sound-card-view-model';
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

// import { SoundCardModel } from './components/sound-card/sound-card-model';
// import { SoundCard } from './components/sound-card/sound-card';
// import { SoundCardViewModel } from './components/sound-card/sound-card-view-model';

// 1. Создаём модель (сразу попытается загрузить volume из localStorage)
// const model = new SoundCardModel(rain, 'Rain', 0);

// 2. Создаём View (визуальное представление)
// const view = new SoundCard();

// 3. Создаём ViewModel, связывающую модель и представление
// const viewModel = new SoundCardViewModel(model, view);

// import rain from './assets/icons/rain.svg';
// import { SoundCardView } from './components/sound-card/sound-card-view';
// import { defaultSounds } from './global/sound-data';

// const soundView = new SoundCardView(defaultSounds);
// document.body.append(soundView.render());

// import { SoundCardModel } from './components/sound-card/sound-card-model';

// const soundCardModel = new SoundCardModel(10);

// console.log(soundCardModel._volume);

// soundCardModel._volume.subscribe((value) =>
// 	console.log('Новое значение: ' + value),
// );

// soundCardModel._volume.value = 15;
// console.log(soundCardModel._volume.value);
import ElementCreator from './utils/element-creator';
import { SoundCardModel } from './components/sound-card/sound-card-model';
import { SoundCardViewModel } from './components/sound-card/sound-card-view-model';
import { SoundCardView } from './components/sound-card/sound-card-view';
import { SoundPlayer } from './utils/sound-player';
import 'virtual:svg-icons-register';

const soundCardData = [
	{
		id: 'wind',
		title: 'Ветер',
		iconPath: '#icon-wind',
		soundPath: './src/assets/sounds/light-breeze.mp3',
		volume: 50,
	},
	{
		id: 'rain',
		title: 'Дождь',
		iconPath: '#icon-rain',
		soundPath: './src/assets/sounds/rain.mp3',
		volume: 60,
	},
	{
		id: 'thunder',
		title: 'Гроза',
		iconPath: '#icon-thunder',
		soundPath: './src/assets/sounds/thunder.mp3',
		volume: 70,
	},
];

const container = ElementCreator.create({
	tag: 'div',
	attributes: { id: 'app' },
});
document.body.append(container);

soundCardData.forEach((data) => {
	try {
		const model = new SoundCardModel(
			data.id,
			data.title,
			data.iconPath,
			data.soundPath,
			data.volume,
		);
		const viewModel = new SoundCardViewModel(model);
		const view = new SoundCardView(viewModel);
		container.append(view.render());
	} catch (error) {
		console.error(error);
	}
});

const globalVolumeSlider = ElementCreator.create({
	tag: 'input',
	attributes: {
		type: 'range',
		min: '0',
		max: '100',
		value: '100',
	},
});

// TODO Сделать чтобы глобальное состояние звука сразу обновляло частные звуки
globalVolumeSlider.addEventListener('input', (event: Event) => {
	if (event.target instanceof HTMLInputElement) {
		const globalVol = Number(event.target.value);
		SoundPlayer.setGlobalVolume(globalVol);
	}
});
container.append(globalVolumeSlider);
