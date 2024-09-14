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
	#sx: number;
	#sy: number;
	#sw?: number;
	#sh?: number;
	#renderParams: [number, number, number, number, number, number, number, number];

	constructor(opts: ImageProps, root: Root) {
		super({
			width: 0,
			height: 0,
			...opts,
		});
		this.#sx = opts.sx ?? 0;
		this.#sy = opts.sy ?? 0;
		this.#sw = opts.sw;
		this.#sh = opts.sh;
		this.#root = root;
		this.#src = opts.src;
		this.#renderParams = [0, 0, 0, 0, 0, 0, this.width, this.height];
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
			this.updateRenderParams();
			this.root?.queueRender();
		} catch (error) {
			// console.warn("Error loading image:", error);
		}
	}

	private updateRenderParams() {
		const img = this.#image;
		if (!img) return;

		this.#renderParams[0] = this.#sx;
		this.#renderParams[1] = this.#sy;
		this.#renderParams[2] = this.#sw ?? img.naturalWidth;
		this.#renderParams[3] = this.#sh ?? img.naturalHeight;
		this.#renderParams[4] = 0;
		this.#renderParams[5] = 0;
		this.#renderParams[6] = this.width;
		this.#renderParams[7] = this.height;
	}

	render(): void {
		super.render();
		const { root } = this;
		const img = this.#image;
		if (!img || !root.ctx) return;

		try {
			root.ctx.drawImage(img, ...this.#renderParams);
		} catch (error) {
			// console.warn("Error rendering image:", error);
		}
	}
}