export declare class TelaEventTarget extends EventTarget {
    get parentNode(): EventTarget | null;
    dispatchEvent(event: Event): boolean;
}
