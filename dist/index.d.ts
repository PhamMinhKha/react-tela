import React, { type PropsWithChildren } from 'react';
import { Canvas as _Canvas, type CanvasProps } from './canvas.js';
import { Group as _Group, type GroupProps as _GroupProps } from './group.js';
import { Rect as _Rect, type RectProps } from './rect.js';
import { RoundRect as _RoundRect, type RoundRectProps } from './round-rect.js';
import { Arc as _Arc, type ArcProps } from './arc.js';
import { Path as _Path, type PathProps } from './path.js';
import { Image as _Image, type ImageProps } from './image.js';
import { Text as _Text, type TextProps as _TextProps } from './text.js';
type MaybeArray<T> = T | T[];
export type GroupProps = PropsWithChildren<_GroupProps>;
export { ArcProps, CanvasProps, RectProps, RoundRectProps, PathProps, ImageProps, };
export type { _Canvas as CanvasRef };
export declare const Canvas: React.ForwardRefExoticComponent<CanvasProps & React.RefAttributes<_Canvas>>;
export declare const Image: React.ForwardRefExoticComponent<ImageProps & React.RefAttributes<_Image>>;
export declare const Path: React.ForwardRefExoticComponent<import("./shape.js").ShapeProps & {
    width: number;
    height: number;
    d: string;
} & React.RefAttributes<_Path>>;
export declare const Rect: React.ForwardRefExoticComponent<import("./shape.js").ShapeProps & React.RefAttributes<_Rect>>;
export declare const RoundRect: React.ForwardRefExoticComponent<import("./shape.js").ShapeProps & {
    radii?: number | DOMPointInit | (number | DOMPointInit)[] | undefined;
} & React.RefAttributes<_RoundRect>>;
export type TextProps = Omit<_TextProps, 'value'> & {
    children?: MaybeArray<string | number>;
};
export declare const Text: React.ForwardRefExoticComponent<Omit<_TextProps, "value"> & {
    children?: MaybeArray<string | number> | undefined;
} & React.RefAttributes<_Text>>;
export declare const Arc: React.ForwardRefExoticComponent<Omit<import("./shape.js").ShapeProps, "width" | "height"> & {
    startAngle: number;
    endAngle: number;
    radius: number;
    counterclockwise?: boolean | undefined;
} & React.RefAttributes<_Arc>>;
export type CircleProps = Omit<ArcProps, 'startAngle' | 'endAngle' | 'counterclockwise'>;
export declare const Circle: React.ForwardRefExoticComponent<CircleProps & React.RefAttributes<_Arc>>;
export declare const Group: React.ForwardRefExoticComponent<_GroupProps & {
    children?: React.ReactNode;
} & React.RefAttributes<_Group>>;
export { useParent } from './hooks/use-parent.js';
export { useLayout, LayoutContext, type Layout } from './hooks/use-layout.js';
export { useDimensions } from './hooks/use-dimensions.js';
export { useTextMetrics } from './hooks/use-text-metrics.js';
