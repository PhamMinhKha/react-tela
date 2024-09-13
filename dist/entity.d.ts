import { TelaEventTarget } from './event-target.js';
import type { Root } from './root.js';
import type { TelaMouseEvent } from './types.js';
export type EntityProps = {
    /**
     * The x (horizontal) coordinate of the entity from the top-left corner of the context.
     */
    x?: number;
    /**
     * The y (vertical) coordinate of the entity from the top-left corner of the context.
     */
    y?: number;
    /**
     * The width of the entity in pixels.
     */
    width?: number;
    /**
     * The height of the entity in pixels.
     */
    height?: number;
    /**
     * The alpha transparency value of the entity. The value `0` is fully transparent. The value `1` is fully opaque.
     *
     * @default 1.0
     */
    alpha?: number;
    /**
     * The rotation of the entity in degrees.
     *
     * @default 0
     */
    rotate?: number;
    /**
     * Scale of the entity along the x-axis.
     *
     * @default 1.0
     */
    scaleX?: number;
    /**
     * Scale of the entity along the y-axis.
     *
     * @default 1.0
     */
    scaleY?: number;
    pointerEvents?: boolean;
    /**
     * Fires when the user clicks the left mouse button on the entity.
     *
     * @param ev The mouse event.
     */
    onClick?: (ev: TelaMouseEvent) => any;
    onMouseDown?: (ev: TelaMouseEvent) => any;
    onMouseUp?: (ev: TelaMouseEvent) => any;
    onMouseMove?: (ev: TelaMouseEvent) => any;
    onMouseEnter?: (ev: TelaMouseEvent) => any;
    onMouseLeave?: (ev: TelaMouseEvent) => any;
    onTouchStart?: (ev: TouchEvent) => any;
    onTouchMove?: (ev: TouchEvent) => any;
    onTouchEnd?: (ev: TouchEvent) => any;
};
export declare class Entity extends TelaEventTarget {
    x: number;
    y: number;
    width: number;
    height: number;
    alpha: number;
    rotate: number;
    scaleX?: number;
    scaleY?: number;
    pointerEvents: boolean;
    _root: Root | null;
    _hidden: boolean;
    onclick: ((ev: TelaMouseEvent) => any) | null;
    onmousedown: ((ev: TelaMouseEvent) => any) | null;
    onmouseup: ((ev: TelaMouseEvent) => any) | null;
    onmousemove: ((ev: TelaMouseEvent) => any) | null;
    onmouseenter: ((ev: TelaMouseEvent) => any) | null;
    onmouseleave: ((ev: TelaMouseEvent) => any) | null;
    ontouchstart: ((ev: TouchEvent) => any) | null;
    ontouchmove: ((ev: TouchEvent) => any) | null;
    ontouchend: ((ev: TouchEvent) => any) | null;
    constructor(opts?: EntityProps);
    get parentNode(): Root | null;
    get root(): Root;
    get calculatedX(): number;
    get calculatedY(): number;
    get offsetX(): number;
    get offsetY(): number;
    get matrix(): import("./types.js").IDOMMatrix;
    get inverseMatrix(): import("./types.js").IDOMMatrix;
    isPointInPath(x: number, y: number): boolean;
    get path(): import("./types.js").IPath2D;
    render(): void;
}
