import { TelaEventTarget } from './event-target.js';
export class Entity extends TelaEventTarget {
    constructor(opts = {}) {
        super();
        this._root = null;
        this._hidden = false;
        this.x = opts.x ?? 0;
        this.y = opts.y ?? 0;
        this.width = opts.width ?? 0;
        this.height = opts.height ?? 0;
        this.alpha = opts.alpha ?? 1;
        this.rotate = opts.rotate ?? 0;
        this.scaleX = opts.scaleX;
        this.scaleY = opts.scaleY;
        this.pointerEvents = opts.pointerEvents !== false;
        this.onclick = opts.onClick ?? null;
        this.onmousemove = opts.onMouseMove ?? null;
        this.onmouseenter = opts.onMouseEnter ?? null;
        this.onmouseleave = opts.onMouseLeave ?? null;
        this.onmousedown = opts.onMouseDown ?? null;
        this.onmouseup = opts.onMouseUp ?? null;
        this.ontouchstart = opts.onTouchStart ?? null;
        this.ontouchmove = opts.onTouchMove ?? null;
        this.ontouchend = opts.onTouchEnd ?? null;
    }
    get parentNode() {
        return this._root;
    }
    get root() {
        const r = this._root;
        if (!r) {
            throw new Error(`Entity "${this.constructor.name}" has not been added to a \`Root\` context`);
        }
        return r;
    }
    get calculatedX() {
        return this.x + this.width / 2;
    }
    get calculatedY() {
        return this.y + this.height / 2;
    }
    get offsetX() {
        return -this.width / 2;
    }
    get offsetY() {
        return -this.height / 2;
    }
    get matrix() {
        // TODO: add caching
        const { DOMMatrix } = this.root;
        const m = new DOMMatrix();
        m.translateSelf(this.calculatedX, this.calculatedY);
        if (typeof this.rotate === 'number') {
            m.rotateSelf(this.rotate);
        }
        if (this.scaleX || this.scaleY) {
            m.scaleSelf(this.scaleX ?? 1, this.scaleY ?? 1);
        }
        m.translateSelf(this.offsetX, this.offsetY);
        return m;
    }
    get inverseMatrix() {
        // TODO: add caching
        return this.matrix.inverse();
    }
    isPointInPath(x, y) {
        const { ctx } = this.root;
        //const prevMatrix = ctx.getTransform();
        ctx.setTransform(this.matrix);
        const result = ctx.isPointInPath(this.path, x, y);
        //ctx.setTransform(prevMatrix);
        return result;
    }
    get path() {
        const p = new this.root.Path2D();
        p.rect(0, 0, this.width, this.height);
        return p;
    }
    render() {
        if (!this.root) {
            throw new Error(`${this.constructor.name} instance has not been added to a root context`);
        }
        const { ctx } = this.root;
        ctx.globalAlpha = this.alpha;
        ctx.setTransform(this.matrix);
    }
}
//# sourceMappingURL=entity.js.map