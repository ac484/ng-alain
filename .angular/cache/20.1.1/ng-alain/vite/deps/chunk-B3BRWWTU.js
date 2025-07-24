import {
  DOCUMENT,
  InjectionToken,
  inject
} from "./chunk-QZDSTGXI.js";
import {
  fromEvent
} from "./chunk-KMLKBNXJ.js";
import {
  distinctUntilChanged,
  map,
  share,
  startWith
} from "./chunk-EBAU53KC.js";

// node_modules/@delon/util/fesm2022/token.mjs
var WINDOW = new InjectionToken("WINDOW", {
  factory: () => {
    const { defaultView } = inject(DOCUMENT);
    if (!defaultView) {
      throw new Error("Window is not available");
    }
    return defaultView;
  }
});
var PAGE_VISIBILITY = new InjectionToken("PAGE_VISIBILITY`", {
  factory: () => {
    const doc = inject(DOCUMENT);
    return fromEvent(doc, "visibilitychange").pipe(startWith(0), map(() => !doc.hidden), distinctUntilChanged(), share());
  }
});

export {
  WINDOW,
  PAGE_VISIBILITY
};
//# sourceMappingURL=chunk-B3BRWWTU.js.map
