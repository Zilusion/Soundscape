import { GlobalSettings } from '../../global/global-settings';
import { SoundCardModel } from '../sound-card/sound-card-model';

export type SoundCardData = {
	id: string;
	title: string;
	iconPath: string;
	soundPath: string;
	volume: number;
};

export class SoundCardsPageModel {
	public soundCardModels: SoundCardModel[];
	public globalSettings: GlobalSettings;

	constructor(soundCardData: SoundCardData[]) {
		this.globalSettings = GlobalSettings.getInstance();
		this.soundCardModels = soundCardData.map(
			(data) =>
				new SoundCardModel(
					data.id,
					data.title,
					data.iconPath,
					data.soundPath,
					data.volume,
				),
		);
	}

	public get globalVolume(): number {
		return this.globalSettings.volume;
	}

	public get paused(): boolean {
		return this.globalSettings.paused;
	}

	public set globalVolume(value: number) {
		this.globalSettings.volume = value;
	}

	public set paused(value: boolean) {
		this.globalSettings.paused = value;
	}

	public toggleMute(): void {
		if (this.globalSettings.volume === 0) {
			this.globalSettings.volume = this.globalSettings.previousVolume;
		} else {
			this.globalSettings.previousVolume = this.globalSettings.volume;
			this.globalSettings.volume = 0;
		}
	}

	public togglePlayPause(): void {
		this.globalSettings.paused = !this.globalSettings.paused;
	}

	public resetSettings(): void {
		this.globalSettings.reset();
	}

	public onGlobalVolumeChange(callback: (volume: number) => void): void {
		this.globalSettings.onVolumeChange(callback);
	}

	public onPausedChange(callback: (paused: boolean) => void): void {
		this.globalSettings.onPausedChange(callback);
	}
}
