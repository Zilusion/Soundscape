import { ReactiveProperty } from './reactive-property';

export type AppSettingsData = {
	volume: number;
	mute: boolean;
	cards: Record<string, number>;
};

const DEFAULT_SETTINGS: AppSettingsData = {
	volume: 100,
	mute: true,
	cards: {},
};

export class GlobalSettings {
	private _volume: ReactiveProperty<number>;
	public _mute: ReactiveProperty<boolean>;
	public cards: Record<string, number> = {};

	private static instance: GlobalSettings;

	private constructor() {
		const savedData = localStorage.getItem('appSettings');
		let data: AppSettingsData;
		if (savedData) {
			try {
				data = JSON.parse(savedData);
			} catch (error) {
				console.error('Error parsing appSettings data:', error);
				data = DEFAULT_SETTINGS;
			}
		} else {
			data = DEFAULT_SETTINGS;
		}

		this._volume = new ReactiveProperty<number>(Number(data.volume));
		this._mute = new ReactiveProperty<boolean>(data.mute);
		this.cards = data.cards;

		this._volume.subscribe(() => {
			this.save();
		});
		this._mute.subscribe(() => {
			this.save();
		});
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

	public get volume(): number {
		return this._volume.value;
	}

	public set volume(value: number) {
		this._volume.value = value;
	}

	public get mute(): boolean {
		return this._mute.value;
	}

	public set mute(value: boolean) {
		this._mute.value = value;
	}

	public onVolumeChange(callback: (volume: number) => void): void {
		this._volume.subscribe(callback);
	}

	public onMuteChange(callback: (mute: boolean) => void): void {
		this._mute.subscribe(callback);
	}

	private save(): void {
		const data: AppSettingsData = {
			volume: this._volume.value,
			mute: this._mute.value,
			cards: this.cards,
		};
		localStorage.setItem('appSettings', JSON.stringify(data));
	}
}
