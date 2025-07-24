import {
  AlainConfigService
} from "./chunk-ES4WNO3Q.js";
import {
  deepCopy
} from "./chunk-XMKNXNVX.js";
import {
  HttpErrorResponse,
  HttpResponse,
  HttpResponseBase
} from "./chunk-NDRILP3E.js";
import "./chunk-GUTSRBNM.js";
import "./chunk-FTJJFYDV.js";
import {
  Injectable,
  setClassMetadata
} from "./chunk-NQBXVTYU.js";
import {
  InjectionToken,
  inject,
  makeEnvironmentProviders,
  ɵɵdefineInjectable
} from "./chunk-QZDSTGXI.js";
import {
  isObservable
} from "./chunk-KMLKBNXJ.js";
import "./chunk-Q4VD2BBX.js";
import {
  delay,
  from,
  map,
  of,
  switchMap,
  throwError
} from "./chunk-EBAU53KC.js";
import "./chunk-7CE4I3X6.js";

// node_modules/@delon/mock/fesm2022/mock.mjs
var MockStatusError = class {
  status;
  error;
  statusText;
  constructor(status, error) {
    this.status = status;
    this.error = error;
  }
};
var MOCK_DEFULAT_CONFIG = {
  delay: 300,
  force: false,
  log: true
};
var DELON_MOCK_CONFIG = new InjectionToken("alain-mock-config");
function provideMockConfig(config) {
  return makeEnvironmentProviders([{
    provide: DELON_MOCK_CONFIG,
    useValue: config
  }]);
}
var MockService = class _MockService {
  cogSrv = inject(AlainConfigService);
  options = inject(DELON_MOCK_CONFIG, {
    optional: true
  });
  cached = [];
  config;
  constructor() {
    this.config = this.cogSrv.merge("mock", MOCK_DEFULAT_CONFIG);
    this.setData(this.options?.data);
  }
  /**
   * Reset request data
   *
   * 重新设置请求数据
   */
  setData(data) {
    this.applyMock(data);
  }
  // #region parse rule
  applyMock(data) {
    this.cached = [];
    try {
      this.realApplyMock(data);
    } catch (e) {
      this.outputError(e);
    }
  }
  realApplyMock(data) {
    if (!data) return;
    Object.keys(data).forEach((key) => {
      const rules = data[key];
      if (!rules) return;
      Object.keys(rules).forEach((ruleKey) => {
        const value = rules[ruleKey];
        if (!(typeof value === "function" || typeof value === "object" || typeof value === "string")) {
          throw Error(`mock value of [${key}-${ruleKey}] should be function or object or string, but got ${typeof value}`);
        }
        const rule = this.genRule(ruleKey, value);
        if (["GET", "POST", "PUT", "HEAD", "DELETE", "PATCH", "OPTIONS"].indexOf(rule.method) === -1) {
          throw Error(`method of ${key}-${ruleKey} is not valid`);
        }
        const item = this.cached.find((w) => w.url === rule.url && w.method === rule.method);
        if (item) {
          item.callback = rule.callback;
        } else {
          this.cached.push(rule);
        }
      });
    });
    this.cached.sort((a, b) => (b.martcher || "").toString().length - (a.martcher || "").toString().length);
  }
  genRule(key, callback) {
    let method = "GET";
    let url = key;
    if (key.indexOf(" ") > -1) {
      const splited = key.split(" ");
      method = splited[0].toLowerCase();
      url = splited[1];
    }
    let martcher = null;
    let segments = [];
    if (~url.indexOf(":")) {
      segments = url.split("/").filter((segment) => segment.startsWith(":")).map((v) => v.substring(1));
      const reStr = url.split("/").map((segment) => segment.startsWith(":") ? `([^/]+)` : segment).join("/");
      martcher = new RegExp(`^${reStr}`, "i");
    } else if (/(\([^)]+\))/i.test(url)) {
      martcher = new RegExp(url, "i");
    }
    return {
      url,
      martcher,
      segments,
      callback,
      method: method.toUpperCase()
    };
  }
  outputError(error) {
    const filePath = error.message.split(": ")[0];
    const errors = error.stack.split("\n").filter((line) => line.trim().indexOf("at ") !== 0).map((line) => line.replace(`${filePath}: `, ""));
    errors.splice(1, 0, "");
    console.group();
    console.warn(`==========Failed to parse mock config.==========`);
    console.log(errors.join("\n"));
    console.groupEnd();
    throw error;
  }
  // #endregion
  getRule(method, url) {
    method = (method || "GET").toUpperCase();
    const params = {};
    const list = this.cached.filter((w) => w.method === method && (w.martcher ? w.martcher.test(url) : w.url === url));
    if (list.length === 0) return null;
    const ret = list.find((w) => w.url === url) || list[0];
    if (ret.martcher) {
      const execArr = ret.martcher.exec(url);
      execArr.slice(1).map((value, index) => {
        params[ret.segments[index]] = value;
      });
    }
    return {
      url,
      method: ret.method,
      params,
      callback: ret.callback
    };
  }
  clearCache() {
    this.cached = [];
  }
  get rules() {
    return this.cached;
  }
  ngOnDestroy() {
    this.clearCache();
  }
  static ɵfac = function MockService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MockService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _MockService,
    factory: _MockService.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MockService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var mockInterceptor = (req, next) => {
  const src = inject(MockService);
  const config = src.config;
  const rule = src.getRule(req.method, req.url.split("?")[0]);
  if (!rule && !config.force) {
    return next(req);
  }
  let res$;
  switch (typeof rule.callback) {
    case "function": {
      const mockRequest = {
        original: req,
        body: req.body,
        queryString: {},
        headers: {},
        params: rule.params
      };
      const urlParams = req.url.split("?");
      if (urlParams.length > 1) {
        urlParams[1].split("&").forEach((item) => {
          const itemArr = item.split("=");
          const key = itemArr[0];
          const value = itemArr[1];
          if (Object.keys(mockRequest.queryString).includes(key)) {
            if (!Array.isArray(mockRequest.queryString[key])) {
              mockRequest.queryString[key] = [mockRequest.queryString[key]];
            }
            mockRequest.queryString[key].push(value);
          } else {
            mockRequest.queryString[key] = value;
          }
        });
      }
      req.params.keys().forEach((key) => mockRequest.queryString[key] = req.params.get(key));
      req.headers.keys().forEach((key) => mockRequest.headers[key] = req.headers.get(key));
      try {
        const fnRes = rule.callback.call(void 0, mockRequest);
        res$ = isObservable(fnRes) ? fnRes : from(Promise.resolve(fnRes));
      } catch (e) {
        res$ = of(new HttpErrorResponse({
          url: req.url,
          headers: req.headers,
          status: e instanceof MockStatusError ? e.status : 400,
          statusText: e.statusText || "Unknown Error",
          error: e.error
        }));
      }
      break;
    }
    default:
      res$ = of(rule.callback);
      break;
  }
  res$ = res$.pipe(map((res) => {
    return res instanceof HttpResponseBase ? res : new HttpResponse({
      status: 200,
      url: req.url,
      body: deepCopy(res)
    });
  }), map((res) => {
    const anyRes = res;
    if (anyRes.body) {
      anyRes.body = deepCopy(anyRes.body);
    }
    if (config.log) {
      console.log(`%c👽${req.method}->${req.urlWithParams}->request`, "background:#000;color:#bada55", req);
      console.log(`%c👽${req.method}->${req.urlWithParams}->response`, "background:#000;color:#bada55", res);
    }
    return res;
  }), switchMap((res) => res instanceof HttpErrorResponse ? throwError(() => res) : of(res)));
  return res$.pipe(delay(config.delay));
};
function delay2(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function r(min = 1, max = 100) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export {
  DELON_MOCK_CONFIG,
  MockService,
  MockStatusError,
  delay2 as delay,
  mockInterceptor,
  provideMockConfig,
  r
};
//# sourceMappingURL=@delon_mock.js.map
