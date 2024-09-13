import { Shape, type ShapeProps } from './shape.js';
export type RoundRectProps = ShapeProps & {
    radii?: number | DOMPointInit | (number | DOMPointInit)[];
};
export declare class RoundRect extends Shape {
    radii?: number | DOMPointInit | (number | DOMPointInit)[];
    constructor(opts: RoundRectProps);
    get path(): import("./types.js").IPath2D;
}
