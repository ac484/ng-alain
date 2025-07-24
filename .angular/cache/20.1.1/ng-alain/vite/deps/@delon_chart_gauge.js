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
  Input,
  NgModule,
  ViewEncapsulation,
  numberAttribute,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵgetInheritedFactory
} from "./chunk-NQBXVTYU.js";
import {
  ɵɵdefineInjector
} from "./chunk-QZDSTGXI.js";
import "./chunk-KMLKBNXJ.js";
import "./chunk-Q4VD2BBX.js";
import "./chunk-EBAU53KC.js";
import "./chunk-7CE4I3X6.js";

// node_modules/@delon/chart/fesm2022/gauge.mjs
function G2GaugeComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "nz-skeleton");
  }
}
var G2GaugeComponent = class _G2GaugeComponent extends G2BaseComponent {
  // #region fields
  title;
  height;
  color = "#2f9cff";
  bgColor;
  // = '#f0f2f5';
  format;
  percent;
  padding = [10, 10, 30, 10];
  // #endregion
  install() {
    this.winG2.registerShape("point", "pointer", {
      draw(cfg, container) {
        const group = container.addGroup({});
        const center = this.parsePoint({
          x: 0,
          y: 0
        });
        group.addShape("line", {
          attrs: {
            x1: center.x,
            y1: center.y,
            x2: cfg.x,
            y2: cfg.y,
            stroke: cfg.color,
            lineWidth: 2.5,
            lineCap: "round"
          }
        });
        group.addShape("circle", {
          attrs: {
            x: center.x,
            y: center.y,
            r: 5.75,
            stroke: cfg.color,
            lineWidth: 2,
            fill: "#fff"
          }
        });
        return group;
      }
    });
    const {
      el,
      height,
      padding,
      format,
      theme
    } = this;
    const chart = this._chart = new this.winG2.Chart({
      container: el.nativeElement,
      autoFit: true,
      height,
      padding,
      theme
    });
    chart.legend(false);
    chart.animate(false);
    chart.tooltip(false);
    chart.coordinate("polar", {
      startAngle: -9 / 8 * Math.PI,
      endAngle: 1 / 8 * Math.PI,
      radius: 0.75
    });
    chart.scale("value", {
      min: 0,
      max: 100,
      nice: true,
      tickCount: 6
    });
    chart.axis("1", false);
    chart.axis("value", {
      line: null,
      label: {
        offset: -14,
        formatter: format
      },
      tickLine: null,
      grid: null
    });
    chart.point().position("value*1").shape("pointer");
    this.ready.next(chart);
    this.changeData();
    chart.render();
  }
  changeData() {
    const {
      _chart,
      percent,
      color,
      bgColor,
      title
    } = this;
    if (!_chart) return;
    const data = [{
      name: title,
      value: percent
    }];
    const val = data[0].value;
    _chart.annotation().clear(true);
    _chart.geometries[0].color(color);
    _chart.annotation().arc({
      top: false,
      start: [0, 0.95],
      end: [100, 0.95],
      style: {
        stroke: bgColor,
        lineWidth: 12,
        lineDash: null
      }
    });
    _chart.annotation().arc({
      start: [0, 0.95],
      end: [data[0].value, 0.95],
      style: {
        stroke: color,
        lineWidth: 12,
        lineDash: null
      }
    });
    _chart.annotation().text({
      position: ["50%", "85%"],
      content: title,
      style: {
        fontSize: 12,
        fill: this.theme === "dark" ? "rgba(255, 255, 255, 0.43)" : "rgba(0, 0, 0, 0.43)",
        textAlign: "center"
      }
    });
    _chart.annotation().text({
      position: ["50%", "90%"],
      content: `${val} %`,
      style: {
        fontSize: 20,
        fill: this.theme === "dark" ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.85)",
        textAlign: "center"
      },
      offsetY: 15
    });
    _chart.changeData(data);
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵG2GaugeComponent_BaseFactory;
    return function G2GaugeComponent_Factory(__ngFactoryType__) {
      return (ɵG2GaugeComponent_BaseFactory || (ɵG2GaugeComponent_BaseFactory = ɵɵgetInheritedFactory(_G2GaugeComponent)))(__ngFactoryType__ || _G2GaugeComponent);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _G2GaugeComponent,
    selectors: [["g2-gauge"]],
    hostVars: 2,
    hostBindings: function G2GaugeComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("g2-gauge", true);
      }
    },
    inputs: {
      title: "title",
      height: [2, "height", "height", numberAttribute],
      color: "color",
      bgColor: "bgColor",
      format: "format",
      percent: [2, "percent", "percent", numberAttribute],
      padding: "padding"
    },
    exportAs: ["g2Gauge"],
    features: [ɵɵInheritDefinitionFeature],
    decls: 1,
    vars: 1,
    template: function G2GaugeComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵconditionalCreate(0, G2GaugeComponent_Conditional_0_Template, 1, 0, "nz-skeleton");
      }
      if (rf & 2) {
        ɵɵconditional(!ctx.loaded ? 0 : -1);
      }
    },
    dependencies: [NzSkeletonComponent],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(G2GaugeComponent, [{
    type: Component,
    args: [{
      selector: "g2-gauge",
      exportAs: "g2Gauge",
      template: `@if (!loaded) {
    <nz-skeleton />
  }`,
      host: {
        "[class.g2-gauge]": "true"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [NzSkeletonComponent]
    }]
  }], null, {
    title: [{
      type: Input
    }],
    height: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    color: [{
      type: Input
    }],
    bgColor: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    percent: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    padding: [{
      type: Input
    }]
  });
})();
var COMPONENTS = [G2GaugeComponent];
var G2GaugeModule = class _G2GaugeModule {
  static ɵfac = function G2GaugeModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _G2GaugeModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _G2GaugeModule,
    imports: [CommonModule, NzSkeletonModule, G2GaugeComponent],
    exports: [G2GaugeComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, NzSkeletonModule, COMPONENTS]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(G2GaugeModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, NzSkeletonModule, ...COMPONENTS],
      exports: COMPONENTS
    }]
  }], null, null);
})();
export {
  G2GaugeComponent,
  G2GaugeModule
};
//# sourceMappingURL=@delon_chart_gauge.js.map
