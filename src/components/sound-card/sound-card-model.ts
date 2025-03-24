import { ReactiveProperty } from '../../global/reactive-property';
import { SoundPlayer } from '../../utils/sound-player';
import { GlobalSettings } from '../../global/global-settings';

export class SoundCardModel {
	public readonly id: string;
	public readonly title: string;
	public readonly iconPath: string;
	public readonly soundPath: string;
	private _volume: ReactiveProperty<number>;
	private _player: SoundPlayer;

	constructor(
		id: string,
		title: string,
		iconPath: string,
		soundPath: string,
		defaultVolume: number,
	) {
		this.id = id;
		this.title = title;
		this.iconPath = iconPath;
		this.soundPath = soundPath;
		
		const globalSettings = GlobalSettings.getInstance();
		const savedVolume = globalSettings.getCardVolume(this.id);
		this._volume = new ReactiveProperty<number>(
			savedVolume !== undefined ? savedVolume : defaultVolume);
		globalSettings.setCardVolume(this.id, this.volume);
		this._player = new SoundPlayer(this.soundPath);

		this._volume.subscribe((volume) => {
			this._player.setVolume(volume);
			globalSettings.setCardVolume(this.id, volume);
		});

		globalSettings.onVolumeChange(() =>
			this._player.setVolume(this.volume),
		);
		globalSettings.onMuteChange(() => this._player.setVolume(this.volume));
		this._player.setVolume(this.volume);
	}

	public get volume(): number {
		return this._volume.value;
	}

	public get player(): SoundPlayer {
		return this._player;
	}

	public set volume(value: number) {
		this._volume.value = value;
	}

	public onVolumeChange(callback: (volume: number) => void): void {
		this._volume.subscribe(callback);
	}
}