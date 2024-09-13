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
		this.#src = v;
		this.loadImage();
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
			// console.error("Lỗi khi tải hình ảnh:", error);
			// Xử lý lỗi ở đây
			// Ví dụ: cập nhật trạng thái, hiển thị hình ảnh lỗi, vv.
		}
	}

	render(): void {
		super.render();
		const { root } = this;
		const img = this.#image;
		if (!img) return;
		try {
			root.ctx.drawImage(
				img,
				this.sx ?? 0,
				this.sy ?? 0,
				this.sw ?? img.naturalWidth,
				this.sh ?? img.naturalHeight,
				0,
				0,
				this.width,
				this.height,
			);
		} catch (error) {

		}
	}
}