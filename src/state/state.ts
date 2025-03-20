import type EventBus from './event-bus';
import { StateEvent } from './events';
import { saveToFile, loadFromFile } from '../utils/file-utilities';

export type Option = {
	id: string;
	title: string;
	weight: number | null;
};

function isOption(value: unknown): value is Option {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	if (!('id' in value) || !('title' in value) || !('weight' in value)) {
		return false;
	}

	if (typeof value.id !== 'string') {
		return false;
	}
	if (typeof value.title !== 'string') {
		return false;
	}
	if (typeof value.weight !== 'number' && value.weight !== null) {
		return false;
	}
	return true;
}

function isOptionArray(value: unknown): value is Option[] {
	return Array.isArray(value) && value.every((item) => isOption(item));
}

export class State {
	private static readonly STORAGE_KEY_OPTIONS = 'options';
	private static readonly STORAGE_KEY_ID_COUNTER = 'idCounter';
	private static readonly STORAGE_KEY_MUTED = 'isMuted';
	private static readonly STORAGE_KEY_VISITED = 'hasVisited';

	private static instance: State;
	private eventBus: EventBus;
	private options: Option[] = [];
	private idCounter = 0;
	private isMuted: boolean = false;

	private constructor(eventBus: EventBus) {
		this.eventBus = eventBus;
		this.loadOptionFromStorage();
		this.loadMuteStateFromStorage();
	}

	public static create(eventBus: EventBus): State {
		if (!State.instance) {
			State.instance = new State(eventBus);
		}
		return State.instance;
	}

	public getOptions(): Option[] {
		return [...this.options];
	}

	public addOption(title: string = '', weight: number | null = null): void {
		const id = `#${this.idCounter + 1}`;
		this.options.push({ id, title, weight });
		this.idCounter++;
		this.saveOptionsToStorage();
		this.eventBus.publish(StateEvent.OptionAdded, this.options);
	}

	public updateOption(id: string, updates: Partial<Option>): void {
		this.options = this.options.map((opt) =>
			opt.id === id ? { ...opt, ...updates } : opt,
		);
		this.saveOptionsToStorage();
		this.eventBus.publish(StateEvent.OptionsUpdated, this.options);
	}

	public deleteOption(id: string): void {
		this.options = this.options.filter((opt) => opt.id !== id);
		if (this.options.length === 0) {
			this.idCounter = 0;
		}
		this.saveOptionsToStorage();
		this.eventBus.publish(StateEvent.OptionDeleted, this.options);
	}

	public deleteAllOptions(): void {
		this.options = [];
		this.idCounter = 0;
		this.saveOptionsToStorage();
		this.eventBus.publish(StateEvent.OptionDeleted, this.options);
	}

	public getMuteState(): boolean {
		return this.isMuted;
	}

	public toggleMute(): void {
		this.isMuted = !this.isMuted;
		this.setMuteState(this.isMuted);
		this.eventBus.publish(StateEvent.MuteChanged, this.isMuted);
	}

	public setMuteState(muted: boolean): void {
		this.isMuted = muted;
		localStorage.setItem(
			State.STORAGE_KEY_MUTED,
			JSON.stringify(this.isMuted),
		);
		this.eventBus.publish(StateEvent.MuteChanged, this.isMuted);
	}

	public loadMuteStateFromStorage(): void {
		const isMutedString: unknown = JSON.parse(
			localStorage.getItem(State.STORAGE_KEY_MUTED) || 'false',
		);
		this.isMuted =
			typeof isMutedString === 'boolean' ? isMutedString : false;
		this.eventBus.publish(StateEvent.MuteChanged, this.isMuted);
	}

	public saveToFile(): void {
		saveToFile(
			{ idCounter: this.idCounter, options: this.options },
			'decision.json',
		);
	}

	public loadFromFile(): void {
		void loadFromFile()
			.then((data) => {
				const parsed: unknown = JSON.parse(data);

				if (this.isParsedData(parsed)) {
					this.options = isOptionArray(parsed.options)
						? parsed.options
						: [];
					this.idCounter =
						typeof parsed.idCounter === 'number'
							? parsed.idCounter
							: 0;
				} else {
					this.options = [];
					this.idCounter = 0;
				}

				this.saveOptionsToStorage();
				this.eventBus.publish(StateEvent.OptionsLoaded, this.options);
			})
			.catch(() => {
				console.error('Failed to load options from file');
			});
	}

	private isParsedData(
		value: unknown,
	): value is { options: unknown; idCounter: unknown } {
		if (typeof value !== 'object' || value === null) {
			return false;
		}

		return 'options' in value && 'idCounter' in value;
	}

	private saveOptionsToStorage(): void {
		localStorage.setItem(
			State.STORAGE_KEY_OPTIONS,
			JSON.stringify(this.options),
		);
		localStorage.setItem(
			State.STORAGE_KEY_ID_COUNTER,
			this.idCounter.toString(),
		);
	}

	private loadOptionFromStorage(): void {
		const optionsString = localStorage.getItem(State.STORAGE_KEY_OPTIONS);
		const idCounterString = localStorage.getItem(
			State.STORAGE_KEY_ID_COUNTER,
		);
		const hasVisited = localStorage.getItem(State.STORAGE_KEY_VISITED);

		if (optionsString) {
			const parsed: unknown = JSON.parse(optionsString);
			this.options = isOptionArray(parsed) ? parsed : [];
		} else if (hasVisited) {
			this.options = [];
		} else {
			const initialOption: Option = { id: '#1', title: '', weight: null };
			this.options = [initialOption];
			this.idCounter = 1;
			localStorage.setItem(State.STORAGE_KEY_VISITED, 'true');
		}

		if (idCounterString) {
			this.idCounter = Number.parseInt(idCounterString, 10);
		}

		this.eventBus.publish(StateEvent.OptionsLoaded, this.options);
	}
}
