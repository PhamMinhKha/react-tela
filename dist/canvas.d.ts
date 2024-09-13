import { Root } from './root.js';
import { Entity, EntityProps } from './entity.js';
import type { ICanvas } from './types.js';
export interface CanvasProps extends EntityProps {
}
export declare class Canvas extends Entity {
    subcanvas: ICanvas;
    constructor(opts: CanvasProps, root: Root);
    getContext(...args: Parameters<ICanvas['getContext']>): import("./types.js").ICanvasRenderingContext2D | null;
    render(): void;
}
