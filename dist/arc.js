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
var _Arc_radius;
import { Shape } from './shape.js';
import { degreesToRadians } from './util.js';
export class Arc extends Shape {
    get radius() {
        return __classPrivateFieldGet(this, _Arc_radius, "f");
    }
    set radius(v) {
        this.width = this.height = v * 2;
        __classPrivateFieldSet(this, _Arc_radius, v, "f");
    }
    constructor(opts) {
        const r2 = opts.radius * 2;
        super({
            ...opts,
            width: r2,
            height: r2,
        });
        _Arc_radius.set(this, void 0);
        this.startAngle = opts.startAngle;
        this.endAngle = opts.endAngle;
        this.counterclockwise = opts.counterclockwise;
        __classPrivateFieldSet(this, _Arc_radius, opts.radius, "f");
    }
    get path() {
        const p = new this.root.Path2D();
        p.arc(__classPrivateFieldGet(this, _Arc_radius, "f"), __classPrivateFieldGet(this, _Arc_radius, "f"), this.radius, degreesToRadians(this.startAngle), degreesToRadians(this.endAngle), this.counterclockwise);
        return p;
    }
}
_Arc_radius = new WeakMap();
//# sourceMappingURL=arc.js.map