import { Shape, type ShapeProps } from './shape.js';
import { IPath2D } from './types.js';
export type PathProps = ShapeProps & {
    width: number;
    height: number;
    d: string;
};
export declare class Path extends Shape {
    #private;
    d: string;
    constructor(opts: PathProps);
    get path(): IPath2D;
}
