import { Shape } from './shape.js';
export class RoundRect extends Shape {
    constructor(opts) {
        super(opts);
        this.radii = opts.radii;
    }
    get path() {
        const p = new this.root.Path2D();
        p.roundRect(0, 0, this.width, this.height, this.radii);
        return p;
    }
}
//# sourceMappingURL=round-rect.js.map