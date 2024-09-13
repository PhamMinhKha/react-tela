import { Root } from './root.js';
import type { Entity } from './entity.js';
import type { Point } from './types.js';
export declare function cloneMouseEvent(e: MouseEvent, client: Point, layer: Point, type?: string, init?: MouseEventInit): MouseEvent;
export declare function cloneTouchEvent(e: TouchEvent, touches: Map<number, Touch>, type?: string): TouchEvent;
export declare function degreesToRadians(degrees: number): number;
export declare function findTarget(root: Root, point: Point): Root | Entity;
export declare function getLayer(target: Root | Entity, point: Point): Point;
