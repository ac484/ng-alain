import {
  NzTooltipDirective,
  NzTooltipModule
} from "./chunk-4P4HHPBT.js";
import {
  DelonLocaleModule,
  DelonLocaleService
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
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  NgModule,
  ViewEncapsulation,
  numberAttribute,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction3,
  ɵɵstyleMap
} from "./chunk-NQBXVTYU.js";
import {
  inject,
  ɵɵdefineInjector
} from "./chunk-QZDSTGXI.js";
import "./chunk-KMLKBNXJ.js";
import "./chunk-Q4VD2BBX.js";
import "./chunk-EBAU53KC.js";
import "./chunk-7CE4I3X6.js";

// node_modules/@delon/chart/fesm2022/mini-progress.mjs
var _c0 = (a0) => ({
  left: a0
});
var _c1 = (a0) => ({
  "background-color": a0
});
var _c2 = (a0, a1, a2) => ({
  "background-color": a0,
  width: a1,
  height: a2
});
var G2MiniProgressComponent = class _G2MiniProgressComponent {
  locale = inject(DelonLocaleService).valueSignal("miniProgress");
  cdr = inject(ChangeDetectorRef);
  color = "#1890FF";
  target;
  percent;
  strokeWidth;
  fixNum(value) {
    return Math.min(Math.max(numberAttribute(value), 0), 100);
  }
  ngOnChanges() {
    this.target = this.fixNum(this.target);
    this.percent = this.fixNum(this.percent);
    this.cdr.detectChanges();
  }
  static ɵfac = function G2MiniProgressComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _G2MiniProgressComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _G2MiniProgressComponent,
    selectors: [["g2-mini-progress"]],
    hostVars: 2,
    hostBindings: function G2MiniProgressComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("g2-mini-progress", true);
      }
    },
    inputs: {
      color: "color",
      target: [2, "target", "target", numberAttribute],
      percent: [2, "percent", "percent", numberAttribute],
      strokeWidth: [2, "strokeWidth", "strokeWidth", numberAttribute]
    },
    exportAs: ["g2MiniProgress"],
    features: [ɵɵNgOnChangesFeature],
    decls: 5,
    vars: 19,
    consts: [["nz-tooltip", "", 1, "g2-mini-progress__target", 3, "nzTooltipTitle"], [1, "g2-mini-progress__target-item"], [1, "g2-mini-progress__wrap"], [1, "g2-mini-progress__value"]],
    template: function G2MiniProgressComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelement(1, "span", 1)(2, "span", 1);
        ɵɵelementEnd();
        ɵɵelementStart(3, "div", 2);
        ɵɵelement(4, "div", 3);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵstyleMap(ɵɵpureFunction1(9, _c0, ctx.target + "%"));
        ɵɵproperty("nzTooltipTitle", ctx.locale().targetSuffix + ctx.target + "%");
        ɵɵadvance();
        ɵɵstyleMap(ɵɵpureFunction1(11, _c1, ctx.color));
        ɵɵadvance();
        ɵɵstyleMap(ɵɵpureFunction1(13, _c1, ctx.color));
        ɵɵadvance(2);
        ɵɵstyleMap(ɵɵpureFunction3(15, _c2, ctx.color, ctx.percent + "%", ctx.strokeWidth + "px"));
      }
    },
    dependencies: [NzTooltipDirective],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(G2MiniProgressComponent, [{
    type: Component,
    args: [{
      selector: "g2-mini-progress",
      exportAs: "g2MiniProgress",
      template: `
    <div
      nz-tooltip
      [nzTooltipTitle]="locale().targetSuffix + target + '%'"
      class="g2-mini-progress__target"
      [style]="{ left: target + '%' }"
    >
      <span class="g2-mini-progress__target-item" [style]="{ 'background-color': color }"></span>
      <span class="g2-mini-progress__target-item" [style]="{ 'background-color': color }"></span>
    </div>
    <div class="g2-mini-progress__wrap">
      <div
        class="g2-mini-progress__value"
        [style]="{ 'background-color': color, width: percent + '%', height: strokeWidth + 'px' }"
      ></div>
    </div>
  `,
      host: {
        "[class.g2-mini-progress]": "true"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [NzTooltipDirective]
    }]
  }], null, {
    color: [{
      type: Input
    }],
    target: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    percent: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    strokeWidth: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }]
  });
})();
var COMPONENTS = [G2MiniProgressComponent];
var G2MiniProgressModule = class _G2MiniProgressModule {
  static ɵfac = function G2MiniProgressModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _G2MiniProgressModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _G2MiniProgressModule,
    imports: [CommonModule, DelonLocaleModule, NzTooltipModule, G2MiniProgressComponent],
    exports: [G2MiniProgressComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, DelonLocaleModule, NzTooltipModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(G2MiniProgressModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, DelonLocaleModule, NzTooltipModule, ...COMPONENTS],
      exports: COMPONENTS
    }]
  }], null, null);
})();
export {
  G2MiniProgressComponent,
  G2MiniProgressModule
};
//# sourceMappingURL=@delon_chart_mini-progress.js.map
