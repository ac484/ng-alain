import {
  addSeconds,
  format
} from "./chunk-BHH4M3PU.js";
import "./chunk-BQ76GOFF.js";
import {
  CommonModule,
  NgTemplateOutlet,
  formatDate
} from "./chunk-GUTSRBNM.js";
import "./chunk-FTJJFYDV.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Injectable,
  Input,
  LOCALE_ID,
  NgModule,
  NgZone,
  Output,
  ViewChild,
  ViewEncapsulation,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵsanitizeHtml,
  ɵɵtemplate,
  ɵɵviewQuery
} from "./chunk-NQBXVTYU.js";
import {
  InjectionToken,
  inject,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵresetView,
  ɵɵrestoreView
} from "./chunk-QZDSTGXI.js";
import "./chunk-KMLKBNXJ.js";
import "./chunk-Q4VD2BBX.js";
import "./chunk-EBAU53KC.js";
import {
  __spreadValues
} from "./chunk-7CE4I3X6.js";

// node_modules/ngx-countdown/fesm2022/ngx-countdown.mjs
var _c0 = (a0) => ({
  $implicit: a0
});
function CountdownComponent_Conditional_0_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function CountdownComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, CountdownComponent_Conditional_0_ng_container_0_Template, 1, 0, "ng-container", 1);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.render)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c0, ctx_r0.i));
  }
}
function CountdownComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 0);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("innerHTML", ctx_r0.i.text, ɵɵsanitizeHtml);
  }
}
var CountdownStatus;
(function(CountdownStatus2) {
  CountdownStatus2[CountdownStatus2["ing"] = 0] = "ing";
  CountdownStatus2[CountdownStatus2["pause"] = 1] = "pause";
  CountdownStatus2[CountdownStatus2["stop"] = 2] = "stop";
  CountdownStatus2[CountdownStatus2["done"] = 3] = "done";
})(CountdownStatus || (CountdownStatus = {}));
var CountdownTimer = class _CountdownTimer {
  ngZone = inject(NgZone);
  fns = [];
  commands = [];
  nextTime = 0;
  ing = false;
  start() {
    if (this.ing === true) {
      return;
    }
    this.ing = true;
    this.nextTime = +/* @__PURE__ */ new Date();
    this.ngZone.runOutsideAngular(() => {
      this.process();
    });
  }
  process() {
    while (this.commands.length) {
      this.commands.shift()();
    }
    let diff = +/* @__PURE__ */ new Date() - this.nextTime;
    const count = 1 + Math.floor(diff / 100);
    diff = 100 - diff % 100;
    this.nextTime += 100 * count;
    for (let i = 0, len = this.fns.length; i < len; i += 2) {
      let frequency = this.fns[i + 1];
      if (0 === frequency) {
        this.fns[i](count);
      } else {
        frequency += 2 * count - 1;
        const step = Math.floor(frequency / 20);
        if (step > 0) {
          this.fns[i](step);
        }
        this.fns[i + 1] = frequency % 20 + 1;
      }
    }
    if (!this.ing) {
      return;
    }
    setTimeout(() => this.process(), diff);
  }
  add(fn, frequency) {
    this.commands.push(() => {
      this.fns.push(fn);
      this.fns.push(frequency === 1e3 ? 1 : 0);
      this.ing = true;
    });
    return this;
  }
  remove(fn) {
    this.commands.push(() => {
      const i = this.fns.indexOf(fn);
      if (i !== -1) {
        this.fns.splice(i, 2);
      }
      this.ing = this.fns.length > 0;
    });
    return this;
  }
  static ɵfac = function CountdownTimer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CountdownTimer)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _CountdownTimer,
    factory: _CountdownTimer.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CountdownTimer, [{
    type: Injectable
  }], null, null);
})();
var COUNTDOWN_CONFIG = new InjectionToken("COUNTDOWN_CONFIG");
var CountdownComponent = class _CountdownComponent {
  locale = inject(LOCALE_ID);
  timer = inject(CountdownTimer);
  cdr = inject(ChangeDetectorRef);
  ngZone = inject(NgZone);
  defCog = inject(COUNTDOWN_CONFIG, {
    optional: true
  });
  frequency = 1e3;
  _notify = {};
  status = CountdownStatus.ing;
  isDestroy = false;
  _config;
  i = {};
  left = 0;
  set config(i) {
    if (i.notify != null && !Array.isArray(i.notify) && i.notify > 0) {
      i.notify = [i.notify];
    }
    this._config = i;
  }
  get config() {
    return this._config;
  }
  render;
  event = new EventEmitter();
  /**
   * Start countdown, you must manually call when `demand: false`
   */
  begin() {
    this.status = CountdownStatus.ing;
    this.callEvent("start");
  }
  /**
   * Restart countdown
   */
  restart() {
    if (this.status !== CountdownStatus.stop) {
      this.destroy();
    }
    this.init();
    this.callEvent("restart");
  }
  /**
   * Stop countdown, must call `restart` when stopped, it's different from pause, unable to recover
   */
  stop() {
    if (this.status === CountdownStatus.stop) {
      return;
    }
    this.status = CountdownStatus.stop;
    this.destroy();
    this.callEvent("stop");
  }
  /**
   * Pause countdown, you can use `resume` to recover again
   */
  pause() {
    if (this.status === CountdownStatus.stop || this.status === CountdownStatus.pause) {
      return;
    }
    this.status = CountdownStatus.pause;
    this.callEvent("pause");
  }
  /**
   * Resume countdown
   */
  resume() {
    if (this.status === CountdownStatus.stop || this.status !== CountdownStatus.pause) {
      return;
    }
    this.status = CountdownStatus.ing;
    this.callEvent("resume");
  }
  callEvent(action) {
    this.event.emit({
      action,
      left: this.left,
      status: this.status,
      text: this.i.text
    });
  }
  init() {
    const config = this.config = __spreadValues(__spreadValues({
      demand: false,
      leftTime: 0,
      format: "HH:mm:ss",
      timezone: "+0000",
      formatDate: ({
        date,
        formatStr,
        timezone
      }) => {
        return formatDate(new Date(date), formatStr, this.locale, timezone || "+0000");
      }
    }, this.defCog), this.config);
    const frq = this.frequency = ~config.format.indexOf("S") ? 100 : 1e3;
    this.status = config.demand ? CountdownStatus.pause : CountdownStatus.ing;
    this.getLeft();
    const _reflow = this.reflow;
    this.reflow = (count = 0, force = false) => _reflow.apply(this, [count, force]);
    if (Array.isArray(config.notify)) {
      config.notify.forEach((time) => {
        if (time < 1) {
          throw new Error(`The notify config must be a positive integer.`);
        }
        time = time * 1e3;
        time = time - time % frq;
        this._notify[time] = true;
      });
    }
    this.timer.add(this.reflow, frq).start();
    this.reflow(0, true);
  }
  destroy() {
    this.timer.remove(this.reflow);
    return this;
  }
  /**
   * 更新时钟
   */
  reflow(count = 0, force = false) {
    if (this.isDestroy) {
      return;
    }
    const {
      status,
      config,
      _notify
    } = this;
    if (!force && status !== CountdownStatus.ing) {
      return;
    }
    let value = this.left = this.left - this.frequency * count;
    if (value < 1) {
      value = 0;
    }
    this.i = {
      value,
      text: config.formatDate({
        date: value,
        formatStr: config.format,
        timezone: config.timezone
      })
    };
    if (typeof config.prettyText === "function") {
      this.i.text = config.prettyText(this.i.text);
    }
    this.cdr.detectChanges();
    if (config.notify === 0 || _notify[value]) {
      this.ngZone.run(() => {
        this.callEvent("notify");
      });
    }
    if (value === 0) {
      this.ngZone.run(() => {
        this.status = CountdownStatus.done;
        this.destroy();
        this.callEvent("done");
      });
    }
  }
  /**
   * 获取倒计时剩余帧数
   */
  getLeft() {
    const {
      config,
      frequency
    } = this;
    let left = config.leftTime * 1e3;
    const end = config.stopTime;
    if (!left && end) {
      left = end - (/* @__PURE__ */ new Date()).getTime();
    }
    this.left = left - left % frequency;
  }
  ngOnInit() {
    this.init();
    if (!this.config.demand) {
      this.begin();
    }
  }
  ngOnDestroy() {
    this.isDestroy = true;
    this.destroy();
  }
  ngOnChanges(changes) {
    if (!changes.config.firstChange) {
      this.restart();
    }
  }
  static ɵfac = function CountdownComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CountdownComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _CountdownComponent,
    selectors: [["countdown"]],
    hostVars: 2,
    hostBindings: function CountdownComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("count-down", true);
      }
    },
    inputs: {
      config: "config",
      render: "render"
    },
    outputs: {
      event: "event"
    },
    features: [ɵɵProvidersFeature([CountdownTimer]), ɵɵNgOnChangesFeature],
    decls: 2,
    vars: 1,
    consts: [[3, "innerHTML"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]],
    template: function CountdownComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵconditionalCreate(0, CountdownComponent_Conditional_0_Template, 1, 4, "ng-container")(1, CountdownComponent_Conditional_1_Template, 1, 1, "span", 0);
      }
      if (rf & 2) {
        ɵɵconditional(ctx.render ? 0 : 1);
      }
    },
    dependencies: [NgTemplateOutlet],
    styles: [".count-down{font-variant-numeric:tabular-nums}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CountdownComponent, [{
    type: Component,
    args: [{
      selector: "countdown",
      template: `
    @if (render) {
    <ng-container *ngTemplateOutlet="render; context: { $implicit: i }" />
    } @else {
    <span [innerHTML]="i.text"></span>
    }
  `,
      host: {
        "[class.count-down]": "true"
      },
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [NgTemplateOutlet],
      providers: [CountdownTimer],
      styles: [".count-down{font-variant-numeric:tabular-nums}\n"]
    }]
  }], null, {
    config: [{
      type: Input,
      args: [{
        required: true
      }]
    }],
    render: [{
      type: Input
    }],
    event: [{
      type: Output
    }]
  });
})();
var CountdownModule = class _CountdownModule {
  static ɵfac = function CountdownModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CountdownModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _CountdownModule,
    imports: [CountdownComponent],
    exports: [CountdownComponent]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CountdownModule, [{
    type: NgModule,
    args: [{
      imports: [CountdownComponent],
      exports: [CountdownComponent]
    }]
  }], null, null);
})();

// node_modules/@delon/abc/fesm2022/count-down.mjs
var _c02 = ["cd"];
function CountDownComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "countdown", 2, 0);
    ɵɵlistener("event", function CountDownComponent_Conditional_0_Template_countdown_event_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.handleEvent($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("config", ctx_r1.config);
  }
}
var CountDownComponent = class _CountDownComponent {
  instance;
  config;
  /**
   * 目标时间
   */
  set target(value) {
    this.config = {
      format: `HH:mm:ss`,
      stopTime: typeof value === "number" ? addSeconds(/* @__PURE__ */ new Date(), value).valueOf() : +format(value, "t")
    };
  }
  event = new EventEmitter();
  handleEvent(e) {
    this.event.emit(e);
  }
  static ɵfac = function CountDownComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CountDownComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _CountDownComponent,
    selectors: [["count-down"]],
    viewQuery: function CountDownComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c02, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.instance = _t.first);
      }
    },
    inputs: {
      config: "config",
      target: "target"
    },
    outputs: {
      event: "event"
    },
    exportAs: ["countDown"],
    decls: 1,
    vars: 1,
    consts: [["cd", ""], [3, "config"], [3, "event", "config"]],
    template: function CountDownComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵconditionalCreate(0, CountDownComponent_Conditional_0_Template, 2, 1, "countdown", 1);
      }
      if (rf & 2) {
        ɵɵconditional(ctx.config ? 0 : -1);
      }
    },
    dependencies: [CountdownComponent],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CountDownComponent, [{
    type: Component,
    args: [{
      selector: "count-down",
      exportAs: "countDown",
      template: `@if (config) {
    <countdown #cd [config]="config" (event)="handleEvent($event)" />
  }`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [CountdownComponent]
    }]
  }], null, {
    instance: [{
      type: ViewChild,
      args: ["cd", {
        static: false
      }]
    }],
    config: [{
      type: Input
    }],
    target: [{
      type: Input
    }],
    event: [{
      type: Output
    }]
  });
})();
var COMPONENTS = [CountDownComponent];
var CountDownModule = class _CountDownModule {
  static ɵfac = function CountDownModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CountDownModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _CountDownModule,
    imports: [CommonModule, CountdownModule, CountDownComponent],
    exports: [CountDownComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, CountdownModule, COMPONENTS]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CountDownModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, CountdownModule, ...COMPONENTS],
      exports: COMPONENTS
    }]
  }], null, null);
})();
export {
  CountDownComponent,
  CountDownModule
};
//# sourceMappingURL=@delon_abc_count-down.js.map
