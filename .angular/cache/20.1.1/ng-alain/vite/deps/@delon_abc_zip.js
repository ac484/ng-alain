import {
  ZoneOutside
} from "./chunk-RPM77CK6.js";
import {
  require_FileSaver_min
} from "./chunk-A7SUBRHT.js";
import {
  AlainConfigService
} from "./chunk-ES4WNO3Q.js";
import {
  LazyService
} from "./chunk-XMKNXNVX.js";
import {
  HttpClient
} from "./chunk-NDRILP3E.js";
import "./chunk-GUTSRBNM.js";
import "./chunk-FTJJFYDV.js";
import {
  Injectable,
  NgZone,
  setClassMetadata
} from "./chunk-NQBXVTYU.js";
import {
  inject,
  ɵɵdefineInjectable
} from "./chunk-QZDSTGXI.js";
import "./chunk-KMLKBNXJ.js";
import "./chunk-Q4VD2BBX.js";
import {
  __decorate
} from "./chunk-EBAU53KC.js";
import {
  __spreadValues,
  __toESM
} from "./chunk-7CE4I3X6.js";

// node_modules/@delon/abc/fesm2022/zip.mjs
var import_file_saver = __toESM(require_FileSaver_min(), 1);
var ZipService = class _ZipService {
  http = inject(HttpClient);
  lazy = inject(LazyService);
  ngZone = inject(NgZone);
  cogSrv = inject(AlainConfigService);
  cog;
  constructor() {
    this.cog = this.cogSrv.merge("zip", {
      url: "https://cdn.jsdelivr.net/npm/jszip@3/dist/jszip.min.js",
      utils: []
    });
  }
  init() {
    return this.lazy.load([this.cog.url].concat(this.cog.utils));
  }
  check(zip) {
    if (!zip) throw new Error("get instance via `ZipService.create()`");
  }
  /** 解压 */
  read(fileOrUrl, options) {
    return new Promise((resolve, reject) => {
      const resolveCallback = (data) => {
        this.ngZone.run(() => resolve(data));
      };
      this.init().then(() => {
        if (typeof fileOrUrl === "string") {
          this.http.request("GET", fileOrUrl, {
            responseType: "arraybuffer"
          }).subscribe({
            next: (res) => {
              JSZip.loadAsync(res, options).then((ret) => resolveCallback(ret));
            },
            error: (err) => {
              reject(err);
            }
          });
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          JSZip.loadAsync(e.target.result, options).then((ret) => resolveCallback(ret));
        };
        reader.readAsBinaryString(fileOrUrl);
      });
    });
  }
  /** 创建 Zip 实例，用于创建压缩文件 */
  create() {
    return new Promise((resolve) => {
      this.init().then(() => {
        const zipFile = new JSZip();
        resolve(zipFile);
      }).catch(() => resolve(null));
    });
  }
  /**
   * 下载URL资源并写入 zip
   *
   * @param zip Zip 实例
   * @param path Zip 路径，例如： `text.txt`、`txt/hi.txt`
   * @param url URL 地址
   */
  pushUrl(zip, path, url) {
    this.check(zip);
    return new Promise((resolve, reject) => {
      this.http.request("GET", url, {
        responseType: "arraybuffer"
      }).subscribe({
        next: (res) => {
          zip.file(path, res);
          resolve();
        },
        error: (error) => {
          reject({
            url,
            error
          });
        }
      });
    });
  }
  /**
   * 保存Zip并执行打开保存对话框
   *
   * @param zip zip 对象，务必通过 `create()` 构建
   * @param options 额外参数，
   */
  save(zip, options) {
    this.check(zip);
    const opt = __spreadValues({
      filename: "download.zip"
    }, options);
    return new Promise((resolve, reject) => {
      zip.generateAsync(__spreadValues({
        type: "blob"
      }, opt.options), opt.update).then((data) => {
        if (opt.callback) opt.callback(data);
        (0, import_file_saver.saveAs)(data, opt.filename);
        resolve();
      }, (err) => {
        reject(err);
      });
    });
  }
  static ɵfac = function ZipService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ZipService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _ZipService,
    factory: _ZipService.ɵfac,
    providedIn: "root"
  });
};
__decorate([ZoneOutside()], ZipService.prototype, "read", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ZipService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], {
    read: []
  });
})();
export {
  ZipService
};
//# sourceMappingURL=@delon_abc_zip.js.map
