import type { SoundCardModel } from './sound-card-model';
export class SoundCardViewModel {
	private model: SoundCardModel;

	constructor(model: SoundCardModel) {
		this.model = model;
	}

	public get id(): string {
		return this.model.id;
	}

	public get title(): string {
		return this.model.title;
	}

	public get iconPath(): string {
		return this.model.iconPath;
	}

	public get soundPath(): string {
		return this.model.soundPath;
	}

	public get volume(): number {
		return this.model.volume;
	}

	public set volume(value: number) {
		this.model.volume = value;
	}

	public onVolumeChange(callback: (volume: number) => void): void {
		this.model.onVolumeChange(callback);
	}

	public playSound(): void {
		this.model.player.play(this.volume);
	}

	public pauseSound(): void {
		this.model.player.pause();
	}

	public resumeSound(): void {
		this.model.player.resume(this.volume);
	}
}
