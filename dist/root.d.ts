import { TelaEventTarget } from './event-target.js';
import type { Entity } from './entity.js';
import type { IDOMMatrix, ICanvas, IImage, IPath2D, ICanvasRenderingContext2D } from './types.js';
export interface RootParams {
    Canvas?: new (w: number, h: number) => ICanvas;
    DOMMatrix?: new (init?: string | number[]) => IDOMMatrix;
    Path2D?: new (path?: string) => IPath2D;
    loadImage?: (src: string) => Promise<IImage>;
}
export declare class Root extends TelaEventTarget {
    ctx: ICanvasRenderingContext2D;
    dirty: boolean;
    entities: Entity[];
    renderCount: number;
    renderQueued: boolean;
    Canvas: new (w: number, h: number) => ICanvas;
    DOMMatrix: new (init?: string | number[]) => IDOMMatrix;
    Path2D: new (path?: string) => IPath2D;
    constructor(ctx: ICanvasRenderingContext2D, opts?: RootParams);
    loadImage(src: string): Promise<IImage>;
    then(r?: (value: Event) => void): void;
    proxyEvents(): void;
    clear(): void;
    add(entity: Entity): void;
    remove(entity: Entity): void;
    insertBefore(child: Entity, beforeChild: Entity): void;
    render(): void;
    get width(): number;
    get height(): number;
    queueRender(): void;
}
