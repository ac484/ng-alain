import {
  G2BaseComponent
} from "./chunk-ECXQSI3C.js";
import "./chunk-RPM77CK6.js";
import {
  NzSkeletonComponent,
  NzSkeletonModule
} from "./chunk-NUIZUDC6.js";
import {
  NzColDirective,
  NzGridModule,
  NzRowDirective
} from "./chunk-ME3G4VH6.js";
import "./chunk-XPEPFKNH.js";
import "./chunk-QYDDKLT3.js";
import "./chunk-LE4RSIF3.js";
import "./chunk-ES4WNO3Q.js";
import "./chunk-XMKNXNVX.js";
import {
  NzOutletModule,
  NzStringTemplateOutletDirective
} from "./chunk-KG76OIXO.js";
import "./chunk-J25EALHE.js";
import "./chunk-I75K2H66.js";
import "./chunk-CQHDL44S.js";
import "./chunk-NFHVISCS.js";
import "./chunk-TBGMZLZ3.js";
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
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-NQBXVTYU.js";
import {
  ɵɵdefineInjector,
  ɵɵresetView,
  ɵɵrestoreView
} from "./chunk-QZDSTGXI.js";
import "./chunk-KMLKBNXJ.js";
import "./chunk-Q4VD2BBX.js";
import "./chunk-EBAU53KC.js";
import "./chunk-7CE4I3X6.js";

// node_modules/@delon/chart/fesm2022/radar.mjs
var _c0 = (a0) => ({
  "background-color": a0
});
function G2RadarComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "nz-skeleton");
  }
}
function G2RadarComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "h4");
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
function G2RadarComponent_Conditional_4_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 4);
    ɵɵlistener("click", function G2RadarComponent_Conditional_4_For_2_Template_div_click_0_listener() {
      const $index_r3 = ɵɵrestoreView(_r2).$index;
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0._click($index_r3));
    });
    ɵɵelement(1, "i", 5);
    ɵɵtext(2);
    ɵɵelementStart(3, "h6", 6);
    ɵɵtext(4);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const i_r4 = ctx.$implicit;
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("nzSpan", 24 / ctx_r0.legendData.length);
    ɵɵadvance();
    ɵɵstyleMap(ɵɵpureFunction1(5, _c0, !i_r4.checked ? "#aaa" : i_r4.color));
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", i_r4.name, " ");
    ɵɵadvance(2);
    ɵɵtextInterpolate(i_r4.value);
  }
}
function G2RadarComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 2);
    ɵɵrepeaterCreate(1, G2RadarComponent_Conditional_4_For_2_Template, 5, 7, "div", 3, ɵɵrepeaterTrackByIndex);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵrepeater(ctx_r0.legendData);
  }
}
var G2RadarComponent = class _G2RadarComponent extends G2BaseComponent {
  legendData = [];
  // #region fields
  title;
  height = 0;
  padding = [44, 30, 16, 30];
  hasLegend = true;
  tickCount = 4;
  data = [];
  colors = ["#1890FF", "#FACC14", "#2FC25B", "#8543E0", "#F04864", "#13C2C2", "#fa8c16", "#a0d911"];
  clickItem = new EventEmitter();
  // #endregion
  getHeight() {
    return this.height - (this.hasLegend ? 80 : 22);
  }
  install() {
    const {
      node,
      padding,
      theme,
      tickCount
    } = this;
    const chart = this._chart = new this.winG2.Chart({
      container: node.nativeElement,
      autoFit: true,
      height: this.getHeight(),
      padding,
      theme
    });
    chart.coordinate("polar");
    chart.legend(false);
    chart.axis("label", {
      line: null,
      label: {
        offset: 8
      },
      grid: {
        line: {
          style: {
            stroke: "#e9e9e9",
            lineWidth: 1,
            lineDash: [0, 0]
          }
        }
      }
    });
    chart.axis("value", {
      grid: {
        line: {
          type: "polygon",
          style: {
            stroke: "#e9e9e9",
            lineWidth: 1,
            lineDash: [0, 0]
          }
        }
      }
    });
    chart.scale({
      value: {
        min: 0,
        tickCount
      }
    });
    chart.filter("name", (name) => {
      const legendItem = this.legendData.find((w) => w.name === name);
      return legendItem ? legendItem.checked !== false : true;
    });
    chart.line().position("label*value").color("name", this.colors);
    chart.point().position("label*value").shape("circle").size(3);
    chart.on(`point:click`, (ev) => {
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
    this.ngZone.run(() => this.genLegend());
  }
  genLegend() {
    const {
      hasLegend,
      cdr,
      _chart
    } = this;
    if (!hasLegend) return;
    this.legendData = _chart.geometries[0].dataArray.map((item) => {
      const origin = item[0]._origin;
      const result = {
        name: origin.name,
        color: item[0].color,
        checked: true,
        value: item.reduce((p, n) => p + n._origin.value, 0)
      };
      return result;
    });
    cdr.detectChanges();
  }
  _click(i) {
    const {
      legendData,
      _chart
    } = this;
    legendData[i].checked = !legendData[i].checked;
    _chart.render(true);
  }
  onChanges() {
    this.legendData.forEach((i) => i.checked = true);
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵG2RadarComponent_BaseFactory;
    return function G2RadarComponent_Factory(__ngFactoryType__) {
      return (ɵG2RadarComponent_BaseFactory || (ɵG2RadarComponent_BaseFactory = ɵɵgetInheritedFactory(_G2RadarComponent)))(__ngFactoryType__ || _G2RadarComponent);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _G2RadarComponent,
    selectors: [["g2-radar"]],
    hostVars: 4,
    hostBindings: function G2RadarComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵstyleProp("height", ctx.height, "px");
        ɵɵclassProp("g2-radar", true);
      }
    },
    inputs: {
      title: "title",
      height: [2, "height", "height", numberAttribute],
      padding: "padding",
      hasLegend: [2, "hasLegend", "hasLegend", booleanAttribute],
      tickCount: [2, "tickCount", "tickCount", numberAttribute],
      data: "data",
      colors: "colors"
    },
    outputs: {
      clickItem: "clickItem"
    },
    exportAs: ["g2Radar"],
    features: [ɵɵInheritDefinitionFeature],
    decls: 5,
    vars: 3,
    consts: [["container", ""], [4, "nzStringTemplateOutlet"], ["nz-row", "", 1, "g2-radar__legend"], ["nz-col", "", 1, "g2-radar__legend-item", 3, "nzSpan"], ["nz-col", "", 1, "g2-radar__legend-item", 3, "click", "nzSpan"], [1, "g2-radar__legend-dot"], [1, "g2-radar__legend-title"]],
    template: function G2RadarComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵconditionalCreate(0, G2RadarComponent_Conditional_0_Template, 1, 0, "nz-skeleton");
        ɵɵtemplate(1, G2RadarComponent_ng_container_1_Template, 3, 1, "ng-container", 1);
        ɵɵelement(2, "div", null, 0);
        ɵɵconditionalCreate(4, G2RadarComponent_Conditional_4_Template, 3, 0, "div", 2);
      }
      if (rf & 2) {
        ɵɵconditional(!ctx.loaded ? 0 : -1);
        ɵɵadvance();
        ɵɵproperty("nzStringTemplateOutlet", ctx.title);
        ɵɵadvance(3);
        ɵɵconditional(ctx.hasLegend ? 4 : -1);
      }
    },
    dependencies: [NzSkeletonComponent, NzStringTemplateOutletDirective, NzRowDirective, NzColDirective],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(G2RadarComponent, [{
    type: Component,
    args: [{
      selector: "g2-radar",
      exportAs: "g2Radar",
      host: {
        "[style.height.px]": "height",
        "[class.g2-radar]": "true"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [NzSkeletonComponent, NzStringTemplateOutletDirective, NzRowDirective, NzColDirective],
      template: `@if (!loaded) {
  <nz-skeleton />
}
<ng-container *nzStringTemplateOutlet="title">
  <h4>{{ title }}</h4>
</ng-container>
<div #container></div>
@if (hasLegend) {
  <div nz-row class="g2-radar__legend">
    @for (i of legendData; track $index) {
      <div nz-col [nzSpan]="24 / legendData.length" (click)="_click($index)" class="g2-radar__legend-item">
        <i class="g2-radar__legend-dot" [style]="{ 'background-color': !i.checked ? '#aaa' : i.color }"></i>
        {{ i.name }}
        <h6 class="g2-radar__legend-title">{{ i.value }}</h6>
      </div>
    }
  </div>
}
`
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
    padding: [{
      type: Input
    }],
    hasLegend: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tickCount: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    data: [{
      type: Input
    }],
    colors: [{
      type: Input
    }],
    clickItem: [{
      type: Output
    }]
  });
})();
var COMPONENTS = [G2RadarComponent];
var G2RadarModule = class _G2RadarModule {
  static ɵfac = function G2RadarModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _G2RadarModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _G2RadarModule,
    imports: [CommonModule, NzGridModule, NzOutletModule, NzSkeletonModule, G2RadarComponent],
    exports: [G2RadarComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, NzGridModule, NzOutletModule, NzSkeletonModule, COMPONENTS]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(G2RadarModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, NzGridModule, NzOutletModule, NzSkeletonModule, ...COMPONENTS],
      exports: COMPONENTS
    }]
  }], null, null);
})();
export {
  G2RadarComponent,
  G2RadarModule
};
//# sourceMappingURL=@delon_chart_radar.js.map
