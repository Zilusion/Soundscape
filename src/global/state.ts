// import type EventBus from './event-bus';
// // import { StateEvent } from './events';
// // import { saveToFile, loadFromFile } from '../utils/file-utilities';

// // export type Option = {
// // 	id: string;
// // 	title: string;
// // 	weight: number | null;
// // };

// // function isOption(value: unknown): value is Option {
// // 	if (typeof value !== 'object' || value === null) {
// // 		return false;
// // 	}

// // 	if (!('id' in value) || !('title' in value) || !('weight' in value)) {
// // 		return false;
// // 	}

// // 	if (typeof value.id !== 'string') {
// // 		return false;
// // 	}
// // 	if (typeof value.title !== 'string') {
// // 		return false;
// // 	}
// // 	if (typeof value.weight !== 'number' && value.weight !== null) {
// // 		return false;
// // 	}
// // 	return true;
// // }

// // function isOptionArray(value: unknown): value is Option[] {
// // 	return Array.isArray(value) && value.every((item) => isOption(item));
// // }

// // export type Sound = {
// // 	id: string;
// // 	title: string;
// // 	source: string;
// // 	volume: number;
// // };

// export class State {
// 	// private static readonly STORAGE_KEY_OPTIONS = 'options';
// 	// private static readonly STORAGE_KEY_ID_COUNTER = 'idCounter';
// 	// private static readonly STORAGE_KEY_MUTED = 'isMuted';
// 	// private static readonly STORAGE_KEY_VISITED = 'hasVisited';

// 	private static instance: State;
// 	// private sounds: Sound[] = [];
// 	// private eventBus: EventBus;

// 	// private constructor(eventBus: EventBus) {
// 		// this.eventBus = eventBus;
// 	// }

// 	// public static create(eventBus: EventBus): State {
// 	// 	if (!State.instance) {
// 	// 		State.instance = new State(eventBus);
// 	// 	}
// 	// 	return State.instance;
// 	// }

// 	// public addSound(sound: Sound): void {
// 	// 	this.sounds.push(sound);
// 	// 	this.eventBus.publish(StateEvent.SoundUpdated, this.sounds);
// 	// }
// }
console.log('State');
