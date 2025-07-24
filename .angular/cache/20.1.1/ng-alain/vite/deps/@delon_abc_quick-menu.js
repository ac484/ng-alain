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
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  Output,
  Renderer2,
  ViewEncapsulation,
  booleanAttribute,
  numberAttribute,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵclassProp,
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
  ɵɵstyleMap,
  ɵɵtemplate
} from "./chunk-NQBXVTYU.js";
import {
  inject,
  ɵɵdefineInjector
} from "./chunk-QZDSTGXI.js";
import "./chunk-KMLKBNXJ.js";
import "./chunk-Q4VD2BBX.js";
import "./chunk-EBAU53KC.js";
import "./chunk-7CE4I3X6.js";

// node_modules/@delon/abc/fesm2022/quick-menu.mjs
var _c0 = ["*"];
function QuickMenuComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "nz-icon", 4);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("nzType", ctx_r0.icon);
  }
}
var QuickMenuComponent = class _QuickMenuComponent {
  cdr = inject(ChangeDetectorRef);
  el = inject(ElementRef).nativeElement;
  render = inject(Renderer2);
  ctrlStyle = {};
  icon = "question-circle";
  top = 120;
  width = 200;
  bgColor;
  borderColor;
  expand = false;
  expandChange = new EventEmitter();
  show = false;
  initFlag = false;
  _click() {
    this.show = !this.show;
    this.expandChange.emit(this.show);
    this.setStyle();
  }
  setStyle() {
    this.ctrlStyle = {
      "background-color": this.bgColor,
      "border-color": this.borderColor
    };
    const res = [`top:${this.top}px`, `width:${this.width}px`, `margin-right:-${this.show ? 0 : this.width}px`];
    if (this.bgColor) {
      res.push(`background-color:${this.bgColor}`);
    }
    if (this.borderColor) {
      res.push(`border-color:${this.borderColor}`);
    }
    this.render.setAttribute(this.el, "style", res.join(";"));
    this.cdr.detectChanges();
  }
  ngOnInit() {
    this.initFlag = true;
    this.setStyle();
  }
  ngOnChanges() {
    this.show = this.expand;
    if (this.initFlag) {
      this.setStyle();
    }
  }
  static ɵfac = function QuickMenuComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _QuickMenuComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _QuickMenuComponent,
    selectors: [["quick-menu"]],
    hostVars: 2,
    hostBindings: function QuickMenuComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("click", function QuickMenuComponent_click_HostBindingHandler() {
          return ctx._click();
        });
      }
      if (rf & 2) {
        ɵɵclassProp("quick-menu", true);
      }
    },
    inputs: {
      icon: "icon",
      top: [2, "top", "top", numberAttribute],
      width: [2, "width", "width", numberAttribute],
      bgColor: "bgColor",
      borderColor: "borderColor",
      expand: [2, "expand", "expand", booleanAttribute]
    },
    outputs: {
      expandChange: "expandChange"
    },
    exportAs: ["quickMenu"],
    features: [ɵɵNgOnChangesFeature],
    ngContentSelectors: _c0,
    decls: 5,
    vars: 3,
    consts: [[1, "quick-menu__inner"], [1, "quick-menu__ctrl"], [1, "quick-menu__ctrl-icon"], [4, "nzStringTemplateOutlet"], [3, "nzType"]],
    template: function QuickMenuComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
        ɵɵtemplate(3, QuickMenuComponent_ng_container_3_Template, 2, 1, "ng-container", 3);
        ɵɵelementEnd()();
        ɵɵprojection(4);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵadvance();
        ɵɵstyleMap(ctx.ctrlStyle);
        ɵɵadvance(2);
        ɵɵproperty("nzStringTemplateOutlet", ctx.icon);
      }
    },
    dependencies: [NzIconDirective, NzStringTemplateOutletDirective],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuickMenuComponent, [{
    type: Component,
    args: [{
      selector: "quick-menu",
      exportAs: "quickMenu",
      host: {
        "[class.quick-menu]": "true",
        "(click)": "_click()"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [NzIconDirective, NzStringTemplateOutletDirective],
      template: '<div class="quick-menu__inner">\n  <div class="quick-menu__ctrl" [style]="ctrlStyle">\n    <div class="quick-menu__ctrl-icon">\n      <ng-container *nzStringTemplateOutlet="icon">\n        <nz-icon [nzType]="$any(icon)" />\n      </ng-container>\n    </div>\n  </div>\n  <ng-content />\n</div>\n'
    }]
  }], null, {
    icon: [{
      type: Input
    }],
    top: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    width: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    bgColor: [{
      type: Input
    }],
    borderColor: [{
      type: Input
    }],
    expand: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    expandChange: [{
      type: Output
    }]
  });
})();
var COMPONENTS = [QuickMenuComponent];
var QuickMenuModule = class _QuickMenuModule {
  static ɵfac = function QuickMenuModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _QuickMenuModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _QuickMenuModule,
    imports: [CommonModule, NzIconModule, NzOutletModule, QuickMenuComponent],
    exports: [QuickMenuComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, NzIconModule, NzOutletModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuickMenuModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, NzIconModule, NzOutletModule, ...COMPONENTS],
      exports: COMPONENTS
    }]
  }], null, null);
})();
export {
  QuickMenuComponent,
  QuickMenuModule
};
//# sourceMappingURL=@delon_abc_quick-menu.js.map
