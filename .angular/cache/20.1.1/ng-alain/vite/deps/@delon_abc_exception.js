import {
  isEmpty
} from "./chunk-KZXCIQZH.js";
import {
  DelonLocaleModule,
  DelonLocaleService
} from "./chunk-WLPEXMS5.js";
import "./chunk-V4XBV55A.js";
import "./chunk-ZTNECFVY.js";
import "./chunk-VCVGLQF3.js";
import "./chunk-HGGVII4K.js";
import "./chunk-C2DAT26Y.js";
import {
  NzButtonComponent,
  NzButtonModule
} from "./chunk-MKB5HFAJ.js";
import "./chunk-KEGEU5UL.js";
import "./chunk-FBEQODFK.js";
import "./chunk-HXEEJHXJ.js";
import "./chunk-QYDDKLT3.js";
import "./chunk-LE4RSIF3.js";
import "./chunk-SQJ77OAJ.js";
import "./chunk-QZQ7SHKY.js";
import "./chunk-BHH4M3PU.js";
import {
  CdkObserveContent,
  ObserversModule
} from "./chunk-2BDLX2FQ.js";
import "./chunk-C6MTXAAB.js";
import "./chunk-U5VATZ4Q.js";
import "./chunk-EGGX2FJX.js";
import "./chunk-76DJI4FU.js";
import "./chunk-MIQKVNBS.js";
import "./chunk-RH5RXJTD.js";
import "./chunk-Y5G3O3B7.js";
import {
  AlainConfigService
} from "./chunk-ES4WNO3Q.js";
import "./chunk-XMKNXNVX.js";
import "./chunk-GP3H6RZA.js";
import "./chunk-OAOHUKFD.js";
import "./chunk-BQ76GOFF.js";
import "./chunk-LSG4V6ID.js";
import "./chunk-KG76OIXO.js";
import "./chunk-J25EALHE.js";
import "./chunk-FZ3LGF3I.js";
import "./chunk-LTANXE67.js";
import {
  RouterLink,
  RouterModule
} from "./chunk-36PX2JTV.js";
import {
  DomSanitizer
} from "./chunk-BVIJPY5U.js";
import "./chunk-ZO4CS3CJ.js";
import "./chunk-I75K2H66.js";
import "./chunk-CQHDL44S.js";
import "./chunk-NDRILP3E.js";
import "./chunk-2WJ2IEY4.js";
import "./chunk-4NJAG2UW.js";
import "./chunk-IH6YTMYU.js";
import "./chunk-D4QSWQD6.js";
import "./chunk-NFHVISCS.js";
import {
  Directionality
} from "./chunk-TBGMZLZ3.js";
import "./chunk-GIT7CFOZ.js";
import {
  CommonModule
} from "./chunk-GUTSRBNM.js";
import "./chunk-FTJJFYDV.js";
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  ViewEncapsulation,
  afterNextRender,
  input,
  setClassMetadata,
  viewChild,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵsanitizeHtml,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵviewQuerySignal
} from "./chunk-NQBXVTYU.js";
import {
  computed,
  effect,
  inject,
  signal,
  ɵɵdefineInjector,
  ɵɵresetView,
  ɵɵrestoreView
} from "./chunk-QZDSTGXI.js";
import "./chunk-KMLKBNXJ.js";
import "./chunk-Q4VD2BBX.js";
import "./chunk-EBAU53KC.js";
import "./chunk-7CE4I3X6.js";

// node_modules/@delon/abc/fesm2022/exception.mjs
var _c0 = ["conTpl"];
var _c1 = ["*"];
function ExceptionComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "h1", 4);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("innerHTML", ctx_r1._title(), ɵɵsanitizeHtml);
  }
}
function ExceptionComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "button", 8);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("routerLink", ctx_r1.backRouterLink())("nzType", "primary");
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r1.locale().backToHome, " ");
  }
}
var ExceptionComponent = class _ExceptionComponent {
  dom = inject(DomSanitizer);
  cogSrv = inject(AlainConfigService);
  conTpl = viewChild.required("conTpl");
  locale = inject(DelonLocaleService).valueSignal("exception");
  dir = inject(Directionality).valueSignal;
  hasCon = signal(false, ...ngDevMode ? [{
    debugName: "hasCon"
  }] : []);
  typeDict;
  typeItem = signal(null, ...ngDevMode ? [{
    debugName: "typeItem"
  }] : []);
  type = input(404, ...ngDevMode ? [{
    debugName: "type"
  }] : []);
  img = input(...ngDevMode ? [void 0, {
    debugName: "img"
  }] : []);
  title = input(...ngDevMode ? [void 0, {
    debugName: "title"
  }] : []);
  desc = input(...ngDevMode ? [void 0, {
    debugName: "desc"
  }] : []);
  backRouterLink = input("/", ...ngDevMode ? [{
    debugName: "backRouterLink"
  }] : []);
  _img = computed(() => {
    const v = this.typeItem()?.img ?? this.img();
    return v == null ? null : this.dom.bypassSecurityTrustStyle(`url('${v}')`);
  }, ...ngDevMode ? [{
    debugName: "_img"
  }] : []);
  _title = computed(() => {
    const v = this.typeItem()?.title ?? this.title();
    return v == null ? null : this.dom.bypassSecurityTrustHtml(v);
  }, ...ngDevMode ? [{
    debugName: "_title"
  }] : []);
  _desc = computed(() => {
    const v = this.typeItem()?.desc ?? this.desc() ?? this.locale()[this.type()];
    return v == null ? null : this.dom.bypassSecurityTrustHtml(v);
  }, ...ngDevMode ? [{
    debugName: "_desc"
  }] : []);
  constructor() {
    this.cogSrv.attach(this, "exception", {
      typeDict: {
        403: {
          img: "https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg",
          title: "403"
        },
        404: {
          img: "https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg",
          title: "404"
        },
        500: {
          img: "https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg",
          title: "500"
        }
      }
    });
    effect(() => {
      const type = this.type();
      this.typeItem.set(this.typeDict?.[type]);
    });
    afterNextRender(() => {
      this.checkContent();
    });
  }
  checkContent() {
    this.hasCon.set(!isEmpty(this.conTpl().nativeElement));
  }
  static ɵfac = function ExceptionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ExceptionComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _ExceptionComponent,
    selectors: [["exception"]],
    viewQuery: function ExceptionComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuerySignal(ctx.conTpl, _c0, 5);
      }
      if (rf & 2) {
        ɵɵqueryAdvance();
      }
    },
    hostVars: 4,
    hostBindings: function ExceptionComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("exception", true)("exception-rtl", ctx.dir() === "rtl");
      }
    },
    inputs: {
      type: [1, "type"],
      img: [1, "img"],
      title: [1, "title"],
      desc: [1, "desc"],
      backRouterLink: [1, "backRouterLink"]
    },
    exportAs: ["exception"],
    ngContentSelectors: _c1,
    decls: 10,
    vars: 5,
    consts: [["conTpl", ""], [1, "exception__img-block"], [1, "exception__img"], [1, "exception__cont"], [1, "exception__cont-title", 3, "innerHTML"], [1, "exception__cont-desc", 3, "innerHTML"], [1, "exception__cont-actions"], [3, "cdkObserveContent"], ["nz-button", "", 3, "routerLink", "nzType"]],
    template: function ExceptionComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = ɵɵgetCurrentView();
        ɵɵprojectionDef();
        ɵɵelementStart(0, "div", 1);
        ɵɵelement(1, "div", 2);
        ɵɵelementEnd();
        ɵɵelementStart(2, "div", 3);
        ɵɵconditionalCreate(3, ExceptionComponent_Conditional_3_Template, 1, 1, "h1", 4);
        ɵɵelement(4, "div", 5);
        ɵɵelementStart(5, "div", 6)(6, "div", 7, 0);
        ɵɵlistener("cdkObserveContent", function ExceptionComponent_Template_div_cdkObserveContent_6_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.checkContent());
        });
        ɵɵprojection(8);
        ɵɵelementEnd();
        ɵɵconditionalCreate(9, ExceptionComponent_Conditional_9_Template, 2, 3, "button", 8);
        ɵɵelementEnd()();
      }
      if (rf & 2) {
        ɵɵadvance();
        ɵɵstyleProp("background-image", ctx._img());
        ɵɵadvance(2);
        ɵɵconditional(ctx._title() ? 3 : -1);
        ɵɵadvance();
        ɵɵproperty("innerHTML", ctx._desc(), ɵɵsanitizeHtml);
        ɵɵadvance(5);
        ɵɵconditional(!ctx.hasCon() ? 9 : -1);
      }
    },
    dependencies: [CdkObserveContent, NzButtonComponent, RouterLink],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExceptionComponent, [{
    type: Component,
    args: [{
      selector: "exception",
      exportAs: "exception",
      template: `
    <div class="exception__img-block">
      <div class="exception__img" [style.backgroundImage]="_img()"></div>
    </div>
    <div class="exception__cont">
      @if (_title()) {
        <h1 class="exception__cont-title" [innerHTML]="_title()"></h1>
      }
      <div class="exception__cont-desc" [innerHTML]="_desc()"></div>
      <div class="exception__cont-actions">
        <div (cdkObserveContent)="checkContent()" #conTpl>
          <ng-content />
        </div>
        @if (!hasCon()) {
          <button nz-button [routerLink]="backRouterLink()" [nzType]="'primary'">
            {{ locale().backToHome }}
          </button>
        }
      </div>
    </div>
  `,
      host: {
        "[class.exception]": "true",
        "[class.exception-rtl]": `dir() === 'rtl'`
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [CdkObserveContent, NzButtonComponent, RouterLink]
    }]
  }], () => [], null);
})();
var COMPONENTS = [ExceptionComponent];
var ExceptionModule = class _ExceptionModule {
  static ɵfac = function ExceptionModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ExceptionModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _ExceptionModule,
    imports: [CommonModule, ObserversModule, RouterModule, DelonLocaleModule, NzButtonModule, ExceptionComponent],
    exports: [ExceptionComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, ObserversModule, RouterModule, DelonLocaleModule, NzButtonModule, COMPONENTS]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExceptionModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, ObserversModule, RouterModule, DelonLocaleModule, NzButtonModule, ...COMPONENTS],
      exports: COMPONENTS
    }]
  }], null, null);
})();
export {
  ExceptionComponent,
  ExceptionModule
};
//# sourceMappingURL=@delon_abc_exception.js.map
