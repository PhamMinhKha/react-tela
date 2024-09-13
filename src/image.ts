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
	#loading: boolean = false;
	#loaded: boolean = false;
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
			this.#loaded = false;
			this.loadImage();
		}
	}

	async loadImage() {
		if (this.#loading || this.#loaded) return;

		this.#loading = true;
		try {
			const img = await this.#root.loadImage(this.#src);
			this.#image = img;
			if (this.width === 0) {
				this.width = img.naturalWidth;
			}
			if (this.height === 0) {
				this.height = img.naturalHeight;
			}
			this.#loaded = true;
			this.#root.queueRender();
		} catch (error) {
			// console.error('Error loading image:', error);
		} finally {
			this.#loading = false;
		}
	}

	render(): void {
		super.render();
		if (!this.#loaded || !this.#image) return;

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
			// console.error('Error drawing image:', error);
		}
	}
}