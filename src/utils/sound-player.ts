// export class SoundPlayer {
// 	private audio: HTMLAudioElement;

// 	constructor(source: string) {
// 		this.audio = new Audio(source);
// 		this.audio.preload = 'auto';
// 		this.audio.loop = false;
// 	}

// 	public play(): void {
// 		this.audio.currentTime = 0;
// 		this.audio
// 			.play()
// 			.catch((error) => console.error('Audio play error:', error));
// 	}
// }

export class SoundPlayer {
	private static globalVolume: number = 1;
	private audio: HTMLAudioElement;
	// Глобальный множитель громкости (от 0 до 1)

	constructor(source: string) {
		this.audio = new Audio(source);
		this.audio.preload = 'auto';
		this.audio.loop = false;
		// Устанавливаем начальное значение громкости – будем рассчитывать как (instanceVolume * globalVolume)
		this.audio.volume = SoundPlayer.globalVolume;
	}

	// Статический метод для установки глобальной громкости (значение от 0 до 100)
	public static setGlobalVolume(globalVolume: number): void {
		SoundPlayer.globalVolume = globalVolume / 100;
	}

	// Можно добавить методы для mute/unmute, если нужно
	public static mute(): void {
		SoundPlayer.globalVolume = 0;
	}

	public static unmute(previousGlobalVolume: number): void {
		SoundPlayer.globalVolume = previousGlobalVolume / 100;
	}

	// Метод play использует переданное значение (от 0 до 100) и устанавливает аудио.volume
	public play(instanceVolume: number): void {
		this.audio.currentTime = 0;
		// Расчёт итоговой громкости: instanceVolume (0–100) -> [0,1] умножаем на globalVolume
		this.audio.volume = (instanceVolume / 100) * SoundPlayer.globalVolume;
		this.audio
			.play()
			.catch((error) => console.error('Audio play error:', error));
	}

	public pause(): void {
		this.audio.pause();
	}

	public resume(instanceVolume: number): void {
		this.audio.volume = (instanceVolume / 100) * SoundPlayer.globalVolume;
		this.audio
			.play()
			.catch((error) => console.error('Audio resume error:', error));
	}

	public setVolume(instanceVolume: number): void {
		this.audio.volume = (instanceVolume / 100) * SoundPlayer.globalVolume;
	}
}
