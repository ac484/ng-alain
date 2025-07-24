import {
  ActivationEnd,
  ActivationStart,
  Router
} from "./chunk-36PX2JTV.js";
import "./chunk-BVIJPY5U.js";
import "./chunk-ZO4CS3CJ.js";
import {
  takeUntilDestroyed
} from "./chunk-I75K2H66.js";
import "./chunk-NDRILP3E.js";
import {
  CommonModule
} from "./chunk-GUTSRBNM.js";
import "./chunk-FTJJFYDV.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  Injectable,
  NgModule,
  ViewEncapsulation,
  booleanAttribute,
  input,
  model,
  numberAttribute,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineNgModule,
  ɵɵlistener,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵstyleProp
} from "./chunk-NQBXVTYU.js";
import {
  DOCUMENT,
  DestroyRef,
  inject,
  ɵɵdefineInjectable,
  ɵɵdefineInjector
} from "./chunk-QZDSTGXI.js";
import {
  fromEvent
} from "./chunk-KMLKBNXJ.js";
import "./chunk-Q4VD2BBX.js";
import {
  BehaviorSubject,
  debounceTime,
  filter,
  share
} from "./chunk-EBAU53KC.js";
import "./chunk-7CE4I3X6.js";

// node_modules/@delon/abc/fesm2022/full-content.mjs
var _c0 = ["*"];
var FullContentService = class _FullContentService {
  _change = new BehaviorSubject(null);
  /** 切换全屏工作区状态 */
  toggle() {
    this._change.next(true);
  }
  get change() {
    return this._change.pipe(share());
  }
  static ɵfac = function FullContentService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FullContentService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _FullContentService,
    factory: _FullContentService.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FullContentService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var wrapCls = `full-content__body`;
var openedCls = `full-content__opened`;
var hideTitleCls = `full-content__hidden-title`;
var FullContentComponent = class _FullContentComponent {
  destroy$ = inject(DestroyRef);
  el = inject(ElementRef).nativeElement;
  cdr = inject(ChangeDetectorRef);
  srv = inject(FullContentService);
  router = inject(Router);
  doc = inject(DOCUMENT);
  bodyEl = this.doc.querySelector("body");
  inited = false;
  id = `_full-content-${Math.random().toString(36).substring(2)}`;
  _height = 0;
  hideTitle = input(true, ...ngDevMode ? [{
    debugName: "hideTitle",
    transform: booleanAttribute
  }] : [{
    transform: booleanAttribute
  }]);
  padding = input(24, ...ngDevMode ? [{
    debugName: "padding",
    transform: numberAttribute
  }] : [{
    transform: numberAttribute
  }]);
  fullscreen = model(...ngDevMode ? [void 0, {
    debugName: "fullscreen"
  }] : []);
  updateCls() {
    const clss = this.bodyEl.classList;
    if (this.fullscreen()) {
      clss.add(openedCls);
      if (this.hideTitle()) {
        clss.add(hideTitleCls);
      }
    } else {
      clss.remove(openedCls);
      if (this.hideTitle()) {
        clss.remove(hideTitleCls);
      }
    }
  }
  update() {
    this.updateCls();
    this.updateHeight();
    this.fullscreen.set(this.fullscreen());
  }
  updateHeight() {
    this._height = this.bodyEl.getBoundingClientRect().height - this.el.getBoundingClientRect().top - this.padding();
    this.cdr.detectChanges();
  }
  removeInBody() {
    this.bodyEl.classList.remove(wrapCls, openedCls, hideTitleCls);
  }
  ngOnInit() {
    this.inited = true;
    this.bodyEl.classList.add(wrapCls);
    this.el.id = this.id;
    this.updateCls();
    fromEvent(window, "resize").pipe(takeUntilDestroyed(this.destroy$), debounceTime(200)).subscribe(() => this.updateHeight());
    this.srv.change.pipe(takeUntilDestroyed(this.destroy$), filter((res) => res !== null)).subscribe(() => this.toggle());
    this.router.events.pipe(takeUntilDestroyed(this.destroy$), filter((e) => e instanceof ActivationStart || e instanceof ActivationEnd), debounceTime(200)).subscribe(() => {
      if (this.doc.querySelector(`#${this.id}`)) {
        this.bodyEl.classList.add(wrapCls);
        this.updateCls();
      } else {
        this.removeInBody();
      }
    });
  }
  toggle() {
    this.fullscreen.set(!this.fullscreen());
    this.update();
    this.updateHeight();
  }
  ngAfterViewInit() {
    setTimeout(() => this.updateHeight());
  }
  ngOnChanges() {
    if (this.inited) this.update();
  }
  ngOnDestroy() {
    this.removeInBody();
  }
  static ɵfac = function FullContentComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FullContentComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _FullContentComponent,
    selectors: [["full-content"]],
    hostVars: 4,
    hostBindings: function FullContentComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵstyleProp("height", ctx._height, "px");
        ɵɵclassProp("full-content", true);
      }
    },
    inputs: {
      hideTitle: [1, "hideTitle"],
      padding: [1, "padding"],
      fullscreen: [1, "fullscreen"]
    },
    outputs: {
      fullscreen: "fullscreenChange"
    },
    exportAs: ["fullContent"],
    features: [ɵɵNgOnChangesFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function FullContentComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FullContentComponent, [{
    type: Component,
    args: [{
      selector: "full-content",
      exportAs: "fullContent",
      template: `<ng-content />`,
      host: {
        "[class.full-content]": "true",
        "[style.height.px]": "_height"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None
    }]
  }], null, null);
})();
var FullContentToggleDirective = class _FullContentToggleDirective {
  parent = inject(FullContentComponent);
  _click() {
    this.parent.toggle();
  }
  static ɵfac = function FullContentToggleDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FullContentToggleDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _FullContentToggleDirective,
    selectors: [["", "full-toggle", ""]],
    hostBindings: function FullContentToggleDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("click", function FullContentToggleDirective_click_HostBindingHandler() {
          return ctx._click();
        });
      }
    },
    exportAs: ["fullToggle"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FullContentToggleDirective, [{
    type: Directive,
    args: [{
      selector: "[full-toggle]",
      exportAs: "fullToggle",
      host: {
        "(click)": "_click()"
      }
    }]
  }], null, null);
})();
var COMPONENTS = [FullContentComponent, FullContentToggleDirective];
var FullContentModule = class _FullContentModule {
  static ɵfac = function FullContentModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FullContentModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _FullContentModule,
    imports: [CommonModule, FullContentComponent, FullContentToggleDirective],
    exports: [FullContentComponent, FullContentToggleDirective]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FullContentModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, ...COMPONENTS],
      exports: COMPONENTS
    }]
  }], null, null);
})();
export {
  FullContentComponent,
  FullContentModule,
  FullContentService,
  FullContentToggleDirective
};
//# sourceMappingURL=@delon_abc_full-content.js.map
