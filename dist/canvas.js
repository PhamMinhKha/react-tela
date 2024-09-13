import { Entity } from './entity.js';
export class Canvas extends Entity {
    constructor(opts, root) {
        super(opts);
        this.subcanvas = new root.Canvas(this.width, this.height);
    }
    getContext(...args) {
        return this.subcanvas.getContext(...args);
    }
    render() {
        super.render();
        this.root.ctx.drawImage(this.subcanvas, 0, 0, this.width, this.height);
    }
}
//# sourceMappingURL=canvas.js.map