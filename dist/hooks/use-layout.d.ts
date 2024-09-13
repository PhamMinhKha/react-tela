export interface Layout {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare const LayoutContext: import("react").Context<Layout>;
export declare function useLayout(): Layout;
