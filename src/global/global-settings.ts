import { ReactiveProperty } from './reactive-property';

export type CardState = {
	volume: number;
	active: boolean;
};

export type AppSettingsData = {
	volume: number;
	cards: Record<string, CardState>;
};

const DEFAULT_SETTINGS: AppSettingsData = {
	volume: 100,
	cards: {},
};

function isRecord(object: unknown): object is Record<string, unknown> {
	return typeof object === 'object' && object !== null;
}

export function isAppSettingsData(object: unknown): object is AppSettingsData {
	if (!isRecord(object)) return false;

	if (!('volume' in object) || typeof object['volume'] !== 'number') {
		return false;
	}

	if (!('cards' in object)) return false;
	const cardsValue = object['cards'];
	if (!isRecord(cardsValue)) return false;

	const cardStates = Object.values(cardsValue);
	for (const value of cardStates) {
		if (!isRecord(value)) return false;
		if (!('volume' in value) || typeof value['volume'] !== 'number')
			return false;
		if (!('active' in value) || typeof value['active'] !== 'boolean')
			return false;
	}

	return true;
}

export class GlobalSettings {
	private static instance: GlobalSettings;
	public previousVolume: number = DEFAULT_SETTINGS.volume;
	private _cards: ReactiveProperty<Record<string, CardState>>;
	private _volume: ReactiveProperty<number>;
	private _paused: ReactiveProperty<boolean>;

	private constructor() {
		const savedData = localStorage.getItem('appSettings');
		let data: AppSettingsData;
		if (savedData) {
			try {
				const parsedData: unknown = JSON.parse(savedData);
				if (isAppSettingsData(parsedData)) {
					data = parsedData;
				} else {
					console.warn(
						'Invalid appSettings data, using default settings.',
					);
					data = DEFAULT_SETTINGS;
				}
			} catch (error) {
				console.error('Error parsing appSettings data:', error);
				data = DEFAULT_SETTINGS;
			}
		} else {
			data = DEFAULT_SETTINGS;
		}

		this._volume = new ReactiveProperty<number>(Number(data.volume));
		this._paused = new ReactiveProperty<boolean>(true);
		this._cards = new ReactiveProperty<Record<string, CardState>>(
			data.cards,
		);

		this._volume.subscribe(() => {
			this.save();
		});
		this._paused.subscribe(() => {
			this.save();
		});
		this._cards.subscribe(() => {
			this.save();
		});
	}

	public get volume(): number {
		return this._volume.value;
	}

	public get paused(): boolean {
		return this._paused.value;
	}

	public get cards(): Record<string, CardState> {
		return this._cards.value;
	}

	public set volume(value: number) {
		this._volume.value = value;
	}

	public set paused(value: boolean) {
		this._paused.value = value;
	}

	public set cards(value: Record<string, CardState>) {
		this._cards.value = value;
	}

	public static getInstance(): GlobalSettings {
		if (!GlobalSettings.instance) {
			GlobalSettings.instance = new GlobalSettings();
		}
		return GlobalSettings.instance;
	}

	public getCardVolume(id: string): number | undefined {
		return this._cards.value[id]?.volume;
	}

	public setCardVolume(id: string, volume: number): void {
		const current = { ...this._cards.value };
		const card = current[id] ?? { volume: 0, active: false };
		card.volume = volume;
		current[id] = card;
		this._cards.value = current;
	}

	public getCardActive(id: string): boolean | undefined {
		return this._cards.value[id]?.active;
	}

	public setCardActive(id: string, active: boolean): void {
		const current = { ...this._cards.value };
		const card = current[id] ?? { volume: 0, active: false };
		card.active = active;
		current[id] = card;
		this._cards.value = current;
	}

	public onVolumeChange(callback: (volume: number) => void): void {
		this._volume.subscribe(callback);
	}

	public onPausedChange(callback: (paused: boolean) => void): void {
		this._paused.subscribe(callback);
	}

	public onCardsChange(
		callback: (cards: Record<string, CardState>) => void,
	): void {
		this._cards.subscribe(callback);
	}

	public reset(): void {
		localStorage.removeItem('appSettings');
		this._volume.value = DEFAULT_SETTINGS.volume;
		this._paused.value = true;
		const currentCards = { ...this._cards.value };
		Object.keys(currentCards).forEach((id) => {
			currentCards[id] = {
				volume: 0,
				active: false,
			};
		});
		this._cards.value = currentCards;
		this.save();
	}

	private save(): void {
		const data: AppSettingsData = {
			volume: this._volume.value,
			cards: this.cards,
		};
		localStorage.setItem('appSettings', JSON.stringify(data));
	}
}
