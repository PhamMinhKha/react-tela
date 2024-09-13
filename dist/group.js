import { Root } from './root.js';
import { Entity } from './entity.js';
import { proxyEvents } from './events.js';
export class Group extends Entity {
    constructor(opts) {
        super(opts);
        this.subroot = opts.root;
        proxyEvents(this, this.subroot, false);
    }
    render() {
        super.render();
        this.subroot.render();
        this.root.ctx.drawImage(this.subroot.ctx.canvas, 0, 0, this.width, this.height);
    }
}
export class GroupRoot extends Root {
    constructor(ctx, parent) {
        super(ctx, parent);
        this.parent = parent;
    }
    queueRender() {
        this.dirty = true;
        this.parent.queueRender();
    }
}
//# sourceMappingURL=group.js.map