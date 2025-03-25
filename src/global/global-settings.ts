import { ReactiveProperty } from './reactive-property';

export type AppSettingsData = {
	volume: number;
	cards: Record<string, number>;
};

const DEFAULT_SETTINGS: AppSettingsData = {
	volume: 100,
	cards: {},
};

function isAppSettingsData(object: unknown): object is AppSettingsData {
	if (typeof object !== 'object' || object === null) return false;
	const data: Partial<AppSettingsData> | null =
		object !== null && typeof object === 'object' ? object : null;
	return (
		data !== null &&
		typeof data.volume === 'number' &&
		typeof data.cards === 'object' &&
		data.cards !== null &&
		Object.values(data.cards).every((value) => typeof value === 'number')
	);
}

export class GlobalSettings {
	private static instance: GlobalSettings;
	public previousVolume: number = DEFAULT_SETTINGS.volume;
	private _cards: ReactiveProperty<Record<string, number>>;
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
		this._cards = new ReactiveProperty<Record<string, number>>(data.cards);

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

	public get cards(): Record<string, number> {
		return this._cards.value;
	}

	public set volume(value: number) {
		this._volume.value = value;
	}

	public set paused(value: boolean) {
		this._paused.value = value;
	}

	public set cards(value: Record<string, number>) {
		this._cards.value = value;
	}

	public static getInstance(): GlobalSettings {
		if (!GlobalSettings.instance) {
			GlobalSettings.instance = new GlobalSettings();
		}
		return GlobalSettings.instance;
	}

	public setCardVolume(id: string, volume: number): void {
		const currentCards = { ...this._cards.value };
		currentCards[id] = volume;
		this._cards.value = currentCards;
	}

	public getCardVolume(id: string): number | undefined {
		return this._cards.value[id];
	}

	public onVolumeChange(callback: (volume: number) => void): void {
		this._volume.subscribe(callback);
	}

	public onPausedChange(callback: (paused: boolean) => void): void {
		this._paused.subscribe(callback);
	}

	public onCardsChange(
		callback: (cards: Record<string, number>) => void,
	): void {
		this._cards.subscribe(callback);
	}

	public reset(): void {
		localStorage.removeItem('appSettings');
		this._volume.value = DEFAULT_SETTINGS.volume;
		this._paused.value = true;
		this._cards.value = { ...DEFAULT_SETTINGS.cards };
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
