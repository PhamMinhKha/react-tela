import { Entity, type EntityProps } from './entity.js';
import type { Root } from './root.js';
export interface ImageProps extends EntityProps {
    src: string;
    sx?: number;
    sy?: number;
    sw?: number;
    sh?: number;
}
export declare class Image extends Entity {
    #private;
    constructor(opts: ImageProps, root: Root);
    get src(): string;
    set src(v: string);
    loadImage(): Promise<void>;
    private updateRenderParams;
    render(): void;
}
