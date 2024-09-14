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
var _Image_root, _Image_src, _Image_image;
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
            this.loadImage();
        }
    }
    async loadImage() {
        try {
            const img = await __classPrivateFieldGet(this, _Image_root, "f").loadImage(__classPrivateFieldGet(this, _Image_src, "f"));
            __classPrivateFieldSet(this, _Image_image, img, "f");
            if (this.width === 0) {
                this.width = img.naturalWidth;
            }
            if (this.height === 0) {
                this.height = img.naturalHeight;
            }
            this.root?.queueRender();
        }
        catch (error) {
            console.warn("Error loading image:", error);
            // Có thể thêm xử lý lỗi tùy chỉnh ở đây nếu cần
        }
    }
    render() {
        super.render();
        const { root } = this;
        const img = __classPrivateFieldGet(this, _Image_image, "f");
        if (!img || !root.ctx)
            return;
        const sx = this.sx ?? 0;
        const sy = this.sy ?? 0;
        const sw = this.sw ?? img.naturalWidth;
        const sh = this.sh ?? img.naturalHeight;
        try {
            root.ctx.drawImage(img, sx, sy, sw, sh, 0, 0, this.width, this.height);
        }
        catch (error) {
            console.warn("Error rendering image:", error);
        }
    }
}
_Image_root = new WeakMap(), _Image_src = new WeakMap(), _Image_image = new WeakMap();
//# sourceMappingURL=image.js.map