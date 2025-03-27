import type { SoundCardsPageModel } from './sound-cards-page-model';
import { SoundCardViewModel } from '../sound-card/sound-card-view-model';

export class SoundCardsPageViewModel {
	public model: SoundCardsPageModel;
	public soundCardViewModels: SoundCardViewModel[];

	constructor(model: SoundCardsPageModel) {
		this.model = model;
		this.soundCardViewModels = this.model.soundCardModels.map(
			(model) => new SoundCardViewModel(model),
		);
	}

	public get globalVolume(): number {
		return this.model.globalVolume;
	}

	public get paused(): boolean {
		return this.model.paused;
	}

	public set globalVolume(value: number) {
		this.model.globalVolume = value;
	}

	public toggleMute(): void {
		this.model.toggleMute();
	}

	public togglePlayPause(): void {
		this.model.togglePlayPause();
	}

	public resetSettings(): void {
		this.model.resetSettings();
	}

	public onGlobalVolumeChange(callback: (volume: number) => void): void {
		this.model.onGlobalVolumeChange(callback);
	}

	public onPausedChange(callback: (paused: boolean) => void): void {
		this.model.onPausedChange(callback);
	}
}
