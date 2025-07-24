import {
  warn
} from "./chunk-XMKNXNVX.js";

// node_modules/@delon/util/fesm2022/decorator.mjs
function makeFn(type, options) {
  return (_, __, descriptor) => {
    const source = descriptor.value;
    descriptor.value = function(...data) {
      const that = this;
      const ngZone = that[options?.ngZoneName || "ngZone"];
      if (!ngZone) {
        if (typeof ngDevMode === "undefined" || ngDevMode) {
          warn(`ZoneOutside: Decorator should have 'ngZone' property with 'NgZone' class.`);
        }
        return source.call(this, ...data);
      }
      let res;
      ngZone[type](() => {
        res = source.call(this, ...data);
      });
      return res;
    };
    return descriptor;
  };
}
function ZoneOutside(options) {
  return makeFn("runOutsideAngular", options);
}
function ZoneRun(options) {
  return makeFn("run", options);
}

export {
  ZoneOutside,
  ZoneRun
};
//# sourceMappingURL=chunk-RPM77CK6.js.map
