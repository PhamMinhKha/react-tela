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
var _Path_path;
// @ts-expect-error No types for "parse-svg-path"
import parseSvgPath from 'parse-svg-path';
import { Shape } from './shape.js';
export class Path extends Shape {
    constructor(opts) {
        super(opts);
        _Path_path.set(this, void 0);
        this.d = opts.d;
    }
    get path() {
        if (!__classPrivateFieldGet(this, _Path_path, "f")) {
            const parsed = parseSvgPath(this.d);
            let modified = parsed
                .map((c) => `${c[0]}${c.slice(1).join(',')}`)
                .join('');
            // TODO: map absolute coordinates to relative
            //console.log({ parsed, v, modified });
            __classPrivateFieldSet(this, _Path_path, new this.root.Path2D(modified), "f");
        }
        return __classPrivateFieldGet(this, _Path_path, "f");
    }
}
_Path_path = new WeakMap();
//# sourceMappingURL=path.js.map