import React, { createElement, forwardRef, useRef, } from 'react';
import { ParentContext, useParent } from './hooks/use-parent.js';
import { GroupRoot, } from './group.js';
import { LayoutContext, useLayout } from './hooks/use-layout.js';
function useAdjustedLayout(props) {
    let { x, y, width, height } = useLayout();
    x += props.x ?? 0;
    y += props.y ?? 0;
    width += props.width ?? 0;
    height += props.height ?? 0;
    return { x, y, width, height };
}
const factory = (type) => {
    const c = forwardRef((props, ref) => {
        return createElement(type, { ...props, ...useAdjustedLayout(props), ref });
    });
    c.displayName = type;
    return c;
};
export const Canvas = factory('Canvas');
export const Image = factory('Image');
export const Path = factory('Path');
export const Rect = factory('Rect');
export const RoundRect = factory('RoundRect');
export const Text = factory('Text');
//export const Arc = factory<_Arc, ArcProps>('Arc');
export const Arc = forwardRef((props, ref) => {
    const layout = useAdjustedLayout(props);
    const radius = props.radius ?? Math.min(layout.width, layout.height) / 2;
    return createElement('Arc', {
        ...props,
        x: layout.x,
        y: layout.y,
        radius,
        ref,
    });
});
Arc.displayName = 'Arc';
export const Circle = forwardRef((props, ref) => {
    return React.createElement(Arc, { ...props, ref: ref, startAngle: 0, endAngle: 360 });
});
Circle.displayName = 'Circle';
export const Group = forwardRef((props, ref) => {
    const root = useParent();
    const rootRef = useRef();
    let canvas;
    const layout = useAdjustedLayout(props);
    if (rootRef.current) {
        canvas = rootRef.current.ctx.canvas;
    }
    else {
        canvas = new root.Canvas(layout.width || 300, layout.height || 150);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Could not get "2d" canvas context');
        }
        rootRef.current = new GroupRoot(ctx, root);
    }
    if (layout.width > 0 && layout.width !== canvas.width) {
        canvas.width = layout.width;
    }
    if (layout.height > 0 && layout.height !== canvas.height) {
        canvas.height = layout.height;
    }
    //console.log({ props })
    return (React.createElement(ParentContext.Provider, { value: rootRef.current },
        React.createElement(LayoutContext.Provider, { value: { x: 0, y: 0, width: 0, height: 0 } }, createElement('Group', {
            ...props,
            ...layout,
            root: rootRef.current,
            ref,
        }))));
});
Group.displayName = 'Group';
export { useParent } from './hooks/use-parent.js';
export { useLayout, LayoutContext } from './hooks/use-layout.js';
export { useDimensions } from './hooks/use-dimensions.js';
export { useTextMetrics } from './hooks/use-text-metrics.js';
//# sourceMappingURL=index.js.map