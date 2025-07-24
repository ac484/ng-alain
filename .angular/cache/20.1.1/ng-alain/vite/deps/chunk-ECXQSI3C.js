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
  Platform
} from "./chunk-GIT7CFOZ.js";
import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  NgZone,
  Output,
  ViewChild,
  booleanAttribute,
  numberAttribute,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵdefineDirective,
  ɵɵloadQuery,
  ɵɵqueryRefresh,
  ɵɵviewQuery
} from "./chunk-NQBXVTYU.js";
import {
  inject,
  ɵɵdefineInjectable
} from "./chunk-QZDSTGXI.js";
import {
  Subject,
  __decorate,
  filter,
  takeUntil
} from "./chunk-EBAU53KC.js";
import {
  __spreadValues
} from "./chunk-7CE4I3X6.js";

// node_modules/@delon/chart/fesm2022/core.mjs
var _c0 = ["container"];
var G2Service = class _G2Service {
  cogSrv = inject(AlainConfigService);
  lazySrv = inject(LazyService);
  _cog;
  loading = false;
  loaded = false;
  notify$ = new Subject();
  get cog() {
    return this._cog;
  }
  set cog(val) {
    this._cog = this.cogSrv.merge("chart", {
      theme: "",
      libs: ["https://gw.alipayobjects.com/os/lib/antv/g2/4.1.46/dist/g2.min.js", "https://gw.alipayobjects.com/os/lib/antv/data-set/0.11.8/dist/data-set.js"]
    }, val);
  }
  constructor() {
    this.cog = {
      theme: ""
    };
  }
  libLoad() {
    if (this.loading) {
      if (this.loaded) {
        this.notify$.next();
      }
      return this;
    }
    this.loading = true;
    this.lazySrv.load(this.cog.libs).then(() => {
      this.loaded = true;
      this.notify$.next();
    });
    return this;
  }
  get notify() {
    return this.notify$.asObservable();
  }
  ngOnDestroy() {
    this.notify$.unsubscribe();
  }
  static ɵfac = function G2Service_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _G2Service)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _G2Service,
    factory: _G2Service.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(G2Service, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var G2BaseComponent = class _G2BaseComponent {
  srv = inject(G2Service);
  el = inject(ElementRef);
  ngZone = inject(NgZone);
  platform = inject(Platform);
  cdr = inject(ChangeDetectorRef);
  get chart() {
    return this._chart;
  }
  get winG2() {
    return window.G2;
  }
  constructor() {
    this.theme = this.srv.cog.theme;
    this.srv.notify.pipe(takeUntil(this.destroy$), filter(() => !this.loaded)).subscribe(() => this.load());
  }
  repaint = true;
  node;
  resize$;
  destroy$ = new Subject();
  _chart;
  loaded = false;
  delay = 0;
  theme;
  ready = new EventEmitter();
  /** 检查是否只变更数据 */
  onlyChangeData;
  /** G2数据变更 */
  changeData() {
  }
  /** 等同 `ngOnInit` */
  onInit() {
  }
  /** 等同 `ngOnChanges` */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChanges(_) {
  }
  load() {
    this.ngZone.run(() => {
      this.loaded = true;
      this.cdr.detectChanges();
    });
    setTimeout(() => this.install(), this.delay);
  }
  ngOnInit() {
    if (!this.platform.isBrowser) {
      return;
    }
    this.onInit();
    if (this.winG2) {
      this.load();
    } else {
      this.srv.libLoad();
    }
  }
  ngOnChanges(changes) {
    this.onChanges(changes);
    const isOnlyChangeData = this.onlyChangeData ? this.onlyChangeData(changes) : Object.keys(changes).length === 1 && !!changes.data;
    if (isOnlyChangeData) {
      this.changeData();
      return;
    }
    if (!this.chart || !this.repaint) return;
    this.ngZone.runOutsideAngular(() => {
      this.destroyChart().install();
    });
  }
  destroyChart() {
    if (this._chart) {
      this._chart.destroy();
    }
    return this;
  }
  ngOnDestroy() {
    if (this.resize$) {
      this.resize$.unsubscribe();
    }
    this.destroy$.next();
    this.destroy$.complete();
    this.destroyChart();
  }
  static ɵfac = function G2BaseComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _G2BaseComponent)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _G2BaseComponent,
    viewQuery: function G2BaseComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c0, 7);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.node = _t.first);
      }
    },
    inputs: {
      repaint: [2, "repaint", "repaint", booleanAttribute],
      delay: [2, "delay", "delay", numberAttribute],
      theme: "theme"
    },
    outputs: {
      ready: "ready"
    },
    features: [ɵɵNgOnChangesFeature]
  });
};
__decorate([ZoneOutside()], G2BaseComponent.prototype, "load", null);
__decorate([ZoneOutside()], G2BaseComponent.prototype, "destroyChart", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(G2BaseComponent, [{
    type: Directive
  }], () => [], {
    repaint: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    node: [{
      type: ViewChild,
      args: ["container", {
        static: true
      }]
    }],
    delay: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    theme: [{
      type: Input
    }],
    ready: [{
      type: Output
    }],
    load: [],
    destroyChart: []
  });
})();
function genMiniTooltipOptions(type, options) {
  const res = __spreadValues({
    showTitle: false,
    showMarkers: true,
    enterable: true,
    domStyles: {
      "g2-tooltip": {
        padding: "0px"
      },
      "g2-tooltip-title": {
        display: "none"
      },
      "g2-tooltip-list-item": {
        margin: "4px"
      }
    }
  }, options);
  if (type === "mini") {
    res.position = "top";
    res.domStyles["g2-tooltip"] = {
      padding: "0px",
      backgroundColor: "transparent",
      boxShadow: "none"
    };
    res.itemTpl = `<li>{value}</li>`;
    res.offset = 8;
  }
  return res;
}

export {
  G2BaseComponent,
  genMiniTooltipOptions
};
//# sourceMappingURL=chunk-ECXQSI3C.js.map
