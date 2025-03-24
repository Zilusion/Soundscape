import { ReactiveProperty } from "./reactive-property";

export class GlobalSettings {
    private _volume: ReactiveProperty<number>;
    public _mute: ReactiveProperty<boolean>;

    private static instance: GlobalSettings

    private constructor() {
        let volume = localStorage.getItem('volume') ?? 100;
        this._volume = new ReactiveProperty<number>(Number(volume));
        let mute = localStorage.getItem('mute') ?? 'true';
        this._mute = new ReactiveProperty<boolean>(!!mute);
    }

    public static getInstance(): GlobalSettings {
        if (!GlobalSettings.instance) {
            GlobalSettings.instance = new GlobalSettings();
        }
        return GlobalSettings.instance;
    }

    public get volume(): number {
        return this._volume.value;
    }

    public set volume(value: number) {
        this._volume.value = value;
        localStorage.setItem('volume', value.toString());
    }

    public get mute(): boolean {
        return this._mute.value;
    }

    public set mute(value: boolean) {
        this._mute.value = value;
        localStorage.setItem('mute', value.toString());
    }

    public onVolumeChange(callback: (volume: number) => void): void {
        this._volume.subscribe(callback);
    }

    public onMuteChange(callback: (mute: boolean) => void): void {
        this._mute.subscribe(callback);
    }
}