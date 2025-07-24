import {
  deepMergeKey
} from "./chunk-XMKNXNVX.js";
import {
  Injectable,
  setClassMetadata
} from "./chunk-NQBXVTYU.js";
import {
  InjectionToken,
  SIGNAL,
  inject,
  makeEnvironmentProviders,
  ɵɵdefineInjectable
} from "./chunk-QZDSTGXI.js";
import {
  __spreadValues
} from "./chunk-7CE4I3X6.js";

// node_modules/@delon/util/fesm2022/config.mjs
var AlainSVConfig = class {
  /** 大小，默认：`large` */
  size;
  /** 间距，默认：`32` */
  gutter;
  /** 布局，默认：`horizontal` */
  layout;
  /** 列数，默认：`3` */
  col;
  /** 是否显示默认值，当内容为空值时显示 `-`，默认：`true` */
  default;
  /** `label` 固定宽度，若 `null` 或 `undefined` 表示非固定，默认：`null` */
  labelWidth;
};
var ALAIN_CONFIG = new InjectionToken("alain-config", {
  providedIn: "root",
  factory: ALAIN_CONFIG_FACTORY
});
function ALAIN_CONFIG_FACTORY() {
  return {};
}
function provideAlainConfig(config) {
  return makeEnvironmentProviders([{
    provide: ALAIN_CONFIG,
    useValue: config
  }]);
}
var AlainConfigService = class _AlainConfigService {
  config = __spreadValues({}, inject(ALAIN_CONFIG, {
    optional: true
  }));
  get(componentName, key) {
    const res = this.config[componentName] || {};
    return key ? {
      [key]: res[key]
    } : res;
  }
  merge(componentName, ...defaultValues) {
    return deepMergeKey({}, true, ...defaultValues, this.get(componentName));
  }
  /**
   * 将配置附加到当前实例中，支持 Signal 信号
   */
  attach(componentThis, componentName, defaultValues) {
    const data = this.merge(componentName, defaultValues);
    Object.entries(data).forEach(([key, value]) => {
      const t = componentThis;
      const s = t[key]?.[SIGNAL];
      if (s != null) {
        s.value = value;
      } else {
        t[key] = value;
      }
    });
  }
  set(componentName, value) {
    this.config[componentName] = __spreadValues(__spreadValues({}, this.config[componentName]), value);
  }
  static ɵfac = function AlainConfigService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AlainConfigService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _AlainConfigService,
    factory: _AlainConfigService.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AlainConfigService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  AlainSVConfig,
  ALAIN_CONFIG,
  ALAIN_CONFIG_FACTORY,
  provideAlainConfig,
  AlainConfigService
};
//# sourceMappingURL=chunk-ES4WNO3Q.js.map
