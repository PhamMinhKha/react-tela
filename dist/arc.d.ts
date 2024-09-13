import { Shape, type ShapeProps } from './shape.js';
export type ArcProps = Omit<ShapeProps, 'width' | 'height'> & {
    startAngle: number;
    endAngle: number;
    radius: number;
    counterclockwise?: boolean;
};
export declare class Arc extends Shape {
    #private;
    startAngle: number;
    endAngle: number;
    counterclockwise?: boolean;
    get radius(): number;
    set radius(v: number);
    constructor(opts: ArcProps);
    get path(): import("./types.js").IPath2D;
}
