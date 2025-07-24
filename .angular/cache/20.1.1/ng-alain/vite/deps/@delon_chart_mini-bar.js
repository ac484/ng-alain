import {
  G2BaseComponent,
  genMiniTooltipOptions
} from "./chunk-ECXQSI3C.js";
import "./chunk-RPM77CK6.js";
import "./chunk-ES4WNO3Q.js";
import "./chunk-XMKNXNVX.js";
import "./chunk-CQHDL44S.js";
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
  numberAttribute,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵdefineComponent,
  ɵɵdefineNgModule,
  ɵɵgetInheritedFactory,
  ɵɵstyleProp
} from "./chunk-NQBXVTYU.js";
import {
  ɵɵdefineInjector
} from "./chunk-QZDSTGXI.js";
import "./chunk-KMLKBNXJ.js";
import "./chunk-Q4VD2BBX.js";
import "./chunk-EBAU53KC.js";
import "./chunk-7CE4I3X6.js";

// node_modules/@delon/chart/fesm2022/mini-bar.mjs
var G2MiniBarComponent = class _G2MiniBarComponent extends G2BaseComponent {
  // #region fields
  color = "#1890FF";
  height = 0;
  borderWidth = 5;
  padding = [8, 8, 8, 8];
  data = [];
  yTooltipSuffix = "";
  tooltipType = "default";
  clickItem = new EventEmitter();
  // #endregion
  install() {
    const {
      el,
      height,
      padding,
      yTooltipSuffix,
      tooltipType,
      theme,
      color,
      borderWidth
    } = this;
    const chart = this._chart = new this.winG2.Chart({
      container: el.nativeElement,
      autoFit: true,
      height,
      padding,
      theme
    });
    chart.scale({
      x: {
        type: "cat"
      },
      y: {
        min: 0
      }
    });
    chart.legend(false);
    chart.axis(false);
    chart.tooltip(genMiniTooltipOptions(tooltipType, {
      showCrosshairs: false
    }));
    chart.interval().position("x*y").color("x*y", (x, y) => {
      const colorItem = this.data.find((w) => w.x === x && w.y === y);
      return colorItem && colorItem.color ? colorItem.color : color;
    }).size(borderWidth).tooltip("x*y", (x, y) => ({
      name: x,
      value: y + yTooltipSuffix
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
  }
  changeData() {
    const {
      _chart,
      data
    } = this;
    if (!_chart || !Array.isArray(data) || data.length <= 0) return;
    _chart.changeData(data);
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵG2MiniBarComponent_BaseFactory;
    return function G2MiniBarComponent_Factory(__ngFactoryType__) {
      return (ɵG2MiniBarComponent_BaseFactory || (ɵG2MiniBarComponent_BaseFactory = ɵɵgetInheritedFactory(_G2MiniBarComponent)))(__ngFactoryType__ || _G2MiniBarComponent);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _G2MiniBarComponent,
    selectors: [["g2-mini-bar"]],
    hostVars: 2,
    hostBindings: function G2MiniBarComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵstyleProp("height", ctx.height, "px");
      }
    },
    inputs: {
      color: "color",
      height: [2, "height", "height", numberAttribute],
      borderWidth: [2, "borderWidth", "borderWidth", numberAttribute],
      padding: "padding",
      data: "data",
      yTooltipSuffix: "yTooltipSuffix",
      tooltipType: "tooltipType"
    },
    outputs: {
      clickItem: "clickItem"
    },
    exportAs: ["g2MiniBar"],
    features: [ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function G2MiniBarComponent_Template(rf, ctx) {
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(G2MiniBarComponent, [{
    type: Component,
    args: [{
      selector: "g2-mini-bar",
      exportAs: "g2MiniBar",
      template: ``,
      host: {
        "[style.height.px]": "height"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None
    }]
  }], null, {
    color: [{
      type: Input
    }],
    height: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    borderWidth: [{
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
    yTooltipSuffix: [{
      type: Input
    }],
    tooltipType: [{
      type: Input
    }],
    clickItem: [{
      type: Output
    }]
  });
})();
var COMPONENTS = [G2MiniBarComponent];
var G2MiniBarModule = class _G2MiniBarModule {
  static ɵfac = function G2MiniBarModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _G2MiniBarModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _G2MiniBarModule,
    imports: [CommonModule, G2MiniBarComponent],
    exports: [G2MiniBarComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(G2MiniBarModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, ...COMPONENTS],
      exports: COMPONENTS
    }]
  }], null, null);
})();
export {
  G2MiniBarComponent,
  G2MiniBarModule
};
//# sourceMappingURL=@delon_chart_mini-bar.js.map
