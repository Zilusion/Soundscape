export class SoundCardModel {
	public iconUrl: string;
	public label: string;
	private _volume: number;

	constructor(iconUrl: string, label: string, initialVolume = 0.5) {
		this.iconUrl = iconUrl;
		this.label = label;
		this._volume = initialVolume;

		this.loadVolume();
	}

	public get volume(): number {
		return this._volume;
	}

	public set volume(value: number) {
		this._volume = value;
		this.saveVolume();
	}

	private saveVolume(): void {
		localStorage.setItem(
			`soundcard:${this.label}:volume`,
			this._volume.toString(),
		);
	}

	private loadVolume(): void {
		const storedVolume = localStorage.getItem(
			`soundcard:${this.label}:volume`,
		);
		if (storedVolume !== null) {
			this._volume = Number.parseFloat(storedVolume);
		}
	}
}
