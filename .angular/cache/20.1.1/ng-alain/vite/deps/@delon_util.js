import {
  ArrayService
} from "./chunk-72WGOEKH.js";
import "./chunk-KG7WXLYY.js";
import {
  ZoneOutside,
  ZoneRun
} from "./chunk-RPM77CK6.js";
import {
  CurrencyMega_Powers,
  CurrencyService,
  REGEX,
  REGEX_STR,
  format,
  formatMask,
  isChinese,
  isColor,
  isDecimal,
  isIdCard,
  isInt,
  isIp,
  isMobile,
  isNum,
  isUrl
} from "./chunk-BSLJP3PC.js";
import {
  PAGE_VISIBILITY,
  WINDOW
} from "./chunk-B3BRWWTU.js";
import {
  CookieService,
  ScrollService,
  copy,
  isEmpty,
  updateHostClass
} from "./chunk-KZXCIQZH.js";
import {
  DateTimePickerUtil,
  dateTimePickerUtil,
  fixEndTimeOfRange,
  formatDate,
  getTimeDistance,
  toDate
} from "./chunk-SQJ77OAJ.js";
import "./chunk-BHH4M3PU.js";
import {
  ALAIN_CONFIG,
  ALAIN_CONFIG_FACTORY,
  AlainConfigService,
  AlainSVConfig,
  provideAlainConfig
} from "./chunk-ES4WNO3Q.js";
import {
  LazyService,
  PREFIX,
  assert,
  assertArray,
  assertEmpty,
  assertNumber,
  assertObservable,
  assertString,
  deepCopy,
  deepGet,
  deepMerge,
  deepMergeKey,
  log,
  warn,
  warnDeprecation
} from "./chunk-XMKNXNVX.js";
import "./chunk-BQ76GOFF.js";
import "./chunk-CQHDL44S.js";
import "./chunk-GIT7CFOZ.js";
import "./chunk-GUTSRBNM.js";
import "./chunk-FTJJFYDV.js";
import {
  LOCALE_ID,
  NgModule,
  Pipe,
  setClassMetadata,
  ɵɵdefineNgModule,
  ɵɵdefinePipe
} from "./chunk-NQBXVTYU.js";
import {
  inject,
  ɵɵdefineInjector
} from "./chunk-QZDSTGXI.js";
import "./chunk-KMLKBNXJ.js";
import "./chunk-Q4VD2BBX.js";
import "./chunk-EBAU53KC.js";
import "./chunk-7CE4I3X6.js";

// node_modules/@delon/util/fesm2022/form.mjs
var _Validators = class {
  /**
   * Wheter is number
   *
   * 是否为数字
   */
  static num(control) {
    return isNum(control.value) ? null : { num: true };
  }
  /**
   * Wheter is integer
   *
   * 是否为整数
   */
  static int(control) {
    return isInt(control.value) ? null : { int: true };
  }
  /**
   * Wheter is decimal
   *
   * 是否为小数点数值
   */
  static decimal(control) {
    return isDecimal(control.value) ? null : { decimal: true };
  }
  /**
   * Wheter is People's Republic of China identity card
   *
   * 是否为中华人民共和国居民身份证
   */
  static idCard(control) {
    return isIdCard(control.value) ? null : { idCard: true };
  }
  /**
   * Wheter is china mobile (China)
   *
   * 是否为手机号（中国）
   */
  static mobile(control) {
    return isMobile(control.value) ? null : { mobile: true };
  }
  /**
   * Wheter is url address
   *
   * 是否URL地址
   */
  static url(control) {
    return isUrl(control.value) ? null : { url: true };
  }
  /**
   * Wheter is IPv4 address (Support v4, v6)
   *
   * 是否IP4地址（支持v4、v6）
   */
  static ip(control) {
    return isIp(control.value) ? null : { ip: true };
  }
  /**
   * Wheter is color
   *
   * 是否颜色代码值
   */
  static color(control) {
    return isColor(control.value) ? null : { color: true };
  }
  /**
   * Wheter is chinese
   *
   * 是否中文
   */
  static chinese(control) {
    return isChinese(control.value) ? null : { chinese: true };
  }
};
function MatchControl(controlName, matchingControlName) {
  return (formGroup) => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);
    if (matchingControl.errors && !matchingControl.errors.matchControl) {
      return null;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ matchControl: true });
    } else {
      matchingControl.setErrors(null);
    }
    return null;
  };
}

// node_modules/@delon/util/fesm2022/math.mjs
function inRange(value, start, end) {
  if (end === void 0) {
    end = start;
    start = 0;
  }
  assertNumber(value);
  assertNumber(start);
  assertNumber(end);
  return value >= Math.min(start, end) && value < Math.max(start, end);
}
function ceil(number, precision = 0) {
  return createRound(number, precision, "ceil");
}
function floor(number, precision = 0) {
  return createRound(number, precision, "floor");
}
function round(number, precision = 0) {
  return createRound(number, precision, "round");
}
function createRound(number, precision, methodName) {
  const func = Math[methodName];
  precision = precision == null ? 0 : Math.min(precision, 292);
  if (!precision) {
    return func(number);
  }
  let pair = `${number}e`.split("e");
  const value = func(Number(`${pair[0]}e${Number(pair[1]) + precision}`));
  pair = `${value}e`.split("e");
  return Number(`${pair[0]}e${Number(pair[1]) - precision}`);
}

// node_modules/@delon/util/fesm2022/pipe-currency.mjs
var CurrencyMegaPipe = class _CurrencyMegaPipe {
  srv = inject(CurrencyService);
  isCN = inject(LOCALE_ID).startsWith("zh");
  transform(value, options) {
    const res = this.srv.mega(value, options);
    return res.value + (this.isCN ? res.unitI18n : res.unit);
  }
  static ɵfac = function CurrencyMegaPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CurrencyMegaPipe)();
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "mega",
    type: _CurrencyMegaPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CurrencyMegaPipe, [{
    type: Pipe,
    args: [{
      name: "mega"
    }]
  }], null, null);
})();
var CurrencyPricePipe = class _CurrencyPricePipe {
  srv = inject(CurrencyService);
  transform(value, options) {
    return this.srv.format(value, options);
  }
  static ɵfac = function CurrencyPricePipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CurrencyPricePipe)();
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "price",
    type: _CurrencyPricePipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CurrencyPricePipe, [{
    type: Pipe,
    args: [{
      name: "price"
    }]
  }], null, null);
})();
var CurrencyCNYPipe = class _CurrencyCNYPipe {
  srv = inject(CurrencyService);
  transform(value, options) {
    return this.srv.cny(value, options);
  }
  static ɵfac = function CurrencyCNYPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CurrencyCNYPipe)();
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "cny",
    type: _CurrencyCNYPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CurrencyCNYPipe, [{
    type: Pipe,
    args: [{
      name: "cny"
    }]
  }], null, null);
})();
var PIPES = [CurrencyMegaPipe, CurrencyPricePipe, CurrencyCNYPipe];
var CurrencyPipeModule = class _CurrencyPipeModule {
  static ɵfac = function CurrencyPipeModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CurrencyPipeModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _CurrencyPipeModule,
    imports: [CurrencyMegaPipe, CurrencyPricePipe, CurrencyCNYPipe],
    exports: [CurrencyMegaPipe, CurrencyPricePipe, CurrencyCNYPipe]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CurrencyPipeModule, [{
    type: NgModule,
    args: [{
      imports: PIPES,
      exports: PIPES
    }]
  }], null, null);
})();

// node_modules/@delon/util/fesm2022/pipe-format.mjs
var FormatMaskPipe = class _FormatMaskPipe {
  transform(value, mask) {
    return formatMask(value, mask);
  }
  static ɵfac = function FormatMaskPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormatMaskPipe)();
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "mask",
    type: _FormatMaskPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormatMaskPipe, [{
    type: Pipe,
    args: [{
      name: "mask"
    }]
  }], null, null);
})();
var PIPES2 = [FormatMaskPipe];
var FormatPipeModule = class _FormatPipeModule {
  static ɵfac = function FormatPipeModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormatPipeModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _FormatPipeModule,
    imports: [FormatMaskPipe],
    exports: [FormatMaskPipe]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormatPipeModule, [{
    type: NgModule,
    args: [{
      imports: PIPES2,
      exports: PIPES2
    }]
  }], null, null);
})();

// node_modules/@delon/util/fesm2022/pipe-filter.mjs
var FilterPipe = class _FilterPipe {
  transform(array, matcher, ...args) {
    return array.filter((i) => matcher(i, ...args));
  }
  static ɵfac = function FilterPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FilterPipe)();
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "filter",
    type: _FilterPipe,
    pure: false
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FilterPipe, [{
    type: Pipe,
    args: [{
      name: "filter",
      pure: false
    }]
  }], null, null);
})();
var PIPES3 = [FilterPipe];
var FilterPipeModule = class _FilterPipeModule {
  static ɵfac = function FilterPipeModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FilterPipeModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _FilterPipeModule,
    imports: [FilterPipe],
    exports: [FilterPipe]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FilterPipeModule, [{
    type: NgModule,
    args: [{
      imports: PIPES3,
      exports: PIPES3
    }]
  }], null, null);
})();
export {
  ALAIN_CONFIG,
  ALAIN_CONFIG_FACTORY,
  AlainConfigService,
  AlainSVConfig,
  ArrayService,
  CookieService,
  CurrencyCNYPipe,
  CurrencyMegaPipe,
  CurrencyMega_Powers,
  CurrencyPipeModule,
  CurrencyPricePipe,
  CurrencyService,
  DateTimePickerUtil,
  FilterPipe,
  FilterPipeModule,
  FormatMaskPipe,
  FormatPipeModule,
  LazyService,
  MatchControl,
  PAGE_VISIBILITY,
  PREFIX,
  REGEX,
  REGEX_STR,
  ScrollService,
  WINDOW,
  ZoneOutside,
  ZoneRun,
  _Validators,
  assert,
  assertArray,
  assertEmpty,
  assertNumber,
  assertObservable,
  assertString,
  ceil,
  copy,
  dateTimePickerUtil,
  deepCopy,
  deepGet,
  deepMerge,
  deepMergeKey,
  fixEndTimeOfRange,
  floor,
  format,
  formatDate,
  formatMask,
  getTimeDistance,
  inRange,
  isChinese,
  isColor,
  isDecimal,
  isEmpty,
  isIdCard,
  isInt,
  isIp,
  isMobile,
  isNum,
  isUrl,
  log,
  provideAlainConfig,
  round,
  toDate,
  updateHostClass,
  warn,
  warnDeprecation
};
//# sourceMappingURL=@delon_util.js.map
