import {
  AlainConfigService
} from "./chunk-ES4WNO3Q.js";
import "./chunk-XMKNXNVX.js";
import {
  NzIconDirective,
  NzIconModule
} from "./chunk-GP3H6RZA.js";
import "./chunk-OAOHUKFD.js";
import "./chunk-BQ76GOFF.js";
import "./chunk-LSG4V6ID.js";
import {
  NzOutletModule,
  NzStringTemplateOutletDirective
} from "./chunk-KG76OIXO.js";
import "./chunk-J25EALHE.js";
import "./chunk-BVIJPY5U.js";
import "./chunk-ZO4CS3CJ.js";
import {
  takeUntilDestroyed
} from "./chunk-I75K2H66.js";
import "./chunk-CQHDL44S.js";
import "./chunk-NDRILP3E.js";
import "./chunk-NFHVISCS.js";
import {
  Directionality
} from "./chunk-TBGMZLZ3.js";
import {
  Platform
} from "./chunk-GIT7CFOZ.js";
import {
  CommonModule
} from "./chunk-GUTSRBNM.js";
import "./chunk-FTJJFYDV.js";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgModule,
  ViewEncapsulation,
  afterNextRender,
  booleanAttribute,
  input,
  numberAttribute,
  setClassMetadata,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-NQBXVTYU.js";
import {
  DOCUMENT,
  DestroyRef,
  inject,
  signal,
  ɵɵdefineInjector
} from "./chunk-QZDSTGXI.js";
import "./chunk-KMLKBNXJ.js";
import "./chunk-Q4VD2BBX.js";
import {
  interval
} from "./chunk-EBAU53KC.js";
import "./chunk-7CE4I3X6.js";

// node_modules/@delon/abc/fesm2022/error-collect.mjs
var ErrorCollectComponent = class _ErrorCollectComponent {
  el = inject(ElementRef).nativeElement;
  doc = inject(DOCUMENT);
  platform = inject(Platform);
  destroy$ = inject(DestroyRef);
  cogSrv = inject(AlainConfigService);
  formEl = null;
  _hiden = signal(true, ...ngDevMode ? [{
    debugName: "_hiden"
  }] : []);
  count = signal(0, ...ngDevMode ? [{
    debugName: "count"
  }] : []);
  dir = inject(Directionality).valueSignal;
  freq = input(0, ...ngDevMode ? [{
    debugName: "freq",
    transform: numberAttribute
  }] : [{
    transform: numberAttribute
  }]);
  offsetTop = input(0, ...ngDevMode ? [{
    debugName: "offsetTop",
    transform: numberAttribute
  }] : [{
    transform: numberAttribute
  }]);
  constructor() {
    this.cogSrv.attach(this, "errorCollect", {
      freq: 250,
      offsetTop: 65 + 64 + 8 * 2
    });
  }
  get errEls() {
    return this.formEl.querySelectorAll(".ant-form-item-has-error");
  }
  update() {
    const count = this.errEls.length;
    if (count === this.count()) return;
    this.count.set(count);
    this._hiden.set(count === 0);
  }
  _click() {
    if (this.count() === 0) return false;
    const els = this.errEls;
    const formItemEl = this.findParent(els[0], "[nz-form-control]") || els[0];
    formItemEl.scrollIntoView(true);
    this.doc.documentElement.scrollTop -= this.offsetTop();
    return true;
  }
  findParent(el, selector) {
    let retEl = null;
    while (el) {
      if (el.querySelector(selector)) {
        retEl = el;
        break;
      }
      el = el.parentElement;
    }
    return retEl;
  }
  ngOnInit() {
    if (!this.platform.isBrowser) return;
    this.formEl = this.findParent(this.el, "form");
    if (this.formEl === null) throw new Error("No found form element");
    interval(this.freq()).pipe(takeUntilDestroyed(this.destroy$)).subscribe(() => this.update());
    this.update();
  }
  static ɵfac = function ErrorCollectComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ErrorCollectComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _ErrorCollectComponent,
    selectors: [["error-collect"], ["", "error-collect", ""]],
    hostVars: 6,
    hostBindings: function ErrorCollectComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("click", function ErrorCollectComponent_click_HostBindingHandler() {
          return ctx._click();
        });
      }
      if (rf & 2) {
        ɵɵclassProp("error-collect", true)("error-collect-rtl", ctx.dir() === "rtl")("d-none", ctx._hiden());
      }
    },
    inputs: {
      freq: [1, "freq"],
      offsetTop: [1, "offsetTop"]
    },
    exportAs: ["errorCollect"],
    decls: 3,
    vars: 1,
    consts: [["nzType", "exclamation-circle"], [1, "error-collect__count"]],
    template: function ErrorCollectComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelement(0, "nz-icon", 0);
        ɵɵelementStart(1, "span", 1);
        ɵɵtext(2);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵadvance(2);
        ɵɵtextInterpolate(ctx.count());
      }
    },
    dependencies: [NzIconDirective],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ErrorCollectComponent, [{
    type: Component,
    args: [{
      selector: "error-collect, [error-collect]",
      exportAs: "errorCollect",
      template: `
    <nz-icon nzType="exclamation-circle" />
    <span class="error-collect__count">{{ count() }}</span>
  `,
      host: {
        "[class.error-collect]": "true",
        "[class.error-collect-rtl]": `dir() === 'rtl'`,
        "[class.d-none]": "_hiden()",
        "(click)": "_click()"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [NzIconDirective]
    }]
  }], () => [], null);
})();
var COMPONENTS = [ErrorCollectComponent];
var ErrorCollectModule = class _ErrorCollectModule {
  static ɵfac = function ErrorCollectModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ErrorCollectModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _ErrorCollectModule,
    imports: [CommonModule, NzIconModule, ErrorCollectComponent],
    exports: [ErrorCollectComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, NzIconModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ErrorCollectModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, NzIconModule, ...COMPONENTS],
      exports: COMPONENTS
    }]
  }], null, null);
})();

// node_modules/@delon/abc/fesm2022/footer-toolbar.mjs
var _c0 = ["*"];
function FooterToolbarComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.extra());
  }
}
function FooterToolbarComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "error-collect");
  }
}
var CLSBODY = "footer-toolbar__body";
var FooterToolbarComponent = class _FooterToolbarComponent {
  bodyCls = inject(DOCUMENT).querySelector("body")?.classList;
  errorCollect = input(false, ...ngDevMode ? [{
    debugName: "errorCollect",
    transform: booleanAttribute
  }] : [{
    transform: booleanAttribute
  }]);
  extra = input(...ngDevMode ? [void 0, {
    debugName: "extra"
  }] : []);
  constructor() {
    afterNextRender(() => this.bodyCls?.add(CLSBODY));
  }
  ngOnDestroy() {
    this.bodyCls?.remove(CLSBODY);
  }
  static ɵfac = function FooterToolbarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FooterToolbarComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _FooterToolbarComponent,
    selectors: [["footer-toolbar"]],
    hostAttrs: [1, "footer-toolbar"],
    inputs: {
      errorCollect: [1, "errorCollect"],
      extra: [1, "extra"]
    },
    exportAs: ["footerToolbar"],
    ngContentSelectors: _c0,
    decls: 5,
    vars: 2,
    consts: [[1, "footer-toolbar__left"], [4, "nzStringTemplateOutlet"], [1, "footer-toolbar__right"]],
    template: function FooterToolbarComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, "div", 0);
        ɵɵtemplate(1, FooterToolbarComponent_ng_container_1_Template, 2, 1, "ng-container", 1);
        ɵɵelementEnd();
        ɵɵelementStart(2, "div", 2);
        ɵɵconditionalCreate(3, FooterToolbarComponent_Conditional_3_Template, 1, 0, "error-collect");
        ɵɵprojection(4);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵadvance();
        ɵɵproperty("nzStringTemplateOutlet", ctx.extra());
        ɵɵadvance(2);
        ɵɵconditional(ctx.errorCollect() ? 3 : -1);
      }
    },
    dependencies: [NzStringTemplateOutletDirective, ErrorCollectComponent],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FooterToolbarComponent, [{
    type: Component,
    args: [{
      selector: "footer-toolbar",
      exportAs: "footerToolbar",
      template: `
    <div class="footer-toolbar__left">
      <ng-container *nzStringTemplateOutlet="extra()">{{ extra() }}</ng-container>
    </div>
    <div class="footer-toolbar__right">
      @if (errorCollect()) {
        <error-collect />
      }
      <ng-content />
    </div>
  `,
      host: {
        class: "footer-toolbar"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [NzStringTemplateOutletDirective, ErrorCollectComponent]
    }]
  }], () => [], null);
})();
var COMPONENTS2 = [FooterToolbarComponent];
var FooterToolbarModule = class _FooterToolbarModule {
  static ɵfac = function FooterToolbarModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FooterToolbarModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _FooterToolbarModule,
    imports: [CommonModule, ErrorCollectModule, NzOutletModule, FooterToolbarComponent],
    exports: [FooterToolbarComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, ErrorCollectModule, NzOutletModule, COMPONENTS2]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FooterToolbarModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, ErrorCollectModule, NzOutletModule, ...COMPONENTS2],
      exports: COMPONENTS2
    }]
  }], null, null);
})();
export {
  FooterToolbarComponent,
  FooterToolbarModule
};
//# sourceMappingURL=@delon_abc_footer-toolbar.js.map
