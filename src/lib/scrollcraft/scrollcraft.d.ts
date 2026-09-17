export {};

declare global {
  interface Window {
    ScrollCraft: {
      mount: (
        root?: Element | Document | string | null,
        opts?: { lerp?: number }
      ) => unknown;
      reduce: boolean;
      instances: unknown[];
    };
  }
}
