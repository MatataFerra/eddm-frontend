declare module "fitty" {
  export interface FittyInstance {
    fit: () => void;
    unsubscribe: () => void;
  }
  export interface FittyOptions {
    minSize?: number;
    maxSize?: number;
    multiLine?: boolean;
    observeMutations?: MutationObserverInit | false;
  }
  export default function fitty(
    el: Element | string,
    options?: FittyOptions
  ): FittyInstance | FittyInstance[];
}
