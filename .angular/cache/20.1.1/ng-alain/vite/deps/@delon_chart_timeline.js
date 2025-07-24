import {
  G2BaseComponent
} from "./chunk-ECXQSI3C.js";
import "./chunk-RPM77CK6.js";
import {
  NzSkeletonComponent,
  NzSkeletonModule
} from "./chunk-NUIZUDC6.js";
import {
  toDate
} from "./chunk-SQJ77OAJ.js";
import {
  format
} from "./chunk-BHH4M3PU.js";
import "./chunk-ES4WNO3Q.js";
import "./chunk-XMKNXNVX.js";
import "./chunk-BQ76GOFF.js";
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
import {
  __spreadValues
} from "./chunk-7CE4I3X6.js";

// node_modules/@delon/chart/fesm2022/timeline.mjs
function G2TimelineComponent_ng_container_0_Template(rf, ctx) {
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
function G2TimelineComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "nz-skeleton");
  }
}
var G2TimelineComponent = class _G2TimelineComponent extends G2BaseComponent {
  // #region fields
  title;
  maxAxis = 2;
  data = [];
  titleMap;
  colorMap = {
    y1: "#5B8FF9",
    y2: "#5AD8A6",
    y3: "#5D7092",
    y4: "#F6BD16",
    y5: "#E86452"
  };
  mask = "HH:mm";
  maskSlider = "HH:mm";
  position = "top";
  height = 450;
  padding = [40, 8, 64, 40];
  borderWidth = 2;
  slider = true;
  clickItem = new EventEmitter();
  // #endregion
  onlyChangeData = (changes) => {
    const tm = changes.titleMap;
    return !(tm && !tm.firstChange && tm.currentValue !== tm.previousValue);
  };
  install() {
    const {
      node,
      height,
      padding,
      slider,
      maxAxis,
      theme,
      maskSlider
    } = this;
    const chart = this._chart = new this.winG2.Chart({
      container: node.nativeElement,
      autoFit: true,
      height,
      padding,
      theme
    });
    chart.axis("time", {
      title: null
    });
    chart.axis("y1", {
      title: null
    });
    for (let i = 2; i <= maxAxis; i++) {
      chart.axis(`y${i}`, false);
    }
    chart.line().position("time*y1");
    for (let i = 2; i <= maxAxis; i++) {
      chart.line().position(`time*y${i}`);
    }
    chart.tooltip({
      showCrosshairs: true,
      shared: true
    });
    const sliderPadding = __spreadValues(__spreadValues({}, []), padding);
    sliderPadding[0] = 0;
    if (slider) {
      chart.option("slider", {
        height: 26,
        start: 0,
        end: 1,
        trendCfg: {
          isArea: false
        },
        minLimit: 2,
        formatter: (val) => format(val, maskSlider)
      });
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
    chart.on(`legend-item:click`, (ev) => {
      const item = ev?.target?.get("delegateObject").item;
      const id = item?.id;
      const line = chart.geometries.find((w) => w.getAttribute("position").getFields()[1] === id);
      if (line) {
        line.changeVisible(!item.unchecked);
      }
    });
    this.ready.next(chart);
    this.changeData();
    chart.render();
  }
  changeData() {
    const {
      _chart,
      height,
      padding,
      mask,
      titleMap,
      position,
      colorMap,
      borderWidth,
      maxAxis
    } = this;
    let data = [...this.data];
    if (!_chart || data.length <= 0) return;
    const arrAxis = [...Array(maxAxis)].map((_, index) => index + 1);
    _chart.legend({
      position,
      custom: true,
      items: arrAxis.map((id) => {
        const key = `y${id}`;
        return {
          id: key,
          name: titleMap[key],
          value: key,
          marker: {
            style: {
              fill: colorMap[key]
            }
          }
        };
      })
    });
    _chart.geometries.forEach((v, idx) => {
      v.color(colorMap[`y${idx + 1}`]).size(borderWidth);
    });
    _chart.height = height;
    _chart.padding = padding;
    data = data.map((item) => {
      item.time = toDate(item.time);
      item._time = +item.time;
      return item;
    }).sort((a, b) => a._time - b._time);
    const max = Math.max(...arrAxis.map((id) => [...data].sort((a, b) => b[`y${id}`] - a[`y${id}`])[0][`y${id}`]));
    const scaleOptions = {};
    arrAxis.forEach((id) => {
      const key = `y${id}`;
      scaleOptions[key] = {
        alias: titleMap[key],
        max,
        min: 0
      };
    });
    _chart.scale(__spreadValues({
      time: {
        type: "time",
        mask,
        range: [0, 1]
      }
    }, scaleOptions));
    const initialRange = {
      start: data[0]._time,
      end: data[data.length - 1]._time
    };
    const filterData = data.filter((val) => val._time >= initialRange.start && val._time <= initialRange.end);
    _chart.changeData(filterData);
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵG2TimelineComponent_BaseFactory;
    return function G2TimelineComponent_Factory(__ngFactoryType__) {
      return (ɵG2TimelineComponent_BaseFactory || (ɵG2TimelineComponent_BaseFactory = ɵɵgetInheritedFactory(_G2TimelineComponent)))(__ngFactoryType__ || _G2TimelineComponent);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _G2TimelineComponent,
    selectors: [["g2-timeline"]],
    inputs: {
      title: "title",
      maxAxis: [2, "maxAxis", "maxAxis", numberAttribute],
      data: "data",
      titleMap: "titleMap",
      colorMap: "colorMap",
      mask: "mask",
      maskSlider: "maskSlider",
      position: "position",
      height: [2, "height", "height", numberAttribute],
      padding: "padding",
      borderWidth: [2, "borderWidth", "borderWidth", numberAttribute],
      slider: [2, "slider", "slider", booleanAttribute]
    },
    outputs: {
      clickItem: "clickItem"
    },
    exportAs: ["g2Timeline"],
    features: [ɵɵInheritDefinitionFeature],
    decls: 4,
    vars: 2,
    consts: [["container", ""], [4, "nzStringTemplateOutlet"]],
    template: function G2TimelineComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵtemplate(0, G2TimelineComponent_ng_container_0_Template, 3, 1, "ng-container", 1);
        ɵɵconditionalCreate(1, G2TimelineComponent_Conditional_1_Template, 1, 0, "nz-skeleton");
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(G2TimelineComponent, [{
    type: Component,
    args: [{
      selector: "g2-timeline",
      exportAs: "g2Timeline",
      template: `
    <ng-container *nzStringTemplateOutlet="title">
      <h4>{{ title }}</h4>
    </ng-container>
    @if (!loaded) {
      <nz-skeleton />
    }
    <div #container></div>
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [NzStringTemplateOutletDirective, NzSkeletonComponent]
    }]
  }], null, {
    title: [{
      type: Input
    }],
    maxAxis: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    data: [{
      type: Input
    }],
    titleMap: [{
      type: Input
    }],
    colorMap: [{
      type: Input
    }],
    mask: [{
      type: Input
    }],
    maskSlider: [{
      type: Input
    }],
    position: [{
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
    borderWidth: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    slider: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    clickItem: [{
      type: Output
    }]
  });
})();
var COMPONENTS = [G2TimelineComponent];
var G2TimelineModule = class _G2TimelineModule {
  static ɵfac = function G2TimelineModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _G2TimelineModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _G2TimelineModule,
    imports: [CommonModule, NzOutletModule, NzSkeletonModule, G2TimelineComponent],
    exports: [G2TimelineComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, NzOutletModule, NzSkeletonModule, COMPONENTS]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(G2TimelineModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, NzOutletModule, NzSkeletonModule, ...COMPONENTS],
      exports: COMPONENTS
    }]
  }], null, null);
})();
export {
  G2TimelineComponent,
  G2TimelineModule
};
//# sourceMappingURL=@delon_chart_timeline.js.map
