import {
  NzIconDirective,
  NzIconModule
} from "./chunk-GP3H6RZA.js";
import "./chunk-OAOHUKFD.js";
import "./chunk-BQ76GOFF.js";
import "./chunk-LSG4V6ID.js";
import "./chunk-J25EALHE.js";
import "./chunk-BVIJPY5U.js";
import "./chunk-ZO4CS3CJ.js";
import "./chunk-I75K2H66.js";
import "./chunk-CQHDL44S.js";
import "./chunk-NDRILP3E.js";
import "./chunk-NFHVISCS.js";
import "./chunk-GIT7CFOZ.js";
import {
  CommonModule
} from "./chunk-GUTSRBNM.js";
import "./chunk-FTJJFYDV.js";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  ViewEncapsulation,
  booleanAttribute,
  setClassMetadata,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinterpolate1,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty
} from "./chunk-NQBXVTYU.js";
import {
  ɵɵdefineInjector
} from "./chunk-QZDSTGXI.js";
import "./chunk-KMLKBNXJ.js";
import "./chunk-Q4VD2BBX.js";
import "./chunk-EBAU53KC.js";
import "./chunk-7CE4I3X6.js";

// node_modules/@delon/chart/fesm2022/trend.mjs
var _c0 = ["*"];
function TrendComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵelement(1, "nz-icon", 1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ɵɵinterpolate1("trend__", ctx_r0.flag));
    ɵɵadvance();
    ɵɵproperty("nzType", ɵɵinterpolate1("caret-", ctx_r0.flag));
  }
}
var TrendComponent = class _TrendComponent {
  /** 上升下降标识 */
  flag;
  /** 是否彩色标记 */
  colorful = true;
  /** 颜色反转 */
  reverseColor = false;
  static ɵfac = function TrendComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TrendComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _TrendComponent,
    selectors: [["trend"]],
    hostVars: 7,
    hostBindings: function TrendComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("data-flag", ctx.flag);
        ɵɵclassProp("trend", true)("trend__grey", !ctx.colorful)("trend__reverse", ctx.colorful && ctx.reverseColor);
      }
    },
    inputs: {
      flag: "flag",
      colorful: [2, "colorful", "colorful", booleanAttribute],
      reverseColor: [2, "reverseColor", "reverseColor", booleanAttribute]
    },
    exportAs: ["trend"],
    ngContentSelectors: _c0,
    decls: 2,
    vars: 1,
    consts: [[3, "class"], [3, "nzType"]],
    template: function TrendComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
        ɵɵconditionalCreate(1, TrendComponent_Conditional_1_Template, 2, 5, "span", 0);
      }
      if (rf & 2) {
        ɵɵadvance();
        ɵɵconditional(ctx.flag ? 1 : -1);
      }
    },
    dependencies: [NzIconDirective],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TrendComponent, [{
    type: Component,
    args: [{
      selector: "trend",
      exportAs: "trend",
      template: `
    <ng-content />
    @if (flag) {
      <span class="trend__{{ flag }}"><nz-icon nzType="caret-{{ flag }}" /></span>
    }
  `,
      host: {
        "[class.trend]": "true",
        "[class.trend__grey]": "!colorful",
        "[class.trend__reverse]": "colorful && reverseColor",
        "[attr.data-flag]": `flag`
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [NzIconDirective]
    }]
  }], null, {
    flag: [{
      type: Input
    }],
    colorful: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    reverseColor: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var COMPONENTS = [TrendComponent];
var TrendModule = class _TrendModule {
  static ɵfac = function TrendModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TrendModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _TrendModule,
    imports: [CommonModule, NzIconModule, TrendComponent],
    exports: [TrendComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, NzIconModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TrendModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, NzIconModule, ...COMPONENTS],
      exports: COMPONENTS
    }]
  }], null, null);
})();
export {
  TrendComponent,
  TrendModule
};
//# sourceMappingURL=@delon_chart_trend.js.map
