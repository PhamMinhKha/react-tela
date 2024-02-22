import { TelaEventTarget } from './event-target';
import type { Entity } from './entity';
import type {
	IDOMMatrix,
	ICanvas,
	IImage,
	IPath2D,
	ICanvasRenderingContext2D,
} from './types';
import { proxyEvents } from './events';

export interface RootParams {
	Canvas?: new (w: number, h: number) => ICanvas;
	DOMMatrix?: new (init?: string | number[]) => IDOMMatrix;
	Path2D?: new (path?: string) => IPath2D;
	loadImage?: (src: string) => Promise<IImage>;
}

function createOffscreenCanvas(doc: Document) {
	return (w: number, h: number) => {
		const c = doc.createElement('canvas');
		c.width = w;
		c.height = h;
		return c;
	};
}

export class Root extends TelaEventTarget {
	ctx: ICanvasRenderingContext2D;
	dirty: boolean;
	entities: Entity[];
	renderCount: number;
	renderQueued: boolean;
	Canvas: new (w: number, h: number) => ICanvas;
	DOMMatrix: new (init?: string | number[]) => IDOMMatrix;
	Path2D: new (path?: string) => IPath2D;

	constructor(ctx: ICanvasRenderingContext2D, opts: RootParams = {}) {
		super();
		this.ctx = ctx;
		this.dirty = false;
		this.entities = [];
		this.render = this.render.bind(this);
		this.renderCount = 0;
		this.renderQueued = false;
		this.Canvas =
			opts.Canvas ||
			globalThis.OffscreenCanvas ||
			createOffscreenCanvas(
				(ctx.canvas as HTMLCanvasElement).ownerDocument,
			);
		this.DOMMatrix = opts.DOMMatrix || globalThis.DOMMatrix;
		this.Path2D = opts.Path2D || globalThis.Path2D;
		if (opts.loadImage) {
			this.loadImage = opts.loadImage;
		}
		this.proxyEvents();
	}

	async loadImage(src: string): Promise<IImage> {
		const img = new Image();
		await new Promise((res, rej) => {
			img.onload = res;
			img.onerror = rej;
			img.src = src;
		});
		return img;
	}

	then(r?: (value: Event) => void) {
		if (r) {
			this.addEventListener('render', r, { once: true });
		}
	}

	proxyEvents() {
		proxyEvents(this.ctx.canvas as EventTarget, this, true);
	}

	clear() {
		for (const e of this.entities) {
			e._root = null;
		}
		this.entities.length === 0;
		this.queueRender();
	}

	add(entity: Entity) {
		if (entity._root) entity._root.remove(entity);
		entity._root = this;
		this.entities.push(entity);
		this.queueRender();
	}

	remove(entity: Entity) {
		const i = this.entities.indexOf(entity);
		if (i !== -1) {
			entity._root = null;
			this.entities.splice(i, 1);
			this.queueRender();
		}
	}

	insertBefore(child: Entity, beforeChild: Entity) {
		const i = this.entities.indexOf(beforeChild);
		if (i === -1) {
			throw new Error(
				'Entity to insert before is not a child of this Root',
			);
		}
		if (child._root) child._root.remove(child);
		child._root = this;
		this.entities.splice(i, 0, child);
		this.queueRender();
	}

	render() {
		this.renderQueued = false;
		if (!this.dirty) return;
		this.renderCount++;
		const { ctx } = this;
		const { canvas } = ctx;
		ctx.resetTransform();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (const entity of this.entities) {
			ctx.save();
			entity.render();
			ctx.restore();
		}
		this.dirty = false;
		this.dispatchEvent(new Event('render'));
	}

	queueRender() {
		if (this.renderQueued) return;
		this.dirty = true;
		this.renderQueued = true;
		queueMicrotask(this.render);
	}
}
