import {
  G2BaseComponent
} from "./chunk-ECXQSI3C.js";
import "./chunk-RPM77CK6.js";
import {
  NzSkeletonComponent,
  NzSkeletonModule
} from "./chunk-NUIZUDC6.js";
import "./chunk-ES4WNO3Q.js";
import "./chunk-XMKNXNVX.js";
import {
  NzOutletModule,
  NzStringTemplateOutletDirective
} from "./chunk-KG76OIXO.js";
import "./chunk-J25EALHE.js";
import "./chunk-CQHDL44S.js";
import "./chunk-NFHVISCS.js";
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
  numberAttribute,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetInheritedFactory,
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
import {
  fromEvent
} from "./chunk-KMLKBNXJ.js";
import "./chunk-Q4VD2BBX.js";
import {
  debounceTime,
  filter,
  takeUntil
} from "./chunk-EBAU53KC.js";
import "./chunk-7CE4I3X6.js";

// node_modules/@delon/chart/fesm2022/bar.mjs
function G2BarComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "h4", 2);
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r0.title);
  }
}
function G2BarComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "nz-skeleton");
  }
}
var TITLE_HEIGHT = 41;
var G2BarComponent = class _G2BarComponent extends G2BaseComponent {
  // #region fields
  title;
  color = "rgba(24, 144, 255, 0.85)";
  height = 0;
  padding = "auto";
  data = [];
  autoLabel = true;
  interaction = "none";
  clickItem = new EventEmitter();
  // #endregion
  getHeight() {
    return this.title ? this.height - TITLE_HEIGHT : this.height;
  }
  install() {
    const {
      node,
      padding,
      interaction,
      theme
    } = this;
    const container = node.nativeElement;
    const chart = this._chart = new this.winG2.Chart({
      container,
      autoFit: true,
      height: this.getHeight(),
      padding,
      theme
    });
    this.updatelabel();
    chart.axis("y", {
      title: null,
      line: null,
      tickLine: null
    });
    chart.scale({
      x: {
        type: "cat"
      },
      y: {
        min: 0
      }
    });
    chart.tooltip({
      showTitle: false
    });
    if (interaction !== "none") {
      chart.interaction(interaction);
    }
    chart.legend(false);
    chart.interval().position("x*y").color("x*y", (x, y) => {
      const colorItem = this.data.find((w) => w.x === x && w.y === y);
      return colorItem && colorItem.color ? colorItem.color : this.color;
    }).tooltip("x*y", (x, y) => ({
      name: x,
      value: y
    }));
    chart.on(`interval:click`, (ev) => {
      this.ngZone.run(() => this.clickItem.emit({
        item: ev.data?.data,
        ev
      }));
    });
    this.ready.next(chart);
    this.changeData();
    chart.render();
    this.installResizeEvent();
  }
  changeData() {
    const {
      _chart,
      data
    } = this;
    if (!_chart || !Array.isArray(data) || data.length <= 0) return;
    _chart.changeData(data);
  }
  updatelabel() {
    const {
      node,
      data,
      _chart
    } = this;
    const canvasWidth = node.nativeElement.clientWidth;
    const minWidth = data.length * 30;
    _chart.axis("x", canvasWidth > minWidth).render();
  }
  installResizeEvent() {
    if (!this.autoLabel || this.resize$) return;
    this.resize$ = fromEvent(window, "resize").pipe(takeUntil(this.destroy$), filter(() => !!this._chart), debounceTime(200)).subscribe(() => this.ngZone.runOutsideAngular(() => this.updatelabel()));
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵG2BarComponent_BaseFactory;
    return function G2BarComponent_Factory(__ngFactoryType__) {
      return (ɵG2BarComponent_BaseFactory || (ɵG2BarComponent_BaseFactory = ɵɵgetInheritedFactory(_G2BarComponent)))(__ngFactoryType__ || _G2BarComponent);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _G2BarComponent,
    selectors: [["g2-bar"]],
    hostVars: 2,
    hostBindings: function G2BarComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵstyleProp("height", ctx.height, "px");
      }
    },
    inputs: {
      title: "title",
      color: "color",
      height: [2, "height", "height", numberAttribute],
      padding: "padding",
      data: "data",
      autoLabel: [2, "autoLabel", "autoLabel", booleanAttribute],
      interaction: "interaction"
    },
    outputs: {
      clickItem: "clickItem"
    },
    exportAs: ["g2Bar"],
    features: [ɵɵInheritDefinitionFeature],
    decls: 4,
    vars: 2,
    consts: [["container", ""], [4, "nzStringTemplateOutlet"], [2, "margin-bottom", "20px"]],
    template: function G2BarComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵtemplate(0, G2BarComponent_ng_container_0_Template, 3, 1, "ng-container", 1);
        ɵɵconditionalCreate(1, G2BarComponent_Conditional_1_Template, 1, 0, "nz-skeleton");
        ɵɵelement(2, "div", null, 0);
      }
      if (rf & 2) {
        ɵɵproperty("nzStringTemplateOutlet", ctx.title);
        ɵɵadvance();
        ɵɵconditional(!ctx.loaded ? 1 : -1);
      }
    },
    dependencies: [NzStringTemplateOutletDirective, NzSkeletonComponent],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(G2BarComponent, [{
    type: Component,
    args: [{
      selector: "g2-bar",
      exportAs: "g2Bar",
      template: `
    <ng-container *nzStringTemplateOutlet="title">
      <h4 style="margin-bottom: 20px;">{{ title }}</h4>
    </ng-container>
    @if (!loaded) {
      <nz-skeleton />
    }
    <div #container></div>
  `,
      host: {
        "[style.height.px]": "height"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [NzStringTemplateOutletDirective, NzSkeletonComponent]
    }]
  }], null, {
    title: [{
      type: Input
    }],
    color: [{
      type: Input
    }],
    height: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    padding: [{
      type: Input
    }],
    data: [{
      type: Input
    }],
    autoLabel: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    interaction: [{
      type: Input
    }],
    clickItem: [{
      type: Output
    }]
  });
})();
var COMPONENTS = [G2BarComponent];
var G2BarModule = class _G2BarModule {
  static ɵfac = function G2BarModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _G2BarModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _G2BarModule,
    imports: [CommonModule, NzOutletModule, NzSkeletonModule, G2BarComponent],
    exports: [G2BarComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, NzOutletModule, NzSkeletonModule, COMPONENTS]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(G2BarModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, NzOutletModule, NzSkeletonModule, ...COMPONENTS],
      exports: COMPONENTS
    }]
  }], null, null);
})();
export {
  G2BarComponent,
  G2BarModule
};
//# sourceMappingURL=@delon_chart_bar.js.map
