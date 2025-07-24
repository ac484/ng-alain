import {
  ZoneOutside
} from "./chunk-RPM77CK6.js";
import {
  AlainConfigService
} from "./chunk-ES4WNO3Q.js";
import {
  LazyService
} from "./chunk-XMKNXNVX.js";
import {
  HttpClient
} from "./chunk-NDRILP3E.js";
import {
  Directive,
  Injectable,
  Input,
  NgModule,
  NgZone,
  setClassMetadata,
  ɵɵdefineDirective,
  ɵɵdefineNgModule,
  ɵɵlistener
} from "./chunk-NQBXVTYU.js";
import {
  inject,
  ɵɵdefineInjectable,
  ɵɵdefineInjector
} from "./chunk-QZDSTGXI.js";
import {
  __decorate
} from "./chunk-EBAU53KC.js";
import {
  __async,
  __spreadValues
} from "./chunk-7CE4I3X6.js";

// node_modules/isutf8/dist/index.esm.js
function isUtf8(buf) {
  if (!buf) {
    return false;
  }
  var i = 0;
  var len = buf.length;
  while (i < len) {
    if (buf[i] <= 127) {
      i++;
      continue;
    }
    if (buf[i] >= 194 && buf[i] <= 223) {
      if (buf[i + 1] >> 6 === 2) {
        i += 2;
        continue;
      } else {
        return false;
      }
    }
    if ((buf[i] === 224 && buf[i + 1] >= 160 && buf[i + 1] <= 191 || buf[i] === 237 && buf[i + 1] >= 128 && buf[i + 1] <= 159) && buf[i + 2] >> 6 === 2) {
      i += 3;
      continue;
    }
    if ((buf[i] >= 225 && buf[i] <= 236 || buf[i] >= 238 && buf[i] <= 239) && buf[i + 1] >> 6 === 2 && buf[i + 2] >> 6 === 2) {
      i += 3;
      continue;
    }
    if ((buf[i] === 240 && buf[i + 1] >= 144 && buf[i + 1] <= 191 || buf[i] >= 241 && buf[i] <= 243 && buf[i + 1] >> 6 === 2 || buf[i] === 244 && buf[i + 1] >= 128 && buf[i + 1] <= 143) && buf[i + 2] >> 6 === 2 && buf[i + 3] >> 6 === 2) {
      i += 4;
      continue;
    }
    return false;
  }
  return true;
}

// node_modules/@delon/abc/fesm2022/xlsx.mjs
var XlsxService = class _XlsxService {
  http = inject(HttpClient);
  lazy = inject(LazyService);
  ngZone = inject(NgZone);
  cogSrv = inject(AlainConfigService);
  cog;
  constructor() {
    this.cog = this.cogSrv.merge("xlsx", {
      url: "https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js",
      modules: [`https://cdn.jsdelivr.net/npm/xlsx/dist/cpexcel.js`]
    });
  }
  init() {
    return typeof XLSX !== "undefined" ? Promise.resolve([]) : this.lazy.load([this.cog.url].concat(this.cog.modules));
  }
  read(data) {
    const {
      read,
      utils: {
        sheet_to_json
      }
    } = XLSX;
    const ret = {};
    const buf = new Uint8Array(data);
    let type = "array";
    if (!isUtf8(buf)) {
      try {
        data = cptable.utils.decode(936, buf);
        type = "string";
      } catch {
      }
    }
    const wb = read(data, {
      type
    });
    wb.SheetNames.forEach((name) => {
      const sheet = wb.Sheets[name];
      ret[name] = sheet_to_json(sheet, {
        header: 1
      });
    });
    return ret;
  }
  /**
   * 导入Excel并输出JSON，支持 `<input type="file">`、URL 形式
   */
  import(fileOrUrl) {
    return new Promise((resolve, reject) => {
      const r = (data) => this.ngZone.run(() => resolve(this.read(data)));
      this.init().then(() => {
        if (typeof fileOrUrl === "string") {
          this.http.request("GET", fileOrUrl, {
            responseType: "arraybuffer"
          }).subscribe({
            next: (res) => r(new Uint8Array(res)),
            error: (err) => reject(err)
          });
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => r(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsArrayBuffer(fileOrUrl);
      }).catch(() => reject(`Unable to load xlsx.js`));
    });
  }
  export(options) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        this.init().then(() => {
          options = __spreadValues({
            format: "xlsx"
          }, options);
          const {
            writeFile,
            utils: {
              book_new,
              aoa_to_sheet,
              book_append_sheet
            }
          } = XLSX;
          const wb = book_new();
          if (Array.isArray(options.sheets)) {
            options.sheets.forEach((value, index) => {
              const ws = aoa_to_sheet(value.data);
              book_append_sheet(wb, ws, value.name || `Sheet${index + 1}`);
            });
          } else {
            wb.SheetNames = Object.keys(options.sheets);
            wb.Sheets = options.sheets;
          }
          if (options.callback) options.callback(wb);
          const filename = options.filename || `export.${options.format}`;
          writeFile(wb, filename, __spreadValues({
            bookType: options.format,
            bookSST: false,
            type: "array"
          }, options.opts));
          resolve({
            filename,
            wb
          });
        }).catch((err) => reject(err));
      });
    });
  }
  /**
   * 数据转符号名
   * - `1` => `A`
   * - `27` => `AA`
   * - `703` => `AAA`
   */
  numberToSchema(val) {
    const startCode = "A".charCodeAt(0);
    let res = "";
    do {
      --val;
      res = String.fromCharCode(startCode + val % 26) + res;
      val = val / 26 >> 0;
    } while (val > 0);
    return res;
  }
  static ɵfac = function XlsxService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _XlsxService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _XlsxService,
    factory: _XlsxService.ɵfac,
    providedIn: "root"
  });
};
__decorate([ZoneOutside()], XlsxService.prototype, "read", null);
__decorate([ZoneOutside()], XlsxService.prototype, "export", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(XlsxService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], {
    read: [],
    export: []
  });
})();
var XlsxDirective = class _XlsxDirective {
  srv = inject(XlsxService);
  data;
  _click() {
    this.srv.export(this.data);
  }
  static ɵfac = function XlsxDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _XlsxDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _XlsxDirective,
    selectors: [["", "xlsx", ""]],
    hostBindings: function XlsxDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("click", function XlsxDirective_click_HostBindingHandler() {
          return ctx._click();
        });
      }
    },
    inputs: {
      data: [0, "xlsx", "data"]
    },
    exportAs: ["xlsx"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(XlsxDirective, [{
    type: Directive,
    args: [{
      selector: "[xlsx]",
      exportAs: "xlsx",
      host: {
        "(click)": "_click()"
      }
    }]
  }], null, {
    data: [{
      type: Input,
      args: ["xlsx"]
    }]
  });
})();
var COMPONENTS = [XlsxDirective];
var XlsxModule = class _XlsxModule {
  static ɵfac = function XlsxModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _XlsxModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _XlsxModule,
    imports: [XlsxDirective],
    exports: [XlsxDirective]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(XlsxModule, [{
    type: NgModule,
    args: [{
      imports: [COMPONENTS],
      exports: COMPONENTS
    }]
  }], null, null);
})();

export {
  XlsxService,
  XlsxDirective,
  XlsxModule
};
//# sourceMappingURL=chunk-EMJ3WTDH.js.map
