import { ReactiveProperty } from '../../global/reactive-property';
import { SoundPlayer } from '../../utils/sound-player';

export class SoundCardModel {
	private static registry: Set<string> = new Set();

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
		volume: number,
	) {
		if (SoundCardModel.registry.has(id)) {
			throw new Error(`SoundCard with id ${id} already exists`);
		}
		this.id = id;
		SoundCardModel.registry.add(id);
		this.title = title;
		this.iconPath = iconPath;
		this.soundPath = soundPath;
		this._volume = new ReactiveProperty<number>(volume);
		this.loadVolume();
		this._player = new SoundPlayer(this.soundPath);
	}

	public get volume(): number {
		return this._volume.value;
	}

	public get player(): SoundPlayer {
		return this._player;
	}

	public set volume(value: number) {
		this._volume.value = value;
		this.saveVolume();
		this._player.setVolume(value);
	}

	public onVolumeChange(callback: (volume: number) => void): void {
		this._volume.subscribe(callback);
	}

	// Загружаем общий объект с громкостями из localStorage
	private loadVolume(): void {
		const savedData = localStorage.getItem('soundCards');
		if (savedData) {
			try {
				const parsed = safeJSONParse(savedData);
				if (isVolumeRecord(parsed)) {
					if (parsed[this.id] !== undefined) {
						this._volume.value = Number(parsed[this.id]);
					}
				} else {
					console.error(
						'SoundCards data is not a valid volume record',
					);
				}
			} catch (error) {
				console.error('Error parsing soundCards data:', error);
			}
		}
	}

	// Сохраняем общий объект с громкостями в localStorage
	private saveVolume(): void {
		const savedData = localStorage.getItem('soundCards');
		let volumes: Record<string, number> = {};
		if (savedData) {
			try {
				const parsed = safeJSONParse(savedData);
				if (isVolumeRecord(parsed)) {
					volumes = parsed;
				} else {
					console.error(
						'SoundCards data is not a valid volume record',
					);
				}
			} catch (error) {
				console.error('Error parsing soundCards data:', error);
			}
		}
		volumes[this.id] = this._volume.value;
		localStorage.setItem('soundCards', JSON.stringify(volumes));
	}

	// private loadVolume(): void {
	// 	const savedValue = localStorage.getItem(`soundCard_volume_${this.id}`);
	// 	if (savedValue !== null) {
	// 		this._volume.value = Number(savedValue);
	// 	}
	// }

	// private saveVolume(): void {
	// 	localStorage.setItem(
	// 		`soundCard_volume_${this.id}`,
	// 		this._volume.value.toString(),
	// 	);
	// }
}

function safeJSONParse(json: string): unknown {
	return JSON.parse(json);
}

function isVolumeRecord(data: unknown): data is Record<string, number> {
	if (typeof data !== 'object' || data === null || Array.isArray(data)) {
		return false;
	}
	return Object.values(data).every((value) => typeof value === 'number');
}
