import { Entity } from './entity.js';
import { findTarget, getLayer, cloneMouseEvent, cloneTouchEvent, } from './util.js';
function scaledCoordinates(canvas, x, y) {
    // Get CSS size
    const cssWidth = canvas.clientWidth ?? canvas.width;
    const cssHeight = canvas.clientHeight ?? canvas.height;
    // Get drawing buffer size
    const bufferWidth = canvas.width;
    const bufferHeight = canvas.height;
    // Calculate the ratio
    const widthRatio = bufferWidth / cssWidth;
    const heightRatio = bufferHeight / cssHeight;
    return { x: x * widthRatio, y: y * heightRatio };
}
function dispatchEvent(target, event, originalEvent) {
    target.dispatchEvent(event);
    if (event.defaultPrevented) {
        originalEvent.preventDefault();
    }
    if (event.cancelBubble) {
        originalEvent.stopPropagation();
    }
}
export function proxyEvents(canvasOrGroup, root, shouldScalePoint) {
    if (!canvasOrGroup.addEventListener) {
        // Probably Node.js, where there are no events, so skip
        return;
    }
    let mouseCurrentlyOver = null;
    const scalePoint = shouldScalePoint
        ? (x, y) => scaledCoordinates(canvasOrGroup, x, y)
        : (x, y) => ({ x, y });
    const activeTouches = new Map();
    canvasOrGroup.addEventListener('touchstart', (_event) => {
        const event = _event;
        const offsetX = shouldScalePoint
            ? _event.target.offsetLeft
            : 0;
        const offsetY = shouldScalePoint
            ? _event.target.offsetTop
            : 0;
        let target = root;
        for (const touch of event.changedTouches) {
            const point = scalePoint(touch.clientX - offsetX, touch.clientY - offsetY);
            const radius = scalePoint(touch.radiusX, touch.radiusY);
            target = findTarget(root, point);
            activeTouches.set(touch.identifier, new Touch({
                clientX: point.x,
                clientY: point.y,
                force: touch.force,
                identifier: touch.identifier,
                pageX: point.x,
                pageY: point.y,
                radiusX: radius.x,
                radiusY: radius.y,
                rotationAngle: touch.rotationAngle,
                screenX: point.x,
                screenY: point.y,
                target,
            }));
        }
        const ev = cloneTouchEvent(event, activeTouches);
        dispatchEvent(target, ev, event);
    });
    canvasOrGroup.addEventListener('touchmove', (_event) => {
        const event = _event;
        const offsetX = shouldScalePoint
            ? _event.target.offsetLeft
            : 0;
        const offsetY = shouldScalePoint
            ? _event.target.offsetTop
            : 0;
        let target = root;
        for (const touch of event.changedTouches) {
            const prevTouch = activeTouches.get(touch.identifier);
            const point = scalePoint(touch.clientX - offsetX, touch.clientY - offsetY);
            const radius = scalePoint(touch.radiusX, touch.radiusY);
            if (prevTouch) {
                target = prevTouch.target;
            }
            activeTouches.set(touch.identifier, new Touch({
                clientX: point.x,
                clientY: point.y,
                force: touch.force,
                identifier: touch.identifier,
                pageX: point.x,
                pageY: point.y,
                radiusX: radius.x,
                radiusY: radius.y,
                rotationAngle: touch.rotationAngle,
                screenX: point.x,
                screenY: point.y,
                target,
            }));
        }
        const ev = cloneTouchEvent(event, activeTouches);
        dispatchEvent(target, ev, event);
    });
    canvasOrGroup.addEventListener('touchend', (_event) => {
        const event = _event;
        const ev = cloneTouchEvent(event, activeTouches);
        for (const touch of event.changedTouches) {
            activeTouches.delete(touch.identifier);
        }
        dispatchEvent(ev.changedTouches[0].target, ev, event);
    });
    function doMouseEvent(_event) {
        const event = _event;
        const point = scalePoint(event.layerX, event.layerY);
        const target = findTarget(root, point);
        const layer = getLayer(target, point);
        const ev = cloneMouseEvent(event, point, layer);
        dispatchEvent(target, ev, event);
    }
    canvasOrGroup.addEventListener('click', doMouseEvent);
    canvasOrGroup.addEventListener('mousedown', doMouseEvent);
    canvasOrGroup.addEventListener('mouseup', doMouseEvent);
    canvasOrGroup.addEventListener('mousemove', (e) => {
        const event = e;
        const point = scalePoint(event.layerX, event.layerY);
        const target = findTarget(root, point);
        const layer = getLayer(target, point);
        if (target !== mouseCurrentlyOver) {
            if (mouseCurrentlyOver instanceof Entity && !mouseCurrentlyOver._root) {
                // Previous mouse target has been unmounted
                mouseCurrentlyOver = null;
            }
            if (mouseCurrentlyOver) {
                // do "mouseleave" event
                mouseCurrentlyOver.dispatchEvent(cloneMouseEvent(event, point, getLayer(mouseCurrentlyOver, point), 'mouseleave', {
                    bubbles: false,
                    cancelable: false,
                }));
            }
            mouseCurrentlyOver = target;
            // do "mouseenter" event
            target.dispatchEvent(cloneMouseEvent(event, point, layer, 'mouseenter', {
                bubbles: false,
                cancelable: false,
            }));
        }
        const ev = cloneMouseEvent(event, point, layer);
        dispatchEvent(target, ev, event);
    });
    canvasOrGroup.addEventListener('mouseleave', (_e) => {
        mouseCurrentlyOver = null;
        const event = _e;
        const point = scalePoint(event.layerX, event.layerY);
        const ev = cloneMouseEvent(_e, point, point);
        dispatchEvent(root, ev, event);
    });
}
//# sourceMappingURL=events.js.map