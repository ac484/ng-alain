import {
  NzTabComponent,
  NzTabsComponent,
  NzTabsModule
} from "./chunk-B2ST2VOR.js";
import {
  NzMenuDirective,
  NzMenuItemComponent,
  NzMenuModule
} from "./chunk-IIASACYA.js";
import {
  ScrollService
} from "./chunk-KZXCIQZH.js";
import {
  ALAIN_I18N_TOKEN,
  DelonLocaleModule,
  DelonLocaleService,
  MenuService
} from "./chunk-WLPEXMS5.js";
import {
  ConnectionPositionPair,
  Overlay,
  OverlayModule
} from "./chunk-U5VATZ4Q.js";
import {
  ComponentPortal
} from "./chunk-EGGX2FJX.js";
import {
  NzIconDirective,
  NzIconModule
} from "./chunk-GP3H6RZA.js";
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  ROUTER_CONFIGURATION,
  RouteReuseStrategy,
  Router,
  RouterModule
} from "./chunk-36PX2JTV.js";
import {
  takeUntilDestroyed
} from "./chunk-I75K2H66.js";
import {
  Directionality
} from "./chunk-TBGMZLZ3.js";
import {
  Platform
} from "./chunk-GIT7CFOZ.js";
import {
  CommonModule,
  NgTemplateOutlet
} from "./chunk-GUTSRBNM.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  Output,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  numberAttribute,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresolveDocument,
  ɵɵsanitizeHtml,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-NQBXVTYU.js";
import {
  DOCUMENT,
  DestroyRef,
  InjectionToken,
  Injector,
  inject,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵresetView,
  ɵɵrestoreView
} from "./chunk-QZDSTGXI.js";
import {
  BehaviorSubject,
  Subject,
  Subscription,
  debounceTime,
  filter,
  of,
  take,
  timer
} from "./chunk-EBAU53KC.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-7CE4I3X6.js";

// node_modules/@delon/abc/fesm2022/reuse-tab.mjs
function ReuseTabContextMenuComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 5);
    ɵɵlistener("click", function ReuseTabContextMenuComponent_Conditional_1_Template_li_click_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.click($event, "refresh"));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("innerHTML", ctx_r1.i18n.refresh, ɵɵsanitizeHtml);
  }
}
function ReuseTabContextMenuComponent_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 8);
    ɵɵlistener("click", function ReuseTabContextMenuComponent_Conditional_5_For_2_Template_li_click_0_listener($event) {
      const i_r4 = ɵɵrestoreView(_r3).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.click($event, "custom", i_r4));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const i_r4 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("nzDisabled", ctx_r1.isDisabled(i_r4))("innerHTML", i_r4.title, ɵɵsanitizeHtml);
    ɵɵattribute("data-type", i_r4.id);
  }
}
function ReuseTabContextMenuComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "li", 6);
    ɵɵrepeaterCreate(1, ReuseTabContextMenuComponent_Conditional_5_For_2_Template, 1, 3, "li", 7, ɵɵrepeaterTrackByIndex);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵrepeater(ctx_r1.customContextMenu);
  }
}
var _c0 = ["tabset"];
var _c1 = (a0) => ({
  $implicit: a0
});
function ReuseTabComponent_For_3_ng_template_1_Conditional_2_ng_template_0_Template(rf, ctx) {
}
function ReuseTabComponent_For_3_ng_template_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, ReuseTabComponent_For_3_ng_template_1_Conditional_2_ng_template_0_Template, 0, 0, "ng-template", 7);
  }
  if (rf & 2) {
    const i_r5 = ɵɵnextContext(2).$implicit;
    const ctx_r3 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r3.titleRender)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c1, i_r5));
  }
}
function ReuseTabComponent_For_3_ng_template_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const i_r5 = ɵɵnextContext(2).$implicit;
    ɵɵtextInterpolate1(" ", i_r5.title, " ");
  }
}
function ReuseTabComponent_For_3_ng_template_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "nz-icon", 9);
    ɵɵlistener("click", function ReuseTabComponent_For_3_ng_template_1_Conditional_4_Template_nz_icon_click_0_listener($event) {
      ɵɵrestoreView(_r6);
      const $index_r3 = ɵɵnextContext(2).$index;
      const ctx_r3 = ɵɵnextContext();
      return ɵɵresetView(ctx_r3._close($event, $index_r3, false));
    });
    ɵɵelementEnd();
  }
}
function ReuseTabComponent_For_3_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 6)(1, "span");
    ɵɵconditionalCreate(2, ReuseTabComponent_For_3_ng_template_1_Conditional_2_Template, 1, 4, null, 7)(3, ReuseTabComponent_For_3_ng_template_1_Conditional_3_Template, 1, 1);
    ɵɵelementEnd()();
    ɵɵconditionalCreate(4, ReuseTabComponent_For_3_ng_template_1_Conditional_4_Template, 1, 0, "nz-icon", 8);
  }
  if (rf & 2) {
    const i_r5 = ɵɵnextContext().$implicit;
    const ctx_r3 = ɵɵnextContext();
    ɵɵproperty("reuse-tab-context-menu", i_r5)("customContextMenu", ctx_r3.customContextMenu);
    ɵɵattribute("title", i_r5.title);
    ɵɵadvance();
    ɵɵstyleProp("max-width", ctx_r3.tabMaxWidth, "px");
    ɵɵclassProp("reuse-tab__name-width", ctx_r3.tabMaxWidth);
    ɵɵadvance();
    ɵɵconditional(ctx_r3.titleRender ? 2 : 3);
    ɵɵadvance(2);
    ɵɵconditional(i_r5.closable ? 4 : -1);
  }
}
function ReuseTabComponent_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "nz-tab", 5);
    ɵɵlistener("nzClick", function ReuseTabComponent_For_3_Template_nz_tab_nzClick_0_listener() {
      const $index_r3 = ɵɵrestoreView(_r2).$index;
      const ctx_r3 = ɵɵnextContext();
      return ɵɵresetView(ctx_r3._to($index_r3));
    });
    ɵɵtemplate(1, ReuseTabComponent_For_3_ng_template_1_Template, 5, 9, "ng-template", null, 1, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const titleTemplate_r7 = ɵɵreference(2);
    ɵɵproperty("nzTitle", titleTemplate_r7);
  }
}
var ReuseTabContextMenuComponent = class _ReuseTabContextMenuComponent {
  locale = inject(DelonLocaleService).valueSignal("reuseTab");
  _i18n;
  set i18n(value) {
    this._i18n = __spreadValues(__spreadValues({}, this.locale()), value);
  }
  get i18n() {
    return this._i18n;
  }
  item;
  event;
  customContextMenu;
  close = new EventEmitter();
  get includeNonCloseable() {
    return this.event.ctrlKey;
  }
  notify(type) {
    this.close.next({
      type,
      item: this.item,
      includeNonCloseable: this.includeNonCloseable
    });
  }
  ngOnInit() {
    if (this.includeNonCloseable) this.item.closable = true;
  }
  click(e, type, custom) {
    e.preventDefault();
    e.stopPropagation();
    if (type === "close" && !this.item.closable) return;
    if (type === "closeRight" && this.item.last) return;
    if (custom) {
      if (this.isDisabled(custom)) return;
      custom.fn(this.item, custom);
    }
    this.notify(type);
  }
  isDisabled(custom) {
    return custom.disabled ? custom.disabled(this.item) : false;
  }
  closeMenu(event) {
    if (event.type === "click" && event.button === 2) return;
    this.notify(null);
  }
  static ɵfac = function ReuseTabContextMenuComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReuseTabContextMenuComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _ReuseTabContextMenuComponent,
    selectors: [["reuse-tab-context-menu"]],
    hostBindings: function ReuseTabContextMenuComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("click", function ReuseTabContextMenuComponent_click_HostBindingHandler($event) {
          return ctx.closeMenu($event);
        }, ɵɵresolveDocument)("contextmenu", function ReuseTabContextMenuComponent_contextmenu_HostBindingHandler($event) {
          return ctx.closeMenu($event);
        }, ɵɵresolveDocument);
      }
    },
    inputs: {
      i18n: "i18n",
      item: "item",
      event: "event",
      customContextMenu: "customContextMenu"
    },
    outputs: {
      close: "close"
    },
    decls: 6,
    vars: 7,
    consts: [["nz-menu", ""], ["nz-menu-item", "", "data-type", "refresh", 3, "innerHTML"], ["nz-menu-item", "", "data-type", "close", 3, "click", "nzDisabled", "innerHTML"], ["nz-menu-item", "", "data-type", "closeOther", 3, "click", "innerHTML"], ["nz-menu-item", "", "data-type", "closeRight", 3, "click", "nzDisabled", "innerHTML"], ["nz-menu-item", "", "data-type", "refresh", 3, "click", "innerHTML"], ["nz-menu-divider", ""], ["nz-menu-item", "", 3, "nzDisabled", "innerHTML"], ["nz-menu-item", "", 3, "click", "nzDisabled", "innerHTML"]],
    template: function ReuseTabContextMenuComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "ul", 0);
        ɵɵconditionalCreate(1, ReuseTabContextMenuComponent_Conditional_1_Template, 1, 1, "li", 1);
        ɵɵelementStart(2, "li", 2);
        ɵɵlistener("click", function ReuseTabContextMenuComponent_Template_li_click_2_listener($event) {
          return ctx.click($event, "close");
        });
        ɵɵelementEnd();
        ɵɵelementStart(3, "li", 3);
        ɵɵlistener("click", function ReuseTabContextMenuComponent_Template_li_click_3_listener($event) {
          return ctx.click($event, "closeOther");
        });
        ɵɵelementEnd();
        ɵɵelementStart(4, "li", 4);
        ɵɵlistener("click", function ReuseTabContextMenuComponent_Template_li_click_4_listener($event) {
          return ctx.click($event, "closeRight");
        });
        ɵɵelementEnd();
        ɵɵconditionalCreate(5, ReuseTabContextMenuComponent_Conditional_5_Template, 3, 0);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵadvance();
        ɵɵconditional(ctx.item.active ? 1 : -1);
        ɵɵadvance();
        ɵɵproperty("nzDisabled", !ctx.item.closable)("innerHTML", ctx.i18n.close, ɵɵsanitizeHtml);
        ɵɵadvance();
        ɵɵproperty("innerHTML", ctx.i18n.closeOther, ɵɵsanitizeHtml);
        ɵɵadvance();
        ɵɵproperty("nzDisabled", ctx.item.last)("innerHTML", ctx.i18n.closeRight, ɵɵsanitizeHtml);
        ɵɵadvance();
        ɵɵconditional(ctx.customContextMenu.length > 0 ? 5 : -1);
      }
    },
    dependencies: [NzMenuDirective, NzMenuItemComponent],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReuseTabContextMenuComponent, [{
    type: Component,
    args: [{
      selector: "reuse-tab-context-menu",
      host: {
        "(document:click)": "closeMenu($event)",
        "(document:contextmenu)": "closeMenu($event)"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [NzMenuDirective, NzMenuItemComponent],
      template: `<ul nz-menu>
  @if (item.active) {
    <li nz-menu-item (click)="click($event, 'refresh')" data-type="refresh" [innerHTML]="i18n.refresh"></li>
  }
  <li
    nz-menu-item
    (click)="click($event, 'close')"
    data-type="close"
    [nzDisabled]="!item.closable"
    [innerHTML]="i18n.close"
  ></li>
  <li nz-menu-item (click)="click($event, 'closeOther')" data-type="closeOther" [innerHTML]="i18n.closeOther"></li>
  <li
    nz-menu-item
    (click)="click($event, 'closeRight')"
    data-type="closeRight"
    [nzDisabled]="item.last"
    [innerHTML]="i18n.closeRight"
  ></li>
  @if (customContextMenu!.length > 0) {
    <li nz-menu-divider></li>
    @for (i of customContextMenu; track $index) {
      <li
        nz-menu-item
        [attr.data-type]="i.id"
        [nzDisabled]="isDisabled(i)"
        (click)="click($event, 'custom', i)"
        [innerHTML]="i.title"
      ></li>
    }
  }
</ul>
`
    }]
  }], null, {
    i18n: [{
      type: Input
    }],
    item: [{
      type: Input
    }],
    event: [{
      type: Input
    }],
    customContextMenu: [{
      type: Input
    }],
    close: [{
      type: Output
    }]
  });
})();
var ReuseTabContextService = class _ReuseTabContextService {
  overlay = inject(Overlay);
  ref = null;
  i18n;
  show = new Subject();
  close = new Subject();
  remove() {
    if (!this.ref) return;
    this.ref.detach();
    this.ref.dispose();
    this.ref = null;
  }
  open(context) {
    this.remove();
    const {
      event,
      item,
      customContextMenu
    } = context;
    const {
      x,
      y
    } = event;
    const positions = [new ConnectionPositionPair({
      originX: "start",
      originY: "bottom"
    }, {
      overlayX: "start",
      overlayY: "top"
    }), new ConnectionPositionPair({
      originX: "start",
      originY: "top"
    }, {
      overlayX: "start",
      overlayY: "bottom"
    })];
    const positionStrategy = this.overlay.position().flexibleConnectedTo({
      x,
      y
    }).withPositions(positions);
    this.ref = this.overlay.create({
      positionStrategy,
      panelClass: "reuse-tab__cm",
      scrollStrategy: this.overlay.scrollStrategies.close()
    });
    const comp = this.ref.attach(new ComponentPortal(ReuseTabContextMenuComponent));
    const instance = comp.instance;
    instance.i18n = this.i18n;
    instance.item = __spreadValues({}, item);
    instance.customContextMenu = customContextMenu;
    instance.event = event;
    const sub$ = new Subscription();
    sub$.add(instance.close.subscribe((res) => {
      this.close.next(res);
      this.remove();
    }));
    comp.onDestroy(() => sub$.unsubscribe());
  }
  static ɵfac = function ReuseTabContextService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReuseTabContextService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _ReuseTabContextService,
    factory: _ReuseTabContextService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReuseTabContextService, [{
    type: Injectable
  }], null, null);
})();
var ReuseTabContextComponent = class _ReuseTabContextComponent {
  srv = inject(ReuseTabContextService);
  set i18n(value) {
    this.srv.i18n = value;
  }
  change = new EventEmitter();
  constructor() {
    this.srv.show.pipe(takeUntilDestroyed()).subscribe((context) => this.srv.open(context));
    this.srv.close.pipe(takeUntilDestroyed()).subscribe((res) => this.change.emit(res));
  }
  static ɵfac = function ReuseTabContextComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReuseTabContextComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _ReuseTabContextComponent,
    selectors: [["reuse-tab-context"]],
    inputs: {
      i18n: "i18n"
    },
    outputs: {
      change: "change"
    },
    decls: 0,
    vars: 0,
    template: function ReuseTabContextComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReuseTabContextComponent, [{
    type: Component,
    args: [{
      selector: "reuse-tab-context",
      template: ``
    }]
  }], () => [], {
    i18n: [{
      type: Input
    }],
    change: [{
      type: Output
    }]
  });
})();
var ReuseTabContextDirective = class _ReuseTabContextDirective {
  srv = inject(ReuseTabContextService);
  item;
  customContextMenu;
  _onContextMenu(event) {
    this.srv.show.next({
      event,
      item: this.item,
      customContextMenu: this.customContextMenu
    });
    event.preventDefault();
    event.stopPropagation();
  }
  static ɵfac = function ReuseTabContextDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReuseTabContextDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _ReuseTabContextDirective,
    selectors: [["", "reuse-tab-context-menu", ""]],
    hostBindings: function ReuseTabContextDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("contextmenu", function ReuseTabContextDirective_contextmenu_HostBindingHandler($event) {
          return ctx._onContextMenu($event);
        });
      }
    },
    inputs: {
      item: [0, "reuse-tab-context-menu", "item"],
      customContextMenu: "customContextMenu"
    },
    exportAs: ["reuseTabContextMenu"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReuseTabContextDirective, [{
    type: Directive,
    args: [{
      selector: "[reuse-tab-context-menu]",
      exportAs: "reuseTabContextMenu",
      host: {
        "(contextmenu)": "_onContextMenu($event)"
      }
    }]
  }], null, {
    item: [{
      type: Input,
      args: ["reuse-tab-context-menu"]
    }],
    customContextMenu: [{
      type: Input
    }]
  });
})();
var ReuseTabMatchMode;
(function(ReuseTabMatchMode2) {
  ReuseTabMatchMode2[ReuseTabMatchMode2["Menu"] = 0] = "Menu";
  ReuseTabMatchMode2[ReuseTabMatchMode2["MenuForce"] = 1] = "MenuForce";
  ReuseTabMatchMode2[ReuseTabMatchMode2["URL"] = 2] = "URL";
})(ReuseTabMatchMode || (ReuseTabMatchMode = {}));
var REUSE_TAB_CACHED_MANAGER = new InjectionToken("REUSE_TAB_CACHED_MANAGER");
var ReuseTabCachedManagerFactory = class {
  list = [];
  title = {};
  closable = {};
};
var REUSE_TAB_STORAGE_KEY = new InjectionToken("REUSE_TAB_STORAGE_KEY");
var REUSE_TAB_STORAGE_STATE = new InjectionToken("REUSE_TAB_STORAGE_STATE");
var ReuseTabLocalStorageState = class {
  get(key) {
    return JSON.parse(localStorage.getItem(key) || "[]") || [];
  }
  update(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }
  remove(key) {
    localStorage.removeItem(key);
  }
};
var ReuseTabService = class _ReuseTabService {
  injector = inject(Injector);
  menuService = inject(MenuService);
  cached = inject(REUSE_TAB_CACHED_MANAGER);
  stateKey = inject(REUSE_TAB_STORAGE_KEY);
  stateSrv = inject(REUSE_TAB_STORAGE_STATE);
  _inited = false;
  _max = 10;
  _keepingScroll = false;
  _cachedChange = new BehaviorSubject(null);
  _router$;
  removeUrlBuffer = null;
  positionBuffer = {};
  componentRef;
  debug = false;
  routeParamMatchMode = "strict";
  mode = ReuseTabMatchMode.Menu;
  /** 排除规则，限 `mode=URL` */
  excludes = [];
  storageState = false;
  get snapshot() {
    return this.injector.get(ActivatedRoute).snapshot;
  }
  // #region public
  /**
   * Get init status
   *
   * 是否已经初始化完成
   */
  get inited() {
    return this._inited;
  }
  /**
   * Current routing address
   *
   * 当前路由地址
   */
  get curUrl() {
    return this.getUrl(this.snapshot);
  }
  /**
   * 允许最多复用多少个页面，取值范围 `2-100`，值发生变更时会强制关闭且忽略可关闭条件
   */
  set max(value) {
    this._max = Math.min(Math.max(value, 2), 100);
    for (let i = this.cached.list.length; i > this._max; i--) {
      this.cached.list.pop();
    }
  }
  set keepingScroll(value) {
    this._keepingScroll = value;
    this.initScroll();
  }
  get keepingScroll() {
    return this._keepingScroll;
  }
  keepingScrollContainer;
  /** 获取已缓存的路由 */
  get items() {
    return this.cached.list;
  }
  /** 获取当前缓存的路由总数 */
  get count() {
    return this.cached.list.length;
  }
  /** 订阅缓存变更通知 */
  get change() {
    return this._cachedChange.asObservable();
  }
  /** 自定义当前标题 */
  set title(value) {
    const url = this.curUrl;
    if (typeof value === "string") value = {
      text: value
    };
    this.cached.title[url] = value;
    this.di("update current tag title: ", value);
    this._cachedChange.next({
      active: "title",
      url,
      title: value,
      list: this.cached.list
    });
  }
  /** 获取指定路径缓存所在位置，`-1` 表示无缓存 */
  index(url) {
    return this.cached.list.findIndex((w) => w.url === url);
  }
  /** 获取指定路径缓存是否存在 */
  exists(url) {
    return this.index(url) !== -1;
  }
  /** 获取指定路径缓存 */
  get(url) {
    return url ? this.cached.list.find((w) => w.url === url) || null : null;
  }
  remove(url, includeNonCloseable) {
    const idx = typeof url === "string" ? this.index(url) : url;
    const item = idx !== -1 ? this.cached.list[idx] : null;
    if (!item || !includeNonCloseable && !item.closable) return false;
    this.destroy(item._handle);
    this.cached.list.splice(idx, 1);
    delete this.cached.title[url];
    return true;
  }
  /**
   * 根据URL移除标签
   *
   * @param [includeNonCloseable=false] 是否强制包含不可关闭
   */
  close(url, includeNonCloseable = false) {
    this.removeUrlBuffer = url;
    this.remove(url, includeNonCloseable);
    this._cachedChange.next({
      active: "close",
      url,
      list: this.cached.list
    });
    this.di("close tag", url);
    return true;
  }
  /**
   * 清除右边
   *
   * @param [includeNonCloseable=false] 是否强制包含不可关闭
   */
  closeRight(url, includeNonCloseable = false) {
    const start = this.index(url);
    for (let i = this.count - 1; i > start; i--) {
      this.remove(i, includeNonCloseable);
    }
    this.removeUrlBuffer = null;
    this._cachedChange.next({
      active: "closeRight",
      url,
      list: this.cached.list
    });
    this.di("close right tages", url);
    return true;
  }
  /**
   * 清除所有缓存
   *
   * @param [includeNonCloseable=false] 是否强制包含不可关闭
   */
  clear(includeNonCloseable = false) {
    this.cached.list.forEach((w) => {
      if (!includeNonCloseable && w.closable) this.destroy(w._handle);
    });
    this.cached.list = this.cached.list.filter((w) => !includeNonCloseable && !w.closable);
    this.removeUrlBuffer = null;
    this._cachedChange.next({
      active: "clear",
      list: this.cached.list
    });
    this.di("clear all catch");
  }
  /**
   * 移动缓存数据
   *
   * @param url 要移动的URL地址
   * @param position 新位置，下标从 `0` 开始
   *
   * @example
   * ```
   * // source
   * [ '/a/1', '/a/2', '/a/3', '/a/4', '/a/5' ]
   * move('/a/1', 2);
   * // output
   * [ '/a/2', '/a/3', '/a/1', '/a/4', '/a/5' ]
   * move('/a/1', -1);
   * // output
   * [ '/a/2', '/a/3', '/a/4', '/a/5', '/a/1' ]
   * ```
   */
  move(url, position) {
    const start = this.cached.list.findIndex((w) => w.url === url);
    if (start === -1) return;
    const data = this.cached.list.slice();
    data.splice(position < 0 ? data.length + position : position, 0, data.splice(start, 1)[0]);
    this.cached.list = data;
    this._cachedChange.next({
      active: "move",
      url,
      position,
      list: this.cached.list
    });
  }
  /**
   * 强制关闭当前路由（包含不可关闭状态），并重新导航至 `newUrl` 路由
   */
  replace(newUrl) {
    const url = this.curUrl;
    this.injector.get(Router).navigateByUrl(newUrl).then(() => {
      if (this.exists(url)) {
        this.close(url, true);
      } else {
        this.removeUrlBuffer = url;
      }
    });
  }
  /**
   * 获取标题，顺序如下：
   *
   * 1. 组件内使用 `ReuseTabService.title = 'new title'` 重新指定文本
   * 2. 路由配置中 data 属性中包含 titleI18n > title
   * 3. 菜单数据中 text 属性
   *
   * @param url 指定URL
   * @param route 指定路由快照
   */
  getTitle(url, route) {
    if (this.cached.title[url]) {
      return this.cached.title[url];
    }
    if (route && route.data && (route.data.titleI18n || route.data.title)) {
      return {
        text: route.data.title,
        i18n: route.data.titleI18n
      };
    }
    const menu = this.getMenu(url);
    return menu ? {
      text: menu.text,
      i18n: menu.i18n
    } : {
      text: url
    };
  }
  /**
   * 清除标题缓存
   */
  clearTitleCached() {
    this.cached.title = {};
  }
  /** 自定义当前 `closable` 状态 */
  set closable(value) {
    const url = this.curUrl;
    this.cached.closable[url] = value;
    this.di("update current tag closable: ", value);
    this._cachedChange.next({
      active: "closable",
      closable: value,
      list: this.cached.list
    });
  }
  /**
   * 获取 `closable` 状态，顺序如下：
   *
   * 1. 组件内使用 `ReuseTabService.closable = true` 重新指定 `closable` 状态
   * 2. 路由配置中 data 属性中包含 `reuseClosable`
   * 3. 菜单数据中 `reuseClosable` 属性
   *
   * @param url 指定URL
   * @param route 指定路由快照
   */
  getClosable(url, route) {
    if (typeof this.cached.closable[url] !== "undefined") return this.cached.closable[url];
    if (route && route.data && typeof route.data.reuseClosable === "boolean") return route.data.reuseClosable;
    const menu = this.mode !== ReuseTabMatchMode.URL ? this.getMenu(url) : null;
    if (menu && typeof menu.reuseClosable === "boolean") return menu.reuseClosable;
    return true;
  }
  /**
   * 清空 `closable` 缓存
   */
  clearClosableCached() {
    this.cached.closable = {};
  }
  getTruthRoute(route) {
    let next = route;
    while (next.firstChild) next = next.firstChild;
    return next;
  }
  /**
   * 根据快照获取URL地址
   */
  getUrl(route) {
    let next = this.getTruthRoute(route);
    const segments = [];
    while (next) {
      segments.push(next.url.join("/"));
      next = next.parent;
    }
    const url = `/${segments.filter((i) => i).reverse().join("/")}`;
    return url;
  }
  /**
   * 检查快照是否允许被复用
   */
  can(route) {
    const url = this.getUrl(route);
    if (url === this.removeUrlBuffer) return false;
    if (route.data && typeof route.data.reuse === "boolean") return route.data.reuse;
    if (this.mode !== ReuseTabMatchMode.URL) {
      const menu = this.getMenu(url);
      if (!menu) return false;
      if (this.mode === ReuseTabMatchMode.Menu) {
        if (menu.reuse === false) return false;
      } else {
        if (!menu.reuse || menu.reuse !== true) return false;
      }
      return true;
    }
    return !this.isExclude(url);
  }
  isExclude(url) {
    return this.excludes.findIndex((r) => r.test(url)) !== -1;
  }
  /**
   * 刷新，触发一个 refresh 类型事件
   */
  refresh(data) {
    this._cachedChange.next({
      active: "refresh",
      data
    });
  }
  // #endregion
  // #region privates
  destroy(_handle) {
    if (_handle && _handle.componentRef && _handle.componentRef.destroy) _handle.componentRef.destroy();
  }
  di(...args) {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this.debug) return;
      console.warn(...args);
    }
  }
  // #endregion
  constructor() {
    if (this.cached == null) {
      this.cached = {
        list: [],
        title: {},
        closable: {}
      };
    }
  }
  init() {
    this.initScroll();
    this._inited = true;
    this.loadState();
  }
  loadState() {
    if (!this.storageState) return;
    this.cached.list = this.stateSrv.get(this.stateKey).map((v) => __spreadProps(__spreadValues({}, v), {
      title: {
        text: v.title
      },
      url: v.url,
      position: v.position
    }));
    this._cachedChange.next({
      active: "loadState"
    });
  }
  getMenu(url) {
    const menus = this.menuService.getPathByUrl(url);
    if (!menus || menus.length === 0) return null;
    return menus.pop();
  }
  runHook(method, comp, type = "init") {
    if (typeof comp === "number") {
      const item = this.cached.list[comp];
      comp = item._handle?.componentRef;
    }
    if (comp == null || !comp.instance) {
      return;
    }
    const compThis = comp.instance;
    const fn = compThis[method];
    if (typeof fn !== "function") {
      return;
    }
    if (method === "_onReuseInit") {
      fn.call(compThis, type);
    } else {
      fn.call(compThis);
    }
  }
  hasInValidRoute(route) {
    return !route.routeConfig || !!route.routeConfig.loadChildren || !!route.routeConfig.children;
  }
  /**
   * 决定是否允许路由复用，若 `true` 会触发 `store`
   */
  shouldDetach(route) {
    if (this.hasInValidRoute(route)) return false;
    this.di("#shouldDetach", this.can(route), this.getUrl(route));
    return this.can(route);
  }
  saveCache(snapshot, _handle, pos) {
    const snapshotTrue = this.getTruthRoute(snapshot);
    const url = this.getUrl(snapshot);
    const idx = this.index(url);
    const item = {
      title: this.getTitle(url, snapshotTrue),
      url,
      closable: this.getClosable(url, snapshot),
      _snapshot: snapshot,
      _handle
    };
    if (idx < 0) {
      this.items.splice(pos ?? this.items.length, 0, item);
      if (this.count > this._max) {
        const closeIdx = this.items.findIndex((w) => w.url !== url && w.closable);
        if (closeIdx !== -1) {
          const closeItem = this.items[closeIdx];
          this.remove(closeIdx, false);
          timer(1).pipe(take(1)).subscribe(() => this._cachedChange.next({
            active: "close",
            url: closeItem.url,
            list: this.cached.list
          }));
        }
      }
    } else {
      this.items[idx] = item;
    }
  }
  /**
   * 存储
   */
  store(_snapshot, _handle) {
    const url = this.getUrl(_snapshot);
    if (_handle != null) {
      this.saveCache(_snapshot, _handle);
    }
    const list = this.cached.list;
    const item = {
      title: this.getTitle(url, _snapshot),
      closable: this.getClosable(url, _snapshot),
      position: this.getKeepingScroll(url, _snapshot) ? this.positionBuffer[url] : null,
      url,
      _snapshot,
      _handle
    };
    const idx = this.index(url);
    const cahcedComponentRef = list[idx]?._handle?.componentRef;
    if (_handle == null && cahcedComponentRef != null) {
      timer(100).pipe(take(1)).subscribe(() => this.runHook("_onReuseInit", cahcedComponentRef));
    }
    list[idx] = item;
    this.removeUrlBuffer = null;
    this.di("#store", "[override]", url);
    if (_handle && _handle.componentRef) {
      this.runHook("_onReuseDestroy", _handle.componentRef);
    }
    this._cachedChange.next({
      active: "override",
      item,
      list
    });
  }
  /**
   * 决定是否允许应用缓存数据
   */
  shouldAttach(route) {
    if (this.hasInValidRoute(route)) return false;
    const url = this.getUrl(route);
    const data = this.get(url);
    const ret = !!(data && data._handle);
    this.di("#shouldAttach", ret, url);
    if (!ret) {
      this._cachedChange.next({
        active: "add",
        url,
        list: this.cached.list
      });
    }
    return ret;
  }
  /**
   * 提取复用数据
   */
  retrieve(route) {
    if (this.hasInValidRoute(route)) return null;
    const url = this.getUrl(route);
    const data = this.get(url);
    const ret = data && data._handle || null;
    this.di("#retrieve", url, ret);
    return ret;
  }
  /**
   * 决定是否应该进行复用路由处理
   */
  shouldReuseRoute(future, curr) {
    let ret = future.routeConfig === curr.routeConfig;
    if (!ret) return false;
    const path = future.routeConfig && future.routeConfig.path || "";
    if (path.length > 0 && ~path.indexOf(":")) {
      if (this.routeParamMatchMode === "strict") {
        ret = this.getUrl(future) === this.getUrl(curr);
      } else {
        ret = path === (curr.routeConfig && curr.routeConfig.path || "");
      }
    }
    this.di("=====================");
    this.di("#shouldReuseRoute", ret, `${this.getUrl(curr)}=>${this.getUrl(future)}`, future, curr);
    return ret;
  }
  // #region scroll
  /**
   * 获取 `keepingScroll` 状态，顺序如下：
   *
   * 1. 路由配置中 data 属性中包含 `keepingScroll`
   * 2. 菜单数据中 `keepingScroll` 属性
   * 3. 组件 `keepingScroll` 值
   */
  getKeepingScroll(url, route) {
    if (route && route.data && typeof route.data.keepingScroll === "boolean") return route.data.keepingScroll;
    const menu = this.mode !== ReuseTabMatchMode.URL ? this.getMenu(url) : null;
    if (menu && typeof menu.keepingScroll === "boolean") return menu.keepingScroll;
    return this.keepingScroll;
  }
  get isDisabledInRouter() {
    const routerConfig = this.injector.get(ROUTER_CONFIGURATION, {});
    return routerConfig.scrollPositionRestoration === "disabled";
  }
  get ss() {
    return this.injector.get(ScrollService);
  }
  initScroll() {
    if (this._router$) {
      this._router$.unsubscribe();
    }
    this._router$ = this.injector.get(Router).events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        const url = this.curUrl;
        if (this.getKeepingScroll(url, this.getTruthRoute(this.snapshot))) {
          this.positionBuffer[url] = this.ss.getScrollPosition(this.keepingScrollContainer);
        } else {
          delete this.positionBuffer[url];
        }
      } else if (e instanceof NavigationEnd) {
        const url = this.curUrl;
        const item = this.get(url);
        if (item && item.position && this.getKeepingScroll(url, this.getTruthRoute(this.snapshot))) {
          if (this.isDisabledInRouter) {
            this.ss.scrollToPosition(this.keepingScrollContainer, item.position);
          } else {
            setTimeout(() => this.ss.scrollToPosition(this.keepingScrollContainer, item.position), 1);
          }
        }
      }
    });
  }
  // #endregion
  ngOnDestroy() {
    const {
      _cachedChange,
      _router$
    } = this;
    this.clear();
    this.cached.list = [];
    _cachedChange.complete();
    if (_router$) {
      _router$.unsubscribe();
    }
  }
  static ɵfac = function ReuseTabService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReuseTabService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _ReuseTabService,
    factory: _ReuseTabService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReuseTabService, [{
    type: Injectable
  }], () => [], null);
})();
var ReuseTabComponent = class _ReuseTabComponent {
  srv = inject(ReuseTabService, {
    optional: true
  });
  cdr = inject(ChangeDetectorRef);
  router = inject(Router);
  route = inject(ActivatedRoute);
  i18nSrv = inject(ALAIN_I18N_TOKEN);
  doc = inject(DOCUMENT);
  platform = inject(Platform);
  stateKey = inject(REUSE_TAB_STORAGE_KEY);
  stateSrv = inject(REUSE_TAB_STORAGE_STATE);
  tabset;
  destroy$ = inject(DestroyRef);
  _keepingScrollContainer;
  list = [];
  item;
  pos = 0;
  dir = inject(Directionality).valueSignal;
  // #region fields
  mode = ReuseTabMatchMode.Menu;
  i18n;
  debug = false;
  max;
  tabMaxWidth;
  excludes;
  allowClose = true;
  keepingScroll = false;
  storageState = false;
  set keepingScrollContainer(value) {
    this._keepingScrollContainer = typeof value === "string" ? this.doc.querySelector(value) : value;
  }
  customContextMenu = [];
  tabBarExtraContent;
  tabBarGutter;
  tabBarStyle = null;
  tabType = "line";
  routeParamMatchMode = "strict";
  disabled = false;
  titleRender;
  canClose;
  change = new EventEmitter();
  close = new EventEmitter();
  // #endregion
  genTit(title) {
    return title.i18n ? this.i18nSrv.fanyi(title.i18n) : title.text;
  }
  get curUrl() {
    return this.srv.getUrl(this.route.snapshot);
  }
  genCurItem() {
    const url = this.curUrl;
    const snapshotTrue = this.srv.getTruthRoute(this.route.snapshot);
    return {
      url,
      title: this.genTit(this.srv.getTitle(url, snapshotTrue)),
      closable: this.allowClose && this.srv.count > 0 && this.srv.getClosable(url, snapshotTrue),
      active: false,
      last: false,
      index: 0
    };
  }
  genList(notify) {
    const ls = this.srv.items.map((item, index) => ({
      url: item.url,
      title: this.genTit(item.title),
      closable: this.allowClose && this.srv.count > 0 && this.srv.getClosable(item.url, item._snapshot),
      position: item.position,
      index,
      active: false,
      last: false
    }));
    const url = this.curUrl;
    let addCurrent = ls.findIndex((w) => w.url === url) === -1;
    if (notify && notify.active === "close" && notify.url === url) {
      addCurrent = false;
      let toPos = 0;
      const curItem = this.list.find((w) => w.url === url);
      if (curItem.index === ls.length) {
        toPos = ls.length - 1;
      } else if (curItem.index < ls.length) {
        toPos = Math.max(0, curItem.index);
      }
      this.router.navigateByUrl(ls[toPos].url);
    }
    if (addCurrent) {
      const addPos = this.pos + 1;
      ls.splice(addPos, 0, this.genCurItem());
      this.srv.saveCache(this.route.snapshot, null, addPos);
    }
    ls.forEach((item, index) => item.index = index);
    if (ls.length === 1) {
      ls[0].closable = false;
    }
    this.list = ls;
    this.cdr.detectChanges();
    this.updatePos();
  }
  updateTitle(res) {
    const item = this.list.find((w) => w.url === res.url);
    if (!item) return;
    item.title = this.genTit(res.title);
    this.cdr.detectChanges();
  }
  refresh(item) {
    this.srv.runHook("_onReuseInit", this.pos === item.index ? this.srv.componentRef : item.index, "refresh");
  }
  saveState() {
    if (!this.srv.inited || !this.storageState) return;
    this.stateSrv?.update(this.stateKey, this.list);
  }
  // #region UI
  contextMenuChange(res) {
    let fn = null;
    switch (res.type) {
      case "refresh":
        this.refresh(res.item);
        break;
      case "close":
        this._close(null, res.item.index, res.includeNonCloseable);
        break;
      case "closeRight":
        fn = () => {
          this.srv.closeRight(res.item.url, res.includeNonCloseable);
          this.close.emit(null);
        };
        break;
      case "closeOther":
        fn = () => {
          this.srv.clear(res.includeNonCloseable);
          this.close.emit(null);
        };
        break;
    }
    if (!fn) {
      return;
    }
    if (!res.item.active && res.item.index <= this.list.find((w) => w.active).index) {
      this._to(res.item.index, fn);
    } else {
      fn();
    }
  }
  _to(index, cb) {
    index = Math.max(0, Math.min(index, this.list.length - 1));
    const item = this.list[index];
    this.router.navigateByUrl(item.url).then((res) => {
      if (!res) return;
      this.item = item;
      this.change.emit(item);
      cb?.();
    });
  }
  _close(e, idx, includeNonCloseable) {
    if (e != null) {
      e.preventDefault();
      e.stopPropagation();
    }
    const item = this.list[idx];
    (this.canClose ? this.canClose({
      item,
      includeNonCloseable
    }) : of(true)).pipe(filter((v) => v)).subscribe(() => {
      this.srv.close(item.url, includeNonCloseable);
      this.close.emit(item);
      this.cdr.detectChanges();
    });
    return false;
  }
  /**
   * 设置激活路由的实例，在 `src/app/layout/basic/basic.component.ts` 修改：
   *
   * @example
   * <reuse-tab #reuseTab></reuse-tab>
   * <router-outlet (activate)="reuseTab.activate($event)" (attach)="reuseTab.activate($event)"></router-outlet>
   */
  activate(instance) {
    if (this.srv == null) return;
    this.srv.componentRef = {
      instance
    };
  }
  updatePos() {
    const url = this.srv.getUrl(this.route.snapshot);
    const ls = this.list.filter((w) => w.url === url || !this.srv.isExclude(w.url));
    if (ls.length === 0) {
      return;
    }
    const last = ls[ls.length - 1];
    const item = ls.find((w) => w.url === url);
    last.last = true;
    const pos = item == null ? last.index : item.index;
    ls.forEach((i, idx) => i.active = pos === idx);
    this.pos = pos;
    this.tabset.nzSelectedIndex = pos;
    this.list = ls;
    this.cdr.detectChanges();
    this.saveState();
  }
  // #endregion
  ngOnInit() {
    if (!this.platform.isBrowser || this.srv == null) {
      return;
    }
    this.srv.change.pipe(takeUntilDestroyed(this.destroy$)).subscribe((res) => {
      switch (res?.active) {
        case "title":
          this.updateTitle(res);
          return;
        case "override":
          if (res?.list?.length === this.list.length) {
            this.updatePos();
            return;
          }
          break;
      }
      this.genList(res);
    });
    this.i18nSrv.change.pipe(filter(() => this.srv.inited), takeUntilDestroyed(this.destroy$), debounceTime(100)).subscribe(() => this.genList({
      active: "title"
    }));
    this.srv.init();
  }
  ngOnChanges(changes) {
    if (!this.platform.isBrowser || this.srv == null) {
      return;
    }
    if (changes.max) this.srv.max = this.max;
    if (changes.excludes) this.srv.excludes = this.excludes;
    if (changes.mode) this.srv.mode = this.mode;
    if (changes.routeParamMatchMode) this.srv.routeParamMatchMode = this.routeParamMatchMode;
    if (changes.keepingScroll) {
      this.srv.keepingScroll = this.keepingScroll;
      this.srv.keepingScrollContainer = this._keepingScrollContainer;
    }
    if (changes.storageState) this.srv.storageState = this.storageState;
    this.srv.debug = this.debug;
    this.cdr.detectChanges();
  }
  static ɵfac = function ReuseTabComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReuseTabComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _ReuseTabComponent,
    selectors: [["reuse-tab"], ["", "reuse-tab", ""]],
    viewQuery: function ReuseTabComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.tabset = _t.first);
      }
    },
    hostVars: 10,
    hostBindings: function ReuseTabComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("reuse-tab", true)("reuse-tab__line", ctx.tabType === "line")("reuse-tab__card", ctx.tabType === "card")("reuse-tab__disabled", ctx.disabled)("reuse-tab-rtl", ctx.dir() === "rtl");
      }
    },
    inputs: {
      mode: "mode",
      i18n: "i18n",
      debug: [2, "debug", "debug", booleanAttribute],
      max: [2, "max", "max", numberAttribute],
      tabMaxWidth: [2, "tabMaxWidth", "tabMaxWidth", numberAttribute],
      excludes: "excludes",
      allowClose: [2, "allowClose", "allowClose", booleanAttribute],
      keepingScroll: [2, "keepingScroll", "keepingScroll", booleanAttribute],
      storageState: [2, "storageState", "storageState", booleanAttribute],
      keepingScrollContainer: "keepingScrollContainer",
      customContextMenu: "customContextMenu",
      tabBarExtraContent: "tabBarExtraContent",
      tabBarGutter: "tabBarGutter",
      tabBarStyle: "tabBarStyle",
      tabType: "tabType",
      routeParamMatchMode: "routeParamMatchMode",
      disabled: [2, "disabled", "disabled", booleanAttribute],
      titleRender: "titleRender",
      canClose: "canClose"
    },
    outputs: {
      change: "change",
      close: "close"
    },
    exportAs: ["reuseTab"],
    features: [ɵɵProvidersFeature([ReuseTabContextService]), ɵɵNgOnChangesFeature],
    decls: 5,
    vars: 7,
    consts: [["tabset", ""], ["titleTemplate", ""], [3, "nzSelectedIndex", "nzAnimated", "nzType", "nzTabBarExtraContent", "nzTabBarGutter", "nzTabBarStyle"], [3, "nzTitle"], [3, "change", "i18n"], [3, "nzClick", "nzTitle"], [1, "reuse-tab__name", 3, "reuse-tab-context-menu", "customContextMenu"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["nzType", "close", 1, "reuse-tab__op"], ["nzType", "close", 1, "reuse-tab__op", 3, "click"]],
    template: function ReuseTabComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = ɵɵgetCurrentView();
        ɵɵelementStart(0, "nz-tabs", 2, 0);
        ɵɵrepeaterCreate(2, ReuseTabComponent_For_3_Template, 3, 1, "nz-tab", 3, ɵɵrepeaterTrackByIndex);
        ɵɵelementEnd();
        ɵɵelementStart(4, "reuse-tab-context", 4);
        ɵɵlistener("change", function ReuseTabComponent_Template_reuse_tab_context_change_4_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.contextMenuChange($event));
        });
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵproperty("nzSelectedIndex", ctx.pos)("nzAnimated", false)("nzType", ctx.tabType)("nzTabBarExtraContent", ctx.tabBarExtraContent)("nzTabBarGutter", ctx.tabBarGutter)("nzTabBarStyle", ctx.tabBarStyle);
        ɵɵadvance(2);
        ɵɵrepeater(ctx.list);
        ɵɵadvance(2);
        ɵɵproperty("i18n", ctx.i18n);
      }
    },
    dependencies: [NgTemplateOutlet, NzTabsComponent, NzTabComponent, ReuseTabContextDirective, ReuseTabContextComponent, NzIconDirective],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReuseTabComponent, [{
    type: Component,
    args: [{
      selector: "reuse-tab, [reuse-tab]",
      exportAs: "reuseTab",
      host: {
        "[class.reuse-tab]": "true",
        "[class.reuse-tab__line]": `tabType === 'line'`,
        "[class.reuse-tab__card]": `tabType === 'card'`,
        "[class.reuse-tab__disabled]": `disabled`,
        "[class.reuse-tab-rtl]": `dir() === 'rtl'`
      },
      providers: [ReuseTabContextService],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [NgTemplateOutlet, NzTabsComponent, NzTabComponent, ReuseTabContextDirective, ReuseTabContextComponent, NzIconDirective],
      template: '<nz-tabs\n  #tabset\n  [nzSelectedIndex]="pos"\n  [nzAnimated]="false"\n  [nzType]="tabType"\n  [nzTabBarExtraContent]="tabBarExtraContent"\n  [nzTabBarGutter]="tabBarGutter"\n  [nzTabBarStyle]="tabBarStyle"\n>\n  @for (i of list; track $index) {\n    <nz-tab [nzTitle]="titleTemplate" (nzClick)="_to($index)">\n      <ng-template #titleTemplate>\n        <div\n          [reuse-tab-context-menu]="i"\n          [customContextMenu]="customContextMenu"\n          class="reuse-tab__name"\n          [attr.title]="i.title"\n        >\n          <span [class.reuse-tab__name-width]="tabMaxWidth" [style.max-width.px]="tabMaxWidth">\n            @if (titleRender) {\n              <ng-template [ngTemplateOutlet]="titleRender" [ngTemplateOutletContext]="{ $implicit: i }" />\n            } @else {\n              {{ i.title }}\n            }\n          </span>\n        </div>\n        @if (i.closable) {\n          <nz-icon nzType="close" class="reuse-tab__op" (click)="_close($event, $index, false)" />\n        }\n      </ng-template>\n    </nz-tab>\n  }\n</nz-tabs>\n<reuse-tab-context [i18n]="i18n" (change)="contextMenuChange($event)" />\n'
    }]
  }], null, {
    tabset: [{
      type: ViewChild,
      args: ["tabset"]
    }],
    mode: [{
      type: Input
    }],
    i18n: [{
      type: Input
    }],
    debug: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    max: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    tabMaxWidth: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    excludes: [{
      type: Input
    }],
    allowClose: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    keepingScroll: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    storageState: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    keepingScrollContainer: [{
      type: Input
    }],
    customContextMenu: [{
      type: Input
    }],
    tabBarExtraContent: [{
      type: Input
    }],
    tabBarGutter: [{
      type: Input
    }],
    tabBarStyle: [{
      type: Input
    }],
    tabType: [{
      type: Input
    }],
    routeParamMatchMode: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    titleRender: [{
      type: Input
    }],
    canClose: [{
      type: Input
    }],
    change: [{
      type: Output
    }],
    close: [{
      type: Output
    }]
  });
})();
var ReuseTabStrategy = class {
  srv = inject(ReuseTabService);
  shouldDetach(route) {
    return this.srv.shouldDetach(route);
  }
  store(route, handle) {
    this.srv.store(route, handle);
  }
  shouldAttach(route) {
    return this.srv.shouldAttach(route);
  }
  retrieve(route) {
    return this.srv.retrieve(route);
  }
  shouldReuseRoute(future, curr) {
    return this.srv.shouldReuseRoute(future, curr);
  }
};
var COMPONENTS = [ReuseTabComponent];
var NOEXPORTS = [ReuseTabContextMenuComponent, ReuseTabContextComponent, ReuseTabContextDirective];
var ReuseTabModule = class _ReuseTabModule {
  static ɵfac = function ReuseTabModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReuseTabModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _ReuseTabModule,
    imports: [CommonModule, RouterModule, DelonLocaleModule, NzMenuModule, NzTabsModule, NzIconModule, OverlayModule, ReuseTabComponent, ReuseTabContextMenuComponent, ReuseTabContextComponent, ReuseTabContextDirective],
    exports: [ReuseTabComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [{
      provide: REUSE_TAB_STORAGE_KEY,
      useValue: "_reuse-tab-state"
    }, {
      provide: REUSE_TAB_STORAGE_STATE,
      useFactory: () => new ReuseTabLocalStorageState()
    }, {
      provide: REUSE_TAB_CACHED_MANAGER,
      useFactory: () => new ReuseTabCachedManagerFactory()
    }],
    imports: [CommonModule, RouterModule, DelonLocaleModule, NzMenuModule, NzTabsModule, NzIconModule, OverlayModule, COMPONENTS, ReuseTabContextMenuComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReuseTabModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, RouterModule, DelonLocaleModule, NzMenuModule, NzTabsModule, NzIconModule, OverlayModule, ...COMPONENTS, ...NOEXPORTS],
      providers: [{
        provide: REUSE_TAB_STORAGE_KEY,
        useValue: "_reuse-tab-state"
      }, {
        provide: REUSE_TAB_STORAGE_STATE,
        useFactory: () => new ReuseTabLocalStorageState()
      }, {
        provide: REUSE_TAB_CACHED_MANAGER,
        useFactory: () => new ReuseTabCachedManagerFactory()
      }],
      exports: COMPONENTS
    }]
  }], null, null);
})();
var ReuseTabFeatureKind;
(function(ReuseTabFeatureKind2) {
  ReuseTabFeatureKind2[ReuseTabFeatureKind2["CacheManager"] = 0] = "CacheManager";
  ReuseTabFeatureKind2[ReuseTabFeatureKind2["Store"] = 1] = "Store";
})(ReuseTabFeatureKind || (ReuseTabFeatureKind = {}));
function makeFeature(kind, providers) {
  return {
    ɵkind: kind,
    ɵproviders: providers
  };
}
function provideReuseTabConfig(options) {
  return makeEnvironmentProviders([ReuseTabService, {
    provide: REUSE_TAB_STORAGE_KEY,
    useValue: options?.storeKey ?? "_reuse-tab-state"
  }, (options?.cacheManager ?? withCacheManager()).ɵproviders, (options?.store ?? withLocalStorage()).ɵproviders, {
    provide: RouteReuseStrategy,
    useClass: ReuseTabStrategy,
    deps: [ReuseTabService]
  }, provideEnvironmentInitializer(() => {
    const srv = inject(ReuseTabService);
    if (options?.debug) srv.debug = options.debug;
    if (options?.mode) srv.mode = options.mode;
    if (options?.routeParamMatchMode) srv.routeParamMatchMode = options.routeParamMatchMode;
    if (options?.max) srv.max = options.max;
    if (options?.excludes) srv.excludes = options.excludes;
  })]);
}
function withCacheManager() {
  return makeFeature(ReuseTabFeatureKind.CacheManager, [{
    provide: REUSE_TAB_CACHED_MANAGER,
    useFactory: () => new ReuseTabCachedManagerFactory()
  }]);
}
function withLocalStorage() {
  return makeFeature(ReuseTabFeatureKind.Store, [{
    provide: REUSE_TAB_STORAGE_STATE,
    useFactory: () => new ReuseTabLocalStorageState()
  }]);
}

export {
  ReuseTabContextMenuComponent,
  ReuseTabContextService,
  ReuseTabContextComponent,
  ReuseTabContextDirective,
  ReuseTabMatchMode,
  REUSE_TAB_CACHED_MANAGER,
  REUSE_TAB_STORAGE_KEY,
  REUSE_TAB_STORAGE_STATE,
  ReuseTabLocalStorageState,
  ReuseTabService,
  ReuseTabComponent,
  ReuseTabStrategy,
  ReuseTabModule,
  ReuseTabFeatureKind,
  provideReuseTabConfig,
  withCacheManager,
  withLocalStorage
};
//# sourceMappingURL=chunk-YX4CPUI3.js.map
