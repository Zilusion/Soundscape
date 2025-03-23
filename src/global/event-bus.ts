import type { StateEvent } from './events';

type EventHandler<T = unknown> = (data: T) => void;

export default class EventBus {
	private events: Map<StateEvent, EventHandler[]> = new Map();

	public subscribe(eventType: StateEvent, handler: EventHandler): void {
		if (!this.events.has(eventType)) {
			this.events.set(eventType, []);
		}
		this.events.get(eventType)?.push(handler);
	}

	public unsubscribe(eventType: StateEvent, handler: EventHandler): void {
		const handlers = this.events.get(eventType);
		if (handlers) {
			this.events.set(
				eventType,
				handlers.filter((item) => item !== handler),
			);
		}
	}

	public publish<T>(eventType: StateEvent, data: T): void {
		const handlers = this.events.get(eventType);
		if (handlers) {
			handlers.forEach((handler) => handler(data));
		}
	}
}
