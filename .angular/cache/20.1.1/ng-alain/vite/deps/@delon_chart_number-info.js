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
  ɵɵinterpolate1,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-NQBXVTYU.js";
import {
  ɵɵdefineInjector
} from "./chunk-QZDSTGXI.js";
import "./chunk-KMLKBNXJ.js";
import "./chunk-Q4VD2BBX.js";
import "./chunk-EBAU53KC.js";
import "./chunk-7CE4I3X6.js";

// node_modules/@delon/chart/fesm2022/number-info.mjs
function NumberInfoComponent_Conditional_0_ng_container_1_Template(rf, ctx) {
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
function NumberInfoComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 0);
    ɵɵtemplate(1, NumberInfoComponent_Conditional_0_ng_container_1_Template, 2, 1, "ng-container", 4);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("nzStringTemplateOutlet", ctx_r0.title);
  }
}
function NumberInfoComponent_Conditional_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.subTitle);
  }
}
function NumberInfoComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 1);
    ɵɵtemplate(1, NumberInfoComponent_Conditional_1_ng_container_1_Template, 2, 1, "ng-container", 4);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("nzStringTemplateOutlet", ctx_r0.subTitle);
  }
}
function NumberInfoComponent_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.total);
  }
}
function NumberInfoComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "em", 5);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.suffix);
  }
}
function NumberInfoComponent_Conditional_6_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.subTotal);
  }
}
function NumberInfoComponent_Conditional_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "nz-icon", 7);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("nzType", ɵɵinterpolate1("caret-", ctx_r0.status));
  }
}
function NumberInfoComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 6);
    ɵɵtemplate(1, NumberInfoComponent_Conditional_6_ng_container_1_Template, 2, 1, "ng-container", 4);
    ɵɵconditionalCreate(2, NumberInfoComponent_Conditional_6_Conditional_2_Template, 1, 2, "nz-icon", 7);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("nzStringTemplateOutlet", ctx_r0.subTotal);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.status ? 2 : -1);
  }
}
var NumberInfoComponent = class _NumberInfoComponent {
  /** 标题 */
  title;
  /** 子标题 */
  subTitle;
  /** 总量 */
  total;
  /** 总量后缀 */
  subTotal;
  /** 子总量 */
  suffix;
  /** 增加状态 */
  status;
  /** 状态样式 */
  theme = "light";
  /** 设置数字和描述直接的间距（像素） */
  gap = 8;
  static ɵfac = function NumberInfoComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NumberInfoComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NumberInfoComponent,
    selectors: [["number-info"]],
    hostVars: 6,
    hostBindings: function NumberInfoComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("number-info", true)("number-info__light", ctx.theme === "light")("number-info__default", ctx.theme === "default");
      }
    },
    inputs: {
      title: "title",
      subTitle: "subTitle",
      total: "total",
      subTotal: "subTotal",
      suffix: "suffix",
      status: "status",
      theme: "theme",
      gap: [2, "gap", "gap", numberAttribute]
    },
    exportAs: ["numberInfo"],
    decls: 7,
    vars: 7,
    consts: [[1, "number-info__title"], [1, "number-info__title-sub"], [1, "number-info__value"], [1, "number-info__value-text"], [4, "nzStringTemplateOutlet"], [1, "number-info__value-suffix"], [1, "number-info__value-text", "number-info__value-sub"], [3, "nzType"]],
    template: function NumberInfoComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵconditionalCreate(0, NumberInfoComponent_Conditional_0_Template, 2, 1, "div", 0);
        ɵɵconditionalCreate(1, NumberInfoComponent_Conditional_1_Template, 2, 1, "div", 1);
        ɵɵelementStart(2, "div", 2)(3, "span", 3);
        ɵɵtemplate(4, NumberInfoComponent_ng_container_4_Template, 2, 1, "ng-container", 4);
        ɵɵconditionalCreate(5, NumberInfoComponent_Conditional_5_Template, 2, 1, "em", 5);
        ɵɵelementEnd();
        ɵɵconditionalCreate(6, NumberInfoComponent_Conditional_6_Template, 3, 2, "span", 6);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵconditional(ctx.title ? 0 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.subTitle ? 1 : -1);
        ɵɵadvance();
        ɵɵstyleProp("margin-top", ctx.gap, "px");
        ɵɵadvance(2);
        ɵɵproperty("nzStringTemplateOutlet", ctx.total);
        ɵɵadvance();
        ɵɵconditional(ctx.suffix ? 5 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.status || ctx.subTotal ? 6 : -1);
      }
    },
    dependencies: [NzStringTemplateOutletDirective, NzIconDirective],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NumberInfoComponent, [{
    type: Component,
    args: [{
      selector: "number-info",
      exportAs: "numberInfo",
      host: {
        "[class.number-info]": `true`,
        "[class.number-info__light]": `theme === 'light'`,
        "[class.number-info__default]": `theme === 'default'`
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [NzStringTemplateOutletDirective, NzIconDirective],
      template: '@if (title) {\n  <div class="number-info__title">\n    <ng-container *nzStringTemplateOutlet="title">{{ title }}</ng-container>\n  </div>\n}\n@if (subTitle) {\n  <div class="number-info__title-sub">\n    <ng-container *nzStringTemplateOutlet="subTitle">{{ subTitle }}</ng-container>\n  </div>\n}\n<div class="number-info__value" [style.margin-top.px]="gap">\n  <span class="number-info__value-text">\n    <ng-container *nzStringTemplateOutlet="total">{{ total }}</ng-container>\n    @if (suffix) {\n      <em class="number-info__value-suffix">{{ suffix }}</em>\n    }\n  </span>\n  @if (status || subTotal) {\n    <span class="number-info__value-text number-info__value-sub">\n      <ng-container *nzStringTemplateOutlet="subTotal">{{ subTotal }}</ng-container>\n      @if (status) {\n        <nz-icon nzType="caret-{{ status }}" />\n      }\n    </span>\n  }\n</div>\n'
    }]
  }], null, {
    title: [{
      type: Input
    }],
    subTitle: [{
      type: Input
    }],
    total: [{
      type: Input
    }],
    subTotal: [{
      type: Input
    }],
    suffix: [{
      type: Input
    }],
    status: [{
      type: Input
    }],
    theme: [{
      type: Input
    }],
    gap: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }]
  });
})();
var COMPONENTS = [NumberInfoComponent];
var NumberInfoModule = class _NumberInfoModule {
  static ɵfac = function NumberInfoModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NumberInfoModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _NumberInfoModule,
    imports: [CommonModule, NzIconModule, NzOutletModule, NumberInfoComponent],
    exports: [NumberInfoComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, NzIconModule, NzOutletModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NumberInfoModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, NzIconModule, NzOutletModule, ...COMPONENTS],
      exports: COMPONENTS
    }]
  }], null, null);
})();
export {
  NumberInfoComponent,
  NumberInfoModule
};
//# sourceMappingURL=@delon_chart_number-info.js.map
