import type Page from '../global/page';
export type Route = {
	path: string;
	create: () => Page;
};

export class Router {
	private routes: Route[];
	private rootElement: HTMLElement;
	private notFoundPage: Page;

	constructor(routes: Route[], rootElement: HTMLElement, notFoundPage: Page) {
		this.routes = routes;
		this.rootElement = rootElement;
		this.notFoundPage = notFoundPage;
		globalThis.addEventListener('popstate', () =>
			this.handleLocationChange(),
		);
	}

	public start(): void {
		this.handleLocationChange();
	}

	public navigate(path: string): void {
		globalThis.history.pushState({}, '', path);
		this.handleLocationChange();
	}

	private handleLocationChange(): void {
		const currentPath = globalThis.location.pathname;
		const route = this.routes.find((r) => r.path === currentPath);
		const page: Page = route ? route.create() : this.notFoundPage;
		this.rootElement.innerHTML = '';
		this.rootElement.append(page.getElement());
	}
}
