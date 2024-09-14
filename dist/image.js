var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Image_root, _Image_src, _Image_image, _Image_sx, _Image_sy, _Image_sw, _Image_sh, _Image_renderParams;
import { Entity } from './entity.js';
export class Image extends Entity {
    constructor(opts, root) {
        super({
            width: 0,
            height: 0,
            ...opts,
        });
        _Image_root.set(this, void 0);
        _Image_src.set(this, void 0);
        _Image_image.set(this, void 0);
        _Image_sx.set(this, void 0);
        _Image_sy.set(this, void 0);
        _Image_sw.set(this, void 0);
        _Image_sh.set(this, void 0);
        _Image_renderParams.set(this, void 0);
        __classPrivateFieldSet(this, _Image_sx, opts.sx ?? 0, "f");
        __classPrivateFieldSet(this, _Image_sy, opts.sy ?? 0, "f");
        __classPrivateFieldSet(this, _Image_sw, opts.sw, "f");
        __classPrivateFieldSet(this, _Image_sh, opts.sh, "f");
        __classPrivateFieldSet(this, _Image_root, root, "f");
        __classPrivateFieldSet(this, _Image_src, opts.src, "f");
        __classPrivateFieldSet(this, _Image_renderParams, [0, 0, 0, 0, 0, 0, this.width, this.height], "f");
        this.loadImage();
    }
    get src() {
        return __classPrivateFieldGet(this, _Image_src, "f");
    }
    set src(v) {
        if (__classPrivateFieldGet(this, _Image_src, "f") !== v) {
            __classPrivateFieldSet(this, _Image_src, v, "f");
            this.loadImage();
        }
    }
    async loadImage() {
        const img = await __classPrivateFieldGet(this, _Image_root, "f").loadImage(__classPrivateFieldGet(this, _Image_src, "f"));
        __classPrivateFieldSet(this, _Image_image, img, "f");
        if (this.width === 0) {
            this.width = img.naturalWidth;
        }
        if (this.height === 0) {
            this.height = img.naturalHeight;
        }
        this.updateRenderParams();
        this.root?.queueRender();
    }
    updateRenderParams() {
        const img = __classPrivateFieldGet(this, _Image_image, "f");
        if (!img)
            return;
        __classPrivateFieldGet(this, _Image_renderParams, "f")[0] = __classPrivateFieldGet(this, _Image_sx, "f");
        __classPrivateFieldGet(this, _Image_renderParams, "f")[1] = __classPrivateFieldGet(this, _Image_sy, "f");
        __classPrivateFieldGet(this, _Image_renderParams, "f")[2] = __classPrivateFieldGet(this, _Image_sw, "f") ?? img.naturalWidth;
        __classPrivateFieldGet(this, _Image_renderParams, "f")[3] = __classPrivateFieldGet(this, _Image_sh, "f") ?? img.naturalHeight;
        __classPrivateFieldGet(this, _Image_renderParams, "f")[4] = 0;
        __classPrivateFieldGet(this, _Image_renderParams, "f")[5] = 0;
        __classPrivateFieldGet(this, _Image_renderParams, "f")[6] = this.width;
        __classPrivateFieldGet(this, _Image_renderParams, "f")[7] = this.height;
    }
    render() {
        super.render();
        const { root } = this;
        const img = __classPrivateFieldGet(this, _Image_image, "f");
        if (!img || !root.ctx)
            return;
        root.ctx.drawImage(img, ...__classPrivateFieldGet(this, _Image_renderParams, "f"));
    }
}
_Image_root = new WeakMap(), _Image_src = new WeakMap(), _Image_image = new WeakMap(), _Image_sx = new WeakMap(), _Image_sy = new WeakMap(), _Image_sw = new WeakMap(), _Image_sh = new WeakMap(), _Image_renderParams = new WeakMap();
//# sourceMappingURL=image.js.map