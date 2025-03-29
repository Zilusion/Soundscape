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

// import ElementCreator from './utils/element-creator';
// import { GlobalSettings } from './global/global-settings';
// import { SoundCardModel } from './components/sound-card/sound-card-model';
// import { SoundCardViewModel } from './components/sound-card/sound-card-view-model';
// import { SoundCardView } from './components/sound-card/sound-card-view';
// import 'virtual:svg-icons-register';

// const soundCardData = [
// 	{
// 		id: 'wind',
// 		title: 'Ветер',
// 		iconPath: '#icon-wind',
// 		soundPath: '/assets/sounds/light-breeze.mp3',
// 		volume: 0,
// 	},
// 	{
// 		id: 'rain',
// 		title: 'Дождь',
// 		iconPath: '#icon-rain',
// 		soundPath: '/assets/sounds/rain.mp3',
// 		volume: 0,
// 	},
// 	{
// 		id: 'thunder',
// 		title: 'Гроза',
// 		iconPath: '#icon-thunder',
// 		soundPath: '/assets/sounds/thunder.mp3',
// 		volume: 0,
// 	},
// ];

// const container = ElementCreator.create({
// 	tag: 'div',
// 	attributes: { id: 'app' },
// });
// document.body.append(container);

// const globalSettings = GlobalSettings.getInstance();

// const globalVolumeSlider = ElementCreator.create({
// 	tag: 'input',
// 	attributes: {
// 		type: 'range',
// 		min: '0',
// 		max: '100',
// 		value: `${globalSettings.volume}`,
// 	},
// });

// globalVolumeSlider.addEventListener('input', (event: Event) => {
// 	if (event.target instanceof HTMLInputElement) {
// 		globalSettings.volume = Number(event.target.value);
// 	}
// });
// container.append(globalVolumeSlider);

// globalSettings.onVolumeChange(() => {
// 	if (globalVolumeSlider instanceof HTMLInputElement) {
// 		globalVolumeSlider.value = `${globalSettings.volume}`;
// 	}
// });

// const muteButton = ElementCreator.create({
// 	tag: 'button',
// 	classes: ['mute-button'],
// 	attributes: {
// 		type: 'button',
// 	},
// 	content: globalSettings.volume === 0 ? 'Unmute' : 'Mute',
// });

// globalSettings.onVolumeChange(() => {
// 	muteButton.textContent = globalSettings.volume === 0 ? 'Unmute' : 'Mute';
// });

// muteButton.addEventListener('click', () => {
// 	if (globalSettings.volume === 0) {
// 		globalSettings.volume = globalSettings.previousVolume;
// 	} else {
// 		globalSettings.previousVolume = globalSettings.volume;
// 		globalSettings.volume = 0;
// 	}
// });
// container.append(muteButton);

// const playPauseButton = ElementCreator.create({
// 	tag: 'button',
// 	classes: ['play-pause-button'],
// 	attributes: { type: 'button' },
// 	content: globalSettings.paused ? 'Play All' : 'Pause All',
// });

// playPauseButton.addEventListener('click', () => {
// 	globalSettings.paused = !globalSettings.paused;
// });

// globalSettings.onPausedChange((paused) => {
// 	playPauseButton.textContent = paused ? 'Play All' : 'Pause All';
// });
// container.append(playPauseButton);

// const resetButton = ElementCreator.create({
// 	tag: 'button',
// 	classes: ['reset-button'],
// 	attributes: { type: 'button' },
// 	content: 'Reset Settings',
// });

// resetButton.addEventListener('click', () => {
// 	globalSettings.reset();
// });
// container.append(resetButton);

// soundCardData.forEach((data) => {
// 	try {
// 		const model = new SoundCardModel(
// 			data.id,
// 			data.title,
// 			data.iconPath,
// 			data.soundPath,
// 			data.volume,
// 		);
// 		const viewModel = new SoundCardViewModel(model);
// 		const view = new SoundCardView(viewModel);
// 		container.append(view.render());
// 	} catch (error) {
// 		console.error(error);
// 	}
// });

// const saveToFileButton = ElementCreator.create({
// 	tag: 'button',
// 	classes: ['save-to-file-button'],
// 	attributes: { type: 'button' },
// 	content: 'Save settings to file',
// 	on: {
// 		click: (): void => {
// 			saveToFile(globalSettings, 'settings');
// 		},
// 	},
// });
// container.append(saveToFileButton);

// import SoundCardsPage from './components/sound-cards-page/sound-cards-page';
// const soundCardsPage = new SoundCardsPage();
// document.body.append(soundCardsPage.getElement());

import { SoundCardsPageModel } from './components/sound-cards-page/sound-cards-page-model';
import { SoundCardsPageViewModel } from './components/sound-cards-page/sound-cards-page-view-model';
import { SoundCardsPageView } from './components/sound-cards-page/sound-cards-page-view';

const soundCardData = [
	{
		id: 'wind',
		title: 'Ветер',
		iconPath: '#icon-wind',
		soundPath: '/assets/sounds/light-breeze.mp3',
		volume: 0,
	},
	{
		id: 'rain',
		title: 'Дождь',
		iconPath: '#icon-rain',
		soundPath: '/assets/sounds/rain.mp3',
		volume: 0,
	},
	{
		id: 'thunder',
		title: 'Гроза',
		iconPath: '#icon-thunder',
		soundPath: '/assets/sounds/thunder.mp3',
		volume: 0,
	},
	{
		id: 'wind1',
		title: 'Ветер',
		iconPath: '#icon-wind',
		soundPath: '/assets/sounds/light-breeze.mp3',
		volume: 0,
	},
	{
		id: 'rain1',
		title: 'Дождь',
		iconPath: '#icon-rain',
		soundPath: '/assets/sounds/rain.mp3',
		volume: 0,
	},
	{
		id: 'thunder1',
		title: 'Гроза',
		iconPath: '#icon-thunder',
		soundPath: '/assets/sounds/thunder.mp3',
		volume: 0,
	},
	{
		id: 'wind2',
		title: 'Ветер',
		iconPath: '#icon-wind',
		soundPath: '/assets/sounds/light-breeze.mp3',
		volume: 0,
	},
	{
		id: 'rain2',
		title: 'Дождь',
		iconPath: '#icon-rain',
		soundPath: '/assets/sounds/rain.mp3',
		volume: 0,
	},
	{
		id: 'thunder2',
		title: 'Гроза',
		iconPath: '#icon-thunder',
		soundPath: '/assets/sounds/thunder.mp3',
		volume: 0,
	},
];

const pageModel = new SoundCardsPageModel(soundCardData);
const pageViewModel = new SoundCardsPageViewModel(pageModel);
const pageView = new SoundCardsPageView(pageViewModel);

document.body.append(pageView.getElement());

const canvasElement = document.querySelector('#canvas');
let canvas: HTMLCanvasElement | null = null;
if (canvasElement instanceof HTMLCanvasElement) {
	canvas = canvasElement;
} else {
	throw new TypeError('Canvas element is not found');
}
const context = canvas.getContext('2d');

if (canvas && context) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const bubbles: {
		x: number;
		y: number;
		radius: number;
		speed: number;
		opacity: number;
	}[] = [];

	for (let i = 0; i < 30; i++) {
		bubbles.push({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			radius: Math.random() * 10 + 3,
			speed: Math.random() * 0.1 + 0.1,
			opacity: Math.random() * 0.5 + 0.5,
		});
	}

	function animate(): void {
		if (!context || !canvas) return;

		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = 'rgba(255, 255, 255, 0.5)';

		bubbles.forEach((bubble) => {
			context.beginPath();
			context.arc(bubble.x, bubble.y, bubble.radius, 0, 2 * Math.PI);
			context.fillStyle = `rgba(238, 217, 247, ${bubble.opacity})`;
			context.fill();

			bubble.y -= bubble.speed;

			if (bubble.y + bubble.radius < 0) {
				bubble.y = canvas.height + bubble.radius;
				bubble.x = Math.random() * canvas.width;
				bubble.opacity = Math.random() * 0.5 + 0.5;
				bubble.radius = Math.random() * 10 + 3;
			}
		});

		requestAnimationFrame(animate);
	}

	animate();

	window.addEventListener('resize', () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	});
}
