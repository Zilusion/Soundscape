import { ReactiveProperty } from '../../global/reactive-property';
import { SoundPlayer } from '../../utils/sound-player';
import { GlobalSettings } from '../../global/global-settings';

export class SoundCardModel {
	public globalSettings: GlobalSettings;
	public readonly id: string;
	public readonly title: string;
	public readonly iconPath: string;
	public readonly soundPath: string;
	private _volume: ReactiveProperty<number>;
	private _player: SoundPlayer;
	private _active: ReactiveProperty<boolean>;

	constructor(
		id: string,
		title: string,
		iconPath: string,
		soundPath: string,
		defaultVolume: number,
	) {
		this.globalSettings = GlobalSettings.getInstance();
		this.id = id;
		this.title = title;
		this.iconPath = iconPath;
		this.soundPath = soundPath;

		const globalSettings = GlobalSettings.getInstance();
		const savedVolume = globalSettings.getCardVolume(this.id);
		this._volume = new ReactiveProperty<number>(
			savedVolume === undefined ? defaultVolume : savedVolume,
		);
		globalSettings.setCardVolume(this.id, this.volume);
		this._player = new SoundPlayer(this.soundPath);

		this._volume.subscribe((volume) => {
			this._player.setVolume(volume);
			globalSettings.setCardVolume(this.id, volume);
		});

		const savedActive = globalSettings.getCardActive(this.id);
		this._active = new ReactiveProperty<boolean>(savedActive ?? false);
		this._active.subscribe((isActive) => {
			globalSettings.setCardActive(this.id, isActive);
			if (isActive && !globalSettings.paused) {
				this._player.resume(this.volume);
			} else {
				this._player.pause();
			}
		});

		globalSettings.onVolumeChange(() =>
			this._player.setVolume(this.volume),
		);

		globalSettings.onPausedChange((paused) => {
			if (paused) {
				this._player.pause();
			} else if (this.active) {
				this._player.resume(this.volume);
			}
		});

		globalSettings.onCardsChange(() => {
			this.volume = globalSettings.getCardVolume(this.id) || 0;
		});
		this._player.setVolume(this.volume);
	}

	public get volume(): number {
		return this._volume.value;
	}

	public get player(): SoundPlayer {
		return this._player;
	}

	public get active(): boolean {
		return this._active.value;
	}

	public set volume(value: number) {
		this._volume.value = value;
	}

	public set active(value: boolean) {
		this._active.value = value;
	}

	public onVolumeChange(callback: (volume: number) => void): void {
		this._volume.subscribe(callback);
	}

	public onActiveChange(callback: (active: boolean) => void): void {
		this._active.subscribe(callback);
	}
}
