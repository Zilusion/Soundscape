export class SoundPlayer {
	private audio: HTMLAudioElement;

	constructor(source: string) {
		this.audio = new Audio(source);
		this.audio.preload = 'auto';
		this.audio.loop = false;
	}

	public play(): void {
		this.audio.currentTime = 0;
		this.audio
			.play()
			.catch((error) => console.error('Audio play error:', error));
	}
}
