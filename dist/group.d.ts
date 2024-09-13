import { Root } from './root.js';
import { Entity, EntityProps } from './entity.js';
import type { ICanvasRenderingContext2D } from './types.js';
export interface GroupProps extends EntityProps {
}
export declare class Group extends Entity {
    subroot: Root;
    constructor(opts: GroupProps & {
        root: GroupRoot;
    });
    render(): void;
}
export declare class GroupRoot extends Root {
    parent: Root;
    constructor(ctx: ICanvasRenderingContext2D, parent: Root);
    queueRender(): void;
}
