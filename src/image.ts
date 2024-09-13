import { Entity, type EntityProps } from './entity.js';
import type { Root } from './root.js';
import type { IImage } from './types.js';

export interface ImageProps extends EntityProps {
	src: string;
	sx?: number;
	sy?: number;
	sw?: number;
	sh?: number;
}

export class Image extends Entity {
	#root: Root;
	#src: string;
	#image?: IImage;
	sx?: number;
	sy?: number;
	sw?: number;
	sh?: number;

	constructor(opts: ImageProps, root: Root) {
		super({
			width: 0,
			height: 0,
			...opts,
		});
		this.sx = opts.sx;
		this.sy = opts.sy;
		this.sw = opts.sw;
		this.sh = opts.sh;
		this.#root = root;
		this.#src = opts.src;
		this.loadImage();
	}

	get src() {
		return this.#src;
	}

	set src(v: string) {
		if (this.#src !== v) {
			this.#src = v;
			this.loadImage();
		}
	}

	async loadImage() {
		try {
			const img = await this.#root.loadImage(this.#src);
			this.#image = img;
			if (this.width === 0) {
				this.width = img.naturalWidth;
			}
			if (this.height === 0) {
				this.height = img.naturalHeight;
			}
			this.root?.queueRender();
		} catch (error) {
			// console.error("Error loading image:", error);
			// Thực hiện xử lý lỗi tùy chỉnh ở đây nếu cần
		}
	}

	render(): void {
		super.render();
		const { root } = this;
		const img = this.#image;
		if (!img || !root.ctx) return;

		const sx = this.sx ?? 0;
		const sy = this.sy ?? 0;
		const sw = this.sw ?? img.naturalWidth;
		const sh = this.sh ?? img.naturalHeight;

		try {
			root.ctx.drawImage(img, sx, sy, sw, sh, 0, 0, this.width, this.height);
		} catch (error) {
			// console.error("Error rendering image:", error);
		}
	}
}