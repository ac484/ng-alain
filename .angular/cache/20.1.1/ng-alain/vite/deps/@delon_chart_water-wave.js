import {
  NzOutletModule,
  NzStringTemplateOutletDirective
} from "./chunk-KG76OIXO.js";
import "./chunk-J25EALHE.js";
import "./chunk-CQHDL44S.js";
import "./chunk-NFHVISCS.js";
import {
  Platform
} from "./chunk-GIT7CFOZ.js";
import {
  CommonModule
} from "./chunk-GUTSRBNM.js";
import "./chunk-FTJJFYDV.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgModule,
  NgZone,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  numberAttribute,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵattribute,
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
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-NQBXVTYU.js";
import {
  inject,
  ɵɵdefineInjector
} from "./chunk-QZDSTGXI.js";
import {
  fromEvent
} from "./chunk-KMLKBNXJ.js";
import "./chunk-Q4VD2BBX.js";
import {
  debounceTime
} from "./chunk-EBAU53KC.js";
import "./chunk-7CE4I3X6.js";

// node_modules/@delon/chart/fesm2022/water-wave.mjs
var _c0 = ["container"];
var _c1 = (a0, a1) => ({
  height: a0,
  width: a1,
  overflow: "hidden"
});
var _c2 = (a0) => ({
  width: a0
});
function G2WaterWaveComponent_Conditional_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.title);
  }
}
function G2WaterWaveComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 3);
    ɵɵtemplate(1, G2WaterWaveComponent_Conditional_4_ng_container_1_Template, 2, 1, "ng-container", 5);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("nzStringTemplateOutlet", ctx_r0.title);
  }
}
var G2WaterWaveComponent = class _G2WaterWaveComponent {
  el = inject(ElementRef).nativeElement;
  renderer = inject(Renderer2);
  ngZone = inject(NgZone);
  cdr = inject(ChangeDetectorRef);
  platform = inject(Platform);
  resize$ = null;
  node;
  timer;
  // #region fields
  animate = true;
  delay = 0;
  title;
  color = "#1890FF";
  height = 160;
  percent;
  // #endregion
  renderChart(isUpdate) {
    if (!this.resize$) return;
    this.updateRadio();
    const {
      percent,
      color,
      node,
      animate
    } = this;
    const data = Math.min(Math.max(percent / 100, 0), 100);
    const self = this;
    cancelAnimationFrame(this.timer);
    const canvas = node.nativeElement;
    const ctx = canvas.getContext("2d");
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const radius = canvasWidth / 2;
    const lineWidth = 2;
    const cR = radius - lineWidth;
    ctx.beginPath();
    ctx.lineWidth = lineWidth * 2;
    const axisLength = canvasWidth - lineWidth;
    const unit = axisLength / 8;
    const xOffset = lineWidth;
    let sp = 0;
    const range = 0.2;
    let currRange = range;
    let currData = 0;
    const waveupsp = animate ? 5e-3 : 0.015;
    let arcStack = [];
    const bR = radius - lineWidth;
    const circleOffset = -(Math.PI / 2);
    let circleLock = true;
    for (let i = circleOffset; i < circleOffset + 2 * Math.PI; i += 1 / (8 * Math.PI)) {
      arcStack.push([radius + bR * Math.cos(i), radius + bR * Math.sin(i)]);
    }
    const cStartPoint = arcStack.shift();
    ctx.strokeStyle = color;
    ctx.moveTo(cStartPoint[0], cStartPoint[1]);
    function drawSin() {
      ctx.beginPath();
      ctx.save();
      const sinStack = [];
      for (let i = xOffset; i <= xOffset + axisLength; i += 20 / axisLength) {
        const x = sp + (xOffset + i) / unit;
        const y = Math.sin(x) * currRange;
        const dx = i;
        const dy = 2 * cR * (1 - currData) + (radius - cR) - unit * y;
        ctx.lineTo(dx, dy);
        sinStack.push([dx, dy]);
      }
      const startPoint = sinStack.shift();
      ctx.lineTo(xOffset + axisLength, canvasHeight);
      ctx.lineTo(xOffset, canvasHeight);
      ctx.lineTo(startPoint[0], startPoint[1]);
      const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
      gradient.addColorStop(0, "#ffffff");
      gradient.addColorStop(1, color);
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();
    }
    function render() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      if (circleLock && !isUpdate) {
        if (arcStack.length) {
          if (animate) {
            const temp = arcStack.shift();
            ctx.lineTo(temp[0], temp[1]);
            ctx.stroke();
          } else {
            for (const temp of arcStack) {
              ctx.lineTo(temp[0], temp[1]);
              ctx.stroke();
            }
            arcStack = [];
          }
        } else {
          circleLock = false;
          ctx.lineTo(cStartPoint[0], cStartPoint[1]);
          ctx.stroke();
          arcStack = null;
          ctx.globalCompositeOperation = "destination-over";
          ctx.beginPath();
          ctx.lineWidth = lineWidth;
          ctx.arc(radius, radius, bR, 0, 2 * Math.PI, true);
          ctx.beginPath();
          ctx.save();
          ctx.arc(radius, radius, radius - 3 * lineWidth, 0, 2 * Math.PI, true);
          ctx.restore();
          ctx.clip();
          ctx.fillStyle = color;
        }
      } else {
        if (data >= 0.85) {
          if (currRange > range / 4) {
            const t = range * 0.01;
            currRange -= t;
          }
        } else if (data <= 0.1) {
          if (currRange < range * 1.5) {
            const t = range * 0.01;
            currRange += t;
          }
        } else {
          if (currRange <= range) {
            const t = range * 0.01;
            currRange += t;
          }
          if (currRange >= range) {
            const t = range * 0.01;
            currRange -= t;
          }
        }
        if (data - currData > 0) {
          currData += waveupsp;
        }
        if (data - currData < 0) {
          currData -= waveupsp;
        }
        sp += 0.07;
        drawSin();
      }
      self.timer = requestAnimationFrame(render);
    }
    render();
  }
  updateRadio() {
    const {
      offsetWidth
    } = this.el.parentNode;
    const radio = offsetWidth < this.height ? offsetWidth / this.height : 1;
    this.renderer.setStyle(this.el, "transform", `scale(${radio})`);
  }
  render() {
    this.renderChart(false);
  }
  installResizeEvent() {
    this.resize$ = fromEvent(window, "resize").pipe(debounceTime(200)).subscribe(() => this.updateRadio());
  }
  ngOnInit() {
    if (!this.platform.isBrowser) {
      return;
    }
    this.installResizeEvent();
    this.ngZone.runOutsideAngular(() => setTimeout(() => this.render(), this.delay));
  }
  ngOnChanges() {
    this.ngZone.runOutsideAngular(() => this.renderChart(true));
    this.cdr.detectChanges();
  }
  ngOnDestroy() {
    if (this.timer) {
      cancelAnimationFrame(this.timer);
    }
    if (this.resize$) {
      this.resize$.unsubscribe();
    }
  }
  static ɵfac = function G2WaterWaveComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _G2WaterWaveComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _G2WaterWaveComponent,
    selectors: [["g2-water-wave"]],
    viewQuery: function G2WaterWaveComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c0, 7);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.node = _t.first);
      }
    },
    hostVars: 2,
    hostBindings: function G2WaterWaveComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("g2-water-wave", true);
      }
    },
    inputs: {
      animate: [2, "animate", "animate", booleanAttribute],
      delay: [2, "delay", "delay", numberAttribute],
      title: "title",
      color: "color",
      height: [2, "height", "height", numberAttribute],
      percent: [2, "percent", "percent", numberAttribute]
    },
    exportAs: ["g2WaterWave"],
    features: [ɵɵNgOnChangesFeature],
    decls: 7,
    vars: 13,
    consts: [["container", ""], [1, "g2-water-wave__canvas"], [1, "g2-water-wave__desc"], [1, "g2-water-wave__desc-title"], [1, "g2-water-wave__desc-percent"], [4, "nzStringTemplateOutlet"]],
    template: function G2WaterWaveComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "div");
        ɵɵelement(1, "canvas", 1, 0);
        ɵɵelementEnd();
        ɵɵelementStart(3, "div", 2);
        ɵɵconditionalCreate(4, G2WaterWaveComponent_Conditional_4_Template, 2, 1, "span", 3);
        ɵɵelementStart(5, "h4", 4);
        ɵɵtext(6);
        ɵɵelementEnd()();
      }
      if (rf & 2) {
        ɵɵstyleMap(ɵɵpureFunction2(8, _c1, ctx.height + "px", ctx.height + "px"));
        ɵɵadvance();
        ɵɵattribute("width", ctx.height * 2)("height", ctx.height * 2);
        ɵɵadvance(2);
        ɵɵstyleMap(ɵɵpureFunction1(11, _c2, ctx.height + "px"));
        ɵɵadvance();
        ɵɵconditional(ctx.title ? 4 : -1);
        ɵɵadvance(2);
        ɵɵtextInterpolate1("", ctx.percent, "%");
      }
    },
    dependencies: [NzStringTemplateOutletDirective],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(G2WaterWaveComponent, [{
    type: Component,
    args: [{
      selector: "g2-water-wave",
      exportAs: "g2WaterWave",
      host: {
        "[class.g2-water-wave]": "true"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [NzStringTemplateOutletDirective],
      template: `<div [style]="{ height: height + 'px', width: height + 'px', overflow: 'hidden' }">
  <canvas #container class="g2-water-wave__canvas" [attr.width]="height * 2" [attr.height]="height * 2"></canvas>
</div>
<div class="g2-water-wave__desc" [style]="{ width: height + 'px' }">
  @if (title) {
    <span class="g2-water-wave__desc-title">
      <ng-container *nzStringTemplateOutlet="title">{{ title }}</ng-container>
    </span>
  }
  <h4 class="g2-water-wave__desc-percent">{{ percent }}%</h4>
</div>
`
    }]
  }], null, {
    node: [{
      type: ViewChild,
      args: ["container", {
        static: true
      }]
    }],
    animate: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    delay: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
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
    percent: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }]
  });
})();
var COMPONENTS = [G2WaterWaveComponent];
var G2WaterWaveModule = class _G2WaterWaveModule {
  static ɵfac = function G2WaterWaveModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _G2WaterWaveModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _G2WaterWaveModule,
    imports: [CommonModule, NzOutletModule, G2WaterWaveComponent],
    exports: [G2WaterWaveComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, NzOutletModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(G2WaterWaveModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, NzOutletModule, ...COMPONENTS],
      exports: COMPONENTS
    }]
  }], null, null);
})();
export {
  G2WaterWaveComponent,
  G2WaterWaveModule
};
//# sourceMappingURL=@delon_chart_water-wave.js.map
