import { ReactiveProperty } from './reactive-property';

export type AppSettingsData = {
	volume: number;
	muted: boolean;
	cards: Record<string, number>;
	paused: boolean;
};

const DEFAULT_SETTINGS: AppSettingsData = {
	volume: 100,
	muted: false,
	cards: {},
	paused: true,
};

function isAppSettingsData(object: unknown): object is AppSettingsData {
	if (typeof object !== 'object' || object === null) return false;
	const data: Partial<AppSettingsData> | null =
		object !== null && typeof object === 'object' ? object : null;
	return (
		data !== null &&
		typeof data.volume === 'number' &&
		typeof data.muted === 'boolean' &&
		typeof data.cards === 'object' &&
		data.cards !== null &&
		Object.values(data.cards).every((value) => typeof value === 'number')
	);
}

export class GlobalSettings {
	private static instance: GlobalSettings;
	public _mute: ReactiveProperty<boolean>;
	public cards: Record<string, number> = {};
	private _volume: ReactiveProperty<number>;
	private _paused: ReactiveProperty<boolean>;
	private previousVolume: number = DEFAULT_SETTINGS.volume; //TODO Возможно стоит убрать заменив на простое визуальное изменение громкости в слайдере на деле не меняя глобально.

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
		this._mute = new ReactiveProperty<boolean>(data.muted);
		this._paused = new ReactiveProperty<boolean>(data.paused);
		this.cards = data.cards;

		this._volume.subscribe(() => {
			this.save();
		});
		this._mute.subscribe(() => {
			this.save();
		});
		this._paused.subscribe(() => {
			this.save();
		});
	}

	public get volume(): number {
		return this._volume.value;
	}

	public get mute(): boolean {
		return this._mute.value;
	}

	public get paused(): boolean {
		return this._paused.value;
	}

	public set volume(value: number) {
		this._volume.value = value;
	}

	public set mute(value: boolean) {
		// this._mute.value = value; //TODO Возможно стоит убрать
		// Если включаем mute, сохраняем текущую громкость и устанавливаем 0
		if (value && !this._mute.value) {
			this.previousVolume = this._volume.value;
			this._volume.value = 0;
		}
		// Если выключаем mute, восстанавливаем сохранённую громкость
		if (!value && this._mute.value) {
			this._volume.value = this.previousVolume;
		}
		this._mute.value = value;
	}

	public set paused(value: boolean) {
		this._paused.value = value;
	}

	public static getInstance(): GlobalSettings {
		if (!GlobalSettings.instance) {
			GlobalSettings.instance = new GlobalSettings();
		}
		return GlobalSettings.instance;
	}

	public setCardVolume(id: string, volume: number): void {
		const currentCards = { ...this.cards };
		currentCards[id] = volume;
		this.cards = currentCards;
		this.save();
	}

	public getCardVolume(id: string): number | undefined {
		return this.cards[id];
	}

	public onVolumeChange(callback: (volume: number) => void): void {
		this._volume.subscribe(callback);
	}

	public onMuteChange(callback: (mute: boolean) => void): void {
		this._mute.subscribe(callback);
	}

	public onPausedChange(callback: (paused: boolean) => void): void {
		this._paused.subscribe(callback);
	}

	public reset(): void {
		localStorage.removeItem('appSettings');
		this._volume.value = DEFAULT_SETTINGS.volume;
		this._mute.value = DEFAULT_SETTINGS.muted;
		this._paused.value = DEFAULT_SETTINGS.paused;
		this.cards = DEFAULT_SETTINGS.cards;
		this.save();
	}

	private save(): void {
		const data: AppSettingsData = {
			volume: this._volume.value,
			muted: this._mute.value,
			cards: this.cards,
			paused: this._paused.value,
		};
		localStorage.setItem('appSettings', JSON.stringify(data));
	}
}
