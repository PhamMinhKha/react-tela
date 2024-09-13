import { TelaEventTarget } from './event-target.js';
import { proxyEvents } from './events.js';
function createOffscreenCanvas(doc) {
    return (w, h) => {
        const c = doc.createElement('canvas');
        c.width = w;
        c.height = h;
        return c;
    };
}
export class Root extends TelaEventTarget {
    constructor(ctx, opts = {}) {
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
                createOffscreenCanvas(ctx.canvas.ownerDocument);
        this.DOMMatrix = opts.DOMMatrix || globalThis.DOMMatrix;
        this.Path2D = opts.Path2D || globalThis.Path2D;
        if (opts.loadImage) {
            this.loadImage = opts.loadImage;
        }
        this.proxyEvents();
    }
    async loadImage(src) {
        const img = new Image();
        await new Promise((res, rej) => {
            img.onload = res;
            img.onerror = rej;
            img.src = src;
        });
        return img;
    }
    then(r) {
        if (r) {
            this.addEventListener('render', r, { once: true });
        }
    }
    proxyEvents() {
        proxyEvents(this.ctx.canvas, this, true);
    }
    clear() {
        for (const e of this.entities) {
            e._root = null;
        }
        this.entities.length === 0;
        this.queueRender();
    }
    add(entity) {
        if (entity._root)
            entity._root.remove(entity);
        entity._root = this;
        this.entities.push(entity);
        entity.dispatchEvent(new Event('add'));
        this.queueRender();
    }
    remove(entity) {
        const i = this.entities.indexOf(entity);
        if (i !== -1) {
            entity._root = null;
            this.entities.splice(i, 1);
            entity.dispatchEvent(new Event('remove'));
            this.queueRender();
        }
    }
    insertBefore(child, beforeChild) {
        const i = this.entities.indexOf(beforeChild);
        if (i === -1) {
            throw new Error('Entity to insert before is not a child of this Root');
        }
        if (child._root)
            child._root.remove(child);
        child._root = this;
        this.entities.splice(i, 0, child);
        this.queueRender();
    }
    render() {
        this.renderQueued = false;
        if (!this.dirty)
            return;
        this.renderCount++;
        const { ctx } = this;
        const { canvas } = ctx;
        ctx.resetTransform();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const entity of this.entities) {
            if (entity._hidden)
                continue;
            ctx.save();
            entity.render();
            ctx.restore();
        }
        this.dirty = false;
        this.dispatchEvent(new Event('render'));
    }
    get width() {
        return this.ctx.canvas.width;
    }
    get height() {
        return this.ctx.canvas.height;
    }
    queueRender() {
        if (this.renderQueued)
            return;
        this.dirty = true;
        this.renderQueued = true;
        queueMicrotask(this.render);
    }
}
//# sourceMappingURL=root.js.map