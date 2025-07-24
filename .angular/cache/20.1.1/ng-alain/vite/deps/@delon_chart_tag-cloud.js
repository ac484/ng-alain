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
  EventEmitter,
  Input,
  NgModule,
  Output,
  ViewEncapsulation,
  numberAttribute,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
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
import {
  fromEvent
} from "./chunk-KMLKBNXJ.js";
import "./chunk-Q4VD2BBX.js";
import {
  debounceTime,
  filter
} from "./chunk-EBAU53KC.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-7CE4I3X6.js";

// node_modules/@delon/chart/fesm2022/tag-cloud.mjs
function G2TagCloudComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "nz-skeleton");
  }
}
var G2TagCloudComponent = class _G2TagCloudComponent extends G2BaseComponent {
  // #region fields
  width = 0;
  height = 200;
  padding = 0;
  data = [];
  clickItem = new EventEmitter();
  // #endregion
  initTagCloud() {
    const winG2 = this.winG2;
    winG2.registerShape("point", "cloud", {
      draw(cfg, container) {
        const data = cfg.data;
        const textShape = container.addShape({
          type: "text",
          name: "tag-cloud-text",
          attrs: __spreadProps(__spreadValues({}, cfg.style), {
            fontSize: data.size,
            text: data.text,
            textAlign: "center",
            fontFamily: data.font,
            fill: cfg.color,
            textBaseline: "Alphabetic",
            x: cfg.x,
            y: cfg.y
          })
        });
        if (data.rotate) {
          winG2.Util.rotate(textShape, data.rotate * Math.PI / 180);
        }
        return textShape;
      }
    });
  }
  install() {
    this.initTagCloud();
    const {
      el,
      padding,
      theme
    } = this;
    if (this.height === 0) {
      this.height = this.el.nativeElement.clientHeight;
    }
    if (this.width === 0) {
      this.width = this.el.nativeElement.clientWidth;
    }
    const chart = this._chart = new this.winG2.Chart({
      container: el.nativeElement,
      autoFit: false,
      padding,
      height: this.height,
      width: this.width,
      theme
    });
    chart.scale({
      x: {
        nice: false
      },
      y: {
        nice: false
      }
    });
    chart.legend(false);
    chart.axis(false);
    chart.tooltip({
      showTitle: false,
      showMarkers: false
    });
    chart.coordinate().reflect();
    chart.point().position("x*y").color("text").shape("cloud").state({
      active: {
        style: {
          fillOpacity: 0.4
        }
      }
    });
    chart.interaction("element-active");
    chart.on("tag-cloud-text:click", (ev) => {
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
    const dv = new window.DataSet.View().source(data);
    const range = dv.range("value");
    const min = range[0];
    const max = range[1];
    dv.transform({
      type: "tag-cloud",
      fields: ["name", "value"],
      // imageMask,
      font: "Verdana",
      size: [this.width, this.height],
      // 宽高设置最好根据 imageMask 做调整
      padding: 0,
      timeInterval: 5e3,
      // max execute time
      rotate() {
        let random = ~~(Math.random() * 4) % 4;
        if (random === 2) {
          random = 0;
        }
        return random * 90;
      },
      fontSize(d) {
        return (d.value - min) / (max - min) * (32 - 8) + 8;
      }
    });
    _chart.changeData(dv.rows);
  }
  installResizeEvent() {
    this.resize$ = fromEvent(window, "resize").pipe(filter(() => !!this._chart), debounceTime(200)).subscribe(() => this.changeData());
  }
  onInit() {
    this.installResizeEvent();
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵG2TagCloudComponent_BaseFactory;
    return function G2TagCloudComponent_Factory(__ngFactoryType__) {
      return (ɵG2TagCloudComponent_BaseFactory || (ɵG2TagCloudComponent_BaseFactory = ɵɵgetInheritedFactory(_G2TagCloudComponent)))(__ngFactoryType__ || _G2TagCloudComponent);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _G2TagCloudComponent,
    selectors: [["g2-tag-cloud"]],
    inputs: {
      width: [2, "width", "width", numberAttribute],
      height: [2, "height", "height", numberAttribute],
      padding: "padding",
      data: "data"
    },
    outputs: {
      clickItem: "clickItem"
    },
    exportAs: ["g2TagCloud"],
    features: [ɵɵInheritDefinitionFeature],
    decls: 1,
    vars: 1,
    template: function G2TagCloudComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵconditionalCreate(0, G2TagCloudComponent_Conditional_0_Template, 1, 0, "nz-skeleton");
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(G2TagCloudComponent, [{
    type: Component,
    args: [{
      selector: "g2-tag-cloud",
      exportAs: "g2TagCloud",
      template: `@if (!loaded) {
    <nz-skeleton />
  }`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [NzSkeletonComponent]
    }]
  }], null, {
    width: [{
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
    padding: [{
      type: Input
    }],
    data: [{
      type: Input
    }],
    clickItem: [{
      type: Output
    }]
  });
})();
var COMPONENTS = [G2TagCloudComponent];
var G2TagCloudModule = class _G2TagCloudModule {
  static ɵfac = function G2TagCloudModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _G2TagCloudModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _G2TagCloudModule,
    imports: [CommonModule, NzSkeletonModule, G2TagCloudComponent],
    exports: [G2TagCloudComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, NzSkeletonModule, COMPONENTS]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(G2TagCloudModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, NzSkeletonModule, ...COMPONENTS],
      exports: COMPONENTS
    }]
  }], null, null);
})();
export {
  G2TagCloudComponent,
  G2TagCloudModule
};
//# sourceMappingURL=@delon_chart_tag-cloud.js.map
