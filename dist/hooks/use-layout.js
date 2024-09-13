import { createContext, useContext } from 'react';
export const LayoutContext = createContext({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
});
LayoutContext.displayName = 'LayoutContext';
export function useLayout() {
    return useContext(LayoutContext);
}
//# sourceMappingURL=use-layout.js.map