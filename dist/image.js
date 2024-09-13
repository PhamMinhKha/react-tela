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
var _Image_root, _Image_src, _Image_image, _Image_loading, _Image_loaded;
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
        _Image_loading.set(this, false);
        _Image_loaded.set(this, false);
        this.sx = opts.sx;
        this.sy = opts.sy;
        this.sw = opts.sw;
        this.sh = opts.sh;
        __classPrivateFieldSet(this, _Image_root, root, "f");
        __classPrivateFieldSet(this, _Image_src, opts.src, "f");
        this.loadImage();
    }
    get src() {
        return __classPrivateFieldGet(this, _Image_src, "f");
    }
    set src(v) {
        if (__classPrivateFieldGet(this, _Image_src, "f") !== v) {
            __classPrivateFieldSet(this, _Image_src, v, "f");
            __classPrivateFieldSet(this, _Image_loaded, false, "f");
            this.loadImage();
        }
    }
    async loadImage() {
        if (__classPrivateFieldGet(this, _Image_loading, "f") || __classPrivateFieldGet(this, _Image_loaded, "f"))
            return;
        __classPrivateFieldSet(this, _Image_loading, true, "f");
        try {
            const img = await __classPrivateFieldGet(this, _Image_root, "f").loadImage(__classPrivateFieldGet(this, _Image_src, "f"));
            __classPrivateFieldSet(this, _Image_image, img, "f");
            if (this.width === 0) {
                this.width = img.naturalWidth;
            }
            if (this.height === 0) {
                this.height = img.naturalHeight;
            }
            __classPrivateFieldSet(this, _Image_loaded, true, "f");
            __classPrivateFieldGet(this, _Image_root, "f").queueRender();
        }
        catch (error) {
            // console.error('Error loading image:', error);
        }
        finally {
            __classPrivateFieldSet(this, _Image_loading, false, "f");
        }
    }
    render() {
        super.render();
        if (!__classPrivateFieldGet(this, _Image_loaded, "f") || !__classPrivateFieldGet(this, _Image_image, "f"))
            return;
        try {
            __classPrivateFieldGet(this, _Image_root, "f").ctx.drawImage(__classPrivateFieldGet(this, _Image_image, "f"), this.sx ?? 0, this.sy ?? 0, this.sw ?? __classPrivateFieldGet(this, _Image_image, "f").naturalWidth, this.sh ?? __classPrivateFieldGet(this, _Image_image, "f").naturalHeight, 0, 0, this.width, this.height);
        }
        catch (error) {
            // console.error('Error drawing image:', error);
        }
    }
}
_Image_root = new WeakMap(), _Image_src = new WeakMap(), _Image_image = new WeakMap(), _Image_loading = new WeakMap(), _Image_loaded = new WeakMap();
//# sourceMappingURL=image.js.map