import { Entity, EntityProps } from './entity.js';
export interface TextProps extends Omit<EntityProps, 'width' | 'height'> {
    value: string;
    fontFamily?: string;
    fontWeight?: string;
    fontSize?: number;
    fill?: string;
    stroke?: string;
    lineWidth?: number;
    textAlign?: CanvasTextAlign;
    textBaseline?: CanvasTextBaseline;
}
export declare class Text extends Entity {
    #private;
    fontFamily?: string;
    fontWeight?: string;
    fontSize?: number;
    fill?: string;
    stroke?: string;
    lineWidth?: number;
    textAlign: CanvasTextAlign;
    textBaseline: CanvasTextBaseline;
    get value(): string;
    set value(v: string);
    constructor(opts: TextProps);
    render(): void;
}
