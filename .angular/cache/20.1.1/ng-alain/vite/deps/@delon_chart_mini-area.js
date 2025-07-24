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
  booleanAttribute,
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

// node_modules/@delon/chart/fesm2022/mini-area.mjs
var G2MiniAreaComponent = class _G2MiniAreaComponent extends G2BaseComponent {
  // #region fields
  color = "rgba(24, 144, 255, 0.2)";
  borderColor = "#1890FF";
  borderWidth = 2;
  height = 56;
  fit = true;
  line = false;
  animate = true;
  xAxis;
  yAxis;
  padding = [8, 8, 8, 8];
  data = [];
  yTooltipSuffix = "";
  tooltipType = "default";
  clickItem = new EventEmitter();
  // #endregion
  install() {
    const {
      el,
      fit,
      height,
      padding,
      xAxis,
      yAxis,
      yTooltipSuffix,
      tooltipType,
      line,
      theme,
      animate,
      color,
      borderColor,
      borderWidth
    } = this;
    const chart = this._chart = new this.winG2.Chart({
      container: el.nativeElement,
      autoFit: fit,
      height,
      padding,
      theme
    });
    chart.animate(animate);
    if (!xAxis && !yAxis) {
      chart.axis(false);
    }
    if (xAxis) {
      chart.axis("x", xAxis);
    } else {
      chart.axis("x", false);
    }
    if (yAxis) {
      chart.axis("y", yAxis);
    } else {
      chart.axis("y", false);
    }
    chart.legend(false);
    chart.tooltip(genMiniTooltipOptions(tooltipType));
    chart.area().position("x*y").color(color).tooltip("x*y", (x, y) => ({
      name: x,
      value: y + yTooltipSuffix
    })).shape("smooth");
    if (line) {
      chart.line().position("x*y").shape("smooth").color(borderColor).size(borderWidth).tooltip(false);
    }
    chart.on(`plot:click`, (ev) => {
      const records = this._chart.getSnapRecords({
        x: ev.x,
        y: ev.y
      });
      this.ngZone.run(() => this.clickItem.emit({
        item: records[0]._origin,
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
    let ɵG2MiniAreaComponent_BaseFactory;
    return function G2MiniAreaComponent_Factory(__ngFactoryType__) {
      return (ɵG2MiniAreaComponent_BaseFactory || (ɵG2MiniAreaComponent_BaseFactory = ɵɵgetInheritedFactory(_G2MiniAreaComponent)))(__ngFactoryType__ || _G2MiniAreaComponent);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _G2MiniAreaComponent,
    selectors: [["g2-mini-area"]],
    hostVars: 2,
    hostBindings: function G2MiniAreaComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵstyleProp("height", ctx.height, "px");
      }
    },
    inputs: {
      color: "color",
      borderColor: "borderColor",
      borderWidth: [2, "borderWidth", "borderWidth", numberAttribute],
      height: [2, "height", "height", numberAttribute],
      fit: [2, "fit", "fit", booleanAttribute],
      line: [2, "line", "line", booleanAttribute],
      animate: [2, "animate", "animate", booleanAttribute],
      xAxis: "xAxis",
      yAxis: "yAxis",
      padding: "padding",
      data: "data",
      yTooltipSuffix: "yTooltipSuffix",
      tooltipType: "tooltipType"
    },
    outputs: {
      clickItem: "clickItem"
    },
    exportAs: ["g2MiniArea"],
    features: [ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function G2MiniAreaComponent_Template(rf, ctx) {
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(G2MiniAreaComponent, [{
    type: Component,
    args: [{
      selector: "g2-mini-area",
      exportAs: "g2MiniArea",
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
    borderColor: [{
      type: Input
    }],
    borderWidth: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    height: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    fit: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    line: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    animate: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    xAxis: [{
      type: Input
    }],
    yAxis: [{
      type: Input
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
var COMPONENTS = [G2MiniAreaComponent];
var G2MiniAreaModule = class _G2MiniAreaModule {
  static ɵfac = function G2MiniAreaModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _G2MiniAreaModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _G2MiniAreaModule,
    imports: [CommonModule, G2MiniAreaComponent],
    exports: [G2MiniAreaComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(G2MiniAreaModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, ...COMPONENTS],
      exports: COMPONENTS
    }]
  }], null, null);
})();
export {
  G2MiniAreaComponent,
  G2MiniAreaModule
};
//# sourceMappingURL=@delon_chart_mini-area.js.map
