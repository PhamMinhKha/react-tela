import { Root } from './root.js';
const MouseEvent = globalThis.MouseEvent || class MouseEvent extends Event {
};
export function cloneMouseEvent(e, client, layer, type = e.type, init) {
    const clone = new MouseEvent(type, {
        ...e,
        bubbles: e.bubbles,
        cancelable: e.cancelable,
        button: e.button,
        buttons: e.buttons,
        composed: e.composed,
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        shiftKey: e.shiftKey,
        detail: e.detail,
        which: e.which,
        view: e.view,
        ...init,
        clientX: client.x,
        clientY: client.y,
    });
    Object.defineProperties(clone, {
        offsetX: { value: client.x, configurable: true },
        offsetY: { value: client.y, configurable: true },
        layerX: { value: layer.x, configurable: true },
        layerY: { value: layer.y, configurable: true },
    });
    return clone;
}
function mapTouches(list, touches) {
    return [...list].map((t) => {
        const touch = touches.get(t.identifier);
        if (!touch) {
            throw new Error(`Could not find Touch for ${t.identifier}`);
        }
        return touch;
    });
}
export function cloneTouchEvent(e, touches, type = e.type) {
    const clone = new TouchEvent(type, {
        ...e,
        bubbles: e.bubbles,
        cancelable: e.cancelable,
        composed: e.composed,
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        shiftKey: e.shiftKey,
        detail: e.detail,
        which: e.which,
        view: e.view,
        touches: mapTouches(e.touches, touches),
        changedTouches: mapTouches(e.changedTouches, touches),
        targetTouches: mapTouches(e.targetTouches, touches),
    });
    return clone;
}
export function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}
export function findTarget(root, point) {
    let target = root;
    for (let i = root.entities.length - 1; i >= 0; i--) {
        const entity = root.entities[i];
        if (entity.pointerEvents && entity.isPointInPath(point.x, point.y)) {
            target = entity;
            break;
        }
    }
    return target;
}
export function getLayer(target, point) {
    return target instanceof Root
        ? point
        : target.inverseMatrix.transformPoint(point);
}
//# sourceMappingURL=util.js.map