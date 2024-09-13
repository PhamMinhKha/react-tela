import { Entity } from './entity.js';
export class Shape extends Entity {
    constructor(opts) {
        super(opts);
        this.clip = opts.clip;
        this.clipRule = opts.clipRule;
        this.fill = opts.fill;
        this.stroke = opts.stroke;
        this.lineCap = opts.lineCap;
        this.lineDash = opts.lineDash;
        this.lineDashOffset = opts.lineDashOffset;
        this.lineJoin = opts.lineJoin;
        this.lineWidth = opts.lineWidth ?? 1;
        this.miterLimit = opts.miterLimit;
    }
    isPointInPath(x, y) {
        const { ctx } = this.root;
        const { lineWidth, stroke, fill, matrix, path } = this;
        ctx.setTransform(matrix);
        if (stroke) {
            ctx.lineWidth = lineWidth;
        }
        const result = (stroke && ctx.isPointInStroke(path, x, y)) ||
            (fill && ctx.isPointInPath(path, x, y)) ||
            false;
        return result;
    }
    render() {
        super.render();
        const { clip, clipRule, root, fill, fillRule, stroke, lineWidth, lineDash, lineDashOffset, lineCap, lineJoin, miterLimit, } = this;
        const { ctx } = root;
        if (typeof lineWidth === 'number') {
            ctx.lineWidth = lineWidth;
        }
        if (lineDash) {
            ctx.setLineDash(lineDash);
        }
        if (typeof lineDashOffset === 'number') {
            ctx.lineDashOffset = lineDashOffset;
        }
        if (lineCap) {
            ctx.lineCap = lineCap;
        }
        if (lineJoin) {
            ctx.lineJoin = lineJoin;
        }
        if (typeof miterLimit === 'number') {
            ctx.miterLimit = miterLimit;
        }
        ctx.beginPath();
        const path = this.path;
        if (clip || clipRule) {
            ctx.clip(path, clipRule);
        }
        if (fill) {
            ctx.fillStyle = fill;
            ctx.fill(path, fillRule);
        }
        if (stroke) {
            ctx.strokeStyle = stroke;
            ctx.stroke(path);
        }
    }
}
//# sourceMappingURL=shape.js.map