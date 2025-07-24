import {
  NzDividerComponent,
  NzDividerModule
} from "./chunk-A6D3NUXQ.js";
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
  ɵɵsanitizeHtml,
  ɵɵstyleMap,
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

// node_modules/@delon/chart/fesm2022/pie.mjs
var _c0 = (a0) => ({
  "background-color": a0
});
function G2PieComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "nz-skeleton");
  }
}
function G2PieComponent_Conditional_4_Conditional_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "div", 7);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("innerHTML", ctx_r0.subTitle, ɵɵsanitizeHtml);
  }
}
function G2PieComponent_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "h4", 4);
    ɵɵtemplate(1, G2PieComponent_Conditional_4_Conditional_1_ng_container_1_Template, 2, 1, "ng-container", 6);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("nzStringTemplateOutlet", ctx_r0.subTitle);
  }
}
function G2PieComponent_Conditional_4_Conditional_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "div", 7);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("innerHTML", ctx_r0.total, ɵɵsanitizeHtml);
  }
}
function G2PieComponent_Conditional_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 5);
    ɵɵtemplate(1, G2PieComponent_Conditional_4_Conditional_2_ng_container_1_Template, 2, 1, "ng-container", 6);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("nzStringTemplateOutlet", ctx_r0.total);
  }
}
function G2PieComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 2);
    ɵɵconditionalCreate(1, G2PieComponent_Conditional_4_Conditional_1_Template, 2, 1, "h4", 4);
    ɵɵconditionalCreate(2, G2PieComponent_Conditional_4_Conditional_2_Template, 2, 1, "div", 5);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵconditional(ctx_r0.subTitle ? 1 : -1);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.total ? 2 : -1);
  }
}
function G2PieComponent_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 9);
    ɵɵlistener("click", function G2PieComponent_Conditional_5_For_2_Template_li_click_0_listener() {
      const $index_r3 = ɵɵrestoreView(_r2).$index;
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0._click($index_r3));
    });
    ɵɵelement(1, "span", 10);
    ɵɵelementStart(2, "span", 11);
    ɵɵtext(3);
    ɵɵelementEnd();
    ɵɵelement(4, "nz-divider", 12);
    ɵɵelementStart(5, "span", 13);
    ɵɵtext(6);
    ɵɵelementEnd();
    ɵɵelement(7, "span", 14);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵstyleMap(ɵɵpureFunction1(5, _c0, !item_r4.checked ? "#aaa" : item_r4.color));
    ɵɵadvance(2);
    ɵɵtextInterpolate(item_r4.x);
    ɵɵadvance(3);
    ɵɵtextInterpolate1("", item_r4.percent, "%");
    ɵɵadvance();
    ɵɵproperty("innerHTML", ctx_r0.valueFormat ? ctx_r0.valueFormat(item_r4.y) : item_r4.y, ɵɵsanitizeHtml);
  }
}
function G2PieComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "ul", 3);
    ɵɵrepeaterCreate(1, G2PieComponent_Conditional_5_For_2_Template, 8, 7, "li", 8, ɵɵrepeaterTrackByIndex);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵrepeater(ctx_r0.legendData);
  }
}
var G2PieComponent = class _G2PieComponent extends G2BaseComponent {
  percentColor;
  legendData = [];
  isPercent = false;
  // #region fields
  animate = true;
  color = "rgba(24, 144, 255, 0.85)";
  subTitle;
  total;
  height = 0;
  hasLegend = false;
  inner = 0.75;
  padding = [12, 0, 12, 0];
  percent;
  tooltip = true;
  lineWidth = 0;
  blockMaxWidth = 380;
  select = true;
  valueFormat;
  data = [];
  colors;
  interaction = "none";
  ratio = {
    text: "占比",
    inverse: "反比",
    color: "",
    inverseColor: "#F0F2F5"
  };
  clickItem = new EventEmitter();
  // #endregion
  block = false;
  fixData() {
    const {
      percent,
      color
    } = this;
    this.isPercent = percent != null;
    if (!this.isPercent) {
      return;
    }
    this.select = false;
    this.tooltip = false;
    const {
      text,
      inverse,
      color: textColor,
      inverseColor
    } = this.ratio;
    this.percentColor = (value) => value === text ? textColor || color : inverseColor;
    this.data = [{
      x: text,
      y: percent
    }, {
      x: inverse,
      y: 100 - percent
    }];
  }
  updateBlock() {
    this.block = this._chart && this.hasLegend && this.el.nativeElement.clientWidth <= this.blockMaxWidth;
    this.cdr.detectChanges();
  }
  install() {
    const {
      node,
      height,
      padding,
      tooltip,
      inner,
      hasLegend,
      interaction,
      theme,
      animate,
      lineWidth,
      isPercent,
      percentColor,
      colors
    } = this;
    const chart = this._chart = new this.winG2.Chart({
      container: node.nativeElement,
      autoFit: true,
      height,
      padding,
      theme
    });
    chart.animate(animate);
    if (!tooltip) {
      chart.tooltip(false);
    } else {
      chart.tooltip({
        showTitle: false,
        showMarkers: false
      });
    }
    if (interaction !== "none") {
      chart.interaction(interaction);
    }
    chart.axis(false).legend(false).coordinate("theta", {
      innerRadius: inner
    });
    chart.filter("x", (_val, item) => item.checked !== false);
    chart.interval().adjust("stack").position("y").style({
      lineWidth,
      stroke: "#fff"
    }).color("x", isPercent ? percentColor : colors).tooltip("x*percent", (name, p) => ({
      name,
      value: `${hasLegend ? p : (p * 100).toFixed(2)} %`
    })).state({});
    chart.scale({
      x: {
        type: "cat",
        range: [0, 1]
      }
    });
    chart.on(`interval:click`, (ev) => {
      this.ngZone.run(() => this.clickItem.emit({
        item: ev.data?.data,
        ev
      }));
    }).on("afterrender", () => {
      this.ngZone.run(() => this.updateBlock());
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
    const totalSum = data.reduce((cur, item) => cur + item.y, 0);
    for (const item of data) {
      item.percent = totalSum === 0 ? 0 : item.y / totalSum;
    }
    _chart.changeData(data);
    this.ngZone.run(() => this.genLegend());
  }
  genLegend() {
    const {
      hasLegend,
      isPercent,
      cdr,
      _chart
    } = this;
    if (!hasLegend || isPercent) return;
    this.legendData = _chart.geometries[0].dataArray.map((item) => {
      const origin = item[0]._origin;
      origin.color = item[0].color;
      origin.checked = true;
      origin.percent = (origin.percent * 100).toFixed(2);
      return origin;
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
    this.fixData();
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵG2PieComponent_BaseFactory;
    return function G2PieComponent_Factory(__ngFactoryType__) {
      return (ɵG2PieComponent_BaseFactory || (ɵG2PieComponent_BaseFactory = ɵɵgetInheritedFactory(_G2PieComponent)))(__ngFactoryType__ || _G2PieComponent);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _G2PieComponent,
    selectors: [["g2-pie"]],
    hostVars: 8,
    hostBindings: function G2PieComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("g2-pie", true)("g2-pie__legend-has", ctx.hasLegend)("g2-pie__legend-block", ctx.block)("g2-pie__mini", ctx.isPercent);
      }
    },
    inputs: {
      animate: [2, "animate", "animate", booleanAttribute],
      color: "color",
      subTitle: "subTitle",
      total: "total",
      height: [2, "height", "height", numberAttribute],
      hasLegend: [2, "hasLegend", "hasLegend", booleanAttribute],
      inner: "inner",
      padding: "padding",
      percent: [2, "percent", "percent", numberAttribute],
      tooltip: [2, "tooltip", "tooltip", booleanAttribute],
      lineWidth: [2, "lineWidth", "lineWidth", numberAttribute],
      blockMaxWidth: [2, "blockMaxWidth", "blockMaxWidth", numberAttribute],
      select: [2, "select", "select", booleanAttribute],
      valueFormat: "valueFormat",
      data: "data",
      colors: "colors",
      interaction: "interaction",
      ratio: "ratio"
    },
    outputs: {
      clickItem: "clickItem"
    },
    exportAs: ["g2Pie"],
    features: [ɵɵInheritDefinitionFeature],
    decls: 6,
    vars: 3,
    consts: [["container", ""], [1, "g2-pie__chart"], [1, "g2-pie__total"], [1, "g2-pie__legend"], [1, "g2-pie__total-title"], [1, "g2-pie__total-stat"], [4, "nzStringTemplateOutlet"], [3, "innerHTML"], [1, "g2-pie__legend-item"], [1, "g2-pie__legend-item", 3, "click"], [1, "g2-pie__legend-dot"], [1, "g2-pie__legend-title"], ["nzType", "vertical"], [1, "g2-pie__legend-percent"], [1, "g2-pie__legend-value", 3, "innerHTML"]],
    template: function G2PieComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵconditionalCreate(0, G2PieComponent_Conditional_0_Template, 1, 0, "nz-skeleton");
        ɵɵelementStart(1, "div", 1);
        ɵɵelement(2, "div", null, 0);
        ɵɵconditionalCreate(4, G2PieComponent_Conditional_4_Template, 3, 2, "div", 2);
        ɵɵelementEnd();
        ɵɵconditionalCreate(5, G2PieComponent_Conditional_5_Template, 3, 0, "ul", 3);
      }
      if (rf & 2) {
        ɵɵconditional(!ctx.loaded ? 0 : -1);
        ɵɵadvance(4);
        ɵɵconditional(ctx.subTitle || ctx.total ? 4 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.hasLegend && ctx.legendData.length > 0 ? 5 : -1);
      }
    },
    dependencies: [NzSkeletonComponent, NzStringTemplateOutletDirective, NzDividerComponent],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(G2PieComponent, [{
    type: Component,
    args: [{
      selector: "g2-pie",
      exportAs: "g2Pie",
      host: {
        "[class.g2-pie]": "true",
        "[class.g2-pie__legend-has]": "hasLegend",
        "[class.g2-pie__legend-block]": "block",
        "[class.g2-pie__mini]": "isPercent"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [NzSkeletonComponent, NzStringTemplateOutletDirective, NzDividerComponent],
      template: `@if (!loaded) {
  <nz-skeleton />
}
<div class="g2-pie__chart">
  <div #container></div>
  @if (subTitle || total) {
    <div class="g2-pie__total">
      @if (subTitle) {
        <h4 class="g2-pie__total-title">
          <ng-container *nzStringTemplateOutlet="subTitle">
            <div [innerHTML]="subTitle"></div>
          </ng-container>
        </h4>
      }
      @if (total) {
        <div class="g2-pie__total-stat">
          <ng-container *nzStringTemplateOutlet="total">
            <div [innerHTML]="total"></div>
          </ng-container>
        </div>
      }
    </div>
  }
</div>
@if (hasLegend && legendData.length > 0) {
  <ul class="g2-pie__legend">
    @for (item of legendData; track $index) {
      <li (click)="_click($index)" class="g2-pie__legend-item">
        <span class="g2-pie__legend-dot" [style]="{ 'background-color': !item.checked ? '#aaa' : item.color }"></span>
        <span class="g2-pie__legend-title">{{ item.x }}</span>
        <nz-divider nzType="vertical" />
        <span class="g2-pie__legend-percent">{{ item.percent }}%</span>
        <span class="g2-pie__legend-value" [innerHTML]="valueFormat ? valueFormat(item.y) : item.y"></span>
      </li>
    }
  </ul>
}
`
    }]
  }], null, {
    animate: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    color: [{
      type: Input
    }],
    subTitle: [{
      type: Input
    }],
    total: [{
      type: Input
    }],
    height: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    hasLegend: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    inner: [{
      type: Input
    }],
    padding: [{
      type: Input
    }],
    percent: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    tooltip: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    lineWidth: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    blockMaxWidth: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    select: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    valueFormat: [{
      type: Input
    }],
    data: [{
      type: Input
    }],
    colors: [{
      type: Input
    }],
    interaction: [{
      type: Input
    }],
    ratio: [{
      type: Input
    }],
    clickItem: [{
      type: Output
    }]
  });
})();
var COMPONENTS = [G2PieComponent];
var G2PieModule = class _G2PieModule {
  static ɵfac = function G2PieModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _G2PieModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _G2PieModule,
    imports: [CommonModule, NzDividerModule, NzOutletModule, NzSkeletonModule, G2PieComponent],
    exports: [G2PieComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, NzDividerModule, NzOutletModule, NzSkeletonModule, COMPONENTS]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(G2PieModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, NzDividerModule, NzOutletModule, NzSkeletonModule, ...COMPONENTS],
      exports: COMPONENTS
    }]
  }], null, null);
})();
export {
  G2PieComponent,
  G2PieModule
};
//# sourceMappingURL=@delon_chart_pie.js.map
