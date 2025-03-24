export type Subscriber<T> = (newValue: T) => void;

export class ReactiveProperty<T> {
	private _value: T;
	private subscribers: Subscriber<T>[] = [];

	constructor(initialValue: T) {
		this._value = initialValue;
	}

	public get value(): T {
		return this._value;
	}

	public set value(newValue: T) {
		if (newValue !== this._value) {
			this._value = newValue;
			this.notify(newValue);
		}
	}

	public subscribe(callback: Subscriber<T>): void {
		this.subscribers.push(callback);
	}

	public unsubscribe(callback: Subscriber<T>): void {
		const index = this.subscribers.indexOf(callback);
		if (index !== -1) {
			this.subscribers.splice(index, 1);
		}
	}

	private notify(newValue: T): void {
		this.subscribers.forEach((callback) => callback(newValue));
	}
}
