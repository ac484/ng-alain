import {
  NzCardComponent,
  NzCardModule
} from "./chunk-64NBNGV7.js";
import "./chunk-NUIZUDC6.js";
import {
  NzSpinComponent,
  NzSpinModule
} from "./chunk-2VFBAWEG.js";
import "./chunk-LSG4V6ID.js";
import {
  NzOutletModule,
  NzStringTemplateOutletDirective
} from "./chunk-KG76OIXO.js";
import "./chunk-J25EALHE.js";
import "./chunk-I75K2H66.js";
import "./chunk-NFHVISCS.js";
import "./chunk-TBGMZLZ3.js";
import {
  CommonModule
} from "./chunk-GUTSRBNM.js";
import "./chunk-FTJJFYDV.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  NgModule,
  ViewEncapsulation,
  booleanAttribute,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
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
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵsanitizeHtml,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-NQBXVTYU.js";
import {
  inject,
  ɵɵdefineInjector
} from "./chunk-QZDSTGXI.js";
import "./chunk-KMLKBNXJ.js";
import "./chunk-Q4VD2BBX.js";
import "./chunk-EBAU53KC.js";
import "./chunk-7CE4I3X6.js";

// node_modules/@delon/chart/fesm2022/card.mjs
var _c0 = ["*"];
var _c1 = () => ({
  padding: "20px 24px 8px 24px"
});
function G2CardComponent_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.avatar);
  }
}
function G2CardComponent_Conditional_7_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.title);
  }
}
function G2CardComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 7);
    ɵɵtemplate(1, G2CardComponent_Conditional_7_ng_container_1_Template, 2, 1, "ng-container", 4);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("nzStringTemplateOutlet", ctx_r0.title);
  }
}
function G2CardComponent_Conditional_8_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.action);
  }
}
function G2CardComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 8);
    ɵɵtemplate(1, G2CardComponent_Conditional_8_ng_container_1_Template, 2, 1, "ng-container", 4);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("nzStringTemplateOutlet", ctx_r0.action);
  }
}
function G2CardComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "p", 9);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("innerHTML", ctx_r0.total, ɵɵsanitizeHtml);
  }
}
function G2CardComponent_Conditional_13_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.footer);
  }
}
function G2CardComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 11);
    ɵɵtemplate(1, G2CardComponent_Conditional_13_ng_container_1_Template, 2, 1, "ng-container", 4);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("nzStringTemplateOutlet", ctx_r0.footer);
  }
}
var G2CardComponent = class _G2CardComponent {
  cdr = inject(ChangeDetectorRef);
  /** 是否显示边框 */
  bordered = false;
  avatar;
  title;
  action;
  total = "";
  _height = "auto";
  _orgHeight;
  set contentHeight(value) {
    this._orgHeight = value;
    this._height = typeof value === "number" ? this._height = `${value}px` : value;
  }
  footer;
  /** 是否显示Loading */
  loading = false;
  ngOnChanges() {
    this.cdr.detectChanges();
  }
  static ɵfac = function G2CardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _G2CardComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _G2CardComponent,
    selectors: [["g2-card"]],
    hostVars: 2,
    hostBindings: function G2CardComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("g2-card", true);
      }
    },
    inputs: {
      bordered: [2, "bordered", "bordered", booleanAttribute],
      avatar: "avatar",
      title: "title",
      action: "action",
      total: "total",
      contentHeight: "contentHeight",
      footer: "footer",
      loading: [2, "loading", "loading", booleanAttribute]
    },
    exportAs: ["g2Card"],
    features: [ɵɵNgOnChangesFeature],
    ngContentSelectors: _c0,
    decls: 14,
    vars: 13,
    consts: [[3, "nzBodyStyle", "nzBordered"], [3, "nzSpinning"], [1, "g2-card__top"], [1, "g2-card__avatar"], [4, "nzStringTemplateOutlet"], [1, "g2-card__meta-wrap"], [1, "g2-card__meta"], [1, "g2-card__meta-title"], [1, "g2-card__meta-action"], [1, "g2-card__total", 3, "innerHTML"], [1, "g2-card__desc"], [1, "g2-card__footer"]],
    template: function G2CardComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, "nz-card", 0)(1, "nz-spin", 1)(2, "div", 2)(3, "div", 3);
        ɵɵtemplate(4, G2CardComponent_ng_container_4_Template, 2, 1, "ng-container", 4);
        ɵɵelementEnd();
        ɵɵelementStart(5, "div", 5)(6, "div", 6);
        ɵɵconditionalCreate(7, G2CardComponent_Conditional_7_Template, 2, 1, "span", 7);
        ɵɵconditionalCreate(8, G2CardComponent_Conditional_8_Template, 2, 1, "span", 8);
        ɵɵelementEnd();
        ɵɵconditionalCreate(9, G2CardComponent_Conditional_9_Template, 1, 1, "p", 9);
        ɵɵelementEnd()();
        ɵɵelementStart(10, "div", 10)(11, "div");
        ɵɵprojection(12);
        ɵɵelementEnd()();
        ɵɵconditionalCreate(13, G2CardComponent_Conditional_13_Template, 2, 1, "div", 11);
        ɵɵelementEnd()();
      }
      if (rf & 2) {
        ɵɵproperty("nzBodyStyle", ɵɵpureFunction0(12, _c1))("nzBordered", ctx.bordered);
        ɵɵadvance();
        ɵɵproperty("nzSpinning", ctx.loading);
        ɵɵadvance(3);
        ɵɵproperty("nzStringTemplateOutlet", ctx.avatar);
        ɵɵadvance(3);
        ɵɵconditional(ctx.title ? 7 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.action ? 8 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.total ? 9 : -1);
        ɵɵadvance();
        ɵɵstyleProp("height", ctx._height);
        ɵɵadvance();
        ɵɵclassProp("g2-card__fixed", !!ctx._orgHeight);
        ɵɵadvance(2);
        ɵɵconditional(ctx.footer ? 13 : -1);
      }
    },
    dependencies: [NzCardComponent, NzSpinComponent, NzStringTemplateOutletDirective],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(G2CardComponent, [{
    type: Component,
    args: [{
      selector: "g2-card",
      exportAs: "g2Card",
      host: {
        "[class.g2-card]": "true"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [NzCardComponent, NzSpinComponent, NzStringTemplateOutletDirective],
      template: `<nz-card [nzBodyStyle]="{ padding: '20px 24px 8px 24px' }" [nzBordered]="bordered">
  <nz-spin [nzSpinning]="loading">
    <div class="g2-card__top">
      <div class="g2-card__avatar">
        <ng-container *nzStringTemplateOutlet="avatar">{{ avatar }}</ng-container>
      </div>
      <div class="g2-card__meta-wrap">
        <div class="g2-card__meta">
          @if (title) {
            <span class="g2-card__meta-title">
              <ng-container *nzStringTemplateOutlet="title">{{ title }}</ng-container>
            </span>
          }
          @if (action) {
            <span class="g2-card__meta-action">
              <ng-container *nzStringTemplateOutlet="action">{{ action }}</ng-container>
            </span>
          }
        </div>
        @if (total) {
          <p class="g2-card__total" [innerHTML]="total"></p>
        }
      </div>
    </div>
    <div class="g2-card__desc" [style.height]="_height">
      <div [class.g2-card__fixed]="!!_orgHeight">
        <ng-content />
      </div>
    </div>
    @if (footer) {
      <div class="g2-card__footer">
        <ng-container *nzStringTemplateOutlet="footer">{{ footer }}</ng-container>
      </div>
    }
  </nz-spin>
</nz-card>
`
    }]
  }], null, {
    bordered: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    avatar: [{
      type: Input
    }],
    title: [{
      type: Input
    }],
    action: [{
      type: Input
    }],
    total: [{
      type: Input
    }],
    contentHeight: [{
      type: Input
    }],
    footer: [{
      type: Input
    }],
    loading: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var COMPONENTS = [G2CardComponent];
var G2CardModule = class _G2CardModule {
  static ɵfac = function G2CardModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _G2CardModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _G2CardModule,
    imports: [CommonModule, NzCardModule, NzSpinModule, NzOutletModule, G2CardComponent],
    exports: [G2CardComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, NzCardModule, NzSpinModule, NzOutletModule, COMPONENTS]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(G2CardModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, NzCardModule, NzSpinModule, NzOutletModule, ...COMPONENTS],
      exports: COMPONENTS
    }]
  }], null, null);
})();
export {
  G2CardComponent,
  G2CardModule
};
//# sourceMappingURL=@delon_chart_card.js.map
