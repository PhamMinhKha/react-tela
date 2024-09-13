import { createContext, useContext } from 'react';
export const ParentContext = createContext(null);
ParentContext.displayName = 'ParentContext';
export function useParent() {
    const parent = useContext(ParentContext);
    if (!parent) {
        throw new Error('Could not find parent context');
    }
    return parent;
}
//# sourceMappingURL=use-parent.js.map