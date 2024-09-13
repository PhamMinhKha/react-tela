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
	#root: Root | null;
	#src: string;
	#image?: IImage;
	sx?: number;
	sy?: number;
	sw?: number;
	sh?: number;

	constructor(opts: ImageProps, root: Root | null) {
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
		if (!this.#root) {
			console.warn('Root is not set, unable to load image');
			return;
		}

		try {
			const img = await this.#root.loadImage(this.#src);
			this.#image = img;
			if (this.width === 0) {
				this.width = img.naturalWidth;
			}
			if (this.height === 0) {
				this.height = img.naturalHeight;
			}

			this.#root.queueRender();
		} catch (error) {
			// Xử lý lỗi một cách im lặng, hoặc log nếu cần thiết
			// console.error('Error loading image:', error);
		}
	}

	render(): void {
		super.render();
		if (!this.#root || !this.#image) return;

		try {
			this.#root.ctx.drawImage(
				this.#image,
				this.sx ?? 0,
				this.sy ?? 0,
				this.sw ?? this.#image.naturalWidth,
				this.sh ?? this.#image.naturalHeight,
				0,
				0,
				this.width,
				this.height,
			);
		} catch (error) {
			// Xử lý lỗi một cách im lặng, hoặc log nếu cần thiết
			// console.error('Error drawing image:', error);
		}
	}
}