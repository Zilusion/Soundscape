import './styles/main.scss';
import { Router } from './router/router';
import type { Route } from './router/router';
import { SoundCardsPageModel } from './components/sound-cards-page/sound-cards-page-model';
import { SoundCardsPageViewModel } from './components/sound-cards-page/sound-cards-page-view-model';
import { SoundCardsPageView } from './components/sound-cards-page/sound-cards-page-view';
import { NotFoundPageView } from './components/not-found-page/not-found-page-view';

const soundCardData = [
	{
		id: 'wind',
		title: 'Ветер',
		iconPath: '/icon-sprite.svg#wind',
		soundPath: '/assets/sounds/wind.mp3',
		volume: 0,
	},
	{
		id: 'rain',
		title: 'Дождь',
		iconPath: '/icon-sprite.svg#rain',
		soundPath: '/assets/sounds/rain.mp3',
		volume: 0,
	},
	{
		id: 'thunder',
		title: 'Гроза',
		iconPath: '/icon-sprite.svg#thunder',
		soundPath: '/assets/sounds/thunder.mp3',
		volume: 0,
	},
	{
		id: 'blizzard',
		title: 'Метель',
		iconPath: '/icon-sprite.svg#blizzard',
		soundPath: '/assets/sounds/blizzard.mp3',
		volume: 0,
	},
	{
		id: 'campfire',
		title: 'Костёр',
		iconPath: '/icon-sprite.svg#campfire',
		soundPath: '/assets/sounds/campfire.mp3',
		volume: 0,
	},
	{
		id: 'forest',
		title: 'Лес',
		iconPath: '/icon-sprite.svg#forest',
		soundPath: '/assets/sounds/forest.mp3',
		volume: 0,
	},
	{
		id: 'leaves',
		title: 'Листья',
		iconPath: '/icon-sprite.svg#leaves',
		soundPath: '/assets/sounds/leaves.mp3',
		volume: 0,
	},
	{
		id: 'night',
		title: 'Ночь',
		iconPath: '/icon-sprite.svg#night',
		soundPath: '/assets/sounds/night.mp3',
		volume: 0,
	},
	{
		id: 'river',
		title: 'Река',
		iconPath: '/icon-sprite.svg#river',
		soundPath: '/assets/sounds/river.mp3',
		volume: 0,
	},
	{
		id: 'waves',
		title: 'Волны',
		iconPath: '/icon-sprite.svg#waves',
		soundPath: '/assets/sounds/waves.mp3',
		volume: 0,
	},
	{
		id: 'bell',
		title: 'Колокольчик',
		iconPath: '/icon-sprite.svg#bell',
		soundPath: '/assets/sounds/bell.mp3',
		volume: 0,
	},
	{
		id: 'handpan',
		title: 'Ханг',
		iconPath: '/icon-sprite.svg#handpan',
		soundPath: '/assets/sounds/handpan.mp3',
		volume: 0,
	},
];

const pageModel = new SoundCardsPageModel(soundCardData);
const pageViewModel = new SoundCardsPageViewModel(pageModel);

const routes: Route[] = [
	{
		path: '/',
		create: () => new SoundCardsPageView(pageViewModel),
	},
];

const notFoundPageView = new NotFoundPageView();

const router = new Router(routes, document.body, notFoundPageView);
router.start();
