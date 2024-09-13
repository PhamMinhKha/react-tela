var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Text_value;
import { Entity } from './entity.js';
export class Text extends Entity {
    get value() {
        return __classPrivateFieldGet(this, _Text_value, "f");
    }
    set value(v) {
        __classPrivateFieldSet(this, _Text_value, v, "f");
    }
    constructor(opts) {
        super({
            width: 0,
            height: 0,
            ...opts,
        });
        _Text_value.set(this, void 0);
        this.value = opts.value;
        this.fontFamily = opts.fontFamily;
        this.fontWeight = opts.fontWeight;
        this.fontSize = opts.fontSize;
        this.fill = opts.fill;
        this.stroke = opts.stroke;
        this.lineWidth = opts.lineWidth;
        this.textAlign = opts.textAlign || 'start';
        this.textBaseline = opts.textBaseline || 'top';
    }
    render() {
        const { value, fontFamily = 'sans-serif', fontWeight = '', fontSize = 24, lineWidth, textAlign, textBaseline, fill, stroke, root, } = this;
        const { ctx } = root;
        ctx.font = `${fontWeight} ${fontSize}px "${fontFamily}"`;
        const bounds = ctx.measureText(value);
        this.width = bounds.width;
        this.height = fontSize;
        super.render();
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        if (typeof lineWidth === 'number') {
            ctx.lineWidth = lineWidth;
        }
        if (fill) {
            ctx.fillStyle = fill;
            ctx.fillText(value, 0, 0);
        }
        if (stroke) {
            ctx.strokeStyle = stroke;
            ctx.strokeText(value, 0, 0);
        }
    }
}
_Text_value = new WeakMap();
//# sourceMappingURL=text.js.map