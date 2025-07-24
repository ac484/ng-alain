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
import {
  NzIconDirective,
  NzIconModule
} from "./chunk-GP3H6RZA.js";
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
  EventEmitter,
  Input,
  NgModule,
  Output,
  ViewEncapsulation,
  booleanAttribute,
  setClassMetadata,
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
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-NQBXVTYU.js";
import {
  inject,
  ɵɵdefineInjector,
  ɵɵresetView,
  ɵɵrestoreView
} from "./chunk-QZDSTGXI.js";
import "./chunk-KMLKBNXJ.js";
import "./chunk-Q4VD2BBX.js";
import "./chunk-EBAU53KC.js";
import "./chunk-7CE4I3X6.js";

// node_modules/@delon/abc/fesm2022/tag-select.mjs
var _c0 = ["*"];
function TagSelectComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 1);
    ɵɵlistener("click", function TagSelectComponent_Conditional_1_Template_a_click_0_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.trigger());
    });
    ɵɵtext(1);
    ɵɵelement(2, "nz-icon", 2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r1.expand ? ctx_r1.locale().collapse : ctx_r1.locale().expand, " ");
    ɵɵadvance();
    ɵɵstyleProp("transform", ctx_r1.expand ? "rotate(-180deg)" : null);
  }
}
var TagSelectComponent = class _TagSelectComponent {
  locale = inject(DelonLocaleService).valueSignal("tagSelect");
  expand = false;
  dir = inject(Directionality).valueSignal;
  /** 是否启用 `展开与收进` */
  expandable = true;
  change = new EventEmitter();
  trigger() {
    this.expand = !this.expand;
    this.change.emit(this.expand);
  }
  static ɵfac = function TagSelectComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TagSelectComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _TagSelectComponent,
    selectors: [["tag-select"]],
    hostVars: 10,
    hostBindings: function TagSelectComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("tag-select", true)("tag-select-rtl", ctx.dir() === "rtl")("tag-select-rtl__has-expand", ctx.dir() === "rtl" && ctx.expandable)("tag-select__has-expand", ctx.expandable)("tag-select__expanded", ctx.expand);
      }
    },
    inputs: {
      expandable: [2, "expandable", "expandable", booleanAttribute]
    },
    outputs: {
      change: "change"
    },
    exportAs: ["tagSelect"],
    ngContentSelectors: _c0,
    decls: 2,
    vars: 1,
    consts: [[1, "ant-tag", "ant-tag-checkable", "tag-select__trigger"], [1, "ant-tag", "ant-tag-checkable", "tag-select__trigger", 3, "click"], ["nzType", "down"]],
    template: function TagSelectComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
        ɵɵconditionalCreate(1, TagSelectComponent_Conditional_1_Template, 3, 3, "a", 0);
      }
      if (rf & 2) {
        ɵɵadvance();
        ɵɵconditional(ctx.expandable ? 1 : -1);
      }
    },
    dependencies: [NzIconDirective],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TagSelectComponent, [{
    type: Component,
    args: [{
      selector: "tag-select",
      exportAs: "tagSelect",
      host: {
        "[class.tag-select]": "true",
        "[class.tag-select-rtl]": `dir() === 'rtl'`,
        "[class.tag-select-rtl__has-expand]": `dir() === 'rtl' && expandable`,
        "[class.tag-select__has-expand]": "expandable",
        "[class.tag-select__expanded]": "expand"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [NzIconDirective],
      template: `<ng-content />
@if (expandable) {
  <a class="ant-tag ant-tag-checkable tag-select__trigger" (click)="trigger()">
    {{ expand ? locale().collapse : locale().expand }}
    <nz-icon nzType="down" [style.transform]="expand ? 'rotate(-180deg)' : null" />
  </a>
}
`
    }]
  }], null, {
    expandable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    change: [{
      type: Output
    }]
  });
})();
var COMPONENTS = [TagSelectComponent];
var TagSelectModule = class _TagSelectModule {
  static ɵfac = function TagSelectModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TagSelectModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _TagSelectModule,
    imports: [CommonModule, NzIconModule, DelonLocaleModule, TagSelectComponent],
    exports: [TagSelectComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, NzIconModule, DelonLocaleModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TagSelectModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, NzIconModule, DelonLocaleModule, ...COMPONENTS],
      exports: COMPONENTS
    }]
  }], null, null);
})();
export {
  TagSelectComponent,
  TagSelectModule
};
//# sourceMappingURL=@delon_abc_tag-select.js.map
