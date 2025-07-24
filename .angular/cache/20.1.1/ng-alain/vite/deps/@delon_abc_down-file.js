import {
  require_FileSaver_min
} from "./chunk-A7SUBRHT.js";
import {
  AlainThemeModule,
  _HttpClient
} from "./chunk-WLPEXMS5.js";
import "./chunk-V4XBV55A.js";
import "./chunk-ZTNECFVY.js";
import "./chunk-VCVGLQF3.js";
import "./chunk-HGGVII4K.js";
import "./chunk-C2DAT26Y.js";
import "./chunk-MKB5HFAJ.js";
import "./chunk-KEGEU5UL.js";
import "./chunk-FBEQODFK.js";
import "./chunk-HXEEJHXJ.js";
import "./chunk-QYDDKLT3.js";
import "./chunk-LE4RSIF3.js";
import "./chunk-SQJ77OAJ.js";
import "./chunk-QZQ7SHKY.js";
import "./chunk-BHH4M3PU.js";
import "./chunk-2BDLX2FQ.js";
import "./chunk-C6MTXAAB.js";
import "./chunk-U5VATZ4Q.js";
import "./chunk-EGGX2FJX.js";
import "./chunk-76DJI4FU.js";
import "./chunk-MIQKVNBS.js";
import "./chunk-RH5RXJTD.js";
import "./chunk-Y5G3O3B7.js";
import "./chunk-ES4WNO3Q.js";
import "./chunk-XMKNXNVX.js";
import "./chunk-GP3H6RZA.js";
import "./chunk-OAOHUKFD.js";
import "./chunk-BQ76GOFF.js";
import "./chunk-LSG4V6ID.js";
import "./chunk-KG76OIXO.js";
import "./chunk-J25EALHE.js";
import "./chunk-FZ3LGF3I.js";
import "./chunk-LTANXE67.js";
import "./chunk-36PX2JTV.js";
import "./chunk-BVIJPY5U.js";
import "./chunk-ZO4CS3CJ.js";
import "./chunk-I75K2H66.js";
import "./chunk-CQHDL44S.js";
import "./chunk-NDRILP3E.js";
import "./chunk-2WJ2IEY4.js";
import "./chunk-4NJAG2UW.js";
import "./chunk-IH6YTMYU.js";
import "./chunk-D4QSWQD6.js";
import "./chunk-NFHVISCS.js";
import "./chunk-TBGMZLZ3.js";
import "./chunk-GIT7CFOZ.js";
import {
  CommonModule
} from "./chunk-GUTSRBNM.js";
import "./chunk-FTJJFYDV.js";
import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  Output,
  setClassMetadata,
  ɵɵdefineDirective,
  ɵɵdefineNgModule,
  ɵɵlistener
} from "./chunk-NQBXVTYU.js";
import {
  inject,
  ɵɵdefineInjector
} from "./chunk-QZDSTGXI.js";
import "./chunk-KMLKBNXJ.js";
import "./chunk-Q4VD2BBX.js";
import {
  finalize
} from "./chunk-EBAU53KC.js";
import {
  __async,
  __toESM
} from "./chunk-7CE4I3X6.js";

// node_modules/@delon/abc/fesm2022/down-file.mjs
var import_file_saver = __toESM(require_FileSaver_min(), 1);
var DownFileDirective = class _DownFileDirective {
  el = inject(ElementRef).nativeElement;
  _http = inject(_HttpClient);
  httpData;
  httpBody;
  httpMethod = "get";
  httpUrl;
  fileName;
  pre;
  success = new EventEmitter();
  error = new EventEmitter();
  getDisposition(data) {
    const arr = (data || "").split(";").filter((i) => i.includes("=")).map((v) => {
      const strArr = v.split("=");
      const utfId = `UTF-8''`;
      let value = strArr[1];
      if (value.startsWith(utfId)) value = value.substring(utfId.length);
      return {
        [strArr[0].trim()]: value
      };
    });
    return arr.reduce((_o, item) => item, {});
  }
  isFileSaverSupported = false;
  constructor() {
    try {
      this.isFileSaverSupported = !!new Blob();
    } catch {
    }
    if (!this.isFileSaverSupported) {
      this.el.classList.add(`down-file__not-support`);
    }
  }
  setDisabled(status) {
    const el = this.el;
    el.disabled = status;
    el.classList[status ? "add" : "remove"](`down-file__disabled`);
  }
  _click(ev) {
    return __async(this, null, function* () {
      if (!this.isFileSaverSupported || typeof this.pre === "function" && !(yield this.pre(ev))) {
        ev.stopPropagation();
        ev.preventDefault();
        return;
      }
      this.setDisabled(true);
      this._http.request(this.httpMethod, this.httpUrl, {
        params: this.httpData || {},
        responseType: "blob",
        observe: "response",
        body: this.httpBody
      }).pipe(finalize(() => this.setDisabled(false))).subscribe({
        next: (res) => {
          if (res.status !== 200 || res.body.size <= 0) {
            this.error.emit(res);
            return;
          }
          const disposition = this.getDisposition(res.headers.get("content-disposition"));
          let fileName = this.fileName;
          if (typeof fileName === "function") fileName = fileName(res);
          fileName = fileName || disposition[`filename*`] || disposition[`filename`] || res.headers.get("filename") || res.headers.get("x-filename");
          (0, import_file_saver.saveAs)(res.body, decodeURI(fileName));
          this.success.emit(res);
        },
        error: (err) => this.error.emit(err)
      });
    });
  }
  static ɵfac = function DownFileDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DownFileDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _DownFileDirective,
    selectors: [["", "down-file", ""]],
    hostBindings: function DownFileDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("click", function DownFileDirective_click_HostBindingHandler($event) {
          return ctx._click($event);
        });
      }
    },
    inputs: {
      httpData: [0, "http-data", "httpData"],
      httpBody: [0, "http-body", "httpBody"],
      httpMethod: [0, "http-method", "httpMethod"],
      httpUrl: [0, "http-url", "httpUrl"],
      fileName: [0, "file-name", "fileName"],
      pre: "pre"
    },
    outputs: {
      success: "success",
      error: "error"
    },
    exportAs: ["downFile"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DownFileDirective, [{
    type: Directive,
    args: [{
      selector: "[down-file]",
      exportAs: "downFile",
      host: {
        "(click)": "_click($event)"
      }
    }]
  }], () => [], {
    httpData: [{
      type: Input,
      args: ["http-data"]
    }],
    httpBody: [{
      type: Input,
      args: ["http-body"]
    }],
    httpMethod: [{
      type: Input,
      args: ["http-method"]
    }],
    httpUrl: [{
      type: Input,
      args: [{
        alias: "http-url",
        required: true
      }]
    }],
    fileName: [{
      type: Input,
      args: ["file-name"]
    }],
    pre: [{
      type: Input
    }],
    success: [{
      type: Output
    }],
    error: [{
      type: Output
    }]
  });
})();
var DIRECTIVES = [DownFileDirective];
var DownFileModule = class _DownFileModule {
  static ɵfac = function DownFileModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DownFileModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _DownFileModule,
    imports: [CommonModule, AlainThemeModule, DownFileDirective],
    exports: [DownFileDirective]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, AlainThemeModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DownFileModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, AlainThemeModule, ...DIRECTIVES],
      exports: DIRECTIVES
    }]
  }], null, null);
})();
export {
  DownFileDirective,
  DownFileModule
};
//# sourceMappingURL=@delon_abc_down-file.js.map
