import type { State } from '../../state/state';
import type { Option } from '../../state/state';
import type { StateEvent } from '../../state/events';
import type EventBus from '../../state/event-bus';

export class OptionsViewModel {
	private state: State;
	private eventBus: EventBus;

	constructor(state: State, eventBus: EventBus) {
		this.state = state;
		this.eventBus = eventBus;
	}

	public getOptions(): Option[] {
		return this.state.getOptions();
	}

	public addOption(): void {
		this.state.addOption();
	}

	public deleteOption(id: string): void {
		this.state.deleteOption(id);
	}

	public deleteAllOptions(): void {
		this.state.deleteAllOptions();
	}

	public updateOption(id: string, updates: Partial<Option>): void {
		this.state.updateOption(id, updates);
	}

	public hasValidOptions(): boolean {
		const options = this.state.getOptions();
		const validOptions = options.filter(
			(opt) =>
				opt.title.trim() !== '' &&
				opt.weight !== null &&
				opt.weight > 0,
		);
		return validOptions.length >= 2;
	}

	public saveToFile(): void {
		this.state.saveToFile();
	}

	public loadFromFile(): void {
		this.state.loadFromFile();
	}

	public parseCSV(csv: string): void {
		const lines = csv
			.split('\n')
			.map((line) => line.trim())
			.filter((line) => line !== '');

		lines.forEach((line) => {
			const lastCommaIndex = line.lastIndexOf(',');
			if (lastCommaIndex === -1) return;

			const title = line.slice(0, lastCommaIndex).trim();
			const weightString = line.slice(lastCommaIndex + 1).trim();
			const weight = weightString === '' ? null : Number(weightString);

			if (
				title === '' ||
				(weight !== null && (Number.isNaN(weight) || weight <= 0))
			) {
				return;
			}

			this.state.addOption(title, weight);
		});
	}

	public subscribe(eventType: StateEvent, handler: () => void): void {
		this.eventBus.subscribe(eventType, handler);
	}
}
